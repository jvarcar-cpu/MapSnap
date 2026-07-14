# Current Phase



**Phase:** Wave 1 — Core Value & UX Polish  

**Status:** Sprint 4 (Share Snap) **Completed**  

**MVP 0.1 stabilized:** 2026-07-07  

**Public presence:** 2026-07-11 — https://mapsnap.se  

**Roadmap ratified:** 2026-07-12  

**Wave 1 Sprint 1 shipped:** 2026-07-13  

**Wave 1 Sprint 1 field validated:** 2026-07-14 (Field Validation 0005)  

**Wave 1 Sprint 2A completed:** 2026-07-14

**Wave 1 Sprint 2B completed:** 2026-07-14

**Wave 1 Sprint 3 completed:** 2026-07-14

**Wave 1 Sprint 4 completed:** 2026-07-14



## Goal



Ship native share for image Snaps so users can send title, notes, coordinates, map link, and photo in one action — without manual assembly.



**Sprint 4 completed.** Snaps with `photoDataUrl` show "Dela" after "Spara bild". Share uses Web Share API; unavailable browsers receive explicit Swedish feedback.



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



- [x] "Dela" action on snap cards with `photoDataUrl`

- [x] Hidden for position-only snaps

- [x] Placement: after Google Maps / Waze and Spara bild, before Redigera / Ta bort

- [x] Native share: title (fallback "Sparad plats"), notes when present, coordinates, Google Maps URL, image file when supported

- [x] Unavailable: "Delning stöds inte i den här webbläsaren" — no silent failure

- [x] Share is read-only — never mutates or deletes the Snap



## Official Roadmap Summary



| Wave | Focus | Backend |

|------|-------|---------|

| 0 | Baseline reconciliation | No |

| 1 | Core value + UX polish (instruction, feedback, title, notes, share, save image, favorite, compact cards) | No |

| 2 | Organization (search, sort, filter, tags) | No |

| 3 | Snaptisers (time MVP; proximity experimental) | No for MVP |

| 4 | Image experience | No |

| 5 | Backend / cloud | Deferred |

| — | Data Protection (future) | Documented — not implemented |



Full detail: `product_roadmap.md`.



## Next (when explicitly scoped)



**Wave 1** — Favorite or Compact Cards as separately scoped passes per `implementation_readiness.md`.



See `next_task.md`.
