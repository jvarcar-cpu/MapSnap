# MapSnap Snapshot — 2026-07-14

## Status

Wave 1 Sprint 5 complete. MVP baseline stable at https://mapsnap.se.

## Phase

Wave 1 — Core Value. Sprint 5 (Favorite) closed 2026-07-14. Next: Compact Cards when scoped.

## What Works

- SNAP core flow: short tap saves GPS; long press (~600ms) opens camera + GPS snap
- Coordinated SNAP feedback, hero microcopy, field validated (Field Validation 0005)
- Title + notes post-capture edit (Sprint 2B)
- Save image — "Spara bild" (Sprint 3)
- Quick Share — "Dela" on every snap card; text + Google Maps link; image file when snap has photo; SMS field validated (Field Validation 0006)
- Favorite — star toggle on cards; optimistic save (Sprint 5)
- Large tactile SNAP button: circular, green, 3D gradient, ~70% width
- IndexedDB primary storage (`mapsnap-db` / `snaps`)
- Legacy localStorage migrates on load
- JSON backup/import/export (merge by id)
- Google Maps and Waze deep links (Return)
- Delete removes snap from list and storage
- Empty state with first-Snap encouragement
- PWA manifest, Swedish UI, HTTPS dev workflow
- Baseline verification script passes
- Public production: https://mapsnap.se

## Official Roadmap (ratified, updated ADR-020)

Single source: `docs_engine/source/product_roadmap.md`

**Core Pillars:** Capture, Enrich, Share, Protect (+ Discover emerging)

| Wave | Focus |
|------|-------|
| 1 | Core value — compact cards remaining |
| 2 | Organization / early Discover |
| 3 | Snaptisers / contextual Discover |
| 4 | Image + Professional Share |
| 5 | Protect |
| 6 | MapSnap-to-MapSnap Share / cloud (deferred) |

## Known Limitations

- No filter, search, tags — roadmap approved
- Photo storage as inline base64 — quota limits (MVP-001)
- Image save per-platform verification incomplete (FEAS-001)
- Snaptiser / geofencing — platform variance (FEAS-002)
- Protect Snaps not yet implemented — Wave 5
- Manual mobile verification still required (OPS-002)

## Storage

- Primary: IndexedDB `mapsnap-db` / object store `snaps`
- Legacy migration: `mapsnap.snaps.v1` in localStorage
- Backup/recovery: JSON export/import
- Backend/cloud: Wave 6 deferred; Protect Wave 5 first

## Stack

Next.js 15 · TypeScript · Tailwind · Geolocation API · IndexedDB · PWA · Vercel

## Next Step

Wave 1 — Compact Cards when scoped. See `next_task.md` and `implementation_readiness.md`.

## Institutional Memory

CHRONICLE-MSN-0001 — *The First Public Presence* (2026-07-11). ADR-020 — Core lifecycle pillars (2026-07-14).
