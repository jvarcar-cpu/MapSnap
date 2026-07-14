# Changelog

## [0.2.18] — 2026-07-14

### Added (Wave 2 Sprint 3 — Smart Sorting)

- **Smart Sorting** — segmented sort control above snap list when snaps exist; modes: Nyast (newest), Äldst (oldest), Närmast (nearest)
- **Sort behaviour** — pure client-side reorder of loaded collection; applies after search filter; memoized via `sortSnaps()` in `lib/snapSort.ts`
- **Nearest sort** — one-time GPS read when user selects Närmast; haversine distance; tie-break by newest; no continuous tracking
- **Nearest failure** — calm Swedish message when location unavailable; reverts to Nyast
- **Sort UI** — lightweight rounded segmented control below search bar; labels Nyast / Äldst / Närmast

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No filter, tags, backend, or cloud
- IndexedDB version remains `1`; no schema change
- Search behaviour unchanged

### Docs

- Wave 2 Sprint 3 Smart Sorting declared in `current_phase.md`
- Sort documented in `ux_doctrine.md`, `implementation_readiness.md`, `product_roadmap.md`
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.17] — 2026-07-14

### Added (Wave 2 Sprint 2 — Search)

- **Local search** — search field above snap list filters loaded Snaps by title (`name`) and notes (`note`) in real time
- **Search behaviour** — case-insensitive, partial match, leading/trailing whitespace ignored; coordinates, timestamps, category, favorite, and image metadata excluded
- **Search UI** — rounded mobile-first field with search icon, placeholder "Sök bland dina Snappar", clear button when text present
- **Search empty state** — calm message "Inga Snappar matchar din sökning." when no matches; no errors
- **Performance** — memoized filtering via `filterSnapsBySearch()` in `lib/snapSearch.ts`

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No sort, filter, tags, Discover suggestions, AI, backend, or cloud
- IndexedDB version remains `1`; no schema change
- Compact Cards Iteration 2 (square thumbnail + detail view) not started

### Docs

- Wave 2 Sprint 2 Search declared in `current_phase.md`
- Search documented in `ux_doctrine.md`, `implementation_readiness.md`, `product_roadmap.md`
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.16] — 2026-07-14

### Changed (Wave 2 Sprint 1 — Compact Cards Iteration 1)

- **Compact card layout** — reduced vertical card height via tighter content padding (`p-4`), compressed metadata spacing, and narrower list gap (`gap-3`)
- **Photo banner** — aspect ratio `3:1` (was `2.4:1`) — ~20% shorter banner; `object-cover` preserved for recognition
- **Action groups** — navigation (Google Maps, Waze) separated from actions (Redigera, Dela, Spara bild, Ta bort) by a subtle `bg-black/[0.04]` divider; no labels; order unchanged
- **Touch targets** — 48px minimum preserved on map links and action buttons; existing SVG icon system unchanged

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No square thumbnail or detail view — deferred to Iteration 2 (ADR-017)
- Share, favorite, edit, save image, maps, delete behaviour and persistence unchanged
- IndexedDB version remains `1`; no schema change
- Search, filter, tags, Discover, Protect, backend not started

### Docs

- Wave 2 Sprint 1 declared in `current_phase.md`
- Compact Cards Iteration 1 documented in `ux_doctrine.md`, `stable_baseline.md`, `implementation_readiness.md`
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.15-docs] — 2026-07-14

### Documented (Wave 1 documentation reconciliation)

- **Baseline alignment** — `stable_baseline.md`, `baseline_reconciliation.md` Wave 1 section, `CURRENT_BASELINE.md`, `SNAPSHOT.md`, `MASTER.md` reflect full Wave 1 shipped state
- **Phase corrections** — `current_phase.md` Sprint 4 share labels (`📍 SnapSpot`, `🌍 Öppna i Google Maps`); Snap Card Polish notes SVG icons supersede emoji; action grid layout accurate
- **Roadmap** — Wave 1 table includes MapSnap signature (5c) and Action Icon Polish (5d); Existing Capabilities list complete
- **Product vision** — Wave 1 shipped capabilities documented alongside MVP 0.1 scope
- **Field Validation 0006** — historical label note; canonical labels post-0.2.8 clarified
- **Architecture** — `architecture_state.md` lib/component inventory updated
- **Vocabulary** — SnapSpot added to official terms table
- **Knowledge continuity** — Wave 1 closure, ADR-021, action icon polish recorded

