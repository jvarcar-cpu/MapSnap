# Snap Model

> **Authoritative persisted Snap record.** Code: `types/place.ts` (`Snap`), normalization: `lib/snapModel.ts`, persistence: `lib/storage.ts` + `lib/db.ts`.  
> Product vocabulary: `Identity/vocabulary.md` · Storage doctrine: `data_doctrine.md`

**Ratified:** 2026-07-14 (Wave 1 Sprint 2A)

---

## Purpose

Single definition of what a Snap is on disk, in IndexedDB, and in JSON backup. Sprint 2B (title + notes UI) and later waves extend this model — they do not replace it.

---

## Required Fields

| Field | Type | Rule |
|-------|------|------|
| `id` | string | Unique; merge key for import |
| `latitude` | number | Finite; source of truth |
| `longitude` | number | Finite; source of truth |
| `createdAt` | string | ISO 8601 timestamp |

---

## Optional Fields (current)

| Field | Product term | Type | Notes |
|-------|--------------|------|-------|
| `name` | **title** | string | Display fallback: "Sparad plats" when absent or blank |
| `note` | **notes** | string | Multi-line allowed; never required |
| `category` | kategori | enum | Default `Annat` on capture |
| `rating` | — | number | Reserved; no UI |
| `accuracy` | — | number | GPS accuracy in metres |
| `photoDataUrl` | bild | string | Base64 data URL (ADR-004) |
| `favorite` | favorit | boolean | Schema-ready; UI in later sprint |
| `tags` | taggar | string[] | Schema-ready; UI in Wave 2 |

**Naming rule:** User-facing copy says *titel* / *anteckningar*. Persisted keys remain `name` and `note` for backward compatibility with all existing backups and IndexedDB records.

---

## Legacy Aliases (normalized on load)

| Legacy key | Maps to | When |
|------------|---------|------|
| `title` | `name` | Import, load, save — then `title` removed |
| `notes` | `note` | Import, load, save — then `notes` removed |

Normalization is automatic, idempotent, and requires no user action.

---

## Future Fields (not yet in type enforcement)

Reserved for later waves without breaking current records:

- **Snaptiser** — see `snaptiser_doctrine.md`; shape TBD at Snaptiser MVP
- **Image metadata** — compression, captions (`image_doctrine.md`)
- **Share payload** — derived at runtime, not stored (ADR-001)

Unknown keys on imported or stored records are **preserved** through round-trip unless explicitly normalized away (legacy aliases only).

---

## Validation

Minimum gate (`isValidSnap` in `lib/snapModel.ts`):

- Object with string `id`, finite number `latitude` / `longitude`, string `createdAt`

Invalid array entries are skipped on import; import fails only when zero valid snaps remain.

Full normalization (`normalizeSnap`) runs on load, save, import, and one-time DB migration.

---

## Backup Format

**Format ID:** `mapsnap-snaps-array-v1` (constant in `lib/snapModel.ts`)

```
[
  {
    "id": "…",
    "latitude": 59.3293,
    "longitude": 18.0686,
    "createdAt": "2026-07-14T10:00:00.000Z",
    "name": "Favoritcafé",
    "note": "Bästa flat white",
    "category": "Mat",
    "photoDataUrl": "data:image/jpeg;base64,…"
  }
]
```

### Compatibility Matrix

| Direction | Behaviour |
|-----------|-----------|
| Old export → new app | ✅ Required fields only; optional fields absent; legacy aliases normalized |
| New export → older app | ✅ Older app ignores unknown keys; required fields unchanged |
| New export → older app (needs new **required** field) | ❌ Never without ADR + format version bump |
| Partial invalid backup | ⚠️ Valid snaps imported; invalid entries skipped |

**Rule:** New optional fields may be added without a backup format version bump. New **required** fields or envelope structure changes require ADR, migration, and format version increment.

---

## IndexedDB

| Property | Value |
|----------|--------|
| Database | `mapsnap-db` |
| Version | `1` (unchanged — schemaless object store) |
| Store | `snaps`, key path `id` |

Records are full Snap JSON documents. Schema evolution uses optional fields + normalization migration in `lib/storage.ts`, not IndexedDB structural upgrades, until a breaking store change is unavoidable.

Legacy `mapsnap.snaps.v1` localStorage migrates once on load (dedupe by `id`).

---

## Implementation Notes (Sprint 2B)

- Edit UI should read/write `name` and `note` only — do not introduce parallel `title` / `notes` keys in new code.
- After edit, call `saveSnap(normalizeSnap(updated))` or rely on `saveSnap` normalization.
- Card display: `snapDisplayTitle(snap)` → `name?.trim() || "Sparad plats"` (`lib/snapEdit.ts`, `PlaceCard.tsx`).
- List notes: `line-clamp-3` with `whitespace-pre-line`; full text in edit form.

---

## Related

| Document | Purpose |
|----------|---------|
| `data_doctrine.md` | Storage principles |
| `implementation_readiness.md` | Sprint 2A / 2B sequence |
| `decisions.md` ADR-019 | Snap model evolution policy |
