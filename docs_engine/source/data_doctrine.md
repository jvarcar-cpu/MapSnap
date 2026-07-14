# Data Doctrine

> Product context: Coordinates are Truth, Offline First — see `Identity/product_doctrine.md`  
> Authoritative Snap shape: `snap_model.md`

## Source of Truth

**Coordinates are the source of truth.**

Every saved place must have:

- `id` — unique identifier
- `latitude` / `longitude` — required
- `createdAt` — ISO timestamp

Everything else is optional metadata.

Planned optional fields (roadmap): `favorite`, `tags`, Snaptiser — see `snap_model.md` and `product_roadmap.md`.

## Product vs Persisted Names

| Product (Swedish UI) | Persisted key |
|----------------------|---------------|
| title / titel | `name` |
| notes / anteckningar | `note` |

Legacy aliases `title` and `notes` normalize to `name` / `note` on load and import (ADR-019).

## Image Principle

A Snap image is a visual memory aid, not decoration. See `image_doctrine.md`.

## Map Providers Are Output Channels

Google Maps and Waze URLs are generated at runtime from coordinates. They are never stored as primary data.

```
Google: https://www.google.com/maps/search/?api=1&query={lat},{lng}
Waze:   https://waze.com/ul?ll={lat},{lng}&navigate=yes
```

## Storage

- Primary: IndexedDB database `mapsnap-db`, object store `snaps`, key path `id`
- Legacy migration source: `mapsnap.snaps.v1` in localStorage (imported once on load, deduped by id; not deleted automatically)
- No backend, no sync, no cloud in MVP 0.1

## Photo Storage (MVP)

Photos are stored as base64 data URLs inline with the snap record. This is acceptable for MVP volume but has size limits — document as a known constraint.

## Schema Evolution

Evolution policy (ADR-019):

1. **Optional fields only** — new metadata is optional; existing Snaps remain valid without migration UI.
2. **Normalization on load** — `lib/snapModel.ts` + `lib/storage.ts` run idempotent normalization (trim strings, legacy alias mapping, default category).
3. **IndexedDB version bump** — only when object store structure must change; until then version `1` holds schemaless Snap documents.
4. **Backup format** — JSON array of Snap objects (`mapsnap-snaps-array-v1`); unknown keys preserved; see `snap_model.md` compatibility matrix.
5. **Required field changes** — forbidden without ADR, backup format version bump, and explicit migration.

## Categories

Predefined Swedish categories. Default is `Annat`. Categories classify for revisiting, not for capture gating.

## Deletion

Hard delete from IndexedDB. No soft delete or trash in MVP.
