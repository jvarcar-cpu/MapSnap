# MapSnap — Agent Instructions

## Project

MapSnap is a local-first PWA for instant GPS place capture. Swedish UI. No backend.

**Status:** MVP 0.1 stable. Wave 1 institutionally closed 2026-07-14. Wave 2 Sprint 1 Compact Cards Iteration 1 shipped. Public: https://mapsnap.se.

## Current Product Status

| Area | State |
|------|-------|
| MVP 0.1 baseline | Locked — short/long-press SNAP contract unchanged (ADR-012) |
| Wave 1 shipped | Capture polish, Snap model, title + notes, save image, Quick Share, favorite, MapSnap signature, snap card + action icon polish |
| Wave 1 institutional | Closed — reconciliation verified 2026-07-14 |
| Wave 2 Sprint 1 | Compact Cards Iteration 1 shipped — banner compression, action-group divider |
| Next implementation | **Compact Cards Iteration 2** (thumbnail + detail view) or Wave 2 Search |
| Backend / cloud | Deferred — Wave 6 (ADR-016) |
| Production | Vercel · https://mapsnap.se · client-only data model |

## Current Phase

**Wave 2 — Organization / Early Discover** — Sprint 1 complete. Compact Cards Iteration 1 shipped.

**Next sprint (when scoped):** Compact Cards Iteration 2 or Wave 2 Search per `implementation_readiness.md` and `next_task.md`.

## Architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Geolocation | Browser Geolocation API |
| Persistence | IndexedDB (`mapsnap-db` / `snaps`) |
| PWA | Web App Manifest |

Client-only data flow. No API routes. `app/page.tsx` orchestrates capture + list. Full detail: `docs_engine/source/architecture_state.md`.

### Key Paths

```
app/page.tsx              — main capture screen
components/SnapButton.tsx — tap / long-press
components/PlaceCard.tsx  — snap card, actions, signature
components/PlaceList.tsx  — snap list
lib/storage.ts            — IndexedDB CRUD (async)
lib/db.ts                 — IndexedDB open + transactions
lib/geo.ts                — Geolocation API
lib/maps.ts               — URL generation
lib/snapModel.ts          — Snap validation + normalization
lib/snapEdit.ts           — title/notes helpers
lib/snapFavorite.ts       — favorite toggle
lib/saveSnapImage.ts      — device image copy
lib/shareSnap.ts          — Quick Share payload
types/place.ts            — Snap / SnapPlace schema
docs_engine/source/       — authoritative product knowledge
docs_engine/output/       — generated steering snapshots (must be current)
docs_engine/source/chronicles/ — append-only institutional memory
```

## Snap Model

Authoritative type: `Snap` in `types/place.ts`. Normalization: `lib/snapModel.ts` — automatic, idempotent, on load/save/import.

| Field | Product term | Notes |
|-------|--------------|-------|
| `id`, `latitude`, `longitude`, `createdAt` | — | Required |
| `name` | title | Optional; card shows user title only when set |
| `note` | notes | Optional; post-capture edit |
| `photoDataUrl` | bild | From long-press camera capture |
| `favorite` | favorit | `true` only when starred; field removed when false |
| `category` | kategori | Default `Annat` on capture; metadata only — not shown on card |
| `tags` | taggar | Schema-ready; UI in Wave 2 |

Legacy aliases `title` → `name`, `notes` → `note` normalize on load. IndexedDB version `1` unchanged. Full spec: `docs_engine/source/snap_model.md`.

## Capture Flow

Protected SNAP contract (ADR-012):

| Gesture | Behaviour |
|---------|-----------|
| Short tap | GPS capture → `saveSnap()` → IndexedDB → list update → "Snap sparad" toast |
| Long press (~600ms) | Camera/file input (`capture="environment"`) → `photoDataUrl` + GPS → save |

No forms or menus before save. Coordinated feedback: compress, haptic, sound, glow, pulse, radial waves (ADR-018). Hero instruction: *"Tryck för position · Håll inne för position + bild"*.

## Enrich Features (Wave 1 — shipped)

| Feature | Behaviour | Code |
|---------|-----------|------|
| Title + notes | Post-capture "Redigera" — optional `name` / `note`; Swedish labels | `SnapEditForm`, `lib/snapEdit.ts` |
| Favorite | Star toggle upper-right on card; optimistic `saveSnap()` | `FavoriteToggle`, `lib/snapFavorite.ts` |
| MapSnap signature | Permanent "MapSnap" upper-right on every card; user title left only when set; no fallback title (ADR-021) | `PlaceCard.tsx`, `snapCardTitle()` |
| SnapSpot | Canonical location label `📍 SnapSpot` on card; category hidden on card | `PlaceCard.tsx`, `vocabulary.md` |

