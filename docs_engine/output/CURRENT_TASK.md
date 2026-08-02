# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-08-02

## Status

**Feature Pass — Tags shipped.** Create/edit/remove/display tags; search includes tags with title and notes. Wave 2 early-organization track complete for tags. iPhone Field Validation pending (Field Validation 0007).

## Phase

Wave 2 — Organization / Early Discover. Tags Feature Pass complete 2026-08-02. Capture Reliability (ADR-023) + Install Guidance placement (ADR-024) complete. Sprint 4 (Filter) previously complete. Product Integration methodology integrated.

## Pass Type

None active. Next recommended: Order 11 — Snaptiser feasibility spike (research) when scoped.

## Context

Tags are lightweight user-defined Enrich metadata that bridge toward Discover. Feature Gate: Capture no impact; Enrich strengthened; Share/Protect neutral; Discover strengthened. No new ADR (ADR-019 covers optional `tags`). Discover not moved beyond early retrieval via search.

## Task

**Next when scoped:** Order 11 — Snaptiser feasibility spike (research only).

**Tags (shipped):** create, edit, remove tags; display on Snap card; search includes tags with title and notes.

**Still out of Tags scope:** hierarchy, groups, AI/recommended/favorite/colored tags, statistics, tag cloud, shared tags, Discover engine, collections, advanced filtering beyond roadmap, pre-capture tags, SNAP contract changes, backend, Foundation architecture.

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
- [x] Feature Pass — Tags shipped — create/edit/remove/display + search
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] iPhone Field Validation for Capture Reliability (recommended when device available)

## Acceptance Criteria — Feature Pass Tags (shipped)

- [x] Create, edit, and remove tags after capture
- [x] Tags displayed on Snap card — visually lightweight; metadata, not primary content
- [x] Tags never shown or required before SNAP
- [x] Free-form tags; ~five recommended without hard technical limit
- [x] Search includes tags with title and notes
- [x] Backup/import round-trips `tags`
- [x] SNAP contract unchanged; Capture / Share / Protect unchanged
- [x] Behaviour + visual regression checklists pass
- [x] Docs Engine synchronized; `validate_docs.mjs` passes

## Reference

`implementation_readiness.md` order 10 (complete) · `product_roadmap.md` Wave 2 item 4 · `ux_doctrine.md` · `snap_model.md` · `next_task.md` · `knowledge_continuity.md`
