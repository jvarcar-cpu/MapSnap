# MapSnap — Current Task

> Generated from docs_engine source. Do not hand-edit.

**Updated:** 2026-08-02

## Status

Wave 2 Compatibility Feature Pass complete — Capture Reliability and PWA Installation Guidance shipped (implementation + automated validation). iPhone Field Validation pending (Field Validation 0007). Awaiting Tags scoping.

## Phase

Wave 2 — Organization / Early Discover. Capture Reliability + PWA install guidance complete. Sprint 4 (Filter) previously complete. Product Integration methodology integrated.

## Pass Type

None active. Declare Feature Pass in `current_phase.md` before starting Tags.

## Context

Capture Reliability shipped 2026-08-02: long-press progress feedback, user-gesture-safe camera activation on release, Öppna kamera fallback, progressive PWA install guidance (ADR-023). Filter shipped 2026-07-14. Product Integration (2026-07-25): methodology only. No Tags, backend, or cloud. iPhone capability not marked field-validated.

## Next Sprint — Tags

**Scope:** Lightweight tag list on snap. See `implementation_readiness.md` order 10, `product_roadmap.md` item 4.

**Not in scope:** SNAP interaction contract meaning changes, backend, Professional Share, Protect, collections, Foundation constitutional architecture.

## Prerequisites

- [x] Wave 1 institutionally closed — reconciliation verified 2026-07-14
- [x] Compact Cards Iteration 1 shipped — banner compression, divider, spacing
- [x] Search shipped — title/notes filter, search empty state, clear button
- [x] Smart Sorting shipped — Nyast / Äldst / Närmast, memoized sort, nearest GPS
- [x] Filter shipped — Alla / Favoriter / Med bild, memoized filter, pipeline order preserved
- [x] Capture Reliability + PWA install guidance shipped — ADR-023; Field Validation 0007 recorded
- [x] WP-AGSE-MSP-0001 Product Integration complete — methodology only (ADR-022)
- [x] Generated steering docs current (`docs_engine/output/`)
- [ ] iPhone Field Validation for Capture Reliability (recommended when device available)
- [ ] Feature Gate answers documented for Tags

## Acceptance Criteria — Capture Reliability (shipped — implementation)

- [x] Short press remains position-only
- [x] Long-press progress feedback; arm at ~600ms; activate camera on release
- [x] Öppna kamera fallback when activation fails
- [x] Progressive install guidance; hidden when standalone; dismissible; engagement-gated
- [x] Unit tests for gesture + install helpers
- [x] Docs, build, baseline verification required at close-out
- [ ] iPhone Safari Field Validation — pending

## Reference

`implementation_readiness.md` order 9c · `product_roadmap.md` Wave 2 item 3b · `capture_doctrine.md` · `ux_doctrine.md` · `field_validation_log.md` · `next_task.md` · `knowledge_continuity.md`
