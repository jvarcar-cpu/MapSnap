import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  dataUrlToBlob,
  snapImageFilename,
} from "./saveSnapImage.ts";

const TINY_JPEG =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAGfAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Bf//Z";

describe("snapImageFilename", () => {
  it("formats createdAt as MapSnap_YYYY-MM-DD_HH-mm-ss.jpg", () => {
    const iso = "2026-07-14T15:30:45.000Z";
    const date = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    const expected = `MapSnap_${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}.jpg`;
    assert.equal(snapImageFilename(iso), expected);
  });

  it("falls back to MapSnap.jpg when timestamp is missing", () => {
    assert.equal(snapImageFilename(), "MapSnap.jpg");
  });

  it("falls back to MapSnap.jpg when timestamp is invalid", () => {
    assert.equal(snapImageFilename("not-a-date"), "MapSnap.jpg");
  });
});

describe("dataUrlToBlob", () => {
  it("converts a base64 JPEG data URL to a blob", () => {
    const blob = dataUrlToBlob(TINY_JPEG);
    assert.ok(blob);
    assert.equal(blob?.type, "image/jpeg");
    assert.ok((blob?.size ?? 0) > 0);
  });

  it("returns null for invalid data URLs", () => {
    assert.equal(dataUrlToBlob("not-a-data-url"), null);
    assert.equal(dataUrlToBlob("data:image/jpeg;base64,!!!"), null);
  });
});
