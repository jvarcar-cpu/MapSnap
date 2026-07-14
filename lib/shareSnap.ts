/**
 * Share a complete Snap via the platform native Share API.
 * Payload is derived at runtime — never mutates the Snap. See ADR-001, snap_model.md.
 */

import { googleMapsUrl } from "@/lib/maps";
import { snapDisplayTitle } from "@/lib/snapEdit";
import type { Snap } from "@/types/place";
import { dataUrlToBlob, snapImageFilename } from "@/lib/saveSnapImage";

export function formatShareCoordinates(latitude: number, longitude: number): string {
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

/** Plain-text body for native share (title line included per product format). */
export function buildShareSnapText(snap: Pick<Snap, "name" | "note" | "latitude" | "longitude" | "photoDataUrl">): string {
  const lines: string[] = [snapDisplayTitle(snap)];

  const note = snap.note?.trim();
  if (note) {
    lines.push("", note);
  }

  lines.push(
    "",
    "📍 SnapSpot",
    formatShareCoordinates(snap.latitude, snap.longitude),
    "",
    "🌍 Öppna i Google Maps",
    googleMapsUrl(snap.latitude, snap.longitude)
  );

  return lines.join("\n");
}

export function isNativeShareAvailable(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export type ShareSnapResult =
  | { ok: true }
  | { ok: false; reason: "unavailable" | "cancelled" | "failed" };

export async function shareSnap(snap: Snap): Promise<ShareSnapResult> {
  if (!isNativeShareAvailable()) {
    return { ok: false, reason: "unavailable" };
  }

  const title = snapDisplayTitle(snap);
  const text = buildShareSnapText(snap);
  const shareData: ShareData = { title, text };

  if (snap.photoDataUrl) {
    const blob = dataUrlToBlob(snap.photoDataUrl);
    if (blob) {
      const file = new File([blob], snapImageFilename(snap.createdAt), {
        type: blob.type || "image/jpeg",
      });
      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        shareData.files = [file];
      }
    }
  }

  if (navigator.canShare && !navigator.canShare(shareData)) {
    return { ok: false, reason: "unavailable" };
  }

  try {
    await navigator.share(shareData);
    return { ok: true };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, reason: "cancelled" };
    }
    return { ok: false, reason: "failed" };
  }
}
