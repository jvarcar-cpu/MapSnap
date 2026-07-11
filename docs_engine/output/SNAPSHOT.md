# MapSnap Snapshot — 2026-07-12

## Status

Post-MVP 0.1 — product roadmap ratified; MVP baseline stable at https://mapsnap.se

## Phase

Product Roadmap & Governance pass complete (2026-07-12). Next: Wave 1 when explicitly scoped.

## What Works (Existing — do not relabel as future)

- SNAP core flow: short tap saves GPS; long press (~600ms) opens camera + GPS snap
- Large tactile SNAP button: circular, green, 3D gradient, ~70% width
- IndexedDB primary storage (`mapsnap-db` / `snaps`)
- Legacy localStorage migrates on load
- JSON backup/import/export (merge by id)
- Google Maps and Waze deep links (RETURN)
- Delete removes snap from list and storage
- Empty state with first-Snap encouragement
- PWA manifest, Swedish UI, HTTPS dev workflow
- Baseline verification script passes
- Public production: https://mapsnap.se

## Official Roadmap (ratified)

Single source: `docs_engine/source/product_roadmap.md`

**Wave 1 (approved, not implemented):** usage instruction, SNAP feedback (haptic/sound/glow/pulse/radial waves), title, notes, share, **save image**, favorite, compact cards experiment.

**Wave 3:** Snaptisers (time-based MVP; proximity experimental).

**Wave 5:** Backend/cloud deferred.

## Known Limitations

- No post-capture edit UI — Wave 1
- No share, favorite, save image, Snaptisers — roadmap approved
- Photo storage as inline base64 — quota limits (MVP-001)
- Image save / notification / geofencing — platform variance (FEAS-001, FEAS-002)
- Manual mobile verification still required (OPS-002)

## Storage

- Primary: IndexedDB `mapsnap-db` / object store `snaps`
- Legacy migration: `mapsnap.snaps.v1` in localStorage
- Backup/recovery: JSON export/import
- Backend/cloud: Wave 5 deferred

## Stack

Next.js 15 · TypeScript · Tailwind · Geolocation API · IndexedDB · PWA · Vercel

## Next Step

Wave 1 — Usage instruction when scoped. See `next_task.md` and `implementation_readiness.md`.

## Institutional Memory

CHRONICLE-MSN-0001 — *The First Public Presence* (2026-07-11). MapSnap was not created by PDE.
