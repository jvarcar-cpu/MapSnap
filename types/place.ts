export type SnapCategory =
  | "Bad"
  | "Utsikt"
  | "Taxi"
  | "Parkering"
  | "Mat"
  | "Natur"
  | "Foto"
  | "Camping"
  | "Annat";

/**
 * Authoritative persisted Snap record.
 * Product "title" is stored as `name`; product "notes" as `note`.
 */
export type Snap = {
  id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  createdAt: string;

  /** User-defined title (Swedish UI: titel). Empty → fallback "Sparad plats". */
  name?: string;
  /** User-defined notes (Swedish UI: anteckningar). */
  note?: string;
  category?: SnapCategory;
  rating?: number;

  photoDataUrl?: string;

  /** Wave 1+ — optional; no UI until scoped. */
  favorite?: boolean;
  /** Wave 2+ — optional tag labels; no UI until scoped. */
  tags?: string[];
};

/** @deprecated Prefer `Snap` — kept for existing imports. */
export type SnapPlace = Snap;

export const DEFAULT_CATEGORY: SnapCategory = "Annat";

export const SNAP_CATEGORIES: SnapCategory[] = [
  "Bad",
  "Utsikt",
  "Taxi",
  "Parkering",
  "Mat",
  "Natur",
  "Foto",
  "Camping",
  "Annat",
];
