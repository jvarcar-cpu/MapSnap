# Changelog

## [0.2.0] — 2026-07-13

### Added (Wave 1 Sprint 1 — UX Polish)

- **SNAP usage instruction** — permanent hero microcopy: *"Tryck för position · Håll inne för position + bild"*
- **Coordinated SNAP feedback** — compress, haptic, discreet sound, glow, pulse, radial sonar waves, "Snap sparad" toast (~650ms); persistence not blocked; `prefers-reduced-motion` respected (ADR-018)
- **Field Validation Log** — `field_validation_log.md` as MapSnap product-level verified observation source (not PDE)
- `lib/snapSound.ts`, `lib/usePrefersReducedMotion.ts`, `components/SnapCelebrate.tsx`

### Changed

- `SuccessFeedback` — "Snap sparad" replaces "✓ Sparad"
- `SnapButton` — calmer release transition; celebrate glow state
- `ux_doctrine.md`, `stable_baseline.md` — hero instruction and feedback baseline updated
- `knowledge_continuity.md`, `docs_engine_overview.md`, `document_rules.md` — Field Validation Log indexed
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- SNAP short tap / long press (~600ms) contract unchanged (ADR-012)
- No title, notes, share, save image, favorite, or backend work

## [0.2.0-docs] — 2026-07-12

### Added (Product Roadmap & Governance Pass)

- **Official product roadmap** — `product_roadmap.md` (Waves 0–5, prioritization model, item schema)
- **Feature Gate** — `feature_gate.md` (seven questions + Capture Golden Rule)
- **Implementation readiness** — `implementation_readiness.md` (15-unit sequence)
- **Baseline reconciliation** — `baseline_reconciliation.md` (Wave 0 verification against code)
- **Image doctrine** — `image_doctrine.md` (memory aid principle)
- **Snaptiser doctrine** — `snaptiser_doctrine.md` (intention preservation + PWA limits)
- **ADRs 012–018:** protected SNAP interaction, local-first priority, save image Wave 1, Snaptisers strategic, backend deferral, compact cards experiment, coordinated feedback model
- **Technical feasibility issues:** FEAS-001 (image save), FEAS-002 (notifications/geofencing), FEAS-003 (haptic/audio/reduced-motion)
- **Docs validation script** — `scripts/validate_docs.mjs`

### Changed (docs only — product-approved Identity updates)

- `Identity/product_doctrine.md` — positioning, pillars, Capture Golden Rule, product goal
- `Identity/product_quotes.md` — canonical positioning quotes
- `Identity/vocabulary.md` — Snaptiser (provisional), pillar terms
- `product_vision.md` — positioning, pillars, roadmap reference
- `capture_doctrine.md` — protected interaction contract; long-press 600ms aligned to code
- `ux_doctrine.md` — Wave 1 instruction, feedback, compact cards, RETURN
- `data_doctrine.md` — image principle reference
- `current_phase.md` — roadmap ratified; MVP 0.1 baseline preserved
- `next_task.md` — Wave 1 usage instruction when scoped
- `known_issues.md` — feasibility items; MVP-002 → Wave 1
- `document_rules.md`, `docs_engine_overview.md` — roadmap layer ownership
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- No product code, UI, or SNAP behaviour changes in this pass

## [0.1.9] — 2026-07-11

### Added (institutional memory — Chronicle Day 1)

- Ratified **CHRONICLE-MSN-0001 — The First Public Presence** in `chronicles/MAPSNAP_CHRONICLES.md`
- Established MapSnap Chronicle system: `chronicles/chronicle_registry.md`, `chronicles/chronicles_scope_doctrine.md`
- Added `knowledge_continuity.md` — institutional memory index; records https://mapsnap.se as first public production domain
- Public presence milestone: MapSnap available at https://mapsnap.se (Vercel, GitHub CD, HTTPS, DNS)
- Pre-PDE lineage preserved: MapSnap not described as PDE-generated; Product Onboarding noted as future discovery only

### Changed (docs only)

- `current_phase.md` — public presence milestone recorded; production domain documented
- `architecture_state.md` — production deployment and hosting boundaries added
- `docs_engine_overview.md` — Chronicles and knowledge continuity added to docs_engine layers
- `document_rules.md` — Chronicle and continuity file ownership
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- No product code, UI, or SNAP behaviour changes in this pass

## [0.1.8] — 2026-07-07

### Documented (docs pass — state synchronization before PDE)

- MVP 0.1 marked **stable** in `current_phase.md` — local-first PWA baseline complete
- Regenerated steering outputs in `docs_engine/output/` from templates and source
- Added `docs_engine_overview.md` — docs_engine as product operating system
- Added `known_issues.md` — stale dev server/port (OPS-001), manual mobile verification (OPS-002)
- Added `next_task.md` — PDE bootstrap recommended; MapSnap 0.2 deferred until scoped
- ADR-011: PIE/Foundation lesson — small products need full governance from day one
- `Foundation/foundation_guardrails.md` §7 — MapSnap incubator lesson promoted
- Pass types expanded: Storage Pass, Stabilization Pass in `implementation_rules.md`
- Storage truth reaffirmed: IndexedDB primary, localStorage legacy migration only, backup/export approved recovery, no cloud sync in MVP
- Identity truth reaffirmed: protected Identity layer, mandatory load order before user-facing copy
- Engineering truth reaffirmed: no implementation before generated docs current; behaviour + visual baselines both required
- Baseline verification: 12/12 passed at `https://localhost:3000` (2026-07-07)