### Not changed

- No product code, UI, or SNAP behaviour changes in this pass

## [0.2.14] — 2026-07-14

### Changed (Wave 1 — Action Icon Accent Polish)

- **Share icon** — Dela uses Share2 (network share) instead of download arrow; communicates "send to someone"
- **Save image icon** — Spara bild keeps Download icon; distinct from Dela
- **Icon accent colors** — subtle tones on icons only: Redigera orange, Dela blue, Spara bild muted purple-gray, Ta bort red; Google Maps and Waze retain official brand colors
- **Typography** — button labels unchanged (primary/secondary text); calm card appearance preserved

### Not changed

- Action layout, ordering, spacing, and touch targets unchanged
- Share, favorite, edit, save image, maps, delete behaviour and persistence unchanged
- SNAP short/long-press contract unchanged (ADR-012)
- IndexedDB version remains `1`; no schema change
- Compact Cards not started

### Docs

- `ux_doctrine.md` — Share vs Save Image icons; icon accent color palette
- `current_phase.md`, `next_task.md` — accent polish pass complete
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.13] — 2026-07-14

### Changed (Wave 1 — Action Icon Polish)

- **Google Maps icon** — official multi-color pin SVG beside "Google Maps" label on every card
- **Waze icon** — official brand-style SVG beside "Waze" label on every card
- **Action icons** — emoji replaced with restrained SVG icons (~18px): Redigera, Dela, Spara bild, Ta bort
- **Focus rings** — `focus-visible` outline added to map links and card action buttons

### Not changed

- Action layout, ordering, spacing, and touch targets unchanged
- Share, favorite, edit, save image, maps, delete behaviour and persistence unchanged
- SNAP short/long-press contract unchanged (ADR-012)
- IndexedDB version remains `1`; no schema change
- Compact Cards not started

### Docs

- `ux_doctrine.md` — Action Icon Principle; card action icon baseline updated
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — icon polish pass complete
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.12] — 2026-07-14

### Changed (Wave 1 — Snap Card Polish)

- **Two-column action grid** — Redigera / Dela on row 1; Spara bild / Ta bort on row 2 (image snaps); equal-width buttons; 48px touch targets preserved
- **Action icons** — subtle emoji icons on every card action: ✏️ Redigera, 📤 Dela, 💾 Spara bild, 🗑 Ta bort
- **Visually lighter buttons** — reduced border weight, tighter `gap-2` grid spacing, lighter surface fill
- **SnapSpot label** — card location line shows `📍 SnapSpot` instead of category (`Annat`, etc.)

### Not changed

- Category field remains in data model (`DEFAULT_CATEGORY`, `SNAP_CATEGORIES`) for future Discover
- SNAP short/long-press contract unchanged (ADR-012)
- Share, favorite, edit, save image, maps, delete behaviour and persistence unchanged
- IndexedDB version remains `1`; no schema change
- Compact Cards, search, filter, tags not started

### Docs

- `ux_doctrine.md`, `Identity/vocabulary.md` — SnapSpot canonical on cards; category as metadata
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — polish pass complete
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.11] — 2026-07-14

### Added (Wave 1 — MapSnap Signature)

- **MapSnap signature** — permanent subtle "MapSnap" text in every Snap card header upper-right (ADR-021)
- **Title helpers** — `snapCardTitle()` for card UI (no fallback); `snapShareTitle()` for Quick Share ("MapSnap" when untitled)
- **Tests** — updated `snapEdit.test.ts`, `shareSnap.test.ts`; baseline verification extended for signature, no fallback title, title clear

### Changed

- `PlaceCard.tsx` — header row: user title left (when present), MapSnap signature right; favorite overlay unchanged with `pr-12` spacing
- Quick Share — untitled snap fallback "MapSnap" instead of "Sparad plats"
- Identity (`product_doctrine.md`, `identity_overview.md`, `vocabulary.md`), `ux_doctrine.md`, `snap_model.md` — MapSnap Signature formalized
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — signature sprint complete
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- Title/notes edit flow, favorite persistence, capture, save image, maps, delete unchanged
- IndexedDB version remains `1`; no schema change
- Compact Cards, search, filter, tags not started

## [0.2.10] — 2026-07-14

### Changed (Quick Share polish)

