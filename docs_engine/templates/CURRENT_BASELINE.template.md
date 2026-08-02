# MapSnap — Current Baseline

> Generated reference to locked MVP baseline. Full detail: `docs_engine/source/stable_baseline.md`

**Locked:** 2026-06-28  
**Updated:** {{date}}  
**Status:** {{status}}

## Interaction Baseline

{{interaction_baseline}}

## Visual Baseline

{{visual_baseline}}

## Verification

- Automated: `node scripts/verify-baseline.mjs [url]` — use URL printed by `npm run dev`
- Unit: `npm test`
- Docs: `node scripts/validate_docs.mjs`
- Manual mobile: long-press camera, install guidance, denied-permission card (OPS-002)

## Completion Rule

No task is complete unless **both** behaviour and visual regression checklists pass. See `stable_baseline.md`.
