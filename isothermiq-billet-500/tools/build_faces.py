#!/usr/bin/env python3
"""
Isothermiq — flyer "billet de 500 €" (160 x 82 mm + 3 mm de fonds perdus).

Génère src/recto.svg et src/verso.svg : SVG vectoriels éditables
(textes en <text>, unités en millimètres, viewBox = format avec fonds perdus).

  - Format fini      : 160 x 82 mm
  - Fonds perdus     : 3 mm  -> document 166 x 88 mm
  - Zone de sécurité : 4 mm à l'intérieur du format fini

Tous les textes et couleurs modifiables sont regroupés dans CONTENT / PALETTE.
Relancer `python3 tools/build_faces.py` puis `node tools/render.mjs`.
"""
import math
import os
import random

import qrcode

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")

W, H = 160.0, 82.0  # format fini (mm)
BLEED = 3.0
SAFE = 4.0
DW, DH = W + 2 * BLEED, H + 2 * BLEED

# --------------------------------------------------------------------------
# CONTENU (vérifié sur https://isothermiq.be le 09/10/2026)
# --------------------------------------------------------------------------
CONTENT = {
    "brand": "ISOTHERMIQ",
    "phone": "0473 55 86 32",
    "email": "contact@isothermiq.be",
    "web": "isothermiq.be",
    "hours": "isothermiq.be · lun.–sam. 8h–20h",
    "address": "Drève Richelle 191, 1410 Waterloo",
    "qr_url": "https://isothermiq.be/devis?utm_source=billet500",
    "campaign_code": "BILLET 500",
    "legal": [
        "Document publicitaire sans valeur monétaire. Le montant de 500 € est symbolique et ne constitue pas une promesse d’économie.",
        "Isothermiq · ECO GROUP PARTNERS SRL · Drève Richelle 191, 1410 Waterloo · TVA BE0776.639.705 · IPI 505 869",
    ],
}

PALETTE = {
    # recto : univers "billet violet" = basses températures d'une thermographie
    "night": "#1e0f30",
    "deep": "#2c1747",
    "plum": "#3d2160",
    "violet": "#5b3a82",
    "lilac": "#b49ad2",
    "pale": "#f3ecf9",
    # points chauds (palette thermographique "ironbow")
    "magenta": "#b4387a",
    "orange": "#ee7a2c",
    "yellow": "#ffc93c",
    "white_hot": "#fff4cc",
    # identité Isothermiq (relevée dans la feuille de styles du site)
    "leaf900": "#163322",
    "leaf800": "#1c402b",
    "leaf700": "#245035",
    "leaf600": "#2d6644",
    "leaf300": "#8db89a",
    "leaf100": "#dceadf",
    "cream": "#faf7f1",
    "sand100": "#f5efe2",
    "sand200": "#ebe1cb",
    "sand400": "#c4ad7b",
    "sand600": "#87703f",
    "ink900": "#0c0c0b",
    "ink600": "#353532",
    "ink500": "#4d4d47",
}
P = PALETTE

FONT_DISPLAY = "Barlow"
FONT_TEXT = "'Source Sans 3'"
FONT_SPECIMEN = "Arimo"  # métriques identiques à Arial (recommandation BCE)
FONT_LOGO = "Inter"
SPEC_INFO = {}


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------
def f(v):
    return f"{v:.3f}".rstrip("0").rstrip(".")


def path_from_pts(pts, close=False):
    d = "M" + " L".join(f"{f(x)},{f(y)}" for x, y in pts)
    return d + (" Z" if close else "")


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def text(x, y, size, s, family=FONT_TEXT, weight=400, fill="#000", anchor="start",
         ls=0.0, extra=""):
    return (f'<text x="{f(x)}" y="{f(y)}" font-family="{family}" font-weight="{weight}" '
            f'font-size="{f(size)}" fill="{fill}" text-anchor="{anchor}" '
            f'letter-spacing="{f(ls)}" {extra}>{esc(s)}</text>')


def lerp(a, b, t):
    return a + (b - a) * t


def hex2rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(c1, c2, t):
    a, b = hex2rgb(c1), hex2rgb(c2)
    return "#%02x%02x%02x" % tuple(round(lerp(a[i], b[i], t)) for i in range(3))


def thermal(t):
    """0 = froid (violet) ... 1 = très chaud (blanc-jaune)"""
    stops = [(0.0, P["violet"]), (0.35, "#8a4a9a"), (0.55, P["magenta"]),
             (0.75, P["orange"]), (0.9, P["yellow"]), (1.0, P["white_hot"])]
    t = max(0.0, min(1.0, t))
    for (t0, c0), (t1, c1) in zip(stops, stops[1:]):
        if t <= t1:
            return mix(c0, c1, (t - t0) / (t1 - t0))
    return stops[-1][1]


def svg_open(title):
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{f(DW)}mm" height="{f(DH)}mm" '
        f'viewBox="0 0 {f(DW)} {f(DH)}">',
        f"<title>{esc(title)}</title>",
        "<style>",
        "@font-face{font-family:'Barlow';font-weight:500;src:url(fonts/Barlow-Medium.ttf)}",
        "@font-face{font-family:'Barlow';font-weight:600;src:url(fonts/Barlow-SemiBold.ttf)}",
        "@font-face{font-family:'Barlow';font-weight:700;src:url(fonts/Barlow-Bold.ttf)}",
        "@font-face{font-family:'Barlow';font-weight:800;src:url(fonts/Barlow-ExtraBold.ttf)}",
        "@font-face{font-family:'Barlow';font-weight:900;src:url(fonts/Barlow-Black.ttf)}",
        "@font-face{font-family:'Source Sans 3';font-weight:400;src:url(fonts/SourceSans3-Regular.ttf)}",
        "@font-face{font-family:'Source Sans 3';font-weight:600;src:url(fonts/SourceSans3-SemiBold.ttf)}",
        "@font-face{font-family:'Source Sans 3';font-weight:700;src:url(fonts/SourceSans3-Bold.ttf)}",
        "@font-face{font-family:'Arimo';font-weight:700;src:url(fonts/Arimo-Bold.ttf)}",
        "@font-face{font-family:'Inter';font-weight:600;src:url(fonts/Inter-SemiBold.ttf)}",
        "@font-face{font-family:'Inter';font-weight:700;src:url(fonts/Inter-Bold.ttf)}",
        "text{font-kerning:normal}",
        "</style>",
    ]