- **"Dela" always visible** — share action on every snap card; position-only snaps share text + Google Maps link; image snaps also attach image file when supported
- **Placement** — Dela after Spara bild (when image) or directly after Maps links; Save Image unchanged (image-only)

### Not changed

- Share message format, Share API behavior, persistence, storage, SNAP interaction unchanged
- Save Image behavior unchanged

### Docs

- `ux_doctrine.md`, `current_phase.md`, `product_roadmap.md` — Quick Share visibility on all snaps
- Regenerated steering outputs in `docs_engine/output/`

## [0.2.9] — 2026-07-14

### Added (Wave 1 Sprint 5 — Favorite)

- **Favorite toggle** — small outlined star in upper-right of each snap card; ☆ / ★ with subtle gold when active
- **Favorite utility** — `lib/snapFavorite.ts`: `applySnapFavorite()` / `toggleSnapFavorite()`; persists `favorite: true` only, removes field when false
- **Optimistic save** — immediate UI update via `saveSnap()`; restores previous state and shows error on failure
- **Accessibility** — 44px touch target; `aria-label` "Markera som favorit" / "Ta bort favorit"; keyboard accessible
- **Tests** — `lib/snapFavorite.test.ts`; baseline verification extended for favorite visibility, persistence, reload, and non-mutation

### Changed

- `PlaceCard.tsx` — `FavoriteToggle` in card corner; works with or without photo
- `product_roadmap.md` — Favorite marked Existing
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — Sprint 5 complete
- `snap_model.md`, `data_doctrine.md`, `ux_doctrine.md` — favorite UI documented as shipped
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No reorder, filter, search, or Discover behaviour
- Share, save image, title/notes edit, capture flow unchanged
- IndexedDB version remains `1`
- No new Field Validation entries (pending real-device test)

## [0.2.8] — 2026-07-14

### Changed (Quick Share message polish)

- **Share text labels** — `📍 Position` → `📍 SnapSpot`; `🌍 Öppna plats` → `🌍 Öppna i Google Maps`
- Message remains minimal: title, optional note, coordinates, single Google Maps URL — no image marker, duplicate map labels, Waze, or extra metadata

### Not changed

- Share image file attachment, SNAP interaction, persistence, storage unchanged
- No new doctrine or roadmap changes

## [0.2.7] — 2026-07-14

### Changed (Product vision and roadmap refinement — docs only)

- **Core Product Pillars** — formalized lifecycle model: Capture, Enrich, Share, Protect; Discover as emerging strategic pillar (ADR-020)
- **Experience qualities preserved** — Capture, Remember, Return, Delight; Delight cross-cutting
- **Evolved product vision** — "capture, enrich, share, protect" complements existing positioning
- **Share product depth** — Quick Share (implemented), Professional Share, MapSnap-to-MapSnap Share, Smart Share (exploratory) documented
- **Roadmap waves renumbered** — Wave 5 Protect; Wave 6 MapSnap-to-MapSnap Share / cloud (formerly Wave 5)
- **Feature Gate extended** — Core Pillar alignment required; Discover guardrails added
- **Field Validation 0006** — successful Quick Share SMS test documented
- **Identity updated** — `product_doctrine.md`, `vocabulary.md`, `product_quotes.md`, `identity_overview.md`
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- No product code changes
- Protected SNAP interaction unchanged (ADR-012)
- No new features implemented

## [0.2.6] — 2026-07-14

### Changed (Share text polish)

- **Share text format** — minimal SMS-friendly body: title, optional note, `📍 Position` + coordinates, `🌍 Öppna plats` + single Google Maps URL
- Removed redundant "Image attached." line (image is already visible in share sheet)
- Removed "Google Maps:" label duplication (Android SMS map preview supplies navigation context)
- Field validated on real-device SMS share

### Not changed

- Share image file attachment, SNAP interaction, persistence, storage unchanged
- No new doctrine or roadmap changes

## [0.2.5] — 2026-07-14

### Added (Wave 1 Sprint 4 — Share Snap)

- **"Dela" action** — visible on snap cards with `photoDataUrl`; hidden for position-only snaps
- **Share utility** — `lib/shareSnap.ts`: native Web Share API with title, notes, coordinates, Google Maps URL, and image file when supported
- **Share text format** — clean plain-text body; title fallback "Sparad plats"; "Image attached." when photo included
- **Unavailable feedback** — "Delning stöds inte i den här webbläsaren" when `navigator.share` absent or payload unsupported; no silent failure
- **Tests** — `lib/shareSnap.test.ts`; baseline verification extended for share visibility and non-mutation

