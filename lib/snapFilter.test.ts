import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterSnapsByMode, snapMatchesFilter } from "./snapFilter.ts";

const snaps = [
  {
    id: "1",
    latitude: 59.3,
    longitude: 18.0,
    createdAt: "2026-07-14T10:00:00.000Z",
    favorite: true,
  },
  {
    id: "2",
    latitude: 59.4,
    longitude: 18.1,
    createdAt: "2026-07-14T11:00:00.000Z",
    photoDataUrl: "data:image/jpeg;base64,abc",
  },
  {
    id: "3",
    latitude: 59.5,
    longitude: 18.2,
    createdAt: "2026-07-14T12:00:00.000Z",
    favorite: true,
    photoDataUrl: "data:image/jpeg;base64,def",
  },
  {
    id: "4",
    latitude: 59.6,
    longitude: 18.3,
    createdAt: "2026-07-14T13:00:00.000Z",
  },
];

describe("snapMatchesFilter", () => {
  it("matches all snaps when mode is all", () => {
    for (const snap of snaps) {
      assert.equal(snapMatchesFilter(snap, "all"), true);
    }
  });

  it("matches only favorited snaps", () => {
    assert.equal(snapMatchesFilter(snaps[0], "favorites"), true);
    assert.equal(snapMatchesFilter(snaps[1], "favorites"), false);
    assert.equal(snapMatchesFilter(snaps[3], "favorites"), false);
  });

  it("matches only snaps with photoDataUrl", () => {
    assert.equal(snapMatchesFilter(snaps[1], "withImages"), true);
    assert.equal(snapMatchesFilter(snaps[3], "withImages"), false);
    assert.equal(snapMatchesFilter(snaps[0], "withImages"), false);
  });
});

describe("filterSnapsByMode", () => {
  it("returns all snaps when mode is all", () => {
    assert.equal(filterSnapsByMode(snaps, "all").length, 4);
  });

  it("filters favorites only", () => {
    assert.deepEqual(
      filterSnapsByMode(snaps, "favorites").map((snap) => snap.id),
      ["1", "3"]
    );
  });

  it("filters snaps with images only", () => {
    assert.deepEqual(
      filterSnapsByMode(snaps, "withImages").map((snap) => snap.id),
      ["2", "3"]
    );
  });

  it("does not mutate the input array", () => {
    const input = [...snaps];
    filterSnapsByMode(input, "favorites");
    assert.deepEqual(
      input.map((snap) => snap.id),
      ["1", "2", "3", "4"]
    );
  });
});
