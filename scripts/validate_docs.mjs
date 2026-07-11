/**
 * Docs Engine governance validation.
 * Run: node scripts/validate_docs.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SOURCE = join(ROOT, "docs_engine", "source");

const results = [];

function pass(name) {
  results.push({ name, ok: true });
  console.log(`PASS  ${name}`);
}

function fail(name, detail) {
  results.push({ name, ok: false, detail });
  console.log(`FAIL  ${name}: ${detail}`);
}

function readSource(relPath) {
  const full = join(SOURCE, relPath);
  if (!existsSync(full)) return null;
  return readFileSync(full, "utf8");
}

function mustExist(relPath, label) {
  const full = join(SOURCE, relPath);
  if (existsSync(full)) {
    pass(label ?? relPath);
    return readFileSync(full, "utf8");
  }
  fail(label ?? relPath, "file missing");
  return null;
}

function mustContain(text, pattern, label) {
  if (!text) {
    fail(label, "no content");
    return;
  }
  const found =
    pattern instanceof RegExp ? pattern.test(text) : text.includes(pattern);
  if (found) pass(label);
  else fail(label, `missing: ${pattern}`);
}

// Required authoritative files
mustExist("product_roadmap.md", "product_roadmap.md exists");
mustExist("feature_gate.md", "feature_gate.md exists");
mustExist("implementation_readiness.md", "implementation_readiness.md exists");
mustExist("baseline_reconciliation.md", "baseline_reconciliation.md exists");
mustExist("snaptiser_doctrine.md", "snaptiser_doctrine.md exists");
mustExist("image_doctrine.md", "image_doctrine.md exists");

const roadmap = readSource("product_roadmap.md");
const decisions = readSource("decisions.md");
const featureGate = readSource("feature_gate.md");
const identity = readSource("Identity/product_doctrine.md");

// Single authoritative roadmap checks
mustContain(roadmap, "Wave 1", "roadmap contains Wave 1");
mustContain(roadmap, "Wave 3", "roadmap contains Wave 3 (Snaptisers)");
mustContain(roadmap, /Snaptiser/i, "roadmap includes Snaptisers");
mustContain(roadmap, /Spara bild|Save.*image|save.*image/i, "Wave 1 save image documented");
mustContain(roadmap, /radial wave/i, "radial-wave feedback documented");
mustContain(roadmap, /Short press|short press/i, "protected short press documented");
mustContain(roadmap, /Long press|long press/i, "protected long press documented");
mustContain(roadmap, "Existing", "existing capabilities marked Existing");
mustContain(roadmap, "Google Maps", "RETURN via Google Maps documented");
mustContain(roadmap, "Deferred", "deferred/rejected decisions documented");

// Feature gate
mustContain(
  featureGate,
  "Every new feature must make a Snap more valuable",
  "Capture Golden Rule in feature gate"
);

// ADRs
mustContain(decisions, "ADR-012", "ADR-012 protected interaction");
mustContain(decisions, "ADR-014", "ADR-014 save image");
mustContain(decisions, "ADR-015", "ADR-015 Snaptisers");
mustContain(decisions, "ADR-018", "ADR-018 feedback model");

// Identity preserved + extended
mustContain(identity, "Coordinates are Truth", "Identity: coordinates principle preserved");
mustContain(identity, "Offline First", "Identity: offline first preserved");
mustContain(identity, "CAPTURE", "Identity: four pillars");
mustContain(identity, "feel lighter than it is", "Identity: product goal");

// No duplicate roadmap files
const duplicateCandidates = ["roadmap.md", "ROADMAP.md", "official_roadmap.md"];
for (const name of duplicateCandidates) {
  if (existsSync(join(SOURCE, name))) {
    fail("single authoritative roadmap", `duplicate found: ${name}`);
  } else {
    pass(`no duplicate ${name}`);
  }
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length > 0 ? 1 : 0);
