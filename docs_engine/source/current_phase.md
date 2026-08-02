# Current Phase



**Phase:** Wave 3 Discovery  

**Pass type:** None active — Reconciliation & Ratification Pass — Wave 2 complete 2026-08-02

**Status:** **Wave 2 — Institutionally Complete.** Implementation complete. Documentation synchronized. Baseline synchronized. Verification complete. Pixel field validation complete. iPhone Field Validation 0007 pending only.

**Previous:** Feature Pass — Tags shipped 2026-08-02; Tags Documentation Pass complete 2026-08-02; Install Guidance Repositioning UX Pass complete 2026-08-02 (ADR-024); Capture Reliability Feature Pass complete 2026-08-02 (ADR-023); WP-AGSE-MSP-0001 Product Integration complete 2026-07-25  

**Next product feature:** Order 11 — Snaptiser feasibility spike (research) when scoped — Wave 3 Discovery only; do not begin implementation

**Product Integration:** WP-AGSE-MSP-0001 complete — Shared Discovery / Discovery Separation / Product Integration methodology only; product architecture unchanged; Foundation capability ownership remains outside MapSnap

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

**Wave 1 MapSnap Signature completed:** 2026-07-14

**Wave 1 Snap Card Polish completed:** 2026-07-14

**Wave 1 Action Icon Polish completed:** 2026-07-14

**Wave 2 Institutionally Complete:** 2026-08-02



## Goal

Wave 2 is institutionally closed. Active planning phase is **Wave 3 Discovery** — scope Snaptiser feasibility and contextual Discover without implementation. Preserve Field Validation 0007 iPhone items as pending until physical iPhone validation. Do not expand Tags beyond shipped exclusions. Do not advance Wave 3 into Feature Pass until discovery is complete and explicitly scoped.



## Wave 2 — Institutional Close-Out — Completed

- [x] Compact Cards Iteration 1
- [x] Search (title, notes, tags)
- [x] Smart Sorting
- [x] Filter
- [x] Capture Reliability (ADR-023)
- [x] Progressive Install Guidance (ADR-023)
- [x] Install Guidance Repositioning / Contextual Guidance Principle (ADR-024)
- [x] Tags (Feature Pass)
- [x] Documentation synchronized
- [x] Baseline synchronized
- [x] Verification complete (desktop + docs)
- [x] Pixel field validation complete
- [ ] iPhone Field Validation 0007 — pending only
- [x] Chronicle CHRONICLE-MSN-0002 recorded
- [x] Roadmap status: Wave 2 completed implementation
- [x] Active phase: Wave 3 Discovery



## Field Validation Status (institutional)

| Surface | Status |
|---------|--------|
| Desktop | ✓ verified |
| Android / Pixel | ✓ physically validated |
| iPhone | Field Validation 0007 remains pending |



## MVP 0.1 Baseline (locked — interaction contract meaning unchanged)



- SNAP button visible, large, circular, green, 3D

- Short tap saves GPS snap to IndexedDB

- Long press (~600ms) opens camera/file capture + GPS snap with `photoDataUrl` (activation on release after arming; Öppna kamera fallback when needed)

- Snaps persist in IndexedDB (`mapsnap-db` / `snaps`)

- Legacy `mapsnap.snaps.v1` localStorage migrates to IndexedDB on load

- JSON backup/import/export works

- Google Maps and Waze links work (RETURN)

- Delete works

- Empty state encourages first Snap

- Baseline verification script passes (`scripts/verify-baseline.mjs`)



See `stable_baseline.md` and `baseline_reconciliation.md`.



## Wave 2 Compatibility — Capture Reliability and PWA Installation Guidance — Completed

- [x] Pass type: Feature Pass declared
- [x] Long-press progress feedback — prompt, cancellable, reduced-motion aware
- [x] User-gesture-safe camera activation on release after threshold
- [x] Compact Öppna kamera direct-action fallback
- [x] Progressive PWA install guidance — prompt / iOS manual / Android manual / hidden standalone
- [x] Dismissal persistence; engagement-gated placement
- [x] Unit tests for gesture + install helpers
- [x] Docs Engine source + outputs synchronized; ADR-023
- [x] Field Validation 0007 recorded
- [x] Desktop verified; Android / Pixel physically validated
- [ ] iPhone Safari Field Validation — pending (do not claim complete)

