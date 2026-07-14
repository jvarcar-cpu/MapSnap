# Next Task

**Updated:** 2026-07-14  

**Pass type:** None active — Wave 1 institutionally closed

## Recommended Next Task

**Wave 1 — Compact Cards** — when explicitly scoped per `implementation_readiness.md` order 8.

Wave 1 institutional reconciliation is complete. All shipped capabilities verified 2026-07-14. Next Wave 1 item: compact card experiment (experimental, not started).

## Prerequisites

1. Pass type declared in `current_phase.md` (Feature or UX Pass)
2. Generated steering docs current (`docs_engine/output/`)
3. Feature Gate answers documented for compact cards unit
4. Wave 1 institutional closure verified (`baseline_reconciliation.md` Wave 1 section)

## Acceptance Criteria

See `CURRENT_TASK.md` — Compact Cards acceptance criteria. Summary: reduced height, ~square thumbnail (80–100px hypothesis), detail view for full image, preserved actions and touch targets, measurable recognition test, rollback to banner layout.

## Not Next

- Data Protection implementation (documented in roadmap only)
- Backend or cloud sync (Wave 6 — deferred)
- Changing SNAP short/long-press contract
- Pre-capture forms or menus
- Mixed pass types in one change set
- Filter, search, sort (Wave 2)
- Tags (Wave 2)

## Reference

| Document | Purpose |
|----------|---------|
| `snap_model.md` | Authoritative Snap record |
| `product_roadmap.md` | Authoritative phased roadmap |
| `implementation_readiness.md` | Build sequence and rollback |
| `feature_gate.md` | Gate before any feature |
| `ux_doctrine.md` | Card layout + RETURN actions |
| `field_validation_log.md` | Verified field observations |
