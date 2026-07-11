# Next Task

**Updated:** 2026-07-12  
**Pass type:** None active — Product Roadmap & Governance pass complete

## Recommended Next Task

**Wave 1 — Usage Instruction (Feature or UX Pass)** — when explicitly scoped.

The official roadmap is ratified. Do not start implementation until:

1. A pass type is declared in `current_phase.md`
2. Generated steering docs are current (`docs_engine/output/`)
3. Feature Gate answers documented for the specific unit

**First implementation unit:** Hero microcopy — *"Tryck för position · Håll inne för position + bild"* (see `implementation_readiness.md` order 2).

**Prerequisites already met:**

- Wave 0 baseline reconciliation — `baseline_reconciliation.md`
- Roadmap, feature gate, ADRs, readiness plan in place

## Not Next

- Backend or cloud sync (Wave 5 — deferred)
- Changing SNAP short/long-press contract
- Pre-capture forms or menus
- Mixed pass types in one change set
- Implementation before steering outputs regenerated

## Reference

| Document | Purpose |
|----------|---------|
| `product_roadmap.md` | Authoritative phased roadmap |
| `implementation_readiness.md` | Build sequence and rollback |
| `feature_gate.md` | Gate before any feature |
| `baseline_reconciliation.md` | Verified current state |