## Wave 2 UX Pass — Install Guidance Repositioning — Completed

- [x] Pass type: UX Pass declared
- [x] Feature Gate documented before implementation
- [x] Install guidance moved beneath SNAP instruction
- [x] Removed from lower backup / utility area
- [x] Approved compact copy (Rekommenderas / Installera MapSnap / benefits)
- [x] Engagement gate + platform modes + dismiss preserved (ADR-023)
- [x] Reveal after Snap feedback; calm enter/exit; reduced-motion aware
- [x] Contextual Guidance Principle in `ux_doctrine.md`
- [x] ADR-024 recorded
- [x] Unit tests for reveal-delay helper + placement verification script
- [x] Docs outputs, validation, baseline verification
- [ ] iPhone Field Validation 0007 — still pending (not claimed)



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

- [x] Display: user title when present; MapSnap signature always; notes with line clamp in list

- [x] Save via `saveSnap()` — preserves id, coordinates, timestamp, image, accuracy, unknown keys

- [x] Cancel discards unsaved edits

- [x] No metadata required before capture; SNAP contract unchanged



## Wave 1 Sprint 3 — Completed



- [x] "Spara bild" action on snap cards with `photoDataUrl`

- [x] Hidden for position-only snaps

- [x] Two-column action grid row 2 (with image): Spara bild beside Ta bort; hidden without `photoDataUrl`

- [x] Download via blob URL on desktop and Android; Web Share with file on iOS

- [x] Filename: `MapSnap_YYYY-MM-DD_HH-mm-ss.jpg` (fallback `MapSnap.jpg`)

- [x] Success: "Bilden sparades"; failure: "Kunde inte spara bilden"

- [x] Save is copy-only — never mutates or deletes the Snap



## Wave 1 Sprint 4 — Completed



- [x] "Dela" action on every snap card (position-only and image snaps)

- [x] Native share: title (user title or "MapSnap" fallback), notes when present, coordinates, Google Maps URL, image file when supported

- [x] Share text: `📍 SnapSpot`, `🌍 Öppna i Google Maps`; no "Image attached." or duplicate map labels (field-validated SMS — Field Validation 0006)

- [x] Unavailable: "Delning stöds inte i den här webbläsaren" — no silent failure

- [x] Share is read-only — never mutates or deletes the Snap



## Wave 1 Sprint 5 — Completed



- [x] Favorite star toggle on every snap card (upper-right)

- [x] Optimistic toggle via `saveSnap()` — `favorite: true` only; field removed when false

- [x] Works with or without photo; capture and share unchanged

- [x] No reorder, filter, or search

- [x] Accessibility: 44px target; Swedish aria-labels; keyboard accessible

- [x] Error recovery: restore previous state on save failure



## Wave 1 — MapSnap Signature — Completed



- [x] Permanent "MapSnap" text signature upper-right on every snap card

- [x] User title left only when explicitly set; empty title area when absent

- [x] No card fallback "Sparad plats" or similar generic titles

- [x] Quick Share fallback "MapSnap" when no user title

- [x] Favorite toggle unchanged; header spacing avoids collision with signature

- [x] Title/notes edit flow unchanged; ADR-021 recorded

- [x] Tests and baseline verification updated



## Wave 1 — Snap Card Polish — Completed



- [x] Two-column action grid — Redigera / Dela, Spara bild / Ta bort; equal-width buttons; 48px touch targets preserved

- [x] Two-column action layout and visually lighter buttons — reduced border weight, tighter grid spacing

- [x] Card action icons — emoji in this pass; superseded by SVG in Action Icon Polish (0.2.13–0.2.14)

- [x] SnapSpot canonical location label on card (`📍 SnapSpot`) — category not shown on card

- [x] Category field unchanged in data model and capture defaults

- [x] Share, favorite, edit, save image, maps, delete behaviour unchanged

- [x] Prepares foundation for Compact Cards — no compact layout started



## Wave 1 — Action Icon Polish — Completed



- [x] Google Maps official brand icon beside label — link behaviour unchanged

- [x] Waze official brand icon beside label — link behaviour unchanged

