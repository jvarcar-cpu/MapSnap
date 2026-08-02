# Next Task

**Updated:** 2026-08-02  

**Pass type:** None active — Tags Documentation Pass complete; **Feature Pass — Tags** ready to begin

## Recommended Next Task

**Feature Pass — Tags** (Wave 2 item 4 / readiness order 10).

Lightweight user-defined tags: create, edit, remove, display on Snap card; search includes tags with title and notes. See `product_roadmap.md` Wave 2 item 4 and `implementation_readiness.md`.

## Prerequisites

1. Pass type declared in `current_phase.md` (**Feature Pass**)
2. Generated steering docs current (`docs_engine/output/`)
3. Feature Gate answers documented for Tags — **passed** (Documentation Pass 2026-08-02)
4. Identity documents loaded for Swedish tag UI copy
5. Capture Reliability / PWA install guidance shipped (2026-08-02) — iPhone Field Validation still recommended when a device is available
6. Install Guidance Repositioning UX Pass closed (2026-08-02)
7. Schema field `tags?: string[]` already present (ADR-019) — no IndexedDB version bump expected

## Acceptance Criteria

- [ ] Create, edit, and remove tags after capture (Enrich only)
- [ ] Tags displayed on Snap card — visually lightweight; metadata, not primary content
- [ ] Tags never shown or required before SNAP
- [ ] Free-form tags allowed; ~five recommended without hard technical limit
- [ ] Search includes tags together with title and notes
- [ ] Backup/import round-trips `tags`
- [ ] SNAP contract unchanged; Capture / Share / Protect unchanged
- [ ] Behaviour + visual regression checklists pass
- [ ] Docs Engine synchronized; `validate_docs.mjs` passes

## Explicit Non-Goals

- Tag hierarchy, groups, colors, favorites, statistics, tag cloud
- AI-generated or recommended tags
- Shared tags
- Discover engine or collections
- Advanced filtering beyond current roadmap
- Moving Discover
- Backend, cloud, or required schema migration
- Pre-capture tag UI
- Mixed pass types

## Not Next

- Re-opening Capture Reliability or install placement as Tags scope
- Data Protection implementation (documented in roadmap only)
- Backend or cloud sync (Wave 6 — deferred)
- Changing SNAP short/long-press contract meaning
- Pre-capture forms or menus
- Compact Cards Iteration 2 unless explicitly re-prioritized
- Collections or Discover feed features
- Foundation constitutional architecture work (belongs in PDE — not MapSnap)

## ADR Note

No new ADR required for Tags institutionalization — feature definition and Wave 2 scope only; optional `tags` field evolution already covered by ADR-019.

## Reference

| Document | Purpose |
|----------|---------|
| `snap_model.md` | Authoritative Snap record + Tags product definition |
| `product_roadmap.md` | Wave 2 item 4 — scope, Feature Gate |
| `implementation_readiness.md` | Order 10 — prerequisites, acceptance, non-goals |
| `feature_gate.md` | Gate criteria |
| `ux_doctrine.md` | Tags UX principles |
| `capture_doctrine.md` | Capture anti-patterns (no pre-SNAP tags) |
| `data_doctrine.md` | Optional metadata |
| `field_validation_log.md` | Verified field observations (0007 pending iPhone) |
| `knowledge_continuity.md` | Continuity index |
