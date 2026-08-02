import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  filterSnapsBySearch,
  normalizeSearchQuery,
  snapMatchesSearch,
} from "./snapSearch.ts";

const snaps = [
  {
    id: "1",
    latitude: 59.3,
    longitude: 18.0,
    createdAt: "2026-07-14T10:00:00.000Z",
    name: "Bra fiske",
    note: "Kvällsfiske vid bryggan",
  },
  {
    id: "2",
    latitude: 59.4,
    longitude: 18.1,
    createdAt: "2026-07-14T11:00:00.000Z",
    name: "Fiskeplats",
  },
  {
    id: "3",
    latitude: 59.5,
    longitude: 18.2,
    createdAt: "2026-07-14T12:00:00.000Z",
    note: "Bara anteckning utan titel",
  },
  {
    id: "4",
    latitude: 59.6,
    longitude: 18.3,
    createdAt: "2026-07-14T13:00:00.000Z",
    name: "Parkering",
    note: "Nära centrum",
  },
  {
    id: "5",
    latitude: 59.7,
    longitude: 18.4,
    createdAt: "2026-08-02T10:00:00.000Z",
    name: "Utsikt",
    tags: ["solnedgång", "klippa"],
  },
];

describe("normalizeSearchQuery", () => {
  it("trims whitespace", () => {
    assert.equal(normalizeSearchQuery("  fiske  "), "fiske");
  });

  it("lowercases for case-insensitive match", () => {
    assert.equal(normalizeSearchQuery("FISKE"), "fiske");
  });
});

describe("snapMatchesSearch", () => {
  it("matches partial title", () => {
    assert.equal(snapMatchesSearch(snaps[0], "fiske"), true);
    assert.equal(snapMatchesSearch(snaps[1], "fiske"), true);
  });

  it("matches partial note", () => {
    assert.equal(snapMatchesSearch(snaps[0], "kvälls"), true);
    assert.equal(snapMatchesSearch(snaps[2], "anteckning"), true);
  });

  it("matches partial tags", () => {
    assert.equal(snapMatchesSearch(snaps[4], "solned"), true);
    assert.equal(snapMatchesSearch(snaps[4], "klippa"), true);
    assert.equal(snapMatchesSearch(snaps[0], "solned"), false);
  });

  it("matches tags case-insensitively via filterSnapsBySearch", () => {
    assert.equal(filterSnapsBySearch([snaps[4]], "KLIPPA").length, 1);
  });

  it("does not match coordinates or unrelated fields", () => {
    assert.equal(snapMatchesSearch(snaps[3], "59.6"), false);
    assert.equal(snapMatchesSearch(snaps[3], "parkering"), true);
  });

  it("returns true for empty query", () => {
    assert.equal(snapMatchesSearch(snaps[0], ""), true);
  });
});

describe("filterSnapsBySearch", () => {
  it("returns all snaps when query is empty", () => {
    assert.equal(filterSnapsBySearch(snaps, "").length, 5);
    assert.equal(filterSnapsBySearch(snaps, "   ").length, 5);
  });

  it("filters by partial case-insensitive match across title and notes", () => {
    const result = filterSnapsBySearch(snaps, "fiske");
    assert.deepEqual(
      result.map((s) => s.id),
      ["1", "2"]
    );
  });

  it("filters by tags together with title and notes", () => {
    const byTag = filterSnapsBySearch(snaps, "klippa");
    assert.deepEqual(
      byTag.map((s) => s.id),
      ["5"]
    );
  });

  it("returns empty array when nothing matches", () => {
    assert.equal(filterSnapsBySearch(snaps, "xyz").length, 0);
  });
});
