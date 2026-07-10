# Implementation Rules

Permanent discipline for all MapSnap work. Follow Ecodaddy-level separation: one pass type at a time, no improvisation, no mixed scope.

## 1. Behaviour Regressions Are Bugs

No task is complete if any of these break:

- Short tap saves GPS
- Long press opens camera/file capture
- Snap is stored in IndexedDB
- Snap list updates after save or delete
- Google Maps opens with correct coordinates
- Waze opens with correct coordinates
- Delete removes snap from list and storage
- Camera flow: photo → GPS → save → success toast
- Permission recovery card and retry still work when location is denied

Fix behaviour before closing any task — even docs-only tasks must not ship code that regresses interactions.

## 2. Visual Regressions Are Bugs

No task is complete if any of these are lost:

- Tailwind classes apply (not unstyled HTML)
- `globals.css` loads via `app/layout.tsx`
- SNAP button: circular, green radial gradient, 3D shadow/glow, large (~70% content width)
- Typography, spacing, and warm surface palette (`#FAFAF8`, `#F5F4F1`)
- Place cards: `rounded-3xl`, `card-shadow`, elevated background
- Animations: breathe, card-in, toast-in-out, fade-in
- Mobile-first layout matches the approved baseline in `ux_doctrine.md`

Functionality working with a lost design system is not done.

## 3. One Pass Type at a Time

Each change set must declare its pass type and stay within scope.

| Pass | Allowed | Forbidden |
|------|---------|-----------|
| **Bug Fix Pass** | Fix only the stated bug | New features, visual polish, unrelated refactors |
| **Feature Pass** | Add only the requested feature | Unrelated bug fixes, visual redesign, drive-by cleanup |
| **UX Pass** | Visual and tactile polish only | Behaviour changes, new features, gesture changes |
| **Docs Pass** | Documentation and governance only | Application code changes (unless syncing docs to shipped code) |
| **Storage Pass** | Storage layer, migration, backup/import only | UI redesign, unrelated features, behaviour gesture changes |
| **Stabilization Pass** | Baseline lock, regression fixes, verification only | New features, visual redesign unrelated to baseline restore |

Mixed passes are forbidden. If a task reveals a second concern, finish the current pass first or explicitly split into a follow-up pass.

## 3a. No Implementation Before Current Docs

No product implementation pass may begin until generated steering docs in `docs_engine/output/` reflect current source state. docs_engine is the product operating system — see `source/docs_engine_overview.md`.

## 4. Regression Checklist (Required Every Task)

**Hard rule: no task is complete unless BOTH checklists pass.** Behaviour-only or visual-only success is a failed task.

Every task must end with this checklist verified in a browser. Mark each item before considering the task complete.

See also: `docs_engine/source/stable_baseline.md` — locked interaction + visual baseline.

### A. Behaviour

- [ ] Short tap saves GPS
- [ ] Long press opens camera/file capture
- [ ] Photo snap saves with `photoDataUrl`
- [ ] Snap list updates
- [ ] Success toast appears
- [ ] Google Maps opens
- [ ] Waze opens
- [ ] Delete works

### B. Visual

- [ ] App is not unstyled HTML
- [ ] Tailwind styles load (`globals.css` via layout)
- [ ] SNAP button is circular, green, 3D, and large
- [ ] Cards styled (rounded, shadow, elevated)
- [ ] Backup panel styled
- [ ] Permission card styled
- [ ] Mobile layout matches the approved baseline

## Approved UI Baseline (Do Not Redesign)

Reference: changelog v0.1.2 + Product Feel Pass styling.

- Hero: title "MapSnap", large SNAP button, no permanent helper text below button
- SNAP button: 70% width (max 320px), radial green gradient, ring, glow, breathe animation
- Success: "✓ Sparad" toast above button (~1s)
- List section: "MINA SNAPPAR" uppercase header
- Cards: photo banner when present, fallback title "Sparad plats"
- No new features or layout redesign without explicit approval