# --------------------------------------------------------------------------
# motifs "billet de banque" (guillochis originaux, générés)
# --------------------------------------------------------------------------
def isotherms(cx, cy, r_from, r_to, step, color_fn, width, seed=3, squash=0.62):
    """Courbes isothermes concentriques déformées (motif de fond, clin d'œil au nom)."""
    rnd = random.Random(seed)
    harm = [(k, rnd.uniform(0.25, 1.0), rnd.uniform(0, 2 * math.pi)) for k in (2, 3, 5, 7)]
    out = []
    r = r_from
    i = 0
    while r <= r_to:
        amp = 0.06 * r
        pts = []
        n = 260
        for j in range(n + 1):
            th = 2 * math.pi * j / n
            rr = r + amp * sum(a * math.sin(k * th + ph + r * 0.035) for k, a, ph in harm) / 2.2
            pts.append((cx + rr * math.cos(th), cy + rr * math.sin(th) * squash))
        out.append(f'<path d="{path_from_pts(pts, True)}" fill="none" '
                   f'stroke="{color_fn(r, i)}" stroke-width="{f(width)}"/>')
        r += step
        i += 1
    return out


def rope_band(x0, x1, yc, amp, period, n, color, width, phase=0.0, mod=0.0):
    """Bande de guillochis "cordelière" : n sinusoïdes déphasées."""
    out = []
    for i in range(n):
        ph = phase + 2 * math.pi * i / n
        pts = []
        steps = int((x1 - x0) / 0.35)
        for s in range(steps + 1):
            x = x0 + (x1 - x0) * s / steps
            a = amp * (1 + mod * math.sin(2 * math.pi * x / (period * 7.3)))
            pts.append((x, yc + a * math.sin(2 * math.pi * x / period + ph)))
        out.append(f'<path d="{path_from_pts(pts)}" fill="none" stroke="{color}" '
                   f'stroke-width="{f(width)}"/>')
    return out


def rosette(cx, cy, R, r, d, color, width, turns=None, scale=1.0, rot=0.0):
    """Rosace hypotrochoïde (guillochis circulaire)."""
    g = math.gcd(int(R * 10), int(r * 10)) / 10
    turns = turns or int(r / g)
    n = 2400
    pts = []
    for j in range(n + 1):
        t = 2 * math.pi * turns * j / n
        x = (R - r) * math.cos(t) + d * math.cos((R - r) / r * t)
        y = (R - r) * math.sin(t) - d * math.sin((R - r) / r * t)
        xr = x * math.cos(rot) - y * math.sin(rot)
        yr = x * math.sin(rot) + y * math.cos(rot)
        pts.append((cx + xr * scale, cy + yr * scale))
    return f'<path d="{path_from_pts(pts)}" fill="none" stroke="{color}" stroke-width="{f(width)}"/>'


def hex_mark(x, y, s, c_hex, c_shade, c_counter):
    """Logo officiel Isothermiq (hexagone), repris tel quel du fichier logo-dark.svg du site.
    s = hauteur souhaitée en mm (le dessin d'origine fait 44 unités de haut)."""
    k = s / 44.0
    return (f'<g transform="translate({f(x)},{f(y)}) scale({f(k)}) translate(0,-2)">'
            f'<path d="M19 2 L38 13 L38 35 L19 46 L0 35 L0 13 Z" fill="{c_hex}"/>'
            f'<path d="M19 2 L38 13 L38 35 L19 46 L28 24 Z" fill="{c_shade}"/>'
            f'<path d="M11 17 L27 17 L19 31 Z" fill="{c_counter}"/></g>')


def logo(x, y, h, dark=True, with_toiture=False):
    """Logo Isothermiq : symbole + filet + mot-symbole (géométrie du logo officiel).
    with_toiture=True restitue le logo officiel complet « ISOTHERMIQ | TOITURE »."""
    k = h / 44.0
    c1, c2, c3 = (P["leaf800"], P["leaf700"], P["cream"]) if dark else (P["cream"], "#e8e1d4", P["leaf800"])
    txt = P["leaf800"] if dark else P["cream"]
    sub = P["leaf600"] if dark else P["leaf300"]
    parts = [f'<g transform="translate({f(x)},{f(y)}) scale({f(k)}) translate(0,-2)">',
             f'<path d="M19 2 L38 13 L38 35 L19 46 L0 35 L0 13 Z" fill="{c1}"/>',
             f'<path d="M19 2 L38 13 L38 35 L19 46 L28 24 Z" fill="{c2}"/>',
             f'<path d="M11 17 L27 17 L19 31 Z" fill="{c3}"/>',
             f'<line x1="50" y1="10" x2="50" y2="38" stroke="{txt}" stroke-width="1.2"/>']
    if with_toiture:
        parts += [f'<text x="62" y="23" fill="{txt}" font-family="{FONT_LOGO}" font-weight="700" font-size="19" textLength="132" lengthAdjust="spacing">ISOTHERMIQ</text>',
                  f'<text x="62" y="39.5" fill="{sub}" font-family="{FONT_LOGO}" font-weight="600" font-size="11" textLength="68" lengthAdjust="spacing">TOITURE</text>',
                  f'<line x1="136" y1="35.5" x2="194" y2="35.5" stroke="{sub}" stroke-width="1"/>']
    else:
        # mot-symbole seul, centré verticalement sur le symbole (même police / graisse / chasse)
        parts += [f'<text x="62" y="31" fill="{txt}" font-family="{FONT_LOGO}" font-weight="700" font-size="19" textLength="132" lengthAdjust="spacing">ISOTHERMIQ</text>']
    parts.append("</g>")
    return "".join(parts)


