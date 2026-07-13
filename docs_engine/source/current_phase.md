# Current Phase

**Phase:** Wave 1 — Core Value & UX Polish  
**Status:** Sprint 1 (UX Polish) complete  
**MVP 0.1 stabilized:** 2026-07-07  
**Public presence:** 2026-07-11 — https://mapsnap.se  
**Roadmap ratified:** 2026-07-12  
**Wave 1 Sprint 1 shipped:** 2026-07-13

## Goal

Ship Wave 1 UX polish — usage instruction and coordinated SNAP feedback — without altering the protected SNAP interaction contract.

**Sprint 1 achieved.** Usage microcopy and coordinated feedback sequence shipped. Field Validation Log introduced.

## MVP 0.1 Baseline (locked — interaction unchanged)

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

## Wave 1 Sprint 1 — Shipped

- [x] Hero microcopy: *"Tryck för position · Håll inne för position + bild"*
- [x] Coordinated SNAP feedback (~650ms): compress, haptic, sound, glow, pulse, radial sonar waves, "Snap sparad"
- [x] `prefers-reduced-motion` respected
- [x] Persistence not blocked by animation
- [x] Field Validation Log (`field_validation_log.md`) — MapSnap only
- [x] Protected SNAP contract unchanged (ADR-012)

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

## Next (when explicitly scoped)

**Wave 1 Sprint 2+** — title, notes, share, save image, favorite per `implementation_readiness.md` orders 4–7.

See `next_task.md`.
