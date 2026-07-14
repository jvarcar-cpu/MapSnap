# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-07-14

## Status

Wave 1 institutionally closed. No active implementation pass. Awaiting Compact Cards scoping.

## Phase

Wave 1 — Core Value & UX Polish (closed). Next sprint: Compact Cards.

## Pass Type

None active. Declare Feature or UX Pass in `current_phase.md` before starting Compact Cards.

## Context

Wave 1 shipped capabilities are verified in `baseline_reconciliation.md` (Wave 1 section) and `CURRENT_BASELINE.md`. Institutional reconciliation complete 2026-07-14.

## Next Sprint — Compact Cards

**Scope:** Wave 1 item 6 — experimental compact card layout. List layout only; detail view for full image. See `implementation_readiness.md` order 8, `product_roadmap.md` item 6, `ux_doctrine.md`, ADR-017.

**Not in scope:** SNAP interaction changes, backend, filter/search/tags, Professional Share, Protect.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Snap model, title + notes, save image, Quick Share, favorite shipped
- [x] MapSnap signature (ADR-021) and snap card + action icon polish shipped
- [ ] Pass type declared in `current_phase.md` (Feature or UX Pass)
- [ ] Generated steering docs current (`docs_engine/output/`)
- [ ] Feature Gate answers documented for Compact Cards unit

## Acceptance Criteria — Compact Cards

- [ ] Reduced card height — more Snaps visible on screen
- [ ] ~Square thumbnail (~80–100px hypothesis) preserves recognizable image content (ADR-017, `image_doctrine.md`)
- [ ] Detail view opens for full image when thumbnail tapped
- [ ] List layout only — no change to SNAP capture contract (ADR-012)
- [ ] All existing card actions preserved: favorite, maps, edit, share, save image, delete
- [ ] Touch targets remain minimum 44px; 48px action buttons preserved
- [ ] MapSnap signature, SnapSpot label, and two-column action grid behaviour unchanged
- [ ] Measurable recognition test documented (implementation readiness order 8)
- [ ] Rollback path: revert to current banner layout without data loss
- [ ] Behaviour + visual regression checklists pass
- [ ] Build, docs validation, baseline verification, and unit tests pass

## Reference

`implementation_readiness.md` order 8 · `product_roadmap.md` Wave 1 item 6 · `ux_doctrine.md` · ADR-017 · `next_task.md`