# --------------------------------------------------------------------------
# illustration : immeuble à appartements bruxellois "gravé", vu en thermographie
# --------------------------------------------------------------------------
def building(x0, base, w, ground_h, floor_h, floors, nb_h=(30, 34), nb_w=12):
    out = []
    x1 = x0 + w
    roof = base - ground_h - floor_h * floors
    par = 1.8  # acrotère
    top = roof - par
    gid = "thermo"
    out.append(f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="0" y1="{f(top - 1)}" x2="0" y2="{f(base)}">'
               f'<stop offset="0" stop-color="{P["white_hot"]}"/>'
               f'<stop offset="0.07" stop-color="{P["yellow"]}"/>'
               f'<stop offset="0.24" stop-color="{P["orange"]}"/>'
               f'<stop offset="0.48" stop-color="{P["magenta"]}"/>'
               f'<stop offset="0.75" stop-color="#8c62b8"/>'
               f'<stop offset="1" stop-color="#7a5aa6"/></linearGradient>')
    out.append(f'<linearGradient id="winglow" gradientUnits="userSpaceOnUse" x1="0" y1="{f(roof)}" x2="0" y2="{f(base)}">'
               f'<stop offset="0" stop-color="{P["orange"]}" stop-opacity="0.85"/>'
               f'<stop offset="0.45" stop-color="{P["magenta"]}" stop-opacity="0.55"/>'
               f'<stop offset="1" stop-color="{P["night"]}" stop-opacity="0"/></linearGradient>')
    stroke = f"url(#{gid})"

    # voisins (bien isolés : froids)
    cold = "#6c4f95"
    for nx0, nx1, nh, pitched in ((x0 - 13, x0, nb_h[0], True), (x1, x1 + nb_w, nb_h[1], False)):
        ny = base - nh
        out.append(f'<rect x="{f(nx0)}" y="{f(ny)}" width="{f(nx1 - nx0)}" height="{f(nh)}" fill="{P["deep"]}"/>')
        yy = ny + 0.6
        while yy < base:
            out.append(f'<line x1="{f(nx0)}" y1="{f(yy)}" x2="{f(nx1)}" y2="{f(yy)}" stroke="{cold}" stroke-width="0.11"/>')
            yy += 0.9
        if pitched:
            out.append(f'<path d="M{f(nx0)},{f(ny)} L{f((nx0 + nx1) / 2)},{f(ny - 6)} L{f(nx1)},{f(ny)} Z" fill="{P["deep"]}" stroke="{cold}" stroke-width="0.2"/>')
        # fenêtres des voisins
        cols = 2
        for c in range(cols):
            wx = nx0 + (nx1 - nx0) * (c + 0.5) / cols - 1.8
            fy = ny + 3
            while fy + 4 < base - 2:
                out.append(f'<rect x="{f(wx)}" y="{f(fy)}" width="3.6" height="3.6" fill="{P["night"]}" stroke="{cold}" stroke-width="0.18"/>')
                fy += 6.4
        out.append(f'<rect x="{f(nx0)}" y="{f(ny)}" width="{f(nx1 - nx0)}" height="{f(nh)}" fill="none" stroke="{cold}" stroke-width="0.22"/>')

    # façade : fond + hachures de gravure
    out.append(f'<rect x="{f(x0)}" y="{f(top)}" width="{f(w)}" height="{f(base - top)}" fill="{P["deep"]}"/>')
    yy = top + 0.25
    hatch = []
    while yy < base:
        hatch.append(f"M{f(x0)},{f(yy)} H{f(x1)}")
        yy += 0.5
    out.append(f'<path d="{" ".join(hatch)}" stroke="{stroke}" stroke-width="0.14" fill="none"/>')

    # corniches / bandeaux d'étage
    for k in range(floors + 1):
        yk = roof + k * floor_h
        out.append(f'<rect x="{f(x0 - 0.6)}" y="{f(yk - 0.35)}" width="{f(w + 1.2)}" height="0.7" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.16"/>')

    # acrotère + éléments de toiture plate
    out.append(f'<rect x="{f(x0 - 0.8)}" y="{f(top)}" width="{f(w + 1.6)}" height="{f(par)}" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.25"/>')
    out.append(f'<rect x="{f(x0 + 4)}" y="{f(top - 2.6)}" width="5" height="2.6" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.2"/>')
    out.append(f'<rect x="{f(x1 - 8)}" y="{f(top - 3.6)}" width="2.2" height="3.6" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.2"/>')

    # fenêtres : 5 travées, travée centrale en oriel (bow-window bruxellois)
    bays = 5
    bw = w / bays
    for k in range(floors):
        fy = roof + k * floor_h
        for b in range(bays):
            cx = x0 + bw * (b + 0.5)
            if b == 2:
                ww, wh = bw * 0.86, floor_h * 0.64
            else:
                ww, wh = bw * 0.52, floor_h * 0.6
            wx, wy = cx - ww / 2, fy + floor_h * 0.2
            out.append(f'<rect x="{f(wx)}" y="{f(wy)}" width="{f(ww)}" height="{f(wh)}" fill="{P["night"]}"/>')
            out.append(f'<rect x="{f(wx)}" y="{f(wy)}" width="{f(ww)}" height="{f(wh)}" fill="url(#winglow)" opacity="{f(0.9 - 0.12 * k)}"/>')
            out.append(f'<rect x="{f(wx)}" y="{f(wy)}" width="{f(ww)}" height="{f(wh)}" fill="none" stroke="{stroke}" stroke-width="0.24"/>')
            # croisillons
            out.append(f'<path d="M{f(cx)},{f(wy)} V{f(wy + wh)} M{f(wx)},{f(wy + wh * 0.32)} H{f(wx + ww)}" stroke="{stroke}" stroke-width="0.14"/>')
            if b == 2:
                out.append(f'<path d="M{f(wx + ww * 0.18)},{f(wy)} V{f(wy + wh)} M{f(wx + ww * 0.82)},{f(wy)} V{f(wy + wh)}" stroke="{stroke}" stroke-width="0.12"/>')
            # appui
            out.append(f'<rect x="{f(wx - 0.4)}" y="{f(wy + wh)}" width="{f(ww + 0.8)}" height="0.45" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.12"/>')
    # oriel : saillie de la travée centrale
    ox0, ox1 = x0 + bw * 2 + 0.2, x0 + bw * 3 - 0.2
    out.append(f'<path d="M{f(ox0)},{f(roof)} V{f(base - ground_h)} M{f(ox1)},{f(roof)} V{f(base - ground_h)}" stroke="{stroke}" stroke-width="0.3"/>')

    # rez-de-chaussée : porte cintrée + soubassement
    gy = base - ground_h
    dx = x0 + w / 2
    out.append(f'<path d="M{f(dx - 2.4)},{f(base)} V{f(gy + 3.2)} A2.4,2.4 0 0 1 {f(dx + 2.4)},{f(gy + 3.2)} V{f(base)} Z" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.24"/>')
    out.append(f'<path d="M{f(dx)},{f(gy + 1.0)} V{f(base)}" stroke="{stroke}" stroke-width="0.14"/>')
    for b in (0, 1, 3, 4):
        cx = x0 + bw * (b + 0.5)
        ww = bw * 0.56
        out.append(f'<rect x="{f(cx - ww / 2)}" y="{f(gy + 1.6)}" width="{f(ww)}" height="{f(ground_h * 0.55)}" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.2"/>')
    out.append(f'<rect x="{f(x0 - 0.6)}" y="{f(base - 1.1)}" width="{f(w + 1.2)}" height="1.1" fill="{P["night"]}" stroke="{stroke}" stroke-width="0.16"/>')
    out.append(f'<rect x="{f(x0)}" y="{f(top)}" width="{f(w)}" height="{f(base - top)}" fill="none" stroke="{stroke}" stroke-width="0.3"/>')
    return out, top


