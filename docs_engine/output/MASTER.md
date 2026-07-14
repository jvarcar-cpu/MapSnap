# MapSnap — Master Document

> Generated from docs_engine source. Snapshot template.

---

## Vision

**MapSnap is not a map app. It is the fastest way to save a place that matters and return to it when it matters.** The app captures the place before it is forgotten.

**Evolved vision:** MapSnap exists to help people capture places that matter, enrich them with context, share them when needed, and protect them for the future.

Open. SNAP. Close. **Capture first. Organize later.**

## Current Phase

**Wave 2 — Organization / Early Discover** — Sprint 4 complete 2026-07-14. Filter shipped. MVP 0.1 stable at https://mapsnap.se. Product lifecycle pillars ratified (ADR-020).

## Product Identity

Product Identity defines who MapSnap is — philosophy, voice, and language. See `Identity/identity_overview.md`.

| Document | Purpose |
|----------|---------|
| `Identity/product_doctrine.md` | Governing philosophy, pillars, golden rules |
| `Identity/product_quotes.md` | Canonical brand phrases |
| `Identity/vocabulary.md` | Official terminology |
| `Identity/voice.md` | Tone and character |
| `Identity/writing_rules.md` | Rules for user-facing copy |

**Doctrine summary:**

- MapSnap is a tool — open, SNAP, close
- **Core Pillars (lifecycle):** CAPTURE, ENRICH, SHARE, PROTECT; DISCOVER emerging
- **Experience qualities:** CAPTURE, REMEMBER, RETURN, DELIGHT (cross-cutting)
- Coordinates are truth; everything else is metadata
- Offline First. Cloud Optional. Protect without account requirement
- Golden Rule (Experience): app must never become more interesting than the place
- Golden Rule (Capture): every feature must make a Snap more valuable, never harder to create
- **MapSnap Signature:** User first. Product second. (ADR-021)

**Protected:** Identity documents must be loaded before any user-facing copy. Changes require explicit product approval.

## Roadmap

**Authoritative:** `source/product_roadmap.md`

| Wave | Focus |
|------|-------|
| 0 | Baseline reconciliation (complete) |
| 1 | Core value: UX polish, title, notes, save image, Quick Share, favorite, signature, action icons — **institutionally closed** |
| 2 | Organization / early Discover — **Sprint 1:** Compact Cards Iteration 1 shipped; **Sprint 2:** Search shipped; **Sprint 3:** Smart Sorting shipped; **Sprint 4:** Filter shipped |
| 3 | Snaptisers / contextual Discover |
| 4 | Image + Professional Share |
| 5 | Protect |
| 6 | MapSnap-to-MapSnap Share / cloud (deferred) |

Feature gate: `source/feature_gate.md` · Readiness: `source/implementation_readiness.md`

## Guardrails

1. MapSnap is a tool, not a map app, note app, or travel planner
2. Everything begins with SNAP — capture first, organize later
3. Coordinates are the source of truth; map providers are output channels only
4. Offline First. Cloud Optional. IndexedDB primary; Protect before cloud maturity
5. Thumb first — one-thumb usability outdoors
6. Protected SNAP contract: short press = position; long press = position + image (ADR-012)
7. No silent or continuous location tracking
8. Behaviour and visual regressions are bugs — both checklists required every task
9. One pass type at a time: Bug Fix, Feature, UX, Docs, Storage, Stabilization
10. No implementation before generated steering docs are current
11. Feature Gate mandatory — strengthen Core Pillars without weakening others

## Architecture Summary

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Geolocation | Browser Geolocation API |
| Persistence | IndexedDB (`mapsnap-db` / `snaps`) |
| PWA | Web App Manifest |

Client-only data flow. Production: Vercel, https://mapsnap.se. docs_engine is the product operating system.

Key libs: `snapModel`, `snapEdit`, `snapFavorite`, `saveSnapImage`, `shareSnap`, `snapSearch`, `snapFilter`, `snapSort`. Key components: `PlaceCard`, `MapOpenButtons`, `FavoriteToggle`, `SnapSearchBar`, `SnapFilterBar`, `SnapSortBar`, `SnapActionIcons`.

## Current Baseline (MVP 0.1 + Wave 1)

- Short tap → GPS → IndexedDB; long press (~600ms) → image + GPS
- Hero instruction + coordinated SNAP feedback — **shipped**
- Snap model normalization — **shipped**
- Title + notes edit, save image, Quick Share (every card), favorite — **shipped**
- MapSnap signature, SnapSpot label, two-column action grid, brand map icons, SVG card actions — **shipped**
- Compact Cards Iteration 1 — reduced-height banner, action-group divider — **shipped**
- Search — local title/notes filter, search bar, search empty state — **shipped**
- Filter — Alla / Favoriter / Med bild, memoized filter, search → filter → sort — **shipped**
- Smart Sorting — Nyast / Äldst / Närmast, memoized sort, nearest one-time GPS — **shipped**
- Delete, empty state, Google Maps, Waze, backup/import — **existing**
- Wave 1 institutionally closed; Wave 2 Sprint 1–4 complete

## Recent Decisions

- **ADR-012:** Protected SNAP interaction contract
- **ADR-014:** Save/download Snap image
- **ADR-015:** Snaptisers strategic capability
- **ADR-016:** Backend deferral (now Wave 6)
- **ADR-018:** Coordinated feedback with radial waves
- **ADR-019:** Snap model evolution policy
- **ADR-020:** Core lifecycle pillars + experience model; Share product track; Protect before cloud
- **ADR-017:** Compact Card Experiment — Iteration 1 shipped; Iteration 2 (thumbnail + detail view) planned
- **ADR-021:** MapSnap Signature — User first. Product second.

## Last Updated

2026-07-14 — Wave 2 Sprint 4 Filter
