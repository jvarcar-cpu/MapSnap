# MapSnap Snapshot — 2026-08-02

## Status

Wave 2 Institutionally Complete 2026-08-02. Organization / Early Discover closed (CHRONICLE-MSN-0002). Desktop ✓ verified; Android / Pixel ✓ physically validated; iPhone Field Validation 0007 pending only. Active phase: Wave 3 Discovery (planning only — no implementation). MVP baseline stable at https://mapsnap.se.

## Phase

Wave 3 Discovery. Wave 2 — Organization / Early Discover Institutionally Complete. Capture Reliability (ADR-023) + Install Guidance placement (ADR-024) + Tags complete. Product Integration methodology integrated. **Next research when scoped: Order 11 Snaptiser feasibility spike.**

## What Works

- SNAP core flow: short tap saves GPS; long press (~600ms) arms then activates camera on release + GPS snap
- Long-press progress feedback; Öppna kamera fallback when camera activation fails (ADR-023)
- Progressive PWA install guidance — `beforeinstallprompt` / iOS manual / Android manual; hidden when standalone
- Install recommendation placed beneath SNAP instruction with compact benefit copy (ADR-024)
- Coordinated SNAP feedback, hero microcopy, field validated (Field Validation 0005)
- Snap model — normalization, legacy aliases, backup round-trip (Sprint 2A; ADR-019)
- Title + notes post-capture edit (Sprint 2B)
- **Tags** — create/edit/remove in Redigera; subtle card pills; search includes tags with title and notes
- Save image — "Spara bild" on photo snaps only (Sprint 3)
- Quick Share — "Dela" on every snap card; `📍 SnapSpot` + Google Maps link; image file when supported; SMS field validated (Field Validation 0006)
- Favorite — star toggle on cards; optimistic save (Sprint 5)
- MapSnap signature — permanent header mark; user title primary left; no fallback title (ADR-021)
- Snap card polish — two-column action grid; SnapSpot location label; category hidden on card
- Action icon polish — Google Maps / Waze brand SVG icons; card action SVGs (~18px); Dela Share2, Spara bild Download; subtle accent colors on icons only
- **Compact Cards Iteration 1** — banner aspect `3:1`, tighter padding/spacing, navigation/action divider
- **Search** — local title/notes/tags filter; search bar with clear button; search empty state
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

## Official Roadmap (ratified; Wave 2 Institutionally Complete)

Single source: `docs_engine/source/product_roadmap.md`

**Core Pillars:** Capture, Enrich, Share, Protect (+ Discover emerging)

| Wave | Focus |
|------|-------|
| 1 | Core value — **institutionally closed** |
| 2 | Organization / early Discover — **Institutionally Complete** (iPhone FV pending only) |
| 3 | Snaptisers / contextual Discover — **Discovery active** |
| 4 | Image + Professional Share |
| 5 | Protect |
| 6 | MapSnap-to-MapSnap Share / cloud (deferred) |

## Known Limitations

- Compact Cards Iteration 2 not started — square thumbnail, detail view (ADR-017)
- Tags exclusions remain (hierarchy, colors, AI, Discover engine, collections) — by design
- iPhone long-press / install guidance Field Validation pending (Field Validation 0007)
- Photo storage as inline base64 — quota limits (MVP-001)
- Image save per-platform field verification incomplete (FEAS-001)
- Snaptiser / geofencing — platform variance (FEAS-002)
- Protect Snaps not yet implemented — Wave 5
- Manual mobile verification still required for remaining iPhone items (OPS-002)

## Storage

- Primary: IndexedDB `mapsnap-db` / object store `snaps`
- Legacy migration: `mapsnap.snaps.v1` in localStorage
- Backup/recovery: JSON export/import
- Backend/cloud: Wave 6 deferred; Protect Wave 5 first

## Stack

Next.js 15 · TypeScript · Tailwind · Geolocation API · IndexedDB · PWA · Vercel

## Next Step

**Wave 3 Discovery** — planning only. Order 11 — Snaptiser feasibility spike (research) when explicitly scoped. See `next_task.md` and `implementation_readiness.md`. Do not begin Wave 3 implementation.

## Institutional Memory

CHRONICLE-MSN-0001 — *The First Public Presence* (2026-07-11). CHRONICLE-MSN-0002 — *Organization Becomes a Product Layer* (2026-08-02). ADR-020 — Core lifecycle pillars (2026-07-14). ADR-021 — MapSnap Signature (2026-07-14). ADR-022 — Shared Discovery Separation and Product Integration (2026-07-25). ADR-023 — Capture Reliability and Progressive PWA Install Guidance (2026-08-02). ADR-024 — Contextual Guidance Placement (2026-08-02). Wave 2 Institutional Close-Out (2026-08-02). WP-AGSE-MSP-0001 Product Integration complete (2026-07-25).
