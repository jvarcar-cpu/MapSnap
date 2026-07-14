# MapSnap — Current Baseline

> Generated reference to locked MVP baseline. Full detail: `docs_engine/source/stable_baseline.md`

**Locked:** 2026-06-28  
**Updated:** 2026-07-14  
**Status:** MVP 0.1 stable — Wave 2 Sprint 1 Compact Cards Iteration 1 shipped

## Wave Summary

### Wave 1 — Completed

- ✓ Capture
- ✓ Camera
- ✓ Photo Snap
- ✓ Title
- ✓ Notes
- ✓ Favorite
- ✓ Save Image
- ✓ Quick Share
- ✓ Google Maps
- ✓ Waze
- ✓ MapSnap Signature
- ✓ SnapSpot
- ✓ Action Button Polish
- ✓ Native Icons

### Wave 2 Sprint 1 — Completed

- ✓ Compact Cards Iteration 1 — reduced-height banner layout, action-group divider

### Current Status

Wave 2 in progress. Compact Cards Iteration 2 (square thumbnail + detail view) next.

## Interaction Baseline

| Interaction | Requirement |
|-------------|-------------|
| Short tap | GPS capture → IndexedDB save → list update → "Snap sparad" toast |
| Long press (~600ms) | Camera/file input → photo as `photoDataUrl` → GPS → save |
| Maps | Google Maps and Waze open with saved coordinates |
| Delete | Removes from list and IndexedDB |
| Edit | "Redigera" on card → optional title (`name`) + notes (`note`) → `saveSnap()` |
| Favorite | Star toggle upper-right overlay on card → optimistic `saveSnap()`; `favorite: true` only |
| Save image | "Spara bild" on cards with `photoDataUrl` — device copy only; hidden without image |
| Share | "Dela" on every snap card — native Web Share; text + Google Maps link always; image file when `photoDataUrl` present |
| Storage | IndexedDB primary; legacy localStorage migrates on load; Snap normalization on load |
| Backup | JSON array export/import/merge by id (`mapsnap-snaps-array-v1`) |

## Visual Baseline

| Element | Requirement |
|---------|-------------|
| SNAP button | Circular, large (~70% width, max 320px), green radial 3D gradient |
| Hero | Title "MapSnap"; instruction *"Tryck för position · Håll inne för position + bild"* |
| List | Header "MINA SNAPPAR", compact styled cards; user title left when present; **MapSnap signature** upper-right always; notes line-clamped; list gap `gap-3` |
| Card photo | Banner aspect `3:1` (Iteration 1); `object-cover`; square thumbnail deferred |
| Card actions | Favorite star (overlay) → Navigation: Maps (brand icons) → divider → Actions: two-column grid Redigera / Dela, Spara bild / Ta bort (Spara bild if image); SVG icons ~18px |
| Card location | `📍 SnapSpot` — category not shown on card (metadata only) |
| Backup panel | Dashed border, rounded-2xl |
| Permission card | Rounded-3xl, elevated, retry button |

## Field Validation

- Field Validation 0005 — UX polish on Pixel 9a and Redmi Note 9 (2026-07-14)
- Field Validation 0006 — Quick Share SMS on Pixel 9a (2026-07-14)

## Snap Model (Sprint 2A)

- Authoritative type: `Snap` (`types/place.ts`); product title → `name`, notes → `note`
- Normalization: `lib/snapModel.ts` — automatic, idempotent, no user interaction
- IndexedDB version `1` unchanged

## Title + Notes UI (Sprint 2B)

- Post-capture only — no forms before SNAP
- Edit: inline form via "Redigera"; Swedish labels (Titel, Anteckning, Spara, Avbryt)
- Persistence: `saveSnap()` preserves all non-edited fields

## Save Image (Sprint 3)

- Post-capture only — copy of stored `photoDataUrl`; never mutates Snap
- Filename: `MapSnap_YYYY-MM-DD_HH-mm-ss.jpg` (fallback `MapSnap.jpg`)
- Platform: blob download (desktop/Android); Web Share with file (iOS)
- Feedback: "Bilden sparades" / "Kunde inte spara bilden"

## Quick Share (Sprint 4)

- Post-capture only — derived payload from stored Snap; never mutates Snap
- Visible on every snap card
- Payload: title (user title or "MapSnap" fallback), notes if present, `📍 SnapSpot` + coordinates, `🌍 Öppna i Google Maps` + single Google Maps URL; image file when `photoDataUrl` present and `canShare` supports files
- Share text omits "Image attached." and duplicate map labels — image and SMS map preview supply visual/navigation context
- Unavailable: "Delning stöds inte i den här webbläsaren"
- Code: `lib/shareSnap.ts`

## Favorite (Sprint 5)

- Post-capture only — star toggle on every card; not on SNAP button
- Optimistic UI; `saveSnap()` persists `favorite: true` or removes field
- No reorder, filter, or search in this sprint
- Error: restore previous state; "Kunde inte spara favorit."
- Code: `lib/snapFavorite.ts`, `components/FavoriteToggle.tsx`

## MapSnap Signature (ADR-021)

- Permanent text "MapSnap" in card header upper-right — subtle, secondary weight
- User title left only when explicitly set; no card fallback "Sparad plats"
- Principle: User first. Product second.
- Code: `snapCardTitle()` / `snapShareTitle()` in `lib/snapEdit.ts`; `PlaceCard.tsx` header

## Compact Cards (Wave 2 Sprint 1 — Iteration 1)

- Photo banner aspect `3:1` (was `2.4:1`); content padding `p-4`; compressed metadata spacing
- Navigation group (Google Maps, Waze) separated from action group by subtle divider (`bg-black/[0.04]`)
- Typography hierarchy and 48px touch targets preserved; existing SVG icons unchanged
- Code: `PlaceCard.tsx`, `MapOpenButtons.tsx`, `PlaceList.tsx`

## Snap Card Polish

- Two-column action grid with equal-width 48px buttons and recognizable SVG icons (~18px)
- Google Maps and Waze use official brand-color icons beside labels
- Dela uses Share2; Spara bild uses Download — distinct icons
- Card action icons use subtle accent colors; labels remain primary/secondary text
- Location line: `📍 SnapSpot` (canonical); category hidden on card
- Code: `PlaceCard.tsx`, `MapOpenButtons.tsx`, `components/icons/SnapActionIcons.tsx`

## Verification

- Automated: `node scripts/verify-baseline.mjs [url]` — use URL printed by `npm run dev`
- Unit: `npm test` — `lib/snapEdit.test.ts`, `lib/snapFavorite.test.ts`, `lib/saveSnapImage.test.ts`, `lib/shareSnap.test.ts`
- Docs: `node scripts/validate_docs.mjs`
- Reconciliation: `baseline_reconciliation.md` — Wave 0 + Wave 1 (2026-07-14)
- Manual mobile: long-press camera, denied-permission card (OPS-002)
- Field: `field_validation_log.md` — Field Validation 0005, 0006

## Completion Rule

No task is complete unless **both** behaviour and visual regression checklists pass. See `stable_baseline.md`.
