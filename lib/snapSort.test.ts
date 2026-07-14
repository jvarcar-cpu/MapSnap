import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { haversineDistanceKm, sortSnaps } from "./snapSort.ts";

const snaps = [
  {
    id: "1",
    latitude: 59.33,
    longitude: 18.07,
    createdAt: "2026-07-14T10:00:00.000Z",
    name: "Nära centrum",
  },
  {
    id: "2",
    latitude: 59.5,
    longitude: 18.2,
    createdAt: "2026-07-14T11:00:00.000Z",
    name: "Långt bort",
  },
  {
    id: "3",
    latitude: 59.34,
    longitude: 18.08,
    createdAt: "2026-07-14T12:00:00.000Z",
    name: "Mellan",
  },
];

describe("haversineDistanceKm", () => {
  it("returns zero for identical coordinates", () => {
    assert.equal(haversineDistanceKm(59.33, 18.07, 59.33, 18.07), 0);
  });

  it("returns a positive distance for different coordinates", () => {
    const distance = haversineDistanceKm(59.33, 18.07, 59.5, 18.2);
    assert.ok(distance > 10);
  });
});

describe("sortSnaps", () => {
  it("sorts newest first by createdAt descending", () => {
    const result = sortSnaps(snaps, "newest");
    assert.deepEqual(
      result.map((snap) => snap.id),
      ["3", "2", "1"]
    );
  });

  it("sorts oldest first by createdAt ascending", () => {
    const result = sortSnaps(snaps, "oldest");
    assert.deepEqual(
      result.map((snap) => snap.id),
      ["1", "2", "3"]
    );
  });

  it("sorts nearest first when reference position is provided", () => {
    const result = sortSnaps(snaps, "nearest", {
      latitude: 59.3293,
      longitude: 18.0686,
    });
    assert.deepEqual(
      result.map((snap) => snap.id),
      ["1", "3", "2"]
    );
  });

  it("falls back to newest when nearest is requested without reference", () => {
    const result = sortSnaps(snaps, "nearest", null);
    assert.deepEqual(
      result.map((snap) => snap.id),
      ["3", "2", "1"]
    );
  });

  it("does not mutate the input array", () => {
    const input = [...snaps];
    sortSnaps(input, "oldest");
    assert.deepEqual(
      input.map((snap) => snap.id),
      ["1", "2", "3"]
    );
  });
});
