/**
 * Focused UX check: install guidance placement beneath SNAP instruction.
 * Run: node scripts/verify-install-placement.mjs [url]
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "https://localhost:3001";
const results = [];

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
  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.evaluate(() => {
    localStorage.removeItem("mapsnap.installGuidance.dismissed.v1");
    // Clear snaps so engagement gate starts closed
  });

  // Clear IndexedDB snaps for a clean engagement gate
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      const req = indexedDB.deleteDatabase("mapsnap-db");
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
      req.onblocked = () => resolve();
    });
  });
  await page.reload({ waitUntil: "networkidle" });

  const before = await page.locator('[aria-label="Installation"]').count();
  if (before === 0) pass("Hidden before engagement");
  else fail("Hidden before engagement", `count=${before}`);

  // Headless Chromium has no native beforeinstallprompt — synthesize capability signal.
  await page.evaluate(() => {
    const event = new Event("beforeinstallprompt", { cancelable: true });
    Object.assign(event, {
      prompt: async () => {},
      userChoice: Promise.resolve({ outcome: "dismissed", platform: "test" }),
    });
    window.dispatchEvent(event);
  });

  await page.getByRole("button", { name: /SNAP/i }).click({ force: true });
  await page.waitForTimeout(900);
  const duringFeedback = await page.locator('[aria-label="Installation"]').count();
  if (duringFeedback === 0) pass("Still hidden during Snap feedback window");
  else fail("Still hidden during Snap feedback window", `count=${duringFeedback}`);

  await page.waitForTimeout(1600);
  const after = await page.locator('[aria-label="Installation"]').count();
  if (after === 1) pass("Single install guidance after engagement delay");
  else fail("Single install guidance after engagement delay", `count=${after}`);

  if (after === 1) {
    const text = await page.locator('[aria-label="Installation"]').innerText();
    const normalized = text.toLocaleLowerCase("sv-SE");
    if (
      normalized.includes("rekommenderas") &&
      text.includes("Installera MapSnap") &&
      text.includes("Snabbare start") &&
      text.includes("Bättre kamera") &&
      text.includes("Helskärm")
    ) {
      pass("Approved compact copy present");
    } else {
      fail("Approved compact copy present", text);
    }

    const placement = await page.evaluate(() => {
      const instr = [...document.querySelectorAll("p")].find((p) =>
        p.textContent?.includes("Tryck för position")
      );
      const guide = document.querySelector('[aria-label="Installation"]');
      const backup = [...document.querySelectorAll("aside,section,div")].find(
        (el) =>
          (el.textContent?.includes("Exportera") ||
            el.textContent?.includes("Importera")) &&
          el.querySelector("button")
      );
      if (!instr || !guide) return { ok: false, reason: "missing nodes" };
      const following =
        (instr.compareDocumentPosition(guide) &
          Node.DOCUMENT_POSITION_FOLLOWING) !==
        0;
      const inBackup = backup ? backup.contains(guide) : false;
      return {
        ok: following && !inBackup,
        following,
        inBackup,
        duplicates: document.querySelectorAll('[aria-label="Installation"]')
          .length,
      };
    });

    if (placement.ok && placement.duplicates === 1) {
      pass("Guidance after SNAP instruction and outside backup area");
    } else {
      fail("Guidance after SNAP instruction and outside backup area", JSON.stringify(placement));
    }

    await page.getByRole("button", { name: "Stäng installationsförslag" }).click();
    await page.waitForTimeout(350);
    const dismissed = await page.locator('[aria-label="Installation"]').count();
    if (dismissed === 0) pass("Dismiss collapses guidance");
    else fail("Dismiss collapses guidance", `count=${dismissed}`);

    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(200);
    const persisted = await page.locator('[aria-label="Installation"]').count();
    if (persisted === 0) pass("Dismissal persists across reload");
    else fail("Dismissal persists across reload", `count=${persisted}`);
  }
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length > 0 ? 1 : 0);
