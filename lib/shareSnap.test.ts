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
  it("formats full message with note", () => {
    const text = buildShareSnapText({
      name: "Fiskeläge",
      note: "Bra vindskydd",
      latitude: 57.86595,
      longitude: 19.05855,
    });

    assert.equal(
      text,
      [
        "Fiskeläge",
        "",
        "Bra vindskydd",
        "",
        "📍 SnapSpot",
        "57.86595, 19.05855",
        "",
        "🌍 Öppna i Google Maps",
        "https://www.google.com/maps/search/?api=1&query=57.86595,19.05855",
      ].join("\n")
    );
  });

  it("formats message without note", () => {
    const text = buildShareSnapText({
      latitude: 57.86595,
      longitude: 19.05855,
    });

    assert.equal(
      text,
      [
        "Sparad plats",
        "",
        "📍 SnapSpot",
        "57.86595, 19.05855",
        "",
        "🌍 Öppna i Google Maps",
        "https://www.google.com/maps/search/?api=1&query=57.86595,19.05855",
      ].join("\n")
    );
  });

  it("includes title, note, position, and map link in minimal format", () => {
    const text = buildShareSnapText({
      name: "SPRINT 2",
      note: "Test anteckning",
      latitude: 57.12345,
      longitude: 18.54321,
      photoDataUrl: "data:image/jpeg;base64,abc",
    });

    assert.ok(text.startsWith("SPRINT 2"));
    assert.ok(text.includes("Test anteckning"));
    assert.ok(text.includes("📍 SnapSpot"));
    assert.ok(text.includes("57.12345, 18.54321"));
    assert.ok(text.includes("🌍 Öppna i Google Maps"));
    assert.ok(text.includes("https://www.google.com/maps/search/?api=1&query=57.12345,18.54321"));
    assert.ok(!text.includes("Image attached."));
    assert.ok(!text.includes("Google Maps:"));
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

    assert.ok(text.startsWith("Plats\n\n📍 SnapSpot"));
    assert.ok(!text.includes("   "));
  });

  it("never includes image marker regardless of photoDataUrl", () => {
    const withPhoto = buildShareSnapText({
      name: "Plats",
      latitude: 59.3293,
      longitude: 18.0686,
      photoDataUrl: "data:image/jpeg;base64,abc",
    });
    const withoutPhoto = buildShareSnapText({
      name: "Plats",
      latitude: 59.3293,
      longitude: 18.0686,
    });

    assert.ok(!withPhoto.includes("Image attached."));
    assert.ok(!withoutPhoto.includes("Image attached."));
  });
});
