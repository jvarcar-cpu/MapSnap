# Current Phase

**Phase:** MVP 0.1 — Capture Foundation  
**Status:** Stable — local-first PWA baseline complete  
**Started:** 2026-06-28  
**Stabilized:** 2026-07-07

## Goal

Ship a working local-first snap capture PWA that proves the core loop: tap → save GPS → revisit via map links.

**Achieved.** MVP 0.1 is a stable baseline ready for PDE handoff or phase 0.2 planning.

## Current Baseline (locked)

- SNAP button visible, large, circular, green, 3D
- Short tap saves GPS snap to IndexedDB
- Long press opens camera/file capture + GPS snap with `photoDataUrl`
- Snaps persist in IndexedDB (`mapsnap-db` / `snaps`)
- Legacy `mapsnap.snaps.v1` localStorage migrates to IndexedDB on load
- JSON backup/import/export works
- Google Maps and Waze links work
- Delete works
- Baseline verification script passes (`scripts/verify-baseline.mjs`)
- Manual mobile verification still required for long-press camera and denied-permission card

See `stable_baseline.md` for the full locked interaction + visual baseline.

## In Scope This Phase (complete)

- [x] Project scaffold (Next.js, TypeScript, Tailwind)
- [x] Tap capture with Geolocation API
- [x] IndexedDB persistence (`mapsnap-db` / `snaps`; legacy localStorage migrated on load)
- [x] Saved place list with delete
- [x] Google Maps / Waze URL generation
- [x] Long press → camera capture flow
- [x] PWA manifest
- [x] docs_engine governance + generated steering outputs
- [x] Product Identity layer
- [x] Foundation guardrails notes
- [x] Stable baseline document
- [x] Swedish UI
- [x] JSON backup/import/export
- [x] HTTPS dev workflow for secure context
- [x] Baseline verification script

## Out of Scope This Phase

- Edit name, note, category after capture
- Search and filter saved places
- Offline GPS queue
- Backend or cloud sync

## Exit Criteria (met)

- [x] `npm run dev` works locally over HTTPS
- [x] Tap SNAP saves location and survives refresh
- [x] Map buttons open correct external URLs
- [x] Delete removes snap from list and storage
- [x] Long press opens camera/file capture and saves photo snap
- [x] Behaviour + visual regression checklists documented and verifiable
- [x] docs_engine steering outputs current

## Next Phase Preview

**0.2 — Enrich & Revisit:** inline edit for name/note/category, sort options, maybe reverse geocoding for suggested names.

**0.2 UX — First-launch onboarding:** one-time dismissible tip teaching long-press photo capture. See `ux_doctrine.md` roadmap.

See `next_task.md` for the recommended next action after this docs pass.
