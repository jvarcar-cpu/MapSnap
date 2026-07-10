/**
 * One-off baseline verification. Run: node scripts/verify-baseline.mjs [url]
 * Default: https://localhost:3003
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "https://localhost:3003";
const results = [];

async function readSnapsFromIndexedDb(page) {
  return page.evaluate(async () => {
    const db = await new Promise((resolve, reject) => {
      const req = indexedDB.open("mapsnap-db", 1);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => resolve(req.result);
      req.onupgradeneeded = () => {
        const database = req.result;
        if (!database.objectStoreNames.contains("snaps")) {
          database.createObjectStore("snaps", { keyPath: "id" });
        }
      };
    });
    return new Promise((resolve, reject) => {
      const tx = db.transaction("snaps", "readonly");
      const store = tx.objectStore("snaps");
      const req = store.getAll();
      req.onerror = () => reject(req.error);
      req.onsuccess = () => resolve(req.result);
    });
  });
}

function pass(name) {
  results.push({ name, ok: true });
  console.log(`PASS  ${name}`);
}

function fail(name, detail) {
  results.push({ name, ok: false, detail });
  console.log(`FAIL  ${name}: ${detail}`);
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ ignoreHTTPSErrors: true });
await context.grantPermissions(["geolocation"], { origin: BASE_URL });
await context.setGeolocation({ latitude: 59.3293, longitude: 18.0686 });
const page = await context.newPage();

try {
  const res = await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
  if (!res || !res.ok()) {
    fail("Page loads", `HTTP ${res?.status()}`);
  } else {
    pass("Page loads");
  }

  const cssHref = await page.locator('link[rel="stylesheet"]').first().getAttribute("href");
  if (cssHref) {
    const cssRes = await page.request.get(new URL(cssHref, BASE_URL).href);
    const cssText = await cssRes.text();
    if (cssText.includes(".snap-hero-glow") && cssText.includes(".bg-surface")) {
      pass("Tailwind/CSS loads with SNAP utilities");
    } else {
      fail("Tailwind/CSS loads with SNAP utilities", "snap-hero-glow or bg-surface missing");
    }
  } else {
    fail("Tailwind/CSS loads with SNAP utilities", "no stylesheet link");
  }

  const snapBtn = page.getByRole("button", { name: /SNAP/i });
  await snapBtn.waitFor({ timeout: 5000 });
  const btnClass = (await snapBtn.getAttribute("class")) ?? "";
  if (
    btnClass.includes("snap-hero-glow") &&
    btnClass.includes("snap-hero-gradient") &&
    btnClass.includes("rounded-full")
  ) {
    pass("SNAP button visible with hero classes");
  } else {
    fail("SNAP button visible with hero classes", btnClass);
  }

  const mainClass = (await page.locator("main").getAttribute("class")) ?? "";
  if (mainClass.includes("bg-surface")) {
    pass("Main layout styled");
  } else {
    fail("Main layout styled", mainClass);
  }

  if (await page.getByText("MINA SNAPPAR").isVisible()) {
    pass("MINA SNAPPAR section");
  } else {
    fail("MINA SNAPPAR section", "header not visible");
  }

  if (await page.locator('section[aria-label="Backup"]').isVisible()) {
    pass("Backup panel styled");
  } else {
    fail("Backup panel styled", "backup section not visible");
  }

  const fileInput = page.locator('input[type="file"][accept="image/*"]');
  if ((await fileInput.count()) === 1) {
    pass("Hidden camera input in DOM");
  } else {
    fail("Hidden camera input in DOM", `count=${await fileInput.count()}`);
  }

  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase("mapsnap-db");
      req.onsuccess = () => resolve(undefined);
      req.onerror = () => reject(req.error);
      req.onblocked = () => resolve(undefined);
    });
    localStorage.removeItem("mapsnap.snaps.v1");
  });
  await page.reload({ waitUntil: "networkidle" });
  const snapBtnAfterReload = page.getByRole("button", { name: /SNAP/i });
  await snapBtnAfterReload.click({ force: true });
  await page.waitForSelector("article", { timeout: 20000 });
  const snaps = await readSnapsFromIndexedDb(page);
  if (Array.isArray(snaps) && snaps.length === 1 && snaps[0].latitude) {
    pass("Short tap saves GPS snap");
  } else {
    fail("Short tap saves GPS snap", JSON.stringify(snaps));
  }

  await page.waitForSelector("article", { timeout: 10000 });
  if (await page.locator("article").count()) {
    pass("Snap list updates");
  } else {
    fail("Snap list updates", "card not visible");
  }

  const mapsLink = page.getByRole("link", { name: "Google Maps" });
  const wazeLink = page.getByRole("link", { name: "Waze" });
  const mapsHref = await mapsLink.getAttribute("href");
  const wazeHref = await wazeLink.getAttribute("href");
  if (mapsHref?.includes("google") && mapsHref.includes("59.329")) {
    pass("Google Maps link");
  } else {
    fail("Google Maps link", mapsHref ?? "missing");
  }
  if (wazeHref?.includes("waze") || wazeHref?.includes("ll=")) {
    pass("Waze link");
  } else {
    fail("Waze link", wazeHref ?? "missing");
  }

  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Ta bort" }).click();
  await page.waitForSelector("text=Inga snappar", { timeout: 5000 });
  const snapsAfterDelete = await readSnapsFromIndexedDb(page);
  if (Array.isArray(snapsAfterDelete) && snapsAfterDelete.length === 0) {
    pass("Delete works");
  } else {
    fail("Delete works", JSON.stringify(snapsAfterDelete));
  }
} catch (err) {
  fail("Verification run", err.message);
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length > 0 ? 1 : 0);
