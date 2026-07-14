# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-07-14

## Status

Wave 2 Sprint 3 complete — Smart Sorting shipped. Awaiting Filter scoping.

## Phase

Wave 2 — Organization / Early Discover. Sprint 3 (Smart Sorting) complete.

## Pass Type

None active. Declare Feature Pass in `current_phase.md` before starting Filter.

## Context

Smart Sorting shipped 2026-07-14: Nyast / Äldst / Närmast segmented control, memoized `sortSnaps()`, nearest with one-time GPS read, failure reverts to Nyast. Search unchanged. No filter, tags, backend, or cloud.

## Next Sprint — Filter

**Scope:** All, favorites, with images. See `implementation_readiness.md` order 9b (filter portion), `product_roadmap.md` item 3.

**Not in scope:** SNAP interaction changes, backend, Professional Share, Protect, tags.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Compact Cards Iteration 1 shipped — banner compression, divider, spacing
- [x] Search shipped — title/notes filter, search empty state, clear button
- [x] Smart Sorting shipped — Nyast / Äldst / Närmast, memoized sort, nearest GPS
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] Field validation on real device for Smart Sorting (recommended)
- [ ] Feature Gate answers documented for Filter

## Acceptance Criteria — Search (shipped)

- [x] Search field above snap list when snaps exist
- [x] Real-time filter on loaded collection — title and notes only
- [x] Case-insensitive, partial match, whitespace trimmed
- [x] Search empty state "Inga Snappar matchar din sökning." — no errors
- [x] Search icon, clear button, placeholder "Sök bland dina Snappar"
- [x] Memoized filtering; no filter, tags, backend, or cloud
- [x] Build, docs validation, baseline verification, and unit tests pass

## Acceptance Criteria — Smart Sorting (shipped)

- [x] Sort control above snap list when snaps exist — below search bar
- [x] Three modes: Nyast (newest), Äldst (oldest), Närmast (nearest)
- [x] Client-side reorder of loaded collection — applies after search filter
- [x] Memoized sorting via `sortSnaps()` — no backend, no cloud
- [x] Nearest uses one-time GPS read when selected — no continuous tracking
- [x] Location failure reverts to Nyast with calm Swedish message
- [x] Behaviour + visual regression checklists pass

## Acceptance Criteria — Filter (remaining)

- [ ] Filter control for all, favorites, with images
- [ ] Works with search and sort — filter then sort pipeline
- [ ] Rollback path: hide filter control without data loss
- [ ] Behaviour + visual regression checklists pass

## Reference

`implementation_readiness.md` order 9b · `product_roadmap.md` Wave 2 · `ux_doctrine.md` · `next_task.md`
