/**
 * Tag normalization for Wave 2 Tags Feature Pass.
 * Trims whitespace, drops empties, dedupes case-insensitively (sv-SE),
 * preserves first-seen casing (user intent).
 */

/** Soft UX recommendation — not a storage limit. */
export const RECOMMENDED_TAG_COUNT = 5;

export function normalizeTags(tags: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const raw of tags) {
    if (typeof raw !== "string") continue;
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLocaleLowerCase("sv-SE");
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(trimmed);
  }

  return result;
}

/** Parse a single draft input into zero or one normalized tag label. */
export function parseTagInput(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Add a tag from free-form input. Returns the previous list when empty or duplicate.
 */
export function addTag(tags: readonly string[], input: string): string[] {
  const label = parseTagInput(input);
  if (!label) return normalizeTags(tags);
  return normalizeTags([...tags, label]);
}

export function removeTag(tags: readonly string[], tag: string): string[] {
  const key = tag.trim().toLocaleLowerCase("sv-SE");
  return normalizeTags(tags).filter(
    (item) => item.toLocaleLowerCase("sv-SE") !== key
  );
}
