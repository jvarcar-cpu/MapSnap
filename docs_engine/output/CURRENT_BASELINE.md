# MapSnap — Current Baseline

> Generated reference to locked MVP baseline. Full detail: `docs_engine/source/stable_baseline.md`

**Locked:** 2026-06-28  
**Updated:** 2026-07-14  
**Status:** MVP 0.1 stable — Wave 1 Sprint 3 **Completed**

## Interaction Baseline

| Interaction | Requirement |
|-------------|-------------|
| Short tap | GPS capture → IndexedDB save → list update → "Snap sparad" toast |
| Long press (~600ms) | Camera/file input → photo as `photoDataUrl` → GPS → save |
| Maps | Google Maps and Waze open with saved coordinates |
| Delete | Removes from list and IndexedDB |
| Edit | "Redigera" on card → optional title (`name`) + notes (`note`) → `saveSnap()` |
| Save image | "Spara bild" on cards with `photoDataUrl` — device copy only; hidden without image |
| Storage | IndexedDB primary; legacy localStorage migrates on load; Snap normalization on load |
| Backup | JSON array export/import/merge by id (`mapsnap-snaps-array-v1`) |

## Visual Baseline

| Element | Requirement |
|---------|-------------|
| SNAP button | Circular, large (~70% width, max 320px), green radial 3D gradient |
| Hero | Title "MapSnap"; instruction *"Tryck för position · Håll inne för position + bild"* |
| List | Header "MINA SNAPPAR", styled cards; title fallback "Sparad plats"; notes line-clamped |
| Card actions | Maps → Spara bild (if image) → Redigera → Ta bort |
| Backup panel | Dashed border, rounded-2xl |
| Permission card | Rounded-3xl, elevated, retry button |

## Field Validation (Sprint 1)

Field Validation 0005 — verified on Google Pixel 9a and Redmi Note 9 (2026-07-14):

- Instruction text, sound, toast, pulse, and radial sonar waves confirmed
- Protected SNAP interaction unchanged
- Subtle button-surface pulse accepted; no further Sprint 1 tuning

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

## Verification

- Automated: `node scripts/verify-baseline.mjs [url]` — use URL printed by `npm run dev`
- Unit: `npm test` — `lib/snapEdit.test.ts`, `lib/saveSnapImage.test.ts`
- Manual mobile: long-press camera, denied-permission card (OPS-002)
- Field: `field_validation_log.md` — Field Validation 0005; save-image field test pending

## Completion Rule

No task is complete unless **both** behaviour and visual regression checklists pass. See `stable_baseline.md`.