def heat_plume(x0, x1, roof, height, n=9, seed=7):
    rnd = random.Random(seed)
    out = [f'<linearGradient id="plume" gradientUnits="userSpaceOnUse" x1="0" y1="{f(roof)}" x2="0" y2="{f(roof - height)}">'
           f'<stop offset="0" stop-color="{P["yellow"]}" stop-opacity="0.95"/>'
           f'<stop offset="0.45" stop-color="{P["orange"]}" stop-opacity="0.6"/>'
           f'<stop offset="1" stop-color="{P["magenta"]}" stop-opacity="0"/></linearGradient>']
    for i in range(n):
        xb = lerp(x0, x1, (i + 0.5) / n)
        ph = rnd.uniform(0, 2 * math.pi)
        lam = rnd.uniform(5.5, 8.0)
        h = height * rnd.uniform(0.7, 1.0)
        pts = []
        steps = 90
        for s in range(steps + 1):
            t = s / steps
            y = roof - h * t
            a = 0.25 + 1.6 * t
            pts.append((xb + a * math.sin(2 * math.pi * (roof - y) / lam + ph) + (xb - (x0 + x1) / 2) * 0.25 * t, y))
        out.append(f'<path d="{path_from_pts(pts)}" fill="none" stroke="url(#plume)" stroke-width="{f(0.22 + 0.06 * (i % 3))}" stroke-linecap="round"/>')
    return out



def outline_text(font_file, s, size, tracking=0.0):
    """Texte vectorisé (contours de glyphes). Renvoie (d, largeur, hauteur de capitale) en mm,
    origine = point de départ sur la ligne de base."""
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    font = TTFont(os.path.join(SRC, "fonts", font_file))
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    k = size / upm
    x = 0.0
    ds = []
    for ch in s:
        gn = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        gs[gn].draw(TransformPen(pen, (k, 0, 0, -k, x, 0)))
        ds.append(pen.getCommands())
        x += gs[gn].width * k + tracking
    cap = font["OS/2"].sCapHeight * k
    return " ".join(ds), x - tracking, cap

