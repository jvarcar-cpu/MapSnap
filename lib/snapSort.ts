import type { Snap } from "@/types/place";

export type SnapSortMode = "newest" | "oldest" | "nearest";

export type SortReferencePosition = {
  latitude: number;
  longitude: number;
};

const EARTH_RADIUS_KM = 6371;

/** Great-circle distance in kilometres between two WGS-84 coordinates. */
export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Sort snaps for list display — pure function, does not mutate input order source. */
export function sortSnaps(
  snaps: Snap[],
  mode: SnapSortMode,
  reference?: SortReferencePosition | null
): Snap[] {
  const sorted = [...snaps];

  if (mode === "newest") {
    return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  if (mode === "oldest") {
    return sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }

  if (!reference) {
    return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  return sorted.sort((a, b) => {
    const distA = haversineDistanceKm(
      reference.latitude,
      reference.longitude,
      a.latitude,
      a.longitude
    );
    const distB = haversineDistanceKm(
      reference.latitude,
      reference.longitude,
      b.latitude,
      b.longitude
    );
    if (distA !== distB) return distA - distB;
    return b.createdAt.localeCompare(a.createdAt);
  });
}
