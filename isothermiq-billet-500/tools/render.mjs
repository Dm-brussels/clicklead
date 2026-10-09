// Rend src/recto.svg et src/verso.svg en PDF vectoriel (polices incorporées) via Chromium.
// Usage : node tools/render.mjs [--preview]
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const BUILD = path.join(ROOT, "build");
fs.mkdirSync(BUILD, { recursive: true });

const browser = await chromium.launch({
  executablePath: fs.existsSync("/opt/pw-browsers/chromium") ? undefined : undefined,
});
const page = await browser.newPage();
for (const face of ["recto", "verso"]) {
  const svg = fs.readFileSync(path.join(SRC, `${face}.svg`), "utf8").replace(/^<\?xml[^>]*>\s*/, "");
  const html = `<!doctype html><html><head><meta charset="utf-8"><base href="file://${SRC}/">
<style>@page{size:166mm 88mm;margin:0}html,body{margin:0;padding:0;background:#fff}svg{display:block}</style>
</head><body>${svg}</body></html>`;
  const tmp = path.join(SRC, `.${face}.render.html`);
  fs.writeFileSync(tmp, html);
  await page.goto("file://" + tmp);
  await page.evaluate(() => document.fonts.ready);
  const missing = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.status !== "loaded").map((f) => `${f.family} ${f.weight} ${f.status}`)
  );
  await page.pdf({
    path: path.join(BUILD, `${face}-rgb.pdf`),
    width: "166mm",
    height: "88mm",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: "1",
  });
  fs.unlinkSync(tmp);
  console.log(face, "ok", missing.length ? "fonts not used/loaded: " + missing.join(", ") : "");
}
await browser.close();
