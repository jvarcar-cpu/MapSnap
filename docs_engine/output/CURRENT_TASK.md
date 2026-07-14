# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-07-14

## Status

Wave 1 Sprint 5 (Favorite) **Completed**. No active implementation pass.

## Phase

Wave 1 — Core Value & UX Polish. Sprint 5 closed 2026-07-14.

## Pass Type

None active.

## Task

**When scoped:** Wave 1 — Compact Cards per `implementation_readiness.md` order 8.

## Prerequisites

- [x] Official roadmap in `product_roadmap.md` (ADR-020 lifecycle pillars)
- [x] Feature gate in `feature_gate.md` (Core Pillar alignment)
- [x] Wave 0 baseline reconciliation complete
- [x] ADRs 012–020 recorded
- [x] Wave 1 Sprint 1 UX polish shipped
- [x] Field Validation Log introduced
- [x] Wave 1 Sprint 1 field validation complete (Field Validation 0005)
- [x] Snap model prepared (`snap_model.md`, ADR-019, `lib/snapModel.ts`)
- [x] Title + notes UI shipped (Sprint 2B)
- [x] Save image shipped (Sprint 3)
- [x] Quick Share shipped (Sprint 4)
- [x] Quick Share SMS field validated (Field Validation 0006)
- [x] Favorite toggle shipped (Sprint 5)

## Done When (Sprint 5 — complete)

- [x] Star toggle on every snap card (upper-right)
- [x] Optimistic toggle; `favorite: true` only; field removed when false
- [x] Persists via `saveSnap()`; survives reload and backup round-trip
- [x] Does not mutate title, note, coordinates, photo, createdAt
- [x] Capture, share, save image unchanged
- [x] No reorder, filter, or search
- [x] Accessibility: 44px target; Swedish aria-labels
- [x] Build, docs validation, and tests pass

## Reference

`implementation_readiness.md` order 8 · `product_roadmap.md` Wave 1 item 6 (compact cards) · `ux_doctrine.md`
