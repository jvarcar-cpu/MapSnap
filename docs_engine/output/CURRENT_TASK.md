# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-07-14

## Status

Wave 2 Sprint 1 complete — Compact Cards Iteration 1 shipped. Awaiting Iteration 2 scoping or Wave 2 organization features.

## Phase

Wave 2 — Organization / Early Discover. Sprint 1 (Compact Cards Iteration 1) complete.

## Pass Type

None active. Declare Feature or UX Pass in `current_phase.md` before starting Iteration 2 or Search.

## Context

Compact Cards Iteration 1 shipped 2026-07-14: reduced-height banner layout, action-group divider, preserved touch targets and typography. Square thumbnail and detail view deferred to Iteration 2 per ADR-017.

## Next Sprint — Compact Cards Iteration 2

**Scope:** Square thumbnail (~80–100px hypothesis), detail view for full image, measurable recognition test. See `implementation_readiness.md` order 8, `product_roadmap.md` item 6, `ux_doctrine.md`, ADR-017.

**Alternative:** Wave 2 item 1 — Search (title, notes) when organization pass is prioritized.

**Not in scope:** SNAP interaction changes, backend, Professional Share, Protect.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Compact Cards Iteration 1 shipped — banner compression, divider, spacing
- [x] Pass type declared in `current_phase.md` (UX Pass)
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] Field validation on real device for Iteration 1 density (recommended)
- [ ] Feature Gate answers documented for Iteration 2

## Acceptance Criteria — Compact Cards Iteration 1 (shipped)

- [x] Reduced card height — more Snaps visible on screen
- [x] Photo banner aspect `3:1` — recognition preserved via `object-cover`
- [x] Navigation / action groups separated by subtle divider
- [x] List layout only — no change to SNAP capture contract (ADR-012)
- [x] All existing card actions preserved: favorite, maps, edit, share, save image, delete
- [x] Touch targets remain minimum 44px; 48px action buttons preserved
- [x] MapSnap signature, SnapSpot label, typography hierarchy preserved
- [x] Build, docs validation, baseline verification, and unit tests pass

## Acceptance Criteria — Compact Cards Iteration 2 (remaining)

- [ ] ~Square thumbnail (~80–100px hypothesis) preserves recognizable image content (ADR-017, `image_doctrine.md`)
- [ ] Detail view opens for full image when thumbnail tapped
- [ ] Measurable recognition test documented (implementation readiness order 8)
- [ ] Rollback path: revert to Iteration 1 banner layout without data loss
- [ ] Behaviour + visual regression checklists pass

## Reference

`implementation_readiness.md` order 8 · `product_roadmap.md` Wave 1 item 6 / Wave 2 · `ux_doctrine.md` · ADR-017 · `next_task.md`
