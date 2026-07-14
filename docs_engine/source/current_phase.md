# Current Phase



**Phase:** Wave 1 — Core Value & UX Polish  

**Status:** Sprint 5 (Favorite) **Completed**  

**MVP 0.1 stabilized:** 2026-07-07  

**Public presence:** 2026-07-11 — https://mapsnap.se  

**Roadmap ratified:** 2026-07-12  

**Wave 1 Sprint 1 shipped:** 2026-07-13  

**Wave 1 Sprint 1 field validated:** 2026-07-14 (Field Validation 0005)  

**Wave 1 Sprint 2A completed:** 2026-07-14

**Wave 1 Sprint 2B completed:** 2026-07-14

**Wave 1 Sprint 3 completed:** 2026-07-14

**Wave 1 Sprint 4 completed:** 2026-07-14

**Wave 1 Sprint 4 share text polish:** 2026-07-14

**Wave 1 Sprint 5 completed:** 2026-07-14



## Goal



Mark important Snaps with a post-capture favorite toggle — metadata only, no filter or reorder yet.



**Sprint 5 completed.** Each snap card shows a star toggle in the upper-right corner. Favorite persists via `saveSnap()`; optimistic UI with honest error on failure.



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



## Wave 1 Sprint 1 — Completed



- [x] Hero microcopy: *"Tryck för position · Håll inne för position + bild"*

- [x] Coordinated SNAP feedback (~650ms): compress, haptic, sound, glow, pulse, radial sonar waves, "Snap sparad"

- [x] `prefers-reduced-motion` respected

- [x] Persistence not blocked by animation

- [x] Field Validation Log (`field_validation_log.md`) — MapSnap only

- [x] Protected SNAP contract unchanged (ADR-012)

- [x] Real-device field validation — Pixel 9a, Redmi Note 9 (Field Validation 0005)



## Wave 1 Sprint 2A — Completed



- [x] Authoritative `Snap` type (`types/place.ts`)

- [x] Validation + normalization (`lib/snapModel.ts`)

- [x] Idempotent migration on load (legacy aliases, trim, defaults)

- [x] Backup/import compatibility documented (`snap_model.md`, ADR-019)

- [x] IndexedDB v1 unchanged — schemaless documents

- [x] No favorite/tags/share/save-image UI



## Wave 1 Sprint 2B — Completed



- [x] Post-capture "Redigera" action on snap cards

- [x] Optional title (`name`) and notes (`note`) edit form — Swedish copy

- [x] Display: title fallback "Sparad plats"; notes with line clamp in list

- [x] Save via `saveSnap()` — preserves id, coordinates, timestamp, image, accuracy, unknown keys

- [x] Cancel discards unsaved edits

- [x] No metadata required before capture; SNAP contract unchanged



## Wave 1 Sprint 3 — Completed



- [x] "Spara bild" action on snap cards with `photoDataUrl`

- [x] Hidden for position-only snaps

- [x] Placement: after Google Maps / Waze, before Redigera / Ta bort

- [x] Download via blob URL on desktop and Android; Web Share with file on iOS

- [x] Filename: `MapSnap_YYYY-MM-DD_HH-mm-ss.jpg` (fallback `MapSnap.jpg`)

- [x] Success: "Bilden sparades"; failure: "Kunde inte spara bilden"

- [x] Save is copy-only — never mutates or deletes the Snap



## Wave 1 Sprint 4 — Completed



- [x] "Dela" action on every snap card (position-only and image snaps)

- [x] Placement: after Google Maps / Waze and Spara bild (when image), before Redigera / Ta bort

- [x] Native share: title (fallback "Sparad plats"), notes when present, coordinates, Google Maps URL, image file when supported

- [x] Share text polish: `📍 Position`, `🌍 Öppna plats`; no "Image attached." or duplicate map labels (field-validated SMS)

- [x] Unavailable: "Delning stöds inte i den här webbläsaren" — no silent failure

- [x] Share is read-only — never mutates or deletes the Snap



## Wave 1 Sprint 5 — Completed



- [x] Favorite star toggle on every snap card (upper-right)

- [x] Optimistic toggle via `saveSnap()` — `favorite: true` only; field removed when false

- [x] Works with or without photo; capture and share unchanged

- [x] No reorder, filter, or search

- [x] Accessibility: 44px target; Swedish aria-labels; keyboard accessible

- [x] Error recovery: restore previous state on save failure



## Official Roadmap Summary

| Wave | Focus | Backend |
|------|-------|---------|
| 0 | Baseline reconciliation | No |
| 1 | Core value (UX polish, title, notes, save image, Quick Share, favorite, compact cards) | No |
| 2 | Organization / early Discover (search, sort, filter, tags) | No |
| 3 | Snaptisers / contextual Discover | No for MVP |
| 4 | Image + Professional Share | No |
| 5 | Protect (backup, restore, data-loss education) | No |
| 6 | MapSnap-to-MapSnap Share / cloud | Deferred |

**Core Pillars:** Capture, Enrich, Share, Protect (+ Discover emerging). ADR-020.

Full detail: `product_roadmap.md`.



## Next (when explicitly scoped)



**Wave 1** — Compact Cards as separately scoped pass per `implementation_readiness.md` order 8.



See `next_task.md`.
