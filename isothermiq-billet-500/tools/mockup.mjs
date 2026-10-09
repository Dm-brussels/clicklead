// Aperçus de présentation : planche recto/verso + mise en situation (enveloppe).
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "output");
const img = (f) => "data:image/png;base64," + fs.readFileSync(path.join(OUT, f)).toString("base64");
const R = img("Isothermiq_Billet500_recto_300dpi.png");
const V = img("Isothermiq_Billet500_verso_300dpi.png");
const font = (f) => "data:font/ttf;base64," + fs.readFileSync(path.join(ROOT, "src/fonts", f)).toString("base64");

const css = `
@font-face{font-family:B;font-weight:700;src:url(${font("Barlow-Bold.ttf")})}
@font-face{font-family:S;font-weight:400;src:url(${font("SourceSans3-Regular.ttf")})}
*{box-sizing:border-box}html,body{margin:0}
body{width:3000px;font-family:S;color:#1c402b}
.note{display:block;width:1280px;height:656px;box-shadow:0 2px 4px rgba(0,0,0,.18),0 30px 60px -20px rgba(20,10,30,.45)}
.lbl{font-family:B;font-weight:700;letter-spacing:.18em;font-size:30px;color:#2d6644;margin:0 0 22px 4px}
`;

const board = `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{height:1250px;background:#efe9dd;padding:120px 150px}
h1{font-family:B;font-size:64px;margin:0 0 8px;color:#163322}
p.sub{font-size:32px;margin:0 0 80px;color:#4d4d47}
.row{display:flex;gap:140px}
.foot{margin-top:70px;font-size:26px;color:#76766f}
</style></head><body>
<h1>Isothermiq — billet publicitaire « 500 € »</h1>
<p class="sub">Format fini 160 × 82 mm · impression recto verso · le recto intrigue, le verso convertit</p>
<div class="row"><div><div class="lbl">RECTO — L’ACCROCHE</div><img class="note" src="${R}"></div>
<div><div class="lbl">VERSO — L’OFFRE</div><img class="note" src="${V}"></div></div>
<div class="foot">Aperçu écran (RVB). Les couleurs d’impression font foi sur le PDF CMJN et l’épreuve de l’imprimeur.</div>
</body></html>`;

const scene = `<!doctype html><html><head><meta charset="utf-8"><style>${css}
body{height:1900px;background:radial-gradient(ellipse at 40% 35%,#f6f1e7 0%,#e4dccb 70%,#d6ccb7 100%);position:relative;overflow:hidden}
.env{position:absolute;left:520px;top:640px;width:1900px;height:1000px;background:#fbfaf6;border-radius:6px;
 box-shadow:0 4px 10px rgba(0,0,0,.08),0 60px 120px -40px rgba(60,40,20,.45);transform:rotate(-4deg)}
.flap{position:absolute;left:0;top:0;width:100%;height:100%;clip-path:polygon(0 0,100% 0,50% 52%);background:#f1eee6}
.addr{position:absolute;left:1020px;top:620px;font-size:30px;line-height:1.5;color:#55524a}
.addr b{font-family:B;color:#2b2a26}
.win{position:absolute;left:980px;top:580px;width:760px;height:260px;border:2px solid #e2ded3;border-radius:10px}
.v{position:absolute;left:300px;top:1080px;transform:rotate(9deg)}
.r{position:absolute;left:820px;top:250px;transform:rotate(-12deg)}
.r .note,.v .note{width:1400px;height:717.5px}
.cap{position:absolute;left:150px;top:120px;font-family:B;font-size:58px;color:#163322}
.cap span{display:block;font-family:S;font-size:30px;color:#4d4d47;margin-top:10px}
</style></head><body>
<div class="cap">Le destinataire ouvre l’enveloppe…<span>… et tombe sur un billet de 500 €. Il le retourne : l’audit gratuit l’attend au verso.</span></div>
<div class="v"><img class="note" src="${V}"></div>
<div class="env"><div class="flap"></div><div class="win"></div>
<div class="addr"><b>À l’attention du syndic</b><br>Résidence ……………………<br>1000 Bruxelles</div></div>
<div class="r"><img class="note" src="${R}"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 3000, height: 1250 } });
await page.setContent(board);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(OUT, "Isothermiq_Billet500_apercu_recto-verso.png") });
await page.setViewportSize({ width: 3000, height: 1900 });
await page.setContent(scene);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(OUT, "Isothermiq_Billet500_mise-en-situation.png") });
await browser.close();
console.log("mockups ok");
