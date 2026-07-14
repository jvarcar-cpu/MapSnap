import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildShareSnapText,
  formatShareCoordinates,
} from "./shareSnap.ts";

describe("formatShareCoordinates", () => {
  it("formats latitude and longitude to five decimal places", () => {
    assert.equal(formatShareCoordinates(57.123456, 18.543219), "57.12346, 18.54322");
  });
});

describe("buildShareSnapText", () => {
  it("includes title, note, position, map link, and image marker", () => {
    const text = buildShareSnapText({
      name: "SPRINT 2",
      note: "Test anteckning",
      latitude: 57.12345,
      longitude: 18.54321,
      photoDataUrl: "data:image/jpeg;base64,abc",
    });

    assert.ok(text.startsWith("SPRINT 2"));
    assert.ok(text.includes("Test anteckning"));
    assert.ok(text.includes("Position:"));
    assert.ok(text.includes("57.12345, 18.54321"));
    assert.ok(text.includes("Google Maps:"));
    assert.ok(text.includes("https://www.google.com/maps/search/?api=1&query=57.12345,18.54321"));
    assert.ok(text.includes("Image attached."));
  });

  it("uses Sparad plats when title is absent", () => {
    const text = buildShareSnapText({
      latitude: 59.3293,
      longitude: 18.0686,
      photoDataUrl: "data:image/jpeg;base64,abc",
    });

    assert.ok(text.startsWith("Sparad plats"));
    assert.ok(!text.includes("undefined"));
  });

  it("omits note block when note is blank", () => {
    const text = buildShareSnapText({
      name: "Plats",
      note: "   ",
      latitude: 59.3293,
      longitude: 18.0686,
      photoDataUrl: "data:image/jpeg;base64,abc",
    });

    assert.ok(text.startsWith("Plats\n\nPosition:"));
    assert.ok(!text.includes("   "));
  });

  it("omits image marker without photoDataUrl", () => {
    const text = buildShareSnapText({
      name: "Plats",
      latitude: 59.3293,
      longitude: 18.0686,
    });

    assert.ok(!text.includes("Image attached."));
  });
});
