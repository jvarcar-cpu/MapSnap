# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-07-14

## Status

Wave 2 Sprint 2 complete — Search shipped. Awaiting Compact Cards Iteration 2 scoping.

## Phase

Wave 2 — Organization / Early Discover. Sprint 2 (Search) complete.

## Pass Type

None active. Declare Feature or UX Pass in `current_phase.md` before starting Compact Cards Iteration 2.

## Context

Search shipped 2026-07-14: local title/notes filter, search bar with clear button, search empty state, memoized filtering. No sort, filter, tags, backend, or cloud.

## Next Sprint — Compact Cards Iteration 2

**Scope:** Square thumbnail (~80–100px hypothesis), detail view for full image, measurable recognition test. See `implementation_readiness.md` order 8, `product_roadmap.md` item 6, `ux_doctrine.md`, ADR-017.

**Not in scope:** SNAP interaction changes, backend, Professional Share, Protect, sort/filter/tags.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Compact Cards Iteration 1 shipped — banner compression, divider, spacing
- [x] Search shipped — title/notes filter, search empty state, clear button
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] Field validation on real device for Search (recommended)
- [ ] Feature Gate answers documented for Iteration 2

## Acceptance Criteria — Search (shipped)

- [x] Search field above snap list when snaps exist
- [x] Real-time filter on loaded collection — title and notes only
- [x] Case-insensitive, partial match, whitespace trimmed
- [x] Search empty state "Inga Snappar matchar din sökning." — no errors
- [x] Search icon, clear button, placeholder "Sök bland dina Snappar"
- [x] Memoized filtering; no sort, filter, tags, backend, or cloud
- [x] Build, docs validation, baseline verification, and unit tests pass

## Acceptance Criteria — Compact Cards Iteration 2 (remaining)

- [ ] ~Square thumbnail (~80–100px hypothesis) preserves recognizable image content (ADR-017, `image_doctrine.md`)
- [ ] Detail view opens for full image when thumbnail tapped
- [ ] Measurable recognition test documented (implementation readiness order 8)
- [ ] Rollback path: revert to Iteration 1 banner layout without data loss
- [ ] Behaviour + visual regression checklists pass

## Reference

`implementation_readiness.md` order 8 · `product_roadmap.md` Wave 2 · `ux_doctrine.md` · ADR-017 · `next_task.md`
