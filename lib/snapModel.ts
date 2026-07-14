import type { Snap, SnapCategory } from "@/types/place";
import { DEFAULT_CATEGORY, SNAP_CATEGORIES } from "@/types/place";

/** Backup export is a JSON array of Snap records — no envelope wrapper. */
export const BACKUP_FORMAT = "mapsnap-snaps-array-v1" as const;

const CATEGORY_SET = new Set<string>(SNAP_CATEGORIES);

function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function optionalNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function optionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function optionalCategory(value: unknown): SnapCategory | undefined {
  if (typeof value !== "string" || !CATEGORY_SET.has(value)) return undefined;
  return value as SnapCategory;
}

function optionalStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const tags = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  return tags.length > 0 ? tags : undefined;
}

/**
 * Minimum fields every Snap must have. Optional metadata is preserved when present.
 */
export function isValidSnap(item: unknown): item is Snap {
  if (!item || typeof item !== "object") return false;
  const snap = item as Record<string, unknown>;
  return (
    typeof snap.id === "string" &&
    typeof snap.latitude === "number" &&
    Number.isFinite(snap.latitude) &&
    typeof snap.longitude === "number" &&
    Number.isFinite(snap.longitude) &&
    typeof snap.createdAt === "string"
  );
}

/**
 * Idempotent normalization for load, save, import, and migration.
 * - Maps legacy `title` → `name`, `notes` → `note`
 * - Trims optional strings; drops empty strings
 * - Coerces known optional fields; preserves unknown keys for forward compatibility
 */
export function normalizeSnap(raw: unknown): Snap | null {
  if (!isValidSnap(raw)) return null;

  const source = raw as Record<string, unknown>;
  const normalized: Record<string, unknown> = { ...source };

  const legacyTitle = optionalString(source.title);
  const legacyNotes = optionalString(source.notes);
  const name =
    optionalString(source.name) ??
    legacyTitle;
  const note =
    optionalString(source.note) ??
    legacyNotes;

  normalized.id = source.id;
  normalized.latitude = source.latitude;
  normalized.longitude = source.longitude;
  normalized.createdAt = source.createdAt;

  const accuracy = optionalNumber(source.accuracy);
  if (accuracy != null) normalized.accuracy = accuracy;
  else delete normalized.accuracy;

  if (name != null) normalized.name = name;
  else delete normalized.name;

  if (note != null) normalized.note = note;
  else delete normalized.note;

  const category = optionalCategory(source.category) ?? DEFAULT_CATEGORY;
  normalized.category = category;

  const rating = optionalNumber(source.rating);
  if (rating != null) normalized.rating = rating;
  else delete normalized.rating;

  const photoDataUrl = optionalString(source.photoDataUrl);
  if (photoDataUrl != null) normalized.photoDataUrl = photoDataUrl;
  else delete normalized.photoDataUrl;

  const favorite = optionalBoolean(source.favorite);
  if (favorite != null) normalized.favorite = favorite;
  else delete normalized.favorite;

  const tags = optionalStringArray(source.tags);
  if (tags != null) normalized.tags = tags;
  else delete normalized.tags;

  delete normalized.title;
  delete normalized.notes;

  return normalized as Snap;
}

export function normalizeSnaps(raw: unknown[]): Snap[] {
  return raw
    .map(normalizeSnap)
    .filter((snap): snap is Snap => snap !== null);
}

export function snapsEqual(a: Snap, b: Snap): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function snapNeedsNormalization(raw: Snap): boolean {
  const normalized = normalizeSnap(raw);
  return normalized !== null && !snapsEqual(raw, normalized);
}
