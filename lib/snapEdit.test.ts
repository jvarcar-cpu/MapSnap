import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeSnap } from "./snapModel.ts";
import {
  applySnapEdit,
  snapCardTitle,
  snapShareTitle,
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

describe("snapCardTitle", () => {
  it("shows nothing when name is absent", () => {
    assert.equal(snapCardTitle({}), "");
  });

  it("shows nothing when name is blank", () => {
    assert.equal(snapCardTitle({ name: "   " }), "");
  });

  it("shows trimmed title when present", () => {
    assert.equal(snapCardTitle({ name: "  Favoritcafé  " }), "Favoritcafé");
  });
});

describe("snapShareTitle", () => {
  it("uses MapSnap when name is absent", () => {
    assert.equal(snapShareTitle({}), "MapSnap");
  });

  it("uses MapSnap when name is blank", () => {
    assert.equal(snapShareTitle({ name: "   " }), "MapSnap");
  });

  it("shows trimmed title when present", () => {
    assert.equal(snapShareTitle({ name: "  Favoritcafé  " }), "Favoritcafé");
  });
});

describe("applySnapEdit", () => {
  it("saves title, notes, and tags", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "  Min plats  ",
      note: "  Rad ett\nRad två  ",
      tags: ["  fiske  ", "brygga"],
    });
    assert.equal(edited.name, "Min plats");
    assert.equal(edited.note, "Rad ett\nRad två");
    assert.deepEqual(edited.tags, ["fiske", "brygga"]);
  });

  it("clears title, note, and tags when empty after trim", () => {
    const withMeta = applySnapEdit(baseSnap, {
      name: "Titel",
      note: "Anteckning",
      tags: ["fiske"],
    });
    const cleared = applySnapEdit(withMeta, {
      name: "  ",
      note: "\n",
      tags: ["  ", ""],
    });
    assert.equal(cleared.name, undefined);
    assert.equal(cleared.note, undefined);
    assert.equal(cleared.tags, undefined);
    assert.equal(snapCardTitle(cleared), "");
    assert.equal(snapShareTitle(cleared), "MapSnap");
  });

  it("edits and removes individual tags", () => {
    const created = applySnapEdit(baseSnap, {
      name: "",
      note: "",
      tags: ["fiske", "brygga"],
    });
    const edited = applySnapEdit(created, {
      name: "",
      note: "",
      tags: ["fiske", "kväll"],
    });
    assert.deepEqual(edited.tags, ["fiske", "kväll"]);
    const removed = applySnapEdit(edited, {
      name: "",
      note: "",
      tags: ["kväll"],
    });
    assert.deepEqual(removed.tags, ["kväll"]);
  });

  it("dedupes tags case-insensitively", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "",
      note: "",
      tags: ["Fiske", "fiske", "FISKE"],
    });
    assert.deepEqual(edited.tags, ["Fiske"]);
  });

  it("preserves coordinates, timestamp, image, accuracy, and unknown keys", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "Ny titel",
      note: "Ny anteckning",
      tags: ["meta"],
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
    const original = { ...baseSnap, name: "Original", tags: ["old"] };
    applySnapEdit(original, { name: "Ändrad", note: "Ny", tags: ["new"] });
    assert.equal(original.name, "Original");
    assert.equal(original.note, undefined);
    assert.deepEqual(original.tags, ["old"]);
  });

  it("round-trips through normalizeSnap for persistence", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "  Sparad titel  ",
      note: "  Anteckning  ",
      tags: ["  fiske  ", "Fiske"],
    });
    const normalized = normalizeSnap(edited);
    assert.ok(normalized);
    assert.equal(normalized?.name, "Sparad titel");
    assert.equal(normalized?.note, "Anteckning");
    assert.deepEqual(normalized?.tags, ["fiske"]);
  });

  it("leaves legacy snaps without tags working", () => {
    const edited = applySnapEdit(baseSnap, {
      name: "Titel",
      note: "Anteckning",
      tags: [],
    });
    assert.equal(edited.tags, undefined);
    const normalized = normalizeSnap(edited);
    assert.ok(normalized);
    assert.equal(normalized?.tags, undefined);
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
