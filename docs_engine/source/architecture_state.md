# Architecture State

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Geolocation | Browser Geolocation API |
| Persistence | IndexedDB (`mapsnap-db`) |
| PWA | Web App Manifest |

## Directory Layout

```
app/           — pages, layout, globals, manifest
components/    — SnapButton, PlaceCard, PlaceList, MapOpenButtons, FavoriteToggle,
               SnapEditForm, SnapActionIcons, SnapBackupPanel, LocationPermissionCard
lib/           — geo, storage, db, maps, id, snapModel, snapEdit, snapFavorite,
               saveSnapImage, shareSnap, snapSound, usePrefersReducedMotion
types/         — place.ts (Snap, SnapPlace, SnapCategory)
docs_engine/   — product governance docs (product operating system)
  source/Identity/ — Product Identity (doctrine, quotes, voice, vocabulary, writing rules)
  source/Foundation/ — PDE Foundation guardrails inherited from PIE
  source/chronicles/ — append-only institutional memory (Chronicles, registry)
  output/      — generated steering snapshots (regenerate from templates)
public/        — PWA icon
```

## Runtime Model

- Client-only data flow for MVP
- No API routes, no server components for snap CRUD
- `page.tsx` is a client component orchestrating capture + list

## External Dependencies

None beyond Next.js ecosystem. No map SDK, no analytics SDK, no auth library.

## Boundaries

| In scope | Out of scope |
|----------|--------------|
| GPS capture | Backend API |
| IndexedDB | Cloud sync |
| URL generation for maps | Embedded map SDK |
| File capture for photos | Cloud photo storage |
| PWA manifest | Push notifications (Snaptisers — Wave 3; feasibility FEAS-002) |

## Production Deployment

| Field | Value |
|-------|-------|
| **Public domain** | https://mapsnap.se — first public production domain (2026-07-11) |
| **Hosting** | Vercel |
| **Source control** | Git repository; GitHub |
| **Deployment** | Continuous deployment from GitHub |
| **Transport** | HTTPS |

Production deployment does not change the MVP client-only data model. Snaps remain local-first in the browser; no backend API was added for public launch.

Institutional record: CHRONICLE-MSN-0001 — `docs_engine/source/chronicles/MAPSNAP_CHRONICLES.md`.

## Known Constraints

- IndexedDB quota still limits large photo volume (base64 inline)
- Legacy `mapsnap.snaps.v1` in localStorage is migrated once on load; not deleted automatically
- GPS accuracy varies by device and environment
- Camera capture behavior differs across browsers
- Geolocation requires a secure context (`https://`); dev runs HTTPS via `next dev --experimental-https` (see `local_https_development.md`)
