import {
  clearSnapsInDb,
  deleteSnapFromDb,
  getAllSnapsFromDb,
  isIndexedDbAvailable,
  putSnapInDb,
  putSnapsInDb,
} from "@/lib/db";
import type { SnapPlace } from "@/types/place";

const LEGACY_STORAGE_KEY = "mapsnap.snaps.v1";
export const STORAGE_UNAVAILABLE_ERROR =
  "Kunde inte spara lokalt på denna enhet.";

let migrationPromise: Promise<void> | null = null;

function parseSnaps(raw: string | null): SnapPlace[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidSnap);
  } catch {
    return [];
  }
}

function isValidSnap(item: unknown): item is SnapPlace {
  if (!item || typeof item !== "object") return false;
  const snap = item as Record<string, unknown>;
  return (
    typeof snap.id === "string" &&
    typeof snap.latitude === "number" &&
    typeof snap.longitude === "number" &&
    typeof snap.createdAt === "string"
  );
}

function sortSnapsNewestFirst(snaps: SnapPlace[]): SnapPlace[] {
  return [...snaps].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function migrateFromLocalStorage(): Promise<void> {
  if (typeof window === "undefined") return;

  let raw: string | null = null;
  try {
    raw = localStorage.getItem(LEGACY_STORAGE_KEY);
  } catch {
    return;
  }
  if (!raw) return;

  const legacySnaps = parseSnaps(raw);
  if (legacySnaps.length === 0) return;

  const existing = await getAllSnapsFromDb();
  const existingIds = new Set(existing.map((s) => s.id));
  const toMigrate = legacySnaps.filter((s) => !existingIds.has(s.id));
  if (toMigrate.length === 0) return;

  await putSnapsInDb(toMigrate);
}

function ensureMigrated(): Promise<void> {
  if (!migrationPromise) {
    migrationPromise = migrateFromLocalStorage().catch(() => {
      migrationPromise = null;
    });
  }
  return migrationPromise;
}

export async function loadSnaps(): Promise<SnapPlace[]> {
  if (typeof window === "undefined" || !isIndexedDbAvailable()) return [];
  try {
    await ensureMigrated();
    const snaps = await getAllSnapsFromDb();
    return sortSnapsNewestFirst(snaps);
  } catch {
    return [];
  }
}

export async function saveSnap(
  snap: SnapPlace
): Promise<{ ok: boolean; error?: string }> {
  if (typeof window === "undefined" || !isIndexedDbAvailable()) {
    return { ok: false, error: STORAGE_UNAVAILABLE_ERROR };
  }
  try {
    await ensureMigrated();
    await putSnapInDb(snap);
    return { ok: true };
  } catch {
    return { ok: false, error: STORAGE_UNAVAILABLE_ERROR };
  }
}

export async function deleteSnap(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  if (typeof window === "undefined" || !isIndexedDbAvailable()) {
    return { ok: false, error: STORAGE_UNAVAILABLE_ERROR };
  }
  try {
    await ensureMigrated();
    await deleteSnapFromDb(id);
    return { ok: true };
  } catch {
    return { ok: false, error: STORAGE_UNAVAILABLE_ERROR };
  }
}

export async function clearSnaps(): Promise<void> {
  if (typeof window === "undefined" || !isIndexedDbAvailable()) return;
  try {
    await clearSnapsInDb();
  } catch {
    // dev helper — silent fail
  }
}

export async function exportSnapsJson(): Promise<string> {
  const snaps = await loadSnaps();
  return JSON.stringify(snaps, null, 2);
}

export type ImportSnapsResult = {
  ok: boolean;
  error?: string;
  addedCount?: number;
};

export async function importSnapsFromJson(
  json: string
): Promise<ImportSnapsResult> {
  if (typeof window === "undefined" || !isIndexedDbAvailable()) {
    return { ok: false, error: STORAGE_UNAVAILABLE_ERROR };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, error: "Ogiltig JSON. Kontrollera att backupen är korrekt." };
  }

  if (!Array.isArray(parsed)) {
    return { ok: false, error: "Backup måste vara en JSON-array med snappar." };
  }

  const incoming = parsed.filter(isValidSnap);
  if (incoming.length === 0) {
    return {
      ok: false,
      error:
        "Inga giltiga snappar hittades. Varje snap behöver id, latitude, longitude och createdAt.",
    };
  }

  try {
    await ensureMigrated();
    const existing = await getAllSnapsFromDb();
    const existingIds = new Set(existing.map((s) => s.id));
    const toAdd = incoming.filter((s) => !existingIds.has(s.id));

    if (toAdd.length === 0) {
      return { ok: true, addedCount: 0 };
    }

    await putSnapsInDb(toAdd);
    return { ok: true, addedCount: toAdd.length };
  } catch {
    return { ok: false, error: STORAGE_UNAVAILABLE_ERROR };
  }
}