## Share Features (Wave 1 — shipped)

| Feature | Behaviour | Code |
|---------|-----------|------|
| Google Maps | Deep link with brand icon | `MapOpenButtons.tsx`, `lib/maps.ts` |
| Waze | Deep link with brand icon | `MapOpenButtons.tsx`, `lib/maps.ts` |
| Quick Share ("Dela") | Native Web Share on every card — title, notes, `📍 SnapSpot`, coordinates, Google Maps URL; image file when supported | `lib/shareSnap.ts` |

Share is read-only — never mutates Snap. Unavailable browsers: "Delning stöds inte i den här webbläsaren".

## Save Image (Wave 1 — shipped)

"Spara bild" on cards with `photoDataUrl` only. Copy of stored image — never mutates Snap. Filename: `MapSnap_YYYY-MM-DD_HH-mm-ss.jpg`. Blob download (desktop/Android); Web Share with file (iOS). Code: `lib/saveSnapImage.ts`.

## SnapSpot Terminology

**SnapSpot** is the canonical coordinate/location label on Snap cards and in Quick Share text (`📍 SnapSpot`). It is not a title or card fallback. Category remains stored metadata for future Discover — not shown on the card. See `docs_engine/source/Identity/vocabulary.md`.

## Docs Engine Workflow

docs_engine is MapSnap's product operating system — not optional documentation.

1. **Source is authoritative** — edit `docs_engine/source/` and `docs_engine/templates/`
2. **Regenerate output** — update `docs_engine/output/` (`MASTER.md`, `AGENTS.md`, `SNAPSHOT.md`, `CURRENT_TASK.md`, `CURRENT_BASELINE.md`, `KNOWN_ISSUES.md`)
3. **Validate** — `node scripts/validate_docs.mjs`
4. **Verify baseline** — `node scripts/verify-baseline.mjs [url]` against dev server
5. **No implementation** before generated steering docs are current

Pass types (one at a time): Bug Fix, Feature, UX, Docs, Storage, Stabilization. Full rules: `docs_engine/rules/implementation_rules.md`. Overview: `docs_engine/source/docs_engine_overview.md`.

## Before You Code

1. Read `docs_engine/output/CURRENT_BASELINE.md`, `CURRENT_TASK.md`, and this file
2. Read `docs_engine/source/Identity/product_doctrine.md`
3. Read `docs_engine/rules/implementation_rules.md`
4. Read `docs_engine/source/capture_doctrine.md`
5. Read `docs_engine/source/data_doctrine.md`
6. Read `docs_engine/source/ux_doctrine.md` (Approved UI Baseline)
7. Check `docs_engine/source/current_phase.md` for scope
8. Read `docs_engine/source/product_roadmap.md` and `feature_gate.md` before any feature work
9. Review `docs_engine/source/baseline_reconciliation.md` — Wave 1 section is authoritative current state

## Hard Rules

- Never add backend, auth, database, or map SDK without explicit approval (Wave 6 deferred — ADR-016)
- Never require forms before save
- Never alter protected SNAP contract: short press = position; long press = position + image (ADR-012)
- Run Feature Gate (`feature_gate.md`) before implementing any new feature — must strengthen Core Pillars
- Never store Google/Waze URLs as primary data
- Never use continuous geolocation tracking
- Keep capture to one tap
- One pass type at a time — Bug Fix, Feature, UX, Docs, Storage, Stabilization (see `implementation_rules.md`)
- Behaviour and visual regressions are bugs — complete the regression checklist every task
- No implementation before generated steering docs are current
- MapSnap was not created by PDE — preserve pre-PDE lineage in institutional memory

## After Changes

- Update relevant docs_engine source files
- Add ADR to `decisions.md` if architectural
- Update `changelog.md` for user-visible changes
- Append Chronicle entries for significant historical milestones (never rewrite existing entries)
- Complete regression checklist from `implementation_rules.md`
- Run `node scripts/validate_docs.mjs`
- Regenerate `docs_engine/output/` from templates and source

## User-Facing Copy

Before **any** user-facing work — UI text, onboarding, dialogs, permission messages, website copy, README, store description, or documentation — load Product Identity in order:

1. `docs_engine/source/Identity/product_doctrine.md`
2. `docs_engine/source/Identity/product_quotes.md`
3. `docs_engine/source/Identity/voice.md`
4. `docs_engine/source/Identity/vocabulary.md`
5. `docs_engine/source/Identity/writing_rules.md`

Only then generate copy. Never invent a different tone.

**Product Identity documents are protected.** AI must not modify them automatically. Changes require explicit product approval.

## Language

- Code/comments: English
- User-facing UI: Swedish
