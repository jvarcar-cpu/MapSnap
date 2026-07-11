# MapSnap — Agent Instructions

## Project

MapSnap is a local-first PWA for instant GPS place capture. Swedish UI. No backend.

## Before You Code

1. Read `docs_engine/source/Identity/product_doctrine.md`
2. Read `docs_engine/rules/implementation_rules.md`
3. Read `docs_engine/source/capture_doctrine.md`
4. Read `docs_engine/source/data_doctrine.md`
5. Read `docs_engine/source/ux_doctrine.md` (Approved UI Baseline)
6. Check `docs_engine/source/current_phase.md` for scope
7. Read `docs_engine/source/product_roadmap.md` and `feature_gate.md` before any feature work
8. Confirm `docs_engine/output/` steering docs are current before any code change

## Hard Rules

- Never add backend, auth, database, or map SDK without explicit approval (Wave 5 deferred — ADR-016)
- Never require forms before save
- Never alter protected SNAP contract: short press = position; long press = position + image (ADR-012)
- Run Feature Gate (`feature_gate.md`) before implementing any new feature
- Never store Google/Waze URLs as primary data
- Never use continuous geolocation tracking
- Keep capture to one tap
- One pass type at a time — Bug Fix, Feature, UX, Docs, Storage, Stabilization (see `implementation_rules.md`)
- Behaviour and visual regressions are bugs — complete the regression checklist every task
- No implementation before generated steering docs are current
- MapSnap was not created by PDE — preserve pre-PDE lineage in institutional memory

## Key Paths

```
app/page.tsx              — main capture screen
components/SnapButton.tsx — tap / long-press
lib/storage.ts            — IndexedDB CRUD (async)
lib/db.ts                 — IndexedDB open + transactions
lib/geo.ts                — Geolocation API
lib/maps.ts               — URL generation
types/place.ts            — SnapPlace schema
docs_engine/source/product_roadmap.md — authoritative phased roadmap
docs_engine/source/feature_gate.md   — mandatory feature gate
docs_engine/output/       — generated steering snapshots (must be current)
docs_engine/source/chronicles/ — append-only institutional memory
```

## After Changes

- Update relevant docs_engine source files
- Add ADR to `decisions.md` if architectural
- Update `changelog.md` for user-visible changes
- Append Chronicle entries for significant historical milestones (never rewrite existing entries)
- Complete regression checklist from `implementation_rules.md`
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