### Not changed

- No product code, UI, or SNAP behaviour changes in this pass

## [Unreleased] — docs_engine

### Changed (docs only)

- Product Identity layer: `source/Identity/` — doctrine, quotes, voice, vocabulary, writing rules, identity_overview
- `product_doctrine.md` and `product_quotes.md` moved to `Identity/`
- `MASTER.template.md` and `AGENTS.template.md` — Product Identity section and mandatory load order before user-facing work
- `document_rules.md` — Identity structure, protected document rules
- Cross-references updated in vision, capture/data/ux doctrine, architecture_state

## [0.1.7] — 2026-06-29

### Changed

- Snap persistence moved from localStorage to IndexedDB (`mapsnap-db`, object store `snaps`)
- One-time migration from legacy `mapsnap.snaps.v1` localStorage key on first load (localStorage retained, deduped by id)
- Storage API is async (`loadSnaps`, `saveSnap`, `deleteSnap`, export/import)

### Documented

- IndexedDB is primary MVP storage; localStorage is legacy migration source only
- Backend and cloud sync remain out of scope until explicitly promoted
- `Identity/product_doctrine.md`: canonical product philosophy (Core Philosophy, Snap Principle, One-Second Rule, Reality First, Offline First, Coordinates are Truth, Thumb First, Tool First, North Star, Golden Rule)
- `product_vision.md`, `document_rules.md`, `AGENTS.template.md`, and `MASTER.template.md` aligned to product doctrine

## [0.1.6] — 2026-06-28

### Stabilized

- Locked interaction + visual baseline in `docs_engine/source/stable_baseline.md`
- Hard rule: both behaviour and visual regression checklists must pass before any task is complete
- `tailwind.config.ts` content paths include `./lib/**` (preventive)
- Browser verification script: `scripts/verify-baseline.mjs` (12/12 automated checks passed against dev server)

### Preserved (no changes)

- SNAP short tap, long press, camera input inside `SnapButton`, duplicate-fire guards
- Green 3D circular SNAP button styling and approved layout baseline
- Cards, backup panel, permission card, maps, delete flows

## [0.1.5] — 2026-06-28

### Added

- MVP backup section below snap list: export JSON, copy backup, import/merge by id
- `exportSnapsJson` and `importSnapsFromJson` in storage layer

### Documented

- ADR-010: JSON export/import as approved temporary backup during MVP dev
- localStorage not durable across origin changes; cloud sync remains out of scope for 0.1

## [0.1.4] — 2026-06-28

### Changed

- Dev server runs over HTTPS (`next dev --experimental-https`) so geolocation works on mobile/Tailscale
- Added `dev:network` script for LAN/Tailscale testing (`-H 0.0.0.0`)

### Documented

- `local_https_development.md`: HTTPS dev setup, mobile testing, verification checklist
- ADR-009: HTTPS for local development
- Updated `architecture_state.md` secure-context constraint

## [0.1.3] — 2026-06-28

### Fixed

- Restored approved UI baseline: removed permanent helper text below SNAP button (v0.1.2 regression)
- Section header restored to "MINA SNAPPAR"
- Default card title restored to "Sparad plats"

### Documented

- `implementation_rules.md`: behaviour/visual regression rules, pass types, mandatory checklist
- `ux_doctrine.md`: Approved UI Baseline, visual regression rule, expanded checklist
- `update_rules.md` and `AGENTS.template.md`: reference implementation discipline

## [0.1.2] — 2026-06-28

### Fixed

- Restored SNAP button tap and long-press behaviour broken by UI polish pass
- Pointer capture no longer cancels short taps when capture is lost mid-gesture
- Haptic feedback moved from press-down to long-press threshold only
- Success haptic restored on save (✓ Sparad)

### Changed

- Removed permanent helper text below SNAP button (hero stays clean)
- Camera flow: vibrate → open camera immediately → user taps shutter → GPS + save

### Documented

- UX doctrine: Behaviour First rule and UX polish regression checklist
- Roadmap: first-launch onboarding tip (planned, not implemented)
- Update rules: polish pass verification requirements

## [0.1.1] — 2026-06-28

### Changed

- Camera input extracted to dedicated `CameraInput` component with `capture="environment"`
- Long-press still sole trigger for photo flow; tap capture unchanged
- Added Swedish helper text explaining mobile browser vs remote-desktop file picker behavior
- Cancelling camera/file picker leaves tap capture unaffected (no snap, no error)

### Documented

- ADR-008: camera capture depends on browser/device; Parsec/remote desktop cannot expose phone camera

## [0.1.0] — 2026-06-28

### Added

- Initial MapSnap MVP scaffold
- Tap SNAP → GPS capture → localStorage save
- Long press SNAP → camera/file capture + GPS
- Place list with cards (coords, category, date, photo thumbnail)
- Google Maps and Waze deep links
- Delete snap action
- PWA manifest and mobile-first layout
- docs_engine governance skeleton
- Swedish UI labels and error messages

### Not Included

- Backend, auth, cloud sync
- Map SDK embedding
- Name/note/category editing UI
- Analytics