# --------------------------------------------------------------------------
# RECTO
# --------------------------------------------------------------------------
def build_recto():
    s = svg_open("Isothermiq — Billet 500 — RECTO")
    g = []  # contenu en coordonnées "format fini" (0,0 = coin de coupe)
    defs = []

    # fond
    defs.append(f'<linearGradient id="bg" x1="0" y1="0" x2="1" y2="0.35">'
                f'<stop offset="0" stop-color="{P["deep"]}"/><stop offset="0.55" stop-color="{P["plum"]}"/>'
                f'<stop offset="1" stop-color="{P["deep"]}"/></linearGradient>')
    defs.append(f'<radialGradient id="halo" gradientUnits="userSpaceOnUse" cx="128" cy="43" r="40">'
                f'<stop offset="0" stop-color="#7a2f6e" stop-opacity="0.85"/>'
                f'<stop offset="0.45" stop-color="{P["violet"]}" stop-opacity="0.35"/>'
                f'<stop offset="1" stop-color="{P["plum"]}" stop-opacity="0"/></radialGradient>')
    g.append(f'<rect x="{-BLEED}" y="{-BLEED}" width="{DW}" height="{DH}" fill="url(#bg)"/>')
    g.append(f'<rect x="{-BLEED}" y="{-BLEED}" width="{DW}" height="{DH}" fill="url(#halo)"/>')

    # isothermes centrées sur le toit (le "point chaud")
    hot = (128.0, 43.0)

    def iso_color(r, i):
        t = max(0.0, 1.0 - r / 80.0)
        return mix(P["plum"], thermal(0.12 + 0.88 * t ** 2.2), 0.16 + 0.42 * t)

    g.append('<g>')
    g += isotherms(hot[0], hot[1], 7, 150, 1.25, iso_color, 0.12, seed=11)
    g.append('</g>')

    # rosace guillochée derrière la valeur
    g.append(rosette(37, 29, 21, 7.7, 11.5, mix(P["plum"], P["lilac"], 0.32), 0.1, scale=1.0))
    g.append(rosette(37, 29, 17, 5.1, 7.5, mix(P["plum"], P["lilac"], 0.22), 0.09, scale=1.0, rot=0.3))

    # bandes guillochées haut / bas (fonds perdus)
    for yc, col_bg in ((-0.55, P["night"]), (82.55, P["night"])):
        g.append(f'<rect x="{-BLEED}" y="{f(yc - 4.9)}" width="{DW}" height="9.8" fill="{col_bg}" opacity="0.92"/>')
        g += rope_band(-BLEED, W + BLEED, yc, 1.75, 6.2, 9, mix(P["night"], P["lilac"], 0.55), 0.11, mod=0.25)
        g += rope_band(-BLEED, W + BLEED, yc, 1.1, 3.1, 5, mix(P["night"], P["orange"], 0.45), 0.09, phase=1.0)
    for yl in (4.35, 77.65):
        g.append(f'<line x1="{-BLEED}" y1="{yl}" x2="{W + BLEED}" y2="{yl}" stroke="{mix(P["night"], P["lilac"], 0.7)}" stroke-width="0.18"/>')

    # immeuble thermographié + panache de chaleur + euros qui s'envolent
    bparts, btop = building(110, 76.0, 36, 6.6, 6.3, 4, nb_h=(22, 26), nb_w=W + BLEED - 146)
    defs += [p for p in bparts if p.startswith("<linearGradient")]
    plume = heat_plume(112, 144, btop - 0.4, 12.5, n=8)
    defs += [p for p in plume if p.startswith("<linearGradient")]
    g += [p for p in plume if not p.startswith("<linearGradient")]
    g += [p for p in bparts if not p.startswith("<linearGradient")]
    for (ex, ey, es, rot, op) in ((121, btop - 4.6, 4.4, -12, 0.95), (137.5, btop - 7.6, 3.6, 14, 0.8),
                                  (148.5, btop - 12.5, 2.8, -8, 0.6), (128.5, btop - 11.8, 2.6, 10, 0.5)):
        g.append(f'<text x="{f(ex)}" y="{f(ey)}" font-family="{FONT_DISPLAY}" font-weight="800" font-size="{f(es)}" '
                 f'fill="{P["yellow"]}" opacity="{f(op)}" text-anchor="middle" transform="rotate({rot} {f(ex)} {f(ey)})">€</text>')

    # émetteur (publicitaire) en haut à gauche
    g.append(hex_mark(5.2, 7.0, 4.6, P["cream"], "#e8e1d4", P["plum"]))
    g.append(text(11.4, 10.55, 2.55, "ISOTHERMIQ", FONT_LOGO, 700, P["pale"], ls=0.32))
    g.append(f'<line x1="35.4" y1="7.9" x2="35.4" y2="11.0" stroke="{P["lilac"]}" stroke-width="0.18"/>')
    g.append(text(37.4, 10.45, 1.85, "ISOLATION DES COPROPRIÉTÉS", FONT_DISPLAY, 600, P["lilac"], ls=0.2))

    # VALEUR : 500 €
    num = text(4.0, 44.0, 42.0, "500", FONT_DISPLAY, 800, P["pale"], ls=-1.3)
    defs.append('<clipPath id="numclip">' + num + '</clipPath>')
    g.append(num)
    eng = []
    yy = 12.0
    while yy < 45.5:
        eng.append(f"M2,{f(yy)} H80")
        yy += 0.62
    g.append(f'<path d="{" ".join(eng)}" stroke="#d9c9ec" stroke-width="0.16" fill="none" clip-path="url(#numclip)"/>')
    g.append('<g clip-path="url(#numclip)">' + rosette(37, 29, 21, 7.7, 11.5, "#c9b4e2", 0.14) + '</g>')
    g.append(text(71.6, 24.2, 13.0, "€", FONT_DISPLAY, 700, P["yellow"]))

    # SLOGAN
    g.append(text(85.6, 20.2, 8.4, "FAUX BILLET.", FONT_DISPLAY, 900, P["cream"], ls=0.05))
    g.append(text(85.9, 26.9, 4.15, "Les vrais, votre immeuble", FONT_DISPLAY, 600, P["yellow"]))
    g.append(text(85.9, 32.0, 4.15, "les perd par le toit.", FONT_DISPLAY, 600, P["yellow"]))

    # invitation à retourner
    g.append(f'<g transform="translate(5.2,49.4)">'
             f'<rect x="0" y="0" width="37.2" height="4.6" rx="2.3" fill="none" stroke="{P["lilac"]}" stroke-width="0.22"/>'
             + text(3.0, 3.25, 2.25, "RETOURNEZ LE BILLET", FONT_DISPLAY, 700, P["pale"], ls=0.18)
             + f'<path d="M32.2,1.4 a1.25,1.25 0 1 1 -0.2,1.95" fill="none" stroke="{P["yellow"]}" stroke-width="0.32" stroke-linecap="round"/>'
             + f'<path d="M31.2,3.05 L32.05,3.45 L32.55,2.55" fill="none" stroke="{P["yellow"]}" stroke-width="0.32" stroke-linecap="round" stroke-linejoin="round"/>'
             + "</g>")

    # rappel de valeur en coin (codes du billet)
    g.append(text(155.2, 10.6, 5.2, "500", FONT_DISPLAY, 800, P["lilac"], anchor="end", ls=-0.1))

    # micro-texte de bord (mention légale lisible à la loupe, 4,5 pt)
    mcol = mix(P["night"], P["lilac"], 0.92)
    bottom = " · ".join(["DOCUMENT PUBLICITAIRE SANS VALEUR MONÉTAIRE", "ISOTHERMIQ", "ISOLATION DES COPROPRIÉTÉS"] * 2)
    top = " · ".join(["BILLET FACTICE", "SPECIMEN", "AUCUNE VALEUR DE PAIEMENT"] * 3)
    g.append(text(W / 2, 79.55, 1.45, bottom, FONT_DISPLAY, 600, mcol, anchor="middle", ls=0.12))
    g.append(text(W / 2, 3.55, 1.45, top, FONT_DISPLAY, 600, mcol, anchor="middle", ls=0.12))

    # SPECIMEN — diagonale, Arial (Arimo) gras, opaque,
    # longueur >= 75 % de la longueur du billet (>= 120 mm), hauteur >= 15 % de sa largeur (>= 12,3 mm)
    target_len = 126.0  # 78,75 % de 160 mm
    target_cap = 13.0   # 15,9 % de 82 mm
    _, _, cap10 = outline_text("Arimo-Bold.ttf", "SPECIMEN", 10.0)
    spec_size = 10.0 * target_cap / cap10
    _, w_nat, _ = outline_text("Arimo-Bold.ttf", "SPECIMEN", spec_size)
    d, spec_w, spec_cap = outline_text("Arimo-Bold.ttf", "SPECIMEN", spec_size, tracking=(target_len - w_nat) / 7)
    assert spec_w >= 0.75 * W and spec_cap >= 0.15 * H, (spec_w, spec_cap)
    SPEC_INFO.update(size=spec_size, width=spec_w, cap=spec_cap)
    g.append(f'<g transform="translate(80.0,60.2) rotate(-9.5) translate({f(-spec_w / 2)},{f(spec_cap / 2)})" id="specimen">'
             f'<path d="{d}" fill="{P["yellow"]}" stroke="{P["night"]}" stroke-width="0.35" stroke-linejoin="round" paint-order="stroke"/></g>')

    s.append("<defs>" + "".join(defs) + "</defs>")
    s.append(f'<g transform="translate({BLEED},{BLEED})">')
    s += g
    s.append("</g></svg>")
    return "\n".join(s)


