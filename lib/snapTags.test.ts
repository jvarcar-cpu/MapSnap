import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeSnap } from "./snapModel.ts";
import {
  addTag,
  normalizeTags,
  parseTagInput,
  removeTag,
} from "./snapTags.ts";

describe("normalizeTags", () => {
  it("trims whitespace and drops empties", () => {
    assert.deepEqual(normalizeTags(["  fiske  ", "", "  ", "brygga"]), [
      "fiske",
      "brygga",
    ]);
  });

  it("removes case-insensitive duplicates and preserves first casing", () => {
    assert.deepEqual(normalizeTags(["Fiske", "fiske", "FISKE", "Brygga"]), [
      "Fiske",
      "Brygga",
    ]);
  });

  it("returns empty array for empty input", () => {
    assert.deepEqual(normalizeTags([]), []);
  });
});

describe("parseTagInput / addTag / removeTag", () => {
  it("parses non-empty input", () => {
    assert.equal(parseTagInput("  bad  "), "bad");
    assert.equal(parseTagInput("   "), undefined);
  });

  it("adds a tag", () => {
    assert.deepEqual(addTag(["fiske"], "brygga"), ["fiske", "brygga"]);
  });

  it("ignores blank and duplicate adds", () => {
    assert.deepEqual(addTag(["fiske"], "  "), ["fiske"]);
    assert.deepEqual(addTag(["fiske"], "FISKE"), ["fiske"]);
  });

  it("removes a tag case-insensitively", () => {
    assert.deepEqual(removeTag(["Fiske", "Brygga"], "fiske"), ["Brygga"]);
  });
});

describe("storage / import compatibility for tags", () => {
  const base = {
    id: "snap-tags",
    latitude: 59.3293,
    longitude: 18.0686,
    createdAt: "2026-08-02T10:00:00.000Z",
  };

  it("normalizes tags on load including duplicates and whitespace", () => {
    const normalized = normalizeSnap({
      ...base,
      tags: ["  fiske  ", "Fiske", "", "brygga"],
    });
    assert.ok(normalized);
    assert.deepEqual(normalized?.tags, ["fiske", "brygga"]);
  });

  it("omits tags when absent (legacy snaps)", () => {
    const normalized = normalizeSnap(base);
    assert.ok(normalized);
    assert.equal(normalized?.tags, undefined);
  });

  it("omits tags when empty after normalize", () => {
    const normalized = normalizeSnap({ ...base, tags: ["  ", ""] });
    assert.ok(normalized);
    assert.equal(normalized?.tags, undefined);
  });

  it("round-trips tags through export/import shape", () => {
    const exported = {
      ...base,
      name: "Plats",
      tags: ["fiske", "kväll"],
    };
    const imported = normalizeSnap(JSON.parse(JSON.stringify(exported)));
    assert.ok(imported);
    assert.deepEqual(imported?.tags, ["fiske", "kväll"]);
    assert.equal(imported?.name, "Plats");
  });

  it("preserves snaps without tags unchanged aside from defaults", () => {
    const legacy = {
      ...base,
      name: "Gammal",
      note: "utan taggar",
    };
    const normalized = normalizeSnap(legacy);
    assert.ok(normalized);
    assert.equal(normalized?.name, "Gammal");
    assert.equal(normalized?.note, "utan taggar");
    assert.equal(normalized?.tags, undefined);
  });
});
