# MapSnap Snapshot — 2026-08-02

## Status

Wave 2 Compatibility Feature Pass complete 2026-08-02 — Capture Reliability and PWA Installation Guidance shipped (ADR-023). iPhone Field Validation pending (Field Validation 0007). Wave 2 Sprint 4 Filter shipped 2026-07-14. WP-AGSE-MSP-0001 Product Integration complete 2026-07-25 (methodology only). MVP baseline stable at https://mapsnap.se.

## Phase

Wave 2 — Organization / Early Discover. Capture Reliability + PWA install guidance complete (implementation). Sprint 4 (Filter) complete. Product Integration methodology integrated.

## What Works

- SNAP core flow: short tap saves GPS; long press (~600ms) arms then activates camera on release + GPS snap
- Long-press progress feedback; Öppna kamera fallback when camera activation fails (ADR-023)
- Progressive PWA install guidance — `beforeinstallprompt` / iOS manual / Android manual; hidden when standalone
- Coordinated SNAP feedback, hero microcopy, field validated (Field Validation 0005)
- Snap model — normalization, legacy aliases, backup round-trip (Sprint 2A; ADR-019)
- Title + notes post-capture edit (Sprint 2B)
- Save image — "Spara bild" on photo snaps only (Sprint 3)
- Quick Share — "Dela" on every snap card; `📍 SnapSpot` + Google Maps link; image file when supported; SMS field validated (Field Validation 0006)
- Favorite — star toggle on cards; optimistic save (Sprint 5)
- MapSnap signature — permanent header mark; user title primary left; no fallback title (ADR-021)
- Snap card polish — two-column action grid; SnapSpot location label; category hidden on card
- Action icon polish — Google Maps / Waze brand SVG icons; card action SVGs (~18px); Dela Share2, Spara bild Download; subtle accent colors on icons only
- **Compact Cards Iteration 1** — banner aspect `3:1`, tighter padding/spacing, navigation/action divider
- **Search** — local title/notes filter; search bar with clear button; search empty state
- **Filter** — Alla / Favoriter / Med bild segmented control; memoized filter; search → filter → sort pipeline
- **Smart Sorting** — Nyast / Äldst / Närmast segmented control; memoized sort; nearest one-time GPS
- Large tactile SNAP button: circular, green, 3D gradient, ~70% width
- IndexedDB primary storage (`mapsnap-db` / `snaps`)
- Legacy localStorage migrates on load
- JSON backup/import/export (merge by id)
- Google Maps and Waze deep links with brand icons (Return)
- Delete removes snap from list and storage
- Empty state with first-Snap encouragement
- PWA manifest, Swedish UI, HTTPS dev workflow
- Baseline verification script and unit tests pass
- Public production: https://mapsnap.se

## Official Roadmap (ratified, updated ADR-020 / ADR-023)

Single source: `docs_engine/source/product_roadmap.md`

**Core Pillars:** Capture, Enrich, Share, Protect (+ Discover emerging)

| Wave | Focus |
|------|-------|
| 1 | Core value — **institutionally closed** |
| 2 | Organization / early Discover — Sprint 1–4 shipped; **Capture Reliability + PWA install guidance shipped** (iPhone FV pending); Tags next |
| 3 | Snaptisers / contextual Discover |
| 4 | Image + Professional Share |
| 5 | Protect |
| 6 | MapSnap-to-MapSnap Share / cloud (deferred) |

## Known Limitations

- Compact Cards Iteration 2 not started — square thumbnail, detail view (ADR-017)
- No tags — Wave 2 roadmap item 4
- iPhone long-press / install guidance Field Validation pending (Field Validation 0007)
- Photo storage as inline base64 — quota limits (MVP-001)
- Image save per-platform field verification incomplete (FEAS-001)
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

Tags (lightweight tag list on snap). See `next_task.md` and `implementation_readiness.md` order 10. Do not start Tags until Feature Pass is declared.

## Institutional Memory

CHRONICLE-MSN-0001 — *The First Public Presence* (2026-07-11). ADR-020 — Core lifecycle pillars (2026-07-14). ADR-021 — MapSnap Signature (2026-07-14). ADR-022 — Shared Discovery Separation and Product Integration (2026-07-25). ADR-023 — Capture Reliability and Progressive PWA Install Guidance (2026-08-02). Wave 1 reconciliation (2026-07-14). Wave 2 Sprint 1–4 (2026-07-14). Capture Reliability Feature Pass (2026-08-02). WP-AGSE-MSP-0001 Product Integration complete (2026-07-25).
