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

  const favoriteBtn = page.getByRole("button", { name: "Markera som favorit" });
  if (await favoriteBtn.isVisible()) {
    pass("Favorite toggle visible on card");
    const snapsBeforeFavorite = await readSnapsFromIndexedDb(page);
    const beforeFavorite = snapsBeforeFavorite[0];
    await favoriteBtn.click();
    const snapsAfterFavorite = await readSnapsFromIndexedDb(page);
    const afterFavorite = snapsAfterFavorite[0];
    if (afterFavorite?.favorite === true) {
      pass("Favorite persists to IndexedDB");
    } else {
      fail("Favorite persists to IndexedDB", JSON.stringify(afterFavorite));
    }
    if (
      afterFavorite?.latitude === beforeFavorite?.latitude &&
      afterFavorite?.longitude === beforeFavorite?.longitude &&
      afterFavorite?.createdAt === beforeFavorite?.createdAt &&
      afterFavorite?.name === beforeFavorite?.name &&
      afterFavorite?.note === beforeFavorite?.note &&
      afterFavorite?.photoDataUrl === beforeFavorite?.photoDataUrl
    ) {
      pass("Favorite toggle does not mutate other fields");
    } else {
      fail(
        "Favorite toggle does not mutate other fields",
        JSON.stringify({ beforeFavorite, afterFavorite })
      );
    }
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForSelector("article", { timeout: 10000 });
    const favoriteActiveBtn = page.getByRole("button", { name: "Ta bort favorit" });
    if (await favoriteActiveBtn.isVisible()) {
      pass("Favorite survives reload");
    } else {
      fail("Favorite survives reload", "active favorite not shown after reload");
    }
  } else {
    fail("Favorite toggle visible on card", "button not found");
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

  if ((await page.getByRole("button", { name: "Spara bild" }).count()) === 0) {
    pass("Spara bild hidden without image");
  } else {
    fail("Spara bild hidden without image", "button visible on position-only snap");
  }

  const shareBtnNoImage = page.getByRole("button", { name: "Dela" });
  if (await shareBtnNoImage.isVisible()) {
    pass("Dela visible without image");
    const snapsBeforeShareNoImage = await readSnapsFromIndexedDb(page);
    const beforeShareNoImage = snapsBeforeShareNoImage[0];
    await shareBtnNoImage.click();
    const snapsAfterShareNoImage = await readSnapsFromIndexedDb(page);
    const afterShareNoImage = snapsAfterShareNoImage[0];
    if (
      afterShareNoImage?.photoDataUrl === beforeShareNoImage?.photoDataUrl &&
      afterShareNoImage?.latitude === beforeShareNoImage?.latitude &&
      afterShareNoImage?.longitude === beforeShareNoImage?.longitude &&
      afterShareNoImage?.createdAt === beforeShareNoImage?.createdAt &&
      afterShareNoImage?.name === beforeShareNoImage?.name &&
      afterShareNoImage?.note === beforeShareNoImage?.note
    ) {
      pass("Share without image does not mutate snap");
    } else {
      fail(
        "Share without image does not mutate snap",
        JSON.stringify({ beforeShareNoImage, afterShareNoImage })
      );
    }
  } else {
    fail("Dela visible without image", "button not found on position-only snap");
  }

  const tinyJpeg =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGfAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z";
  await page.evaluate(
    async ({ photoDataUrl }) => {
      const db = await new Promise((resolve, reject) => {
        const req = indexedDB.open("mapsnap-db", 1);
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result);
      });
      const snaps = await new Promise((resolve, reject) => {
        const tx = db.transaction("snaps", "readonly");
        const req = tx.objectStore("snaps").getAll();
        req.onerror = () => reject(req.error);
        req.onsuccess = () => resolve(req.result);
      });
      const snap = snaps[0];
      if (!snap) throw new Error("no snap to attach photo");
      snap.photoDataUrl = photoDataUrl;
      await new Promise((resolve, reject) => {
        const tx = db.transaction("snaps", "readwrite");
        tx.objectStore("snaps").put(snap);
        tx.oncomplete = () => resolve(undefined);
        tx.onerror = () => reject(tx.error);
      });
    },
    { photoDataUrl: tinyJpeg }
  );
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector("article", { timeout: 10000 });

  const saveImageBtn = page.getByRole("button", { name: "Spara bild" });
  if (await saveImageBtn.isVisible()) {
    pass("Spara bild visible with image");
    const snapsBeforeSave = await readSnapsFromIndexedDb(page);
    const before = snapsBeforeSave[0];
    await saveImageBtn.click();
    const snapsAfterSave = await readSnapsFromIndexedDb(page);
    const after = snapsAfterSave[0];
    if (
      after?.photoDataUrl === before?.photoDataUrl &&
      after?.latitude === before?.latitude &&
      after?.longitude === before?.longitude &&
      after?.createdAt === before?.createdAt &&
      after?.name === before?.name &&
      after?.note === before?.note
    ) {
      pass("Save image does not mutate snap");
    } else {
      fail("Save image does not mutate snap", JSON.stringify({ before, after }));
    }
  } else {
    fail("Spara bild visible with image", "button not found");
  }

  const shareBtn = page.getByRole("button", { name: "Dela" });
  if (await shareBtn.isVisible()) {
    pass("Dela visible with image");
    const snapsBeforeShare = await readSnapsFromIndexedDb(page);
    const beforeShare = snapsBeforeShare[0];
    await shareBtn.click();
    const snapsAfterShareClick = await readSnapsFromIndexedDb(page);
    const afterShareClick = snapsAfterShareClick[0];
    if (
      afterShareClick?.photoDataUrl === beforeShare?.photoDataUrl &&
      afterShareClick?.latitude === beforeShare?.latitude &&
      afterShareClick?.longitude === beforeShare?.longitude &&
      afterShareClick?.createdAt === beforeShare?.createdAt &&
      afterShareClick?.name === beforeShare?.name &&
      afterShareClick?.note === beforeShare?.note
    ) {
      pass("Share does not mutate snap");
    } else {
      fail("Share does not mutate snap", JSON.stringify({ beforeShare, afterShareClick }));
    }
  } else {
    fail("Dela visible with image", "button not found");
  }

  const editBtn = page.getByRole("button", { name: /Redigera/i });
  if (await editBtn.isVisible()) {
    pass("Redigera action visible");
    await editBtn.click();
    await page.getByLabel("Titel").fill("Testplats Sprint 2B");
    await page.getByLabel("Anteckning").fill("Rad ett\nRad två");
    await page.getByRole("button", { name: "Spara" }).click();
    await page.waitForSelector("text=Testplats Sprint 2B", { timeout: 5000 });
    const snapsAfterEdit = await readSnapsFromIndexedDb(page);
    const edited = snapsAfterEdit[0];
    if (
      edited?.name === "Testplats Sprint 2B" &&
      edited?.note === "Rad ett\nRad två" &&
      edited?.latitude === 59.3293
    ) {
      pass("Title and notes edit persists");
    } else {
      fail("Title and notes edit persists", JSON.stringify(edited));
    }
    if (await page.getByText("Sparad plats").count() === 0) {
      pass("Titled snap replaces fallback title");
    } else {
      fail("Titled snap replaces fallback title", "fallback still visible");
    }
  } else {
    fail("Redigera action visible", "button not found");
  }

  page.once("dialog", (d) => d.accept());
  await page.getByRole("button", { name: "Ta bort snap" }).click();
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
