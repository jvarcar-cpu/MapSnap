# Architecture Rules

## Layering

```
app/          → UI orchestration, routes
components/   → Presentational + interaction components
lib/          → Pure utilities (geo, storage, maps, id)
types/        → Shared TypeScript types
```

## Dependency Direction

- `app/` and `components/` may import from `lib/` and `types/`
- `lib/` may import from `types/` only
- `types/` imports nothing from app code
- No circular imports

## Client vs Server

- Snap CRUD is client-only for MVP 0.1
- Use `"use client"` only where browser APIs are required
- Do not add API routes unless backend is explicitly approved

## External Services

- Map links: URL strings only, generated in `lib/maps.ts`
- No embedded map SDKs
- No analytics SDKs
- No auth providers

## Storage Rules

- IndexedDB database `mapsnap-db`, object store `snaps`, version bumped on schema change
- Legacy `mapsnap.snaps.v1` localStorage is migration source only
- All storage access through `lib/storage.ts` (uses `lib/db.ts`)
- Handle missing IndexedDB, malformed JSON, empty arrays gracefully

## Geolocation Rules

- Single-shot `getCurrentPosition` on user action only
- No `watchPosition` in MVP
- Timeout and permission errors mapped to Swedish user messages in `lib/geo.ts`

## Adding Dependencies

New npm packages require justification against these rules:

1. Does it speed up capture?
2. Does it improve revisiting?
3. Is there no simpler built-in alternative?

If none apply, reject the dependency.

## PWA Rules

- Manifest lives in `app/manifest.ts`
- Keep install surface minimal — no service worker until offline strategy is defined
