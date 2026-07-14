import type { Snap } from "@/types/place";

export type SnapFilterMode = "all" | "favorites" | "withImages";

/** Whether a Snap matches the active list filter mode. */
export function snapMatchesFilter(snap: Snap, mode: SnapFilterMode): boolean {
  if (mode === "all") return true;
  if (mode === "favorites") return snap.favorite === true;
  if (mode === "withImages") return Boolean(snap.photoDataUrl);
  return true;
}

/** Filter snaps by list filter mode — pure function, does not mutate input. */
export function filterSnapsByMode(snaps: Snap[], mode: SnapFilterMode): Snap[] {
  if (mode === "all") return snaps;
  return snaps.filter((snap) => snapMatchesFilter(snap, mode));
}
