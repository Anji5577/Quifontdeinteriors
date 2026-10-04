// Automated QA against the static build.
//
//   npm run build && npm run serve      # in one terminal
//   npm run qa                          # in another
//
// For every route × width it checks: horizontal overflow, console errors,
// failed requests, broken images, missing alt text, content left unrevealed,
// one <h1> per page and no skipped heading levels. It also prints the
// homepage keyboard tab order. Options (env):
//   BASE=http://localhost:4173   WIDTHS=360,390,1440   REDUCED=1
//   SHOTS=1 (full-page screenshots to qa-shots/)   CHROME_PATH=/path/to/chrome

import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";
import { projects } from "../src/content/projects.ts";

const BASE = process.env.BASE ?? "http://localhost:4173";
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const widths = (process.env.WIDTHS ?? "360,390,430,768,1024,1280,1440").split(",").map(Number);
const reduced = process.env.REDUCED === "1";
const shots = process.env.SHOTS === "1";

const routes = [
  "/",
  "/work/",
  ...projects.map((p) => `/work/${p.slug}/`),
  "/work/rooms/",
  "/services/",
  "/services/kitchens/",
  "/process/",
  "/materials/",
  "/faq/",
  "/about/",
  "/contact/",
  "/journal/",
];

if (shots) await mkdir("qa-shots", { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const problems = [];

for (const width of widths) {
  for (const route of routes) {
    const page = await browser.newPage();
    const mobile = width < 768;
    await page.setViewport({ width, height: mobile ? 800 : 900, isMobile: mobile, hasTouch: mobile });
    if (reduced) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("requestfailed", (r) => r.failure()?.errorText !== "net::ERR_ABORTED" && errors.push(`failed: ${r.url()}`));
    page.on("response", (r) => r.status() >= 400 && errors.push(`${r.status()}: ${r.url()}`));

    await page.goto(BASE + route, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
    });
    await new Promise((r) => setTimeout(r, 1800));

    const report = await page.evaluate(() => {
      // Rendered, and not parked off-screen inside a horizontal carousel (those load as they scroll in).
      const shown = (el) => {
        if (!el.getClientRects().length) return false;
        const r = el.getBoundingClientRect();
        return r.right > 40 && r.left < innerWidth - 40;
      };
      const doc = document.documentElement;
      const headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => Number(h.tagName[1]));
      let skip = false;
      headings.reduce((prev, h) => ((skip ||= h > prev + 1), h), 0);
      return {
        overflow: doc.scrollWidth > doc.clientWidth,
        broken: [...document.images].filter((i) => shown(i) && (!i.complete || !i.naturalWidth)).length,
        noAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
        unrevealed: [...document.querySelectorAll("[data-reveal]:not([data-revealed])")].filter(shown).length,
        h1: headings.filter((h) => h === 1).length,
        skip,
      };
    });

    const issues = [];
    if (report.overflow) issues.push("horizontal overflow");
    if (report.broken) issues.push(`${report.broken} broken image(s)`);
    if (report.noAlt) issues.push(`${report.noAlt} image(s) without alt`);
    if (report.unrevealed) issues.push(`${report.unrevealed} unrevealed`);
    if (report.h1 !== 1) issues.push(`${report.h1} h1 elements`);
    if (report.skip) issues.push("skipped heading level");
    if (errors.length) issues.push(`errors: ${errors.join(" ; ")}`);
    if (issues.length) problems.push(`${width}px ${route}: ${issues.join(", ")}`);

    if (shots) {
      const name = `${width}${route.replace(/\//g, "_")}`.replace(/_$/, "") || `${width}_home`;
      await page.screenshot({ path: `qa-shots/${name}.jpg`, fullPage: true, type: "jpeg", quality: 60 });
    }
    await page.close();
  }
}

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + "/", { waitUntil: "networkidle0" });
const order = [];
for (let i = 0; i < 8; i++) {
  await page.keyboard.press("Tab");
  order.push(await page.evaluate(() => (document.activeElement.textContent || "").trim().slice(0, 24)));
}
console.log("Tab order:", order.join(" → "));
await browser.close();

console.log(problems.length ? problems.join("\n") : `All ${routes.length} routes × ${widths.length} widths passed.`);
process.exitCode = problems.length ? 1 : 0;
