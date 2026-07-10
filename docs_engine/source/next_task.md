# Next Task

**Updated:** 2026-07-07  
**Pass type:** None active — MVP 0.1 baseline stable; docs synchronized for PDE handoff

## Recommended Next Task

**PDE bootstrap** — begin the next PDE product through PIE/Foundation before any feature code.

MapSnap MVP 0.1 is complete as a stable local-first PWA baseline. The docs_engine state is synchronized. Do not start new MapSnap feature work until explicitly scoped in a new phase.

If continuing MapSnap instead of a new PDE product, the next scoped pass is:

**Phase 0.2 — Enrich & Revisit (Feature Pass)**

- Inline edit for name, note, category on saved snaps
- Sort options for snap list
- Optional: reverse geocoding for suggested names

Prerequisites before any MapSnap implementation pass:

1. Regenerated steering docs current (`docs_engine/output/`)
2. `current_phase.md` updated to declare the new phase and pass type
3. Identity documents loaded if any user-facing copy changes
4. Baseline verification passes after implementation

## Not Next

- Backend or cloud sync (out of scope)
- Map SDK embedding (out of scope)
- Mixed pass types in one change set
- Implementation before docs_engine output is current
