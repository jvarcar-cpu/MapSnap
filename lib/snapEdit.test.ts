import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeSnap } from "./snapModel.ts";
import {
  applySnapEdit,
  snapDisplayTitle,
  trimSnapNote,
  trimSnapTitle,
} from "./snapEdit.ts";

const baseSnap = {
  id: "snap-1",
  latitude: 59.3293,
  longitude: 18.0686,
  createdAt: "2026-07-14T10:00:00.000Z",
  accuracy: 12,
  photoDataUrl: "data:image/jpeg;base64,abc",
  category: "Mat" as const,
  customFutureField: "preserve-me",
};

describe("snapDisplayTitle", () => {
  it("shows Sparad plats when name is absent", () => {
    assert.equal(snapDisplayTitle({}), "Sparad plats");
  });

  it("shows Sparad plats when name is blank", () => {
    assert.equal(snapDisplayTitle({ name: "   " }), "Sparad plats");
  });

  it("shows trimmed title when present", () => {
    assert.equal(snapDisplayTitle({ name: "  Favoritcafé  " }), "Favoritcafé");
  });
});

describe("applySnapEdit", () => {
  it("saves title and notes", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "  Min plats  ",
      note: "  Rad ett\nRad två  ",
    });
    assert.equal(edited.name, "Min plats");
    assert.equal(edited.note, "Rad ett\nRad två");
  });

  it("clears title and note when empty after trim", () => {
    const withMeta = applySnapEdit(baseSnap, {
      name: "Titel",
      note: "Anteckning",
    });
    const cleared = applySnapEdit(withMeta, { name: "  ", note: "\n" });
    assert.equal(cleared.name, undefined);
    assert.equal(cleared.note, undefined);
  });

  it("preserves coordinates, timestamp, image, accuracy, and unknown keys", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "Ny titel",
      note: "Ny anteckning",
    });
    assert.equal(edited.id, baseSnap.id);
    assert.equal(edited.latitude, baseSnap.latitude);
    assert.equal(edited.longitude, baseSnap.longitude);
    assert.equal(edited.createdAt, baseSnap.createdAt);
    assert.equal(edited.accuracy, baseSnap.accuracy);
    assert.equal(edited.photoDataUrl, baseSnap.photoDataUrl);
    assert.equal(
      (edited as typeof baseSnap).customFutureField,
      "preserve-me"
    );
  });

  it("does not mutate the original snap", () => {
    const original = { ...baseSnap, name: "Original" };
    applySnapEdit(original, { name: "Ändrad", note: "Ny" });
    assert.equal(original.name, "Original");
    assert.equal(original.note, undefined);
  });

  it("round-trips through normalizeSnap for persistence", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "  Sparad titel  ",
      note: "  Anteckning  ",
    });
    const normalized = normalizeSnap(edited);
    assert.ok(normalized);
    assert.equal(normalized?.name, "Sparad titel");
    assert.equal(normalized?.note, "Anteckning");
  });
});

describe("trim helpers", () => {
  it("enforces title max length", () => {
    const long = "a".repeat(200);
    assert.equal(trimSnapTitle(long).length, 120);
  });

  it("enforces note max length", () => {
    const long = "b".repeat(3000);
    assert.equal(trimSnapNote(long).length, 2000);
  });
});
