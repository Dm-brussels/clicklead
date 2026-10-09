#!/usr/bin/env python3
"""
Prépresse : assemble recto + verso, fixe les boîtes PDF, produit
  output/Isothermiq_Billet500_RV_impression_CMYK.pdf    (166 x 88 mm, fonds perdus, TrimBox/BleedBox)
  output/Isothermiq_Billet500_RV_traits-de-coupe_CMYK.pdf (mêmes pages + traits de coupe)
  output/Isothermiq_Billet500_RV_RGB.pdf                  (version RVB, si l'imprimeur convertit lui-même)
  output/*.png                                            (300 dpi, avec et sans fonds perdus)
"""
import os
import subprocess

import pikepdf
from pikepdf import Array, Dictionary, Name

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, "build")
OUT = os.path.join(ROOT, "output")
os.makedirs(OUT, exist_ok=True)

MM = 72 / 25.4
DOC_W, DOC_H = 166 * MM, 88 * MM
BLEED = 3 * MM
NAME = "Isothermiq_Billet500"


def set_boxes(page, ox=0.0, oy=0.0):
    """Boîtes relatives à l'origine (ox, oy) du document 166 x 88 mm."""
    page.MediaBox = Array([ox, oy, ox + DOC_W, oy + DOC_H])
    page.CropBox = Array([ox, oy, ox + DOC_W, oy + DOC_H])
    page.BleedBox = Array([ox, oy, ox + DOC_W, oy + DOC_H])
    page.TrimBox = Array([ox + BLEED, oy + BLEED, ox + DOC_W - BLEED, oy + DOC_H - BLEED])


# 1. assemblage RVB — Chromium arrondit la page au pixel : on recale sur 166 x 88 mm exacts,
#    ancrés en haut à gauche (là où commence le dessin).
rgb = pikepdf.new()
for face in ("recto", "verso"):
    src = pikepdf.open(os.path.join(BUILD, f"{face}-rgb.pdf"))
    rgb.pages.append(src.pages[0])
for p in rgb.pages:
    mb = [float(v) for v in p.MediaBox]
    set_boxes(p, mb[0], mb[3] - DOC_H)
rgb.docinfo["/Title"] = "Isothermiq — Billet 500 € — recto/verso (RVB)"
rgb_path = os.path.join(OUT, f"{NAME}_RV_RGB.pdf")
rgb.save(rgb_path)

# 2. conversion CMJN (Ghostscript, vecteurs et polices conservés)
tmp_cmyk = os.path.join(BUILD, "cmyk-tmp.pdf")
subprocess.run(["gs", "-q", "-dNOPAUSE", "-dBATCH", "-dSAFER", "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.6", "-sColorConversionStrategy=CMYK",
                "-sProcessColorModel=DeviceCMYK", "-dEmbedAllFonts=true", "-dSubsetFonts=true",
                "-dAutoRotatePages=/None", "-dPDFSETTINGS=/prepress", "-dUseCropBox",
                f"-sOutputFile={tmp_cmyk}", rgb_path], check=True)
cmyk = pikepdf.open(tmp_cmyk)
for p in cmyk.pages:
    mb = [float(v) for v in p.MediaBox]
    set_boxes(p, mb[0], mb[1])
cmyk.docinfo["/Title"] = "Isothermiq — Billet 500 € — recto/verso (CMJN, fonds perdus 3 mm)"
cmyk_path = os.path.join(OUT, f"{NAME}_RV_impression_CMYK.pdf")
cmyk.save(cmyk_path)

# 3. version avec traits de coupe (page élargie de 12 mm de chaque côté)
M = 12 * MM
marks = pikepdf.new()
for i, p in enumerate(cmyk.pages):
    pg = pikepdf.Page(p)
    form = marks.copy_foreign(pg.as_form_xobject())
    W, H = DOC_W + 2 * M, DOC_H + 2 * M
    tx0, ty0 = M + BLEED, M + BLEED                # coin bas-gauche du format fini
    tx1, ty1 = M + DOC_W - BLEED, M + DOC_H - BLEED
    off, ln = BLEED + 1 * MM, 6 * MM               # traits hors fonds perdus
    cmds = [f"q 1 0 0 1 {M:.3f} {M:.3f} cm /Fx Do Q",
            "q 0.25 w 1 1 1 1 K"]
    for x in (tx0, tx1):
        cmds.append(f"{x:.3f} {ty0 - off:.3f} m {x:.3f} {ty0 - off - ln:.3f} l S")
        cmds.append(f"{x:.3f} {ty1 + off:.3f} m {x:.3f} {ty1 + off + ln:.3f} l S")
    for y in (ty0, ty1):
        cmds.append(f"{tx0 - off:.3f} {y:.3f} m {tx0 - off - ln:.3f} {y:.3f} l S")
        cmds.append(f"{tx1 + off:.3f} {y:.3f} m {tx1 + off + ln:.3f} {y:.3f} l S")
    cmds.append("Q")
    np_ = marks.add_blank_page(page_size=(W, H))
    np_.obj.TrimBox = Array([tx0, ty0, tx1, ty1])
    np_.obj.BleedBox = Array([M, M, M + DOC_W, M + DOC_H])
    np_.obj.Resources = Dictionary(XObject=Dictionary(Fx=form))
    np_.obj.Contents = marks.make_stream("\n".join(cmds).encode())
marks.docinfo["/Title"] = "Isothermiq — Billet 500 € — recto/verso avec traits de coupe (CMJN)"
marks.save(os.path.join(OUT, f"{NAME}_RV_traits-de-coupe_CMYK.pdf"))

# 4. images 300 dpi (depuis le PDF RVB recadré)
px = lambda mm: round(mm / 25.4 * 300)
for i, face in enumerate(("recto", "verso"), start=1):
    base = os.path.join(OUT, f"{NAME}_{face}")
    subprocess.run(["pdftoppm", "-r", "300", "-png", "-singlefile", "-f", str(i), "-l", str(i),
                    rgb_path, base + "_fonds-perdus_300dpi"], check=True)
    subprocess.run(["pdftoppm", "-r", "300", "-png", "-singlefile", "-f", str(i), "-l", str(i),
                    "-x", str(px(3)), "-y", str(px(3)), "-W", str(px(160)), "-H", str(px(82)),
                    rgb_path, base + "_300dpi"], check=True)
print("prépresse ok")
