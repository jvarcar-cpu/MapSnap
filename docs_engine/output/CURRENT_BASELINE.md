# MapSnap — Current Baseline

> Generated reference to locked MVP baseline. Full detail: `docs_engine/source/stable_baseline.md`

**Locked:** 2026-06-28  
**Updated:** 2026-07-14  
**Status:** MVP 0.1 stable — Wave 1 Sprint 5 **Completed** (Favorite)

## Interaction Baseline

| Interaction | Requirement |
|-------------|-------------|
| Short tap | GPS capture → IndexedDB save → list update → "Snap sparad" toast |
| Long press (~600ms) | Camera/file input → photo as `photoDataUrl` → GPS → save |
| Maps | Google Maps and Waze open with saved coordinates |
| Delete | Removes from list and IndexedDB |
| Edit | "Redigera" on card → optional title (`name`) + notes (`note`) → `saveSnap()` |
| Favorite | Star toggle upper-right on card → optimistic `saveSnap()`; `favorite: true` only |
| Save image | "Spara bild" on cards with `photoDataUrl` — device copy only; hidden without image |
| Share | "Dela" on cards with `photoDataUrl` — native Web Share; hidden without image |
| Storage | IndexedDB primary; legacy localStorage migrates on load; Snap normalization on load |
| Backup | JSON array export/import/merge by id (`mapsnap-snaps-array-v1`) |

## Visual Baseline

| Element | Requirement |
|---------|-------------|
| SNAP button | Circular, large (~70% width, max 320px), green radial 3D gradient |
| Hero | Title "MapSnap"; instruction *"Tryck för position · Håll inne för position + bild"* |
| List | Header "MINA SNAPPAR", styled cards; title fallback "Sparad plats"; notes line-clamped |
| Card actions | Favorite star (upper-right) → Maps → Spara bild (if image) → Dela (if image) → Redigera → Ta bort |
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
- Visible only when `photoDataUrl` present
- Payload: title (fallback "Sparad plats"), notes if present, `📍 Position` + coordinates, `🌍 Öppna plats` + single Google Maps URL, image file when `canShare` supports files
- Share text omits "Image attached." and duplicate map labels — image and SMS map preview supply visual/navigation context
- Unavailable: "Delning stöds inte i den här webbläsaren"
- Code: `lib/shareSnap.ts`

## Favorite (Sprint 5)

- Post-capture only — star toggle on every card; not on SNAP button
- Optimistic UI; `saveSnap()` persists `favorite: true` or removes field
- No reorder, filter, or search in this sprint
- Error: restore previous state; "Kunde inte spara favorit."
- Code: `lib/snapFavorite.ts`, `components/FavoriteToggle.tsx`

## Verification

- Automated: `node scripts/verify-baseline.mjs [url]` — use URL printed by `npm run dev`
- Unit: `npm test` — `lib/snapEdit.test.ts`, `lib/snapFavorite.test.ts`, `lib/saveSnapImage.test.ts`, `lib/shareSnap.test.ts`
- Manual mobile: long-press camera, denied-permission card (OPS-002)
- Field: `field_validation_log.md` — Field Validation 0005, 0006

## Completion Rule

No task is complete unless **both** behaviour and visual regression checklists pass. See `stable_baseline.md`.
