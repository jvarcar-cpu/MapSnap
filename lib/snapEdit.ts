import type { Snap } from "@/types/place";
import { normalizeTags } from "@/lib/snapTags";

/** Reasonable max lengths for post-capture enrichment (not enforced at capture). */
export const MAX_SNAP_TITLE_LENGTH = 120;
export const MAX_SNAP_NOTE_LENGTH = 2000;

export type SnapEditDraft = {
  name: string;
  note: string;
  tags: string[];
};

export function trimSnapTitle(value: string): string {
  return value.trim().slice(0, MAX_SNAP_TITLE_LENGTH);
}

export function trimSnapNote(value: string): string {
  return value.trim().slice(0, MAX_SNAP_NOTE_LENGTH);
}

/** User title for Snap card UI — empty when absent; no generic fallback. */
export function snapCardTitle(snap: { name?: string }): string {
  return snap.name?.trim() || "";
}

/** Title for Quick Share payloads — user title or product signature. */
export function snapShareTitle(snap: { name?: string }): string {
  return snap.name?.trim() || "MapSnap";
}

/**
 * Apply title/notes/tags draft to a Snap without mutating the source.
 * Empty trimmed values remove `name` / `note` / `tags`; all other fields are preserved.
 */
export function applySnapEdit(snap: Snap, draft: SnapEditDraft): Snap {
  const next: Snap = { ...snap };
  const name = trimSnapTitle(draft.name);
  const note = trimSnapNote(draft.note);
  const tags = normalizeTags(draft.tags);

  if (name) next.name = name;
  else delete next.name;

  if (note) next.note = note;
  else delete next.note;

  if (tags.length > 0) next.tags = tags;
  else delete next.tags;

  return next;
}

export function snapEditDraftFromSnap(snap: Snap): SnapEditDraft {
  return {
    name: snap.name ?? "",
    note: snap.note ?? "",
    tags: snap.tags ? normalizeTags(snap.tags) : [],
  };
}
