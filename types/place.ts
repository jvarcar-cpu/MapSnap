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

export type SnapPlace = {
  id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  createdAt: string;

  name?: string;
  note?: string;
  category?: SnapCategory;
  rating?: number;

  photoDataUrl?: string;
};

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
