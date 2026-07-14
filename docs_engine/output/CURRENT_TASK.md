# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-07-14

## Status

Wave 2 Sprint 4 complete — Filter shipped. Awaiting Tags scoping.

## Phase

Wave 2 — Organization / Early Discover. Sprint 4 (Filter) complete.

## Pass Type

None active. Declare Feature Pass in `current_phase.md` before starting Tags.

## Context

Filter shipped 2026-07-14: Alla / Favoriter / Med bild segmented control, memoized `filterSnapsByMode()`, pipeline search → filter → sort → render. Search and Smart Sorting unchanged in behaviour. No tags, backend, or cloud.

## Next Sprint — Tags

**Scope:** Lightweight tag list on snap. See `implementation_readiness.md` order 10, `product_roadmap.md` item 4.

**Not in scope:** SNAP interaction changes, backend, Professional Share, Protect, collections.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Compact Cards Iteration 1 shipped — banner compression, divider, spacing
- [x] Search shipped — title/notes filter, search empty state, clear button
- [x] Smart Sorting shipped — Nyast / Äldst / Närmast, memoized sort, nearest GPS
- [x] Filter shipped — Alla / Favoriter / Med bild, memoized filter, pipeline order preserved
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] Field validation on real device for Filter (recommended)
- [ ] Feature Gate answers documented for Tags

## Acceptance Criteria — Search (shipped)

- [x] Search field above snap list when snaps exist
- [x] Real-time filter on loaded collection — title and notes only
- [x] Case-insensitive, partial match, whitespace trimmed
- [x] Search empty state "Inga Snappar matchar din sökning." — no errors
- [x] Search icon, clear button, placeholder "Sök bland dina Snappar"
- [x] Memoized filtering; no backend or cloud
- [x] Build, docs validation, baseline verification, and unit tests pass

## Acceptance Criteria — Smart Sorting (shipped)

- [x] Sort control below filter when snaps exist
- [x] Three modes: Nyast (newest), Äldst (oldest), Närmast (nearest)
- [x] Client-side reorder of loaded collection — applies after search and filter
- [x] Memoized sorting via `sortSnaps()` — no backend, no cloud
- [x] Nearest uses one-time GPS read when selected — no continuous tracking
- [x] Location failure reverts to Nyast with calm Swedish message
- [x] Behaviour + visual regression checklists pass

## Acceptance Criteria — Filter (shipped)

- [x] Filter control for all, favorites, with images — Alla / Favoriter / Med bild
- [x] Works with search and sort — search → filter → sort pipeline
- [x] Rollback path: hide filter control without data loss
- [x] Behaviour + visual regression checklists pass

## Reference

`implementation_readiness.md` order 9b · `product_roadmap.md` Wave 2 · `ux_doctrine.md` · `next_task.md`
