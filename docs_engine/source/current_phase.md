# Current Phase

**Phase:** Post-MVP 0.1 — Product Roadmap & Governance  
**Status:** Roadmap ratified — implementation not started  
**MVP 0.1 stabilized:** 2026-07-07  
**Public presence:** 2026-07-11 — https://mapsnap.se  
**Roadmap ratified:** 2026-07-12

## Goal

Establish authoritative product roadmap, feature gate, pillars, and implementation readiness inside docs_engine — without shipping product features in this pass.

**Achieved.** See `product_roadmap.md`, `feature_gate.md`, `implementation_readiness.md`, ADR-012–018.

## MVP 0.1 Baseline (locked — unchanged)

- SNAP button visible, large, circular, green, 3D
- Short tap saves GPS snap to IndexedDB
- Long press (~600ms) opens camera/file capture + GPS snap with `photoDataUrl`
- Snaps persist in IndexedDB (`mapsnap-db` / `snaps`)
- Legacy `mapsnap.snaps.v1` localStorage migrates to IndexedDB on load
- JSON backup/import/export works
- Google Maps and Waze links work (RETURN)
- Delete works
- Empty state encourages first Snap
- Baseline verification script passes (`scripts/verify-baseline.mjs`)

See `stable_baseline.md` and `baseline_reconciliation.md`.

## Official Roadmap Summary

| Wave | Focus | Backend |
|------|-------|---------|
| 0 | Baseline reconciliation | No |
| 1 | Core value + UX polish (instruction, feedback, title, notes, share, save image, favorite, compact cards) | No |
| 2 | Organization (search, sort, filter, tags) | No |
| 3 | Snaptisers (time MVP; proximity experimental) | No for MVP |
| 4 | Image experience | No |
| 5 | Backend / cloud | Deferred |

Full detail: `product_roadmap.md`.

## In Scope This Phase (complete)

- [x] Repository and implementation inspection
- [x] Baseline reconciliation documented
- [x] Product positioning and four pillars formalized
- [x] Feature Gate and Capture Golden Rule
- [x] Protected SNAP interaction contract (ADR-012)
- [x] Phased roadmap with prioritization model
- [x] Snaptisers on roadmap (ADR-015)
- [x] Image save in Wave 1 (ADR-014)
- [x] Radial-wave feedback documented (ADR-018)
- [x] Implementation readiness plan
- [x] ADRs for major decisions
- [x] Identity updates (product-approved this pass)

## Out of Scope This Phase

- Product feature implementation
- Backend development
- Changing SNAP gestures

## Next Phase (when explicitly scoped)

**Wave 1 — Core Value & UX Polish** — start with usage instruction, then feedback polish, then enrichment features per `implementation_readiness.md`.

See `next_task.md`.
