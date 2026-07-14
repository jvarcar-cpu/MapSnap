import type { Snap } from "@/types/place";

/**
 * Apply favorite state to a Snap without mutating the source.
 * Persists `favorite: true` only; removes the field when false.
 * All other fields are preserved.
 */
export function applySnapFavorite(snap: Snap, favorite: boolean): Snap {
  const next: Snap = { ...snap };

  if (favorite) next.favorite = true;
  else delete next.favorite;

  return next;
}

export function toggleSnapFavorite(snap: Snap): Snap {
  return applySnapFavorite(snap, !snap.favorite);
}
