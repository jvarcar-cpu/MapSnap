import type { Snap } from "@/types/place";

/** Trim and lowercase for case-insensitive partial matching. */
export function normalizeSearchQuery(query: string): string {
  return query.trim().toLocaleLowerCase("sv-SE");
}

/**
 * Whether a Snap matches a normalized query against title (`name`), notes (`note`),
 * and tags — one combined retrieval experience.
 */
export function snapMatchesSearch(snap: Snap, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;

  const title = snap.name?.trim().toLocaleLowerCase("sv-SE") ?? "";
  const note = snap.note?.trim().toLocaleLowerCase("sv-SE") ?? "";
  if (title.includes(normalizedQuery) || note.includes(normalizedQuery)) {
    return true;
  }

  const tags = snap.tags;
  if (!tags?.length) return false;

  return tags.some((tag) =>
    tag.trim().toLocaleLowerCase("sv-SE").includes(normalizedQuery)
  );
}

/** Filter snaps by title, notes, and tags — case-insensitive, partial match, whitespace trimmed. */
export function filterSnapsBySearch(snaps: Snap[], query: string): Snap[] {
  const normalized = normalizeSearchQuery(query);
  if (!normalized) return snaps;
  return snaps.filter((snap) => snapMatchesSearch(snap, normalized));
}
