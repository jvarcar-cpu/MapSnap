# Next Task

**Updated:** 2026-07-14  

**Pass type:** None active — Wave 2 Sprint 1 Compact Cards Iteration 1 complete

## Recommended Next Task

**Wave 2 — Compact Cards Iteration 2** — square thumbnail (~80–100px hypothesis), detail view for full image, measurable recognition test per ADR-017.

Alternatively: **Wave 2 item 1 — Search** when organization pass is prioritized over compact card iteration 2.

## Prerequisites

1. Pass type declared in `current_phase.md` (Feature or UX Pass)
2. Generated steering docs current (`docs_engine/output/`)
3. Feature Gate answers documented for compact cards iteration 2
4. Wave 2 Sprint 1 field validation on real device (recommended)

## Acceptance Criteria

See `CURRENT_TASK.md` — remaining Compact Cards criteria: square thumbnail, detail view, recognition test. Iteration 1 shipped: reduced height, action-group divider, preserved touch targets and typography.

## Not Next

- Data Protection implementation (documented in roadmap only)
- Backend or cloud sync (Wave 6 — deferred)
- Changing SNAP short/long-press contract
- Pre-capture forms or menus
- Mixed pass types in one change set
- Filter, sort (Wave 2 items 2–3) before iteration 2 decision
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
