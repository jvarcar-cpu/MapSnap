# MapSnap — Current Baseline

> Generated reference to locked MVP baseline. Full detail: `docs_engine/source/stable_baseline.md`

**Locked:** 2026-06-28  
**Updated:** {{date}}  
**Status:** MVP 0.1 stable

## Interaction Baseline

| Interaction | Requirement |
|-------------|-------------|
| Short tap | GPS capture → IndexedDB save → list update → "✓ Sparad" toast |
| Long press (~600ms) | Camera/file input → photo as `photoDataUrl` → GPS → save |
| Maps | Google Maps and Waze open with saved coordinates |
| Delete | Removes from list and IndexedDB |
| Storage | IndexedDB primary; legacy localStorage migrates on load |
| Backup | JSON export/import/merge by id |

## Visual Baseline

| Element | Requirement |
|---------|-------------|
| SNAP button | Circular, large (~70% width, max 320px), green radial 3D gradient |
| Hero | Title "MapSnap", no permanent helper text below button |
| List | Header "MINA SNAPPAR", styled cards |
| Backup panel | Dashed border, rounded-2xl |
| Permission card | Rounded-3xl, elevated, retry button |

## Verification

- Automated: `node scripts/verify-baseline.mjs [url]` — use URL printed by `npm run dev`
- Manual mobile: long-press camera, denied-permission card (OPS-002)

## Completion Rule

No task is complete unless **both** behaviour and visual regression checklists pass. See `stable_baseline.md`.