# --------------------------------------------------------------------------
# VERSO
# --------------------------------------------------------------------------
def icon(kind, x, y, s, col):
    """Pictogrammes au trait (7 x 7 mm de base)."""
    k = s / 7.0
    sw = 0.42 / k
    st = f'fill="none" stroke="{col}" stroke-width="{f(sw)}" stroke-linecap="round" stroke-linejoin="round"'
    body = {
        # toiture plate : immeuble + couche isolante sur le toit
        "flat": f'<path d="M1.2,6.4 V2.9 H5.8 V6.4" {st}/><rect x="0.8" y="1.4" width="5.4" height="0.9" {st}/>'
                f'<path d="M2.3,3.9 h0.8 M3.9,3.9 h0.8 M2.3,5.1 h0.8 M3.9,5.1 h0.8" {st}/><path d="M0.4,6.6 H6.6" {st}/>',
        # façade : mur + couche ITE hachurée
        "facade": f'<rect x="1.0" y="0.6" width="3.2" height="6" {st}/><rect x="4.2" y="0.6" width="1.6" height="6" {st}/>'
                  f'<path d="M4.2,2.2 L5.8,1.2 M4.2,3.8 L5.8,2.8 M4.2,5.4 L5.8,4.4 M4.2,7.0 L5.8,6.0" {st}/>'
                  f'<path d="M1.9,2.2 h1.4 M1.9,4.4 h1.4" {st}/>',
        # toiture en pente / combles
        "pitched": f'<path d="M0.5,4.0 L3.5,1.0 L6.5,4.0" {st}/><path d="M1.4,3.3 V6.5 H5.6 V3.3" {st}/>'
                   f'<path d="M2.1,3.4 L3.5,2.1 L4.9,3.4" {st}/><path d="M2.7,6.5 V4.9 H4.3 V6.5" {st}/>',
        # châssis double / triple vitrage
        "window": f'<rect x="1.0" y="0.7" width="5" height="5.8" {st}/><path d="M3.5,0.7 V6.5 M1.0,3.4 H6.0" {st}/>'
                  f'<path d="M1.7,1.5 l0.9,0.9 M4.2,1.5 l0.9,0.9" {st}/>',
    }[kind]
    return f'<g transform="translate({f(x)},{f(y)}) scale({f(k)})">{body}</g>'


def qr_path(url, x, y, size):
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0, box_size=1)
    qr.add_data(url)
    qr.make(fit=True)
    m = qr.get_matrix()
    n = len(m)
    u = size / n
    d = []
    for r, row in enumerate(m):
        c = 0
        while c < n:
            if row[c]:
                c0 = c
                while c < n and row[c]:
                    c += 1
                d.append(f"M{f(x + c0 * u)},{f(y + r * u)}h{f((c - c0) * u)}v{f(u)}h{f(-(c - c0) * u)}z")
            else:
                c += 1
    return "".join(d), n, qr.version


