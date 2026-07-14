import type { Snap } from "@/types/place";

export const DB_NAME = "mapsnap-db";
export const DB_VERSION = 1;
export const STORE_NAME = "snaps";

let dbPromise: Promise<IDBDatabase> | null = null;

export function isIndexedDbAvailable(): boolean {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to open IndexedDB"));
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        dbPromise = null;
      };
      resolve(db);
    };
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

export function getDb(): Promise<IDBDatabase> {
  if (!isIndexedDbAvailable()) {
    return Promise.reject(new Error("IndexedDB not available"));
  }
  if (!dbPromise) {
    dbPromise = openDb().catch((err) => {
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}

function runTransaction<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => Promise<T> | T
): Promise<T> {
  return getDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, mode);
        const store = tx.objectStore(STORE_NAME);
        Promise.resolve(run(store)).then(resolve, reject);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      })
  );
}

export function getAllSnapsFromDb(): Promise<Snap[]> {
  return runTransaction("readonly", (store) => {
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result as Snap[]);
    });
  });
}

export function putSnapInDb(snap: Snap): Promise<void> {
  return runTransaction("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const request = store.put(snap);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  });
}

export function putSnapsInDb(snaps: Snap[]): Promise<void> {
  if (snaps.length === 0) return Promise.resolve();
  return runTransaction("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      let pending = snaps.length;
      let failed = false;
      for (const snap of snaps) {
        const request = store.put(snap);
        request.onerror = () => {
          if (!failed) {
            failed = true;
            reject(request.error);
          }
        };
        request.onsuccess = () => {
          pending -= 1;
          if (!failed && pending === 0) resolve();
        };
      }
    });
  });
}

export function deleteSnapFromDb(id: string): Promise<void> {
  return runTransaction("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  });
}

export function clearSnapsInDb(): Promise<void> {
  return runTransaction("readwrite", (store) => {
    return new Promise((resolve, reject) => {
      const request = store.clear();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  });
}