- [x] SVG icons on card actions — Redigera, Dela (Share2), Spara bild (Download), Ta bort (~18px, subtle accent colors on icons only)

- [x] Layout, ordering, spacing, and 48px touch targets preserved

- [x] aria-label, keyboard navigation, focus ring, minimum 44px touch target preserved

- [x] Share, favorite, save image, maps, delete behaviour unchanged



## Official Roadmap Summary

| Wave | Focus | Backend |
|------|-------|---------|
| 0 | Baseline reconciliation | No |
| 1 | Core value (UX polish, title, notes, save image, Quick Share, favorite, signature, compact cards) | No |
| 2 | Organization / early Discover (search, sort, filter, tags) + Capture Reliability compatibility pass — **Institutionally Complete** | No |
| 3 | Snaptisers / contextual Discover — **Discovery active** | No for MVP |
| 4 | Image + Professional Share | No |
| 5 | Protect (backup, restore, data-loss education) | No |
| 6 | MapSnap-to-MapSnap Share / cloud | Deferred |

**Core Pillars:** Capture, Enrich, Share, Protect (+ Discover emerging). ADR-020.

Full detail: `product_roadmap.md`.



## Wave 2 Sprint 1 — Compact Cards Iteration 1 — Completed

- [x] Pass type: UX Pass declared
- [x] Reduced card height — tighter padding, metadata spacing, list gap
- [x] Photo banner aspect `3:1` (was `2.4:1`) — recognition preserved via `object-cover`
- [x] Navigation / action groups separated by subtle divider — no labels
- [x] All card actions preserved: favorite, maps, edit, share, save image, delete
- [x] 48px touch targets and SVG icon system unchanged
- [x] MapSnap signature, SnapSpot label, typography hierarchy preserved
- [ ] Square thumbnail + detail view — Iteration 2 (ADR-017) — deferred beyond Wave 2 close
- [ ] Measurable recognition test — Iteration 2 field validation

## Wave 2 Sprint 2 — Search — Completed

- [x] Pass type: Feature Pass declared
- [x] Search field above snap list — title, notes, and tags; case-insensitive partial match
- [x] Real-time filter on loaded collection — local only; no backend
- [x] Search empty state: "Inga Snappar matchar din sökning."
- [x] Clear button, search icon, Swedish placeholder
- [x] Memoized filtering

## Wave 2 Sprint 3 — Smart Sorting — Completed

- [x] Pass type: Feature Pass declared
- [x] Sort control below filter when snaps exist — Nyast, Äldst, Närmast
- [x] Client-side reorder only — applies after search and filter; memoized `sortSnaps()`
- [x] Nearest uses one-time GPS read — no continuous tracking
- [x] Location failure reverts to Nyast with calm Swedish message
- [x] No tags UI, backend, or cloud

## Wave 2 Sprint 4 — Filter — Completed

- [x] Pass type: Feature Pass declared
- [x] Filter control below search when snaps exist — Alla, Favoriter, Med bild
- [x] Client-side filter only — applies after search, before sort; memoized `filterSnapsByMode()`
- [x] Works with search and sort — pipeline search → filter → sort → render
- [x] Filter empty states — calm Swedish messages; no errors
- [x] Rollback path: hide filter control without data loss
- [x] No tags UI, backend, or cloud

## Wave 2 — Feature Pass: Tags — Completed

- [x] Pass type: Feature Pass declared and shipped
- [x] Create, edit, remove tags after capture (Redigera — Titel / Anteckning / Taggar)
- [x] Tags displayed on Snap card — subtle pills; metadata weight only
- [x] Tags never before SNAP; Capture unchanged
- [x] Free-form tags; ~five recommended without hard storage limit
- [x] Search includes tags with title and notes; memoization preserved
- [x] Normalization: whitespace, empties, case-insensitive dedupe
- [x] Backup/import / legacy snaps without tags compatible
- [x] No hierarchy, colors, groups, AI, Discover engine, backend, or cloud
- [x] Behaviour + visual regression; docs synchronized

## Next (Wave 3 Discovery — planning only)

**Order 11 — Snaptiser feasibility spike** (research only) when scoped. See `next_task.md` and `implementation_readiness.md`. Do not begin Wave 3 implementation in this phase.
