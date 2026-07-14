# Next Task

**Updated:** 2026-07-14  

**Pass type:** None active — Wave 2 Sprint 3 Smart Sorting complete

## Recommended Next Task

**Wave 2 — Filter** — all, favorites, with images. See `product_roadmap.md` item 3 and `implementation_readiness.md` order 9b (filter portion).

## Prerequisites

1. Pass type declared in `current_phase.md` (Feature Pass)
2. Generated steering docs current (`docs_engine/output/`)
3. Feature Gate answers documented for filter
4. Wave 2 Sprint 3 field validation on real device (recommended)

## Acceptance Criteria

See `CURRENT_TASK.md` — Filter criteria. Smart Sorting shipped: Nyast / Äldst / Närmast segmented control, memoized `sortSnaps()`, nearest with one-time GPS, failure reverts to Nyast.

## Not Next

- Data Protection implementation (documented in roadmap only)
- Backend or cloud sync (Wave 6 — deferred)
- Changing SNAP short/long-press contract
- Pre-capture forms or menus
- Mixed pass types in one change set
- Tags (Wave 2 item 4) before filter
- Compact Cards Iteration 2 unless explicitly re-prioritized

## Reference

| Document | Purpose |
|----------|---------|
| `snap_model.md` | Authoritative Snap record |
| `product_roadmap.md` | Authoritative phased roadmap |
| `implementation_readiness.md` | Build sequence and rollback |
| `feature_gate.md` | Gate before any feature |
| `ux_doctrine.md` | Card layout + RETURN actions |
| `field_validation_log.md` | Verified field observations |
