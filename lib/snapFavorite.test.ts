import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeSnap } from "./snapModel.ts";
import { applySnapFavorite, toggleSnapFavorite } from "./snapFavorite.ts";

const baseSnap = {
  id: "snap-1",
  latitude: 59.3293,
  longitude: 18.0686,
  createdAt: "2026-07-14T10:00:00.000Z",
  name: "Testplats",
  note: "Anteckning",
  accuracy: 12,
  photoDataUrl: "data:image/jpeg;base64,abc",
  category: "Mat" as const,
};

describe("applySnapFavorite", () => {
  it("sets favorite true", () => {
    const favorited = applySnapFavorite(baseSnap, true);
    assert.equal(favorited.favorite, true);
  });

  it("removes favorite field when false", () => {
    const favorited = applySnapFavorite(baseSnap, true);
    const cleared = applySnapFavorite(favorited, false);
    assert.equal(cleared.favorite, undefined);
    assert.equal("favorite" in cleared, false);
  });

  it("preserves all other fields", () => {
    const favorited = applySnapFavorite(baseSnap, true);
    assert.equal(favorited.id, baseSnap.id);
    assert.equal(favorited.latitude, baseSnap.latitude);
    assert.equal(favorited.longitude, baseSnap.longitude);
    assert.equal(favorited.createdAt, baseSnap.createdAt);
    assert.equal(favorited.name, baseSnap.name);
    assert.equal(favorited.note, baseSnap.note);
    assert.equal(favorited.accuracy, baseSnap.accuracy);
    assert.equal(favorited.photoDataUrl, baseSnap.photoDataUrl);
    assert.equal(favorited.category, baseSnap.category);
  });

  it("does not mutate the original snap", () => {
    const original = { ...baseSnap };
    applySnapFavorite(original, true);
    assert.equal(original.favorite, undefined);
  });

  it("round-trips through normalizeSnap for persistence", () => {
    const favorited = applySnapFavorite(baseSnap, true);
    const normalized = normalizeSnap(favorited);
    assert.ok(normalized);
    assert.equal(normalized?.favorite, true);

    const cleared = applySnapFavorite(baseSnap, false);
    const normalizedCleared = normalizeSnap(cleared);
    assert.ok(normalizedCleared);
    assert.equal(normalizedCleared?.favorite, undefined);
    assert.equal("favorite" in (normalizedCleared ?? {}), false);
  });

  it("survives JSON backup round-trip", () => {
    const favorited = applySnapFavorite(baseSnap, true);
    const exported = JSON.parse(JSON.stringify(favorited));
    const imported = normalizeSnap(exported);
    assert.ok(imported);
    assert.equal(imported?.favorite, true);
    assert.equal(imported?.name, baseSnap.name);
  });
});

describe("toggleSnapFavorite", () => {
  it("toggles from unset to true", () => {
    const toggled = toggleSnapFavorite(baseSnap);
    assert.equal(toggled.favorite, true);
  });

  it("toggles from true to removed", () => {
    const favorited = applySnapFavorite(baseSnap, true);
    const toggled = toggleSnapFavorite(favorited);
    assert.equal(toggled.favorite, undefined);
  });
});