def build_verso():
    s = svg_open("Isothermiq — Billet 500 — VERSO")
    g = []
    defs = []

    # fond crème + isothermes très discrètes
    g.append(f'<rect x="{-BLEED}" y="{-BLEED}" width="{DW}" height="{DH}" fill="{P["cream"]}"/>')
    g += isotherms(150, 6, 8, 130, 1.6, lambda r, i: mix(P["cream"], P["sand200"], 0.85), 0.11, seed=5, squash=0.7)

    # ---- panneau "bon" (gauche) : la valeur réelle du billet
    px1 = 59.0
    g.append(f'<rect x="{-BLEED}" y="{-BLEED}" width="{px1 + BLEED}" height="{DH}" fill="{P["leaf800"]}"/>')
    g.append(f'<clipPath id="panel"><rect x="{-BLEED}" y="{-BLEED}" width="{px1 + BLEED}" height="{DH}"/></clipPath>')
    g.append('<g clip-path="url(#panel)">')
    g.append(rosette(29.5, 41, 30, 11.1, 15.5, mix(P["leaf800"], P["leaf300"], 0.2), 0.1))
    g.append(rosette(29.5, 41, 23, 6.9, 10.0, mix(P["leaf800"], P["sand400"], 0.18), 0.09, rot=0.4))
    g.append('</g>')
    # liseré thermique : la "fuite" du recto se retrouve ici
    defs.append(f'<linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">'
                f'<stop offset="0" stop-color="{P["yellow"]}"/><stop offset="0.3" stop-color="{P["orange"]}"/>'
                f'<stop offset="0.6" stop-color="{P["magenta"]}"/><stop offset="1" stop-color="{P["violet"]}"/></linearGradient>')
    g.append(f'<rect x="{px1}" y="{-BLEED}" width="1.1" height="{DH}" fill="url(#edge)"/>')
    # cadre guilloché du bon
    fx0, fy0, fx1, fy1 = 4.2, 4.2, px1 - 4.0, H - 4.2
    g.append(f'<rect x="{f(fx0)}" y="{f(fy0)}" width="{f(fx1 - fx0)}" height="{f(fy1 - fy0)}" rx="1.6" fill="none" stroke="{P["sand400"]}" stroke-width="0.22"/>')
    g.append(f'<rect x="{f(fx0 + 0.9)}" y="{f(fy0 + 0.9)}" width="{f(fx1 - fx0 - 1.8)}" height="{f(fy1 - fy0 - 1.8)}" rx="1.1" fill="none" stroke="{P["sand400"]}" stroke-width="0.12" stroke-dasharray="0.5 0.45"/>')

    cx = (fx0 + fx1) / 2
    g.append(text(cx, 11.6, 2.45, "CE BILLET NE VAUT RIEN…", FONT_DISPLAY, 700, P["sand400"], anchor="middle", ls=0.2))
    g.append(text(cx, 16.2, 3.0, "sauf pour ceci :", FONT_TEXT, 600, P["cream"], anchor="middle"))
    g.append(text(cx, 27.6, 9.6, "AUDIT", FONT_DISPLAY, 900, P["cream"], anchor="middle", ls=0.3))
    g.append(text(cx, 36.9, 9.6, "VISUEL", FONT_DISPLAY, 900, P["cream"], anchor="middle", ls=0.3))
    g.append(text(cx, 46.2, 9.6, "GRATUIT", FONT_DISPLAY, 900, P["yellow"], anchor="middle", ls=0.3))
    g.append(f'<line x1="{f(cx - 17)}" y1="49.4" x2="{f(cx + 17)}" y2="49.4" stroke="{P["sand400"]}" stroke-width="0.2"/>')
    g.append(text(cx, 53.6, 3.1, "ET SANS ENGAGEMENT", FONT_DISPLAY, 700, P["cream"], anchor="middle", ls=0.25))
    for i, line in enumerate(["Sur la résidence de votre choix :",
                              "nous repérons où elle perd sa chaleur",
                              "– et une partie de ses charges."]):
        g.append(text(cx, 59.0 + i * 3.35, 2.65, line, FONT_TEXT, 400, P["leaf100"], anchor="middle"))
    # code campagne (suivi des retours)
    g.append(f'<rect x="{f(cx - 19.5)}" y="69.3" width="39" height="5.2" rx="0.8" fill="none" stroke="{P["sand400"]}" stroke-width="0.2" stroke-dasharray="0.8 0.5"/>')
    g.append(text(cx, 72.75, 2.2, f"Mentionnez le code « {CONTENT['campaign_code']} »", FONT_TEXT, 600, P["sand200"], anchor="middle"))

    # ---- zone droite
    rx0, rx1 = 64.0, 156.0
    g.append(logo(rx0, 5.4, 7.6, dark=True))
    g.append(text(rx1 - 0.3, 10.1, 1.95, "BRUXELLES · BRABANT WALLON · WALLONIE", FONT_DISPLAY, 700, P["leaf600"], anchor="end", ls=0.15))

    g.append(text(rx0, 18.6, 2.05, "ISOLATION & PERFORMANCE ÉNERGÉTIQUE DES COPROPRIÉTÉS", FONT_DISPLAY, 700, P["sand600"], ls=0.18))
    g.append(text(rx0, 24.1, 4.6, "On isole là où votre immeuble", FONT_DISPLAY, 700, P["leaf900"]))
    g.append(text(rx0, 29.1, 4.6, "perd ses euros.", FONT_DISPLAY, 700, P["leaf900"]))

    services = [
        ("flat", "Toitures plates", "Toiture chaude, étanchéité,", "roofing APP / SBS"),
        ("facade", "Façades & pignons", "Isolation par l’extérieur,", "ponts thermiques traités"),
        ("pitched", "Toitures en pente & combles", "Entre chevrons, par l’intérieur,", "par soufflage"),
        ("window", "Châssis & vitrages", "Remplacement des anciens châssis,", "double ou triple vitrage"),
    ]
    colw, rowh = 46.5, 9.4
    for i, (ic, t1, l1, l2) in enumerate(services):
        cxs = rx0 + (i % 2) * colw
        cys = 32.4 + (i // 2) * rowh
        g.append(f'<rect x="{f(cxs)}" y="{f(cys)}" width="7.2" height="7.2" rx="1.2" fill="{P["leaf100"]}"/>')
        g.append(icon(ic, cxs + 0.6, cys + 0.6, 6.0, P["leaf800"]))
        g.append(text(cxs + 8.8, cys + 2.5, 2.75, t1, FONT_DISPLAY, 700, P["leaf900"]))
        g.append(text(cxs + 8.8, cys + 5.2, 2.3, l1, FONT_TEXT, 400, P["ink600"]))
        g.append(text(cxs + 8.8, cys + 7.65, 2.3, l2, FONT_TEXT, 400, P["ink600"]))

    # preuves (toutes vérifiables sur le site)
    proofs = ["Pas de sous-traitance", "Référent unique", "Garantie décennale", "Primes Renolution / Habitation"]
    g.append(f'<line x1="{rx0}" y1="52.0" x2="{rx1}" y2="52.0" stroke="{P["sand200"]}" stroke-width="0.2"/>')
    for i, pr in enumerate(proofs):
        xx = rx0 + (i % 2) * 33.5
        yy = 55.6 + (i // 2) * 3.2
        g.append(f'<path d="M{f(xx)},{f(yy - 0.9)} l0.6,0.6 l1.2,-1.3" fill="none" stroke="{P["leaf600"]}" stroke-width="0.32" stroke-linecap="round" stroke-linejoin="round"/>')
        g.append(text(xx + 2.5, yy, 2.2, pr, FONT_TEXT, 600, P["leaf800"]))

    # appel à l'action + coordonnées
    cy0, cw = 60.9, 71.6
    g.append(f'<rect x="{rx0}" y="{cy0}" width="{cw}" height="12.4" rx="1.4" fill="{P["sand100"]}"/>')
    g.append(text(rx0 + 2.2, cy0 + 3.5, 2.45, "Syndics, gestionnaires : choisissez une", FONT_DISPLAY, 700, P["leaf900"]))
    g.append(text(rx0 + 2.2, cy0 + 6.2, 2.45, "résidence, nous venons l’inspecter.", FONT_DISPLAY, 700, P["leaf900"]))
    g.append(f'<g transform="translate({f(rx0 + 2.2)},{f(cy0 + 7.75)})"><rect width="3.5" height="3.5" rx="1.75" fill="{P["leaf800"]}"/>'
             f'<path d="M1.1,0.92 c-0.25,0.9 0.6,2.0 1.5,1.75 l-0.05,-0.55 l-0.55,-0.2 l-0.25,0.3 c-0.35,-0.15 -0.55,-0.4 -0.65,-0.7 l0.3,-0.25 l-0.2,-0.55 z" fill="{P["cream"]}"/></g>')
    g.append(text(rx0 + 6.6, cy0 + 11.0, 4.25, CONTENT["phone"], FONT_DISPLAY, 800, P["leaf800"], ls=0.1))
    g.append(text(rx0 + 36.6, cy0 + 8.7, 2.15, CONTENT["email"], FONT_TEXT, 600, P["leaf900"]))
    g.append(text(rx0 + 36.6, cy0 + 11.0, 1.95, CONTENT["hours"], FONT_TEXT, 400, P["ink500"]))

    # QR code -> page devis du site (vérifiée : HTTP 200)
    qs = 14.2
    qx, qy = rx1 - qs - 2.0, 58.2
    qd, qn, qv = qr_path(CONTENT["qr_url"], qx, qy, qs)
    quiet = qs / qn * 2.0
    g.append(text(qx + qs / 2, 54.6, 1.85, "SCANNEZ POUR", FONT_DISPLAY, 700, P["leaf600"], anchor="middle", ls=0.12))
    g.append(text(qx + qs / 2, 56.6, 1.85, "DEMANDER L’AUDIT", FONT_DISPLAY, 700, P["leaf600"], anchor="middle", ls=0.12))
    g.append(f'<rect x="{f(qx - quiet)}" y="{f(qy - quiet)}" width="{f(qs + 2 * quiet)}" height="{f(qs + 2 * quiet)}" rx="0.6" fill="#ffffff" stroke="{P["sand200"]}" stroke-width="0.15"/>')
    g.append(f'<path d="{qd}" fill="{P["ink900"]}" id="qr"/>')

    # mentions légales (dans la zone de sécurité)
    for i, line in enumerate(CONTENT["legal"]):
        g.append(text(rx0, 75.3 + i * 1.95, 1.7, line, FONT_TEXT, 400, P["ink500"]))

    s.append("<defs>" + "".join(defs) + "</defs>")
    s.append(f'<g transform="translate({BLEED},{BLEED})">')
    s += g
    s.append("</g></svg>")
    return "\n".join(s), qn, qv


if __name__ == "__main__":
    os.makedirs(SRC, exist_ok=True)
    with open(os.path.join(SRC, "recto.svg"), "w", encoding="utf8") as fh:
        fh.write(build_recto())
    v, qn, qv = build_verso()
    with open(os.path.join(SRC, "verso.svg"), "w", encoding="utf8") as fh:
        fh.write(v)
    print(f"ok — QR version {qv} ({qn} modules) — SPECIMEN : longueur {SPEC_INFO['width']:.1f} mm ({SPEC_INFO['width']/W:.0%} de 160), hauteur capitales {SPEC_INFO['cap']:.1f} mm ({SPEC_INFO['cap']/H:.0%} de 82)")
