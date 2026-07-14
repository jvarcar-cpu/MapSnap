import type { Snap } from "@/types/place";

/** Reasonable max lengths for post-capture enrichment (not enforced at capture). */
export const MAX_SNAP_TITLE_LENGTH = 120;
export const MAX_SNAP_NOTE_LENGTH = 2000;

export function trimSnapTitle(value: string): string {
  return value.trim().slice(0, MAX_SNAP_TITLE_LENGTH);
}

export function trimSnapNote(value: string): string {
  return value.trim().slice(0, MAX_SNAP_NOTE_LENGTH);
}

export function snapDisplayTitle(snap: Pick<Snap, "name">): string {
  return snap.name?.trim() || "Sparad plats";
}

/**
 * Apply title/notes draft to a Snap without mutating the source.
 * Empty trimmed values remove `name` / `note`; all other fields are preserved.
 */
export function applySnapEdit(
  snap: Snap,
  draft: { name: string; note: string }
): Snap {
  const next: Snap = { ...snap };
  const name = trimSnapTitle(draft.name);
  const note = trimSnapNote(draft.note);

  if (name) next.name = name;
  else delete next.name;

  if (note) next.note = note;
  else delete next.note;

  return next;
}

export function snapEditDraftFromSnap(snap: Snap): { name: string; note: string } {
  return {
    name: snap.name ?? "",
    note: snap.note ?? "",
  };
}
