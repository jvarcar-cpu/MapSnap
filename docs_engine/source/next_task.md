# Next Task

**Updated:** 2026-07-14  

**Pass type:** None active — Wave 2 Sprint 2 Search complete

## Recommended Next Task

**Wave 2 — Compact Cards Iteration 2** — square thumbnail (~80–100px hypothesis), detail view for full image, measurable recognition test per ADR-017.

## Prerequisites

1. Pass type declared in `current_phase.md` (Feature or UX Pass)
2. Generated steering docs current (`docs_engine/output/`)
3. Feature Gate answers documented for compact cards iteration 2
4. Wave 2 Sprint 2 field validation on real device (recommended)

## Acceptance Criteria

See `CURRENT_TASK.md` — remaining Compact Cards criteria: square thumbnail, detail view, recognition test. Search shipped: title/notes filter, search empty state, clear button, memoized filtering.

## Not Next

- Data Protection implementation (documented in roadmap only)
- Backend or cloud sync (Wave 6 — deferred)
- Changing SNAP short/long-press contract
- Pre-capture forms or menus
- Mixed pass types in one change set
- Sort, filter (Wave 2 items 2–3) before iteration 2 decision
- Tags (Wave 2 item 4)

## Reference

| Document | Purpose |
|----------|---------|
| `snap_model.md` | Authoritative Snap record |
| `product_roadmap.md` | Authoritative phased roadmap |
| `implementation_readiness.md` | Build sequence and rollback |
| `feature_gate.md` | Gate before any feature |
| `ux_doctrine.md` | Card layout + RETURN actions |
| `field_validation_log.md` | Verified field observations |
