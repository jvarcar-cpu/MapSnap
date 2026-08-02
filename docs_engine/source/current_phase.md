# Current Phase



**Phase:** Wave 2 — Organization / Early Discover  

**Pass type:** None active — Tags Documentation Pass complete 2026-08-02

**Status:** **Documentation Pass complete** — Tags institutionalized (definition, Wave 2 scope, UX principles, Feature Gate). **Feature Pass — Tags** ready to begin when declared. No Tags UI or code implementation in this pass.

**Previous:** Install Guidance Repositioning UX Pass complete 2026-08-02 (ADR-024); Capture Reliability Feature Pass complete 2026-08-02 (ADR-023); WP-AGSE-MSP-0001 Product Integration complete 2026-07-25  

**Next product feature:** **Feature Pass — Tags** — ready to begin

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



## Goal

Tags Documentation Pass complete. Feature Gate passed. Next authorized work is **Feature Pass — Tags**. Do not implement Tags until Feature Pass is declared. Do not move Discover. Do not expand Wave 2 Tags scope beyond institutionalized exclusions. Preserve Field Validation 0007 as pending until physical iPhone validation.



## Feature Gate — Tags (Documentation Pass)

**Pillars:** ENRICH (strengthened) · DISCOVER (strengthened, bridge)  
**Neutral:** Share · Protect  
**No impact:** Capture  
**Experience qualities:** Remember (Enrich) · Return via rediscovery (Discover bridge)  
**Affects SNAP interaction contract:** No — post-capture Enrich only (ADR-012)

| # | Question | Answer |
|---|----------|--------|
| 1 | Slow or complicate the Snap moment? | No — never before SNAP; edit after capture |
| 2 | Strengthen a Core Pillar without weakening others? | Yes — Enrich + Discover bridge; Capture/Share/Protect not weakened |
| 3 | Understandable without a manual? | Yes — free-form tags in post-capture edit |
| 4 | Preserve offline / local-first? | Yes — optional `tags` on Snap; no backend |
| 5 | Disproportionate interface weight? | No — lightweight card metadata; ~five recommended |
| 6 | Live after capture? | Yes — Enrich only |
| 7 | Preserve calm / minimal identity? | Yes — no hierarchy/colors/clouds/AI |

**Discover guardrails:** Helps rediscover own tagged content via search — not social feed, not public place discovery.

**Guardrails:** None violated. **Approved for Feature Pass** under Wave 2 scope only.

Full detail: `product_roadmap.md` Wave 2 item 4 · `implementation_readiness.md` order 10.



## Wave 2 Docs Pass — Tags Institutionalization — Completed

- [x] Pass type: Documentation Pass declared
- [x] Tags definition institutionalized
- [x] Lifecycle role: Enrich with Discover bridge documented
- [x] Wave 2 in-scope / out-of-scope exclusions documented
- [x] UX principles institutionalized
- [x] Feature Gate completed — Capture no impact; Enrich strengthened; Share/Protect neutral; Discover strengthened
- [x] Implementation readiness updated — Feature Pass — Tags next
- [x] Roadmap updated — Tags remain Wave 2; Discover not moved
- [x] ADR review — no new ADR (feature definition only; ADR-019 covers optional schema)
- [x] Baseline / reconciliation updated for institutional decisions only — no implementation claimed
- [x] Docs Engine outputs regenerated; `validate_docs.mjs` pass
- [ ] Feature Pass — Tags implementation — **ready to begin** (not started)



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



## Wave 2 Compatibility — Capture Reliability and PWA Installation Guidance — Completed (implementation)

- [x] Pass type: Feature Pass declared
- [x] Long-press progress feedback — prompt, cancellable, reduced-motion aware
- [x] User-gesture-safe camera activation on release after threshold
- [x] Compact Öppna kamera direct-action fallback
- [x] Progressive PWA install guidance — prompt / iOS manual / Android manual / hidden standalone
- [x] Dismissal persistence; engagement-gated placement
- [x] Unit tests for gesture + install helpers
- [x] Docs Engine source + outputs synchronized; ADR-023
- [x] Field Validation 0007 recorded (verified / implemented / pending)
- [ ] iPhone Safari Field Validation — pending (no device this pass)
- [ ] Pixel install fallback + Redmi regression — pending physical retest
- [x] Tags documentation institutionalized (2026-08-02); UI not started

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
- [x] Tags documentation institutionalized (2026-08-02); UI not started



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

- [x] Share, favorite, edit, save image, maps, delete behaviour unchanged



## Official Roadmap Summary

| Wave | Focus | Backend |
|------|-------|---------|
| 0 | Baseline reconciliation | No |
| 1 | Core value (UX polish, title, notes, save image, Quick Share, favorite, signature, compact cards) | No |
| 2 | Organization / early Discover (search, sort, filter, tags) + Capture Reliability compatibility pass | No |
| 3 | Snaptisers / contextual Discover | No for MVP |
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
- [ ] Square thumbnail + detail view — Iteration 2 (ADR-017)
- [ ] Measurable recognition test — Iteration 2 field validation

## Wave 2 Sprint 2 — Search — Completed

- [x] Pass type: Feature Pass declared
- [x] Search field above snap list — title and notes only; case-insensitive partial match
- [x] Real-time filter on loaded collection — local only; no backend
- [x] Search empty state: "Inga Snappar matchar din sökning."
- [x] Clear button, search icon, Swedish placeholder
- [x] Memoized filtering; no filter or tags UI

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

## Next (ready to begin)

**Feature Pass — Tags** — create/edit/remove/display tags; search includes tags with title and notes. See `next_task.md`, `implementation_readiness.md` order 10, and `CURRENT_TASK.md`.
