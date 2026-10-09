import { chromium } from "playwright"; import fs from "node:fs";
const b = await chromium.launch(); const p = await b.newPage();
const SRC = "/home/user/clicklead/isothermiq-billet-500/src";
for (const face of ["recto","verso"]) {
  const svg = fs.readFileSync(`${SRC}/${face}.svg`,"utf8").replace(/^<\?xml[^>]*>\s*/,"");
  fs.writeFileSync(`${SRC}/.m.html`, `<!doctype html><base href="file://${SRC}/"><body style="margin:0">${svg}`);
  await p.goto(`file://${SRC}/.m.html`); await p.evaluate(()=>document.fonts.ready);
  const r = await p.evaluate(() => { const svg=document.querySelector("svg"); const k=svg.getBoundingClientRect().width/166;
    const out=[]; for (const el of svg.querySelectorAll("text")) { if (el.closest("clipPath")||el.getAttribute("display")==="none") continue;
      const b=el.getBoundingClientRect(); const x0=b.left/k-3,x1=b.right/k-3,y0=b.top/k-3,y1=b.bottom/k-3;
      out.push({t:el.textContent.slice(0,40), x0:+x0.toFixed(2),x1:+x1.toFixed(2),y0:+y0.toFixed(2),y1:+y1.toFixed(2), fs:+el.getAttribute("font-size")}); }
    return out; });
  const bad = r.filter(e => !(e.t.startsWith("BILLET FACTICE")||e.t.startsWith("DOCUMENT PUBLICITAIRE SANS VALEUR MON")) && (e.x0<4||e.x1>156||e.y0<4||e.y1>78));
  const micro = r.filter(e => e.t.startsWith("BILLET FACTICE")||e.t.startsWith("DOCUMENT PUBLICITAIRE SANS VALEUR MON"));
  console.log(face, "textes:", r.length, "| hors zone de sécurité 4 mm:", bad.length ? JSON.stringify(bad) : "aucun",
   "| micro-textes de bord:", micro.map(m=>`${m.x0}-${m.x1} / ${m.y0}-${m.y1}`).join(" ; "),
   "| plus petit corps (mm):", Math.min(...r.map(e=>e.fs)));
}
fs.unlinkSync(`${SRC}/.m.html`); await b.close();
