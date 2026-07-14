# Next Task

**Updated:** 2026-07-14  

**Pass type:** None active — Wave 2 Sprint 4 Filter complete

## Recommended Next Task

**Wave 2 — Tags** — lightweight tag list on snap. See `product_roadmap.md` item 4 and `implementation_readiness.md` order 10.

## Prerequisites

1. Pass type declared in `current_phase.md` (Feature Pass)
2. Generated steering docs current (`docs_engine/output/`)
3. Feature Gate answers documented for tags
4. Wave 2 Sprint 4 field validation on real device (recommended)

## Acceptance Criteria

See `CURRENT_TASK.md` — Tags criteria when scoped. Filter shipped: Alla / Favoriter / Med bild segmented control, memoized `filterSnapsByMode()`, pipeline search → filter → sort → render.

## Not Next

- Data Protection implementation (documented in roadmap only)
- Backend or cloud sync (Wave 6 — deferred)
- Changing SNAP short/long-press contract
- Pre-capture forms or menus
- Mixed pass types in one change set
- Compact Cards Iteration 2 unless explicitly re-prioritized
- Collections or Discover feed features

## Reference

| Document | Purpose |
|----------|---------|
| `snap_model.md` | Authoritative Snap record |
| `product_roadmap.md` | Authoritative phased roadmap |
| `implementation_readiness.md` | Build sequence and rollback |
| `feature_gate.md` | Gate before any feature |
| `ux_doctrine.md` | Card layout + RETURN actions |
| `field_validation_log.md` | Verified field observations |
