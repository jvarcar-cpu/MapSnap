# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-08-02

## Status

Documentation Pass complete — Tags institutionalized (definition, Wave 2 scope, UX principles, Feature Gate). **Feature Pass — Tags** ready to begin. No Tags UI or code in this pass. iPhone Field Validation pending (Field Validation 0007).

## Phase

Wave 2 — Organization / Early Discover. Capture Reliability (ADR-023) + Install Guidance placement (ADR-024) complete. Sprint 4 (Filter) previously complete. Tags Documentation Pass complete. Product Integration methodology integrated.

## Pass Type

None active. Declare **Feature Pass** in `current_phase.md` before starting Tags implementation.

## Context

Tags are lightweight user-defined Enrich metadata that bridge toward Discover. Feature Gate: Capture no impact; Enrich strengthened; Share/Protect neutral; Discover strengthened. No new ADR (ADR-019 covers optional `tags`). Locked behaviour baseline unmodified. Discover not moved.

## Task

**Feature Pass — Tags** (next when declared)

**In scope:** create, edit, remove tags; display on Snap card; search includes tags with title and notes.

**Not in scope:** hierarchy, groups, AI/recommended/favorite/colored tags, statistics, tag cloud, shared tags, Discover engine, collections, advanced filtering beyond roadmap, pre-capture tags, SNAP contract changes, backend, Foundation architecture.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Compact Cards Iteration 1 shipped — banner compression, divider, spacing
- [x] Search shipped — title/notes filter, search empty state, clear button
- [x] Smart Sorting shipped — Nyast / Äldst / Närmast, memoized sort, nearest GPS
- [x] Filter shipped — Alla / Favoriter / Med bild, memoized filter, pipeline order preserved
- [x] Capture Reliability + PWA install guidance shipped — ADR-023; Field Validation 0007 recorded
- [x] Install Guidance Repositioning UX Pass shipped — ADR-024
- [x] WP-AGSE-MSP-0001 Product Integration complete — methodology only (ADR-022)
- [x] Tags Documentation Pass complete — Feature Gate passed; scope and UX principles institutionalized
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] Feature Pass declared in `current_phase.md`
- [ ] iPhone Field Validation for Capture Reliability (recommended when device available; not a Tags blocker)

## Acceptance Criteria — Feature Pass Tags (when implemented)

- [ ] Create, edit, and remove tags after capture
- [ ] Tags displayed on Snap card — visually lightweight; metadata, not primary content
- [ ] Tags never shown or required before SNAP
- [ ] Free-form tags; ~five recommended without hard technical limit
- [ ] Search includes tags with title and notes
- [ ] Backup/import round-trips `tags`
- [ ] SNAP contract unchanged; Capture / Share / Protect unchanged
- [ ] Behaviour + visual regression checklists pass
- [ ] Docs Engine synchronized; `validate_docs.mjs` passes

## Acceptance Criteria — Tags Documentation Pass (shipped)

- [x] Definition, lifecycle role, Wave 2 in/out scope documented
- [x] UX principles institutionalized
- [x] Feature Gate completed — no guardrails violated
- [x] Readiness next item = Feature Pass — Tags
- [x] Roadmap: Tags remain Wave 2; Discover not moved
- [x] ADR review: no new ADR
- [x] Baseline reconciliation institutional section only — no implementation claimed
- [x] Outputs regenerated; validation passes

## Reference

`implementation_readiness.md` order 10 · `product_roadmap.md` Wave 2 item 4 · `ux_doctrine.md` · `snap_model.md` · `next_task.md` · `knowledge_continuity.md`