### Changed

- `PlaceCard.tsx` — share button after Spara bild, before Redigera / Ta bort
- `product_roadmap.md` — Share Snap marked Existing; **Future — Data Protection** section added (documented only)
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — Sprint 4 complete
- `ux_doctrine.md` — share documented as shipped
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No Data Protection implementation, favorite, tags, compact cards, clipboard, QR, or backend work
- IndexedDB version remains `1`
- No new Field Validation entries (pending real-device test)

## [0.2.4] — 2026-07-14

### Added (Wave 1 Sprint 3 — Save Snap Image)

- **"Spara bild" action** — visible on snap cards with `photoDataUrl`; hidden for position-only snaps
- **Save utility** — `lib/saveSnapImage.ts`: blob download (desktop/Android), Web Share with file (iOS); readable filename `MapSnap_YYYY-MM-DD_HH-mm-ss.jpg`
- **User feedback** — "Bilden sparades" on success; "Kunde inte spara bilden" on failure
- **Tests** — `lib/saveSnapImage.test.ts`; baseline verification extended for save-image visibility and non-mutation

### Changed

- `PlaceCard.tsx` — save-image button after maps links, before edit/delete
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — Sprint 3 complete
- `image_doctrine.md`, `known_issues.md` — platform save behavior documented
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No share, favorite, tags, compact cards, or backend work
- IndexedDB version remains `1`
- No new Field Validation entries (pending real-device test)

## [0.2.3] — 2026-07-14

### Added (Wave 1 Sprint 2B — Title + Notes UI)

- **Post-capture edit** — "Redigera" on snap cards opens inline form for optional title (`name`) and notes (`note`)
- **Display** — custom title replaces fallback "Sparad plats"; notes shown with line clamp in list view (full text editable)
- **Edit helpers** — `lib/snapEdit.ts` (trim, max lengths, field preservation)
- **SnapEditForm** — mobile-friendly inputs, Escape to cancel, scroll-into-view on focus
- **Tests** — `lib/snapEdit.test.ts`; baseline verification extended for edit persistence

### Changed

- `PlaceCard.tsx`, `PlaceList.tsx`, `page.tsx` — edit/save/cancel flow via `saveSnap()`
- `current_phase.md`, `next_task.md`, `implementation_readiness.md` — Sprint 2B complete
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- SNAP short/long-press contract unchanged (ADR-012)
- No favorite, tags, share, save image, compact cards, or backend work
- IndexedDB version remains `1`
- No new Field Validation entries

## [0.2.2] — 2026-07-14

### Added (Wave 1 Sprint 2A — Snap Model Preparation)

- **Authoritative Snap type** — `Snap` in `types/place.ts`; `SnapPlace` alias retained
- **Snap model layer** — `lib/snapModel.ts`: validation, idempotent normalization, legacy alias mapping (`title`→`name`, `notes`→`note`)
- **Automatic migration** — normalize on load, save, import; persist corrected records once
- **Schema-ready optional fields** — `favorite`, `tags` (no UI)
- **Snap model doctrine** — `snap_model.md` (backup compatibility matrix, field mapping)
- **ADR-019** — Snap model evolution policy

### Changed

- `lib/storage.ts` — uses `snapModel`; import/export round-trip through normalization
- `data_doctrine.md` — product vs persisted names, schema evolution policy
- `implementation_readiness.md` — split order 4 into Sprint 2A (model) and 2B (UI)
- `current_phase.md`, `next_task.md` — Sprint 2A complete; 2B next
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- No title/notes edit UI, favorite, tags, share, save image, or SNAP behaviour changes
- IndexedDB version remains `1`
- No new Field Validation entries

## [0.2.1-docs] — 2026-07-14

### Documented (Wave 1 Sprint 1 closure)

- **Field Validation 0005** — Wave 1 Sprint 1 UX Polish Validation (Google Pixel 9a, Redmi Note 9); pulse-on-button accepted as sufficient with sonar waves
- **Wave 1 Sprint 1** — marked **Completed** after real-device field validation
- **Next recommended** — Wave 1 Sprint 2: Snap title, Notes
- Regenerated steering outputs in `docs_engine/output/`

### Not changed

- No product code, UI, or SNAP behaviour changes in this pass

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
