# UX Doctrine

> Product context: Thumb First, One-Second Rule, Reality First — see `Identity/product_doctrine.md`

## Language

All user-facing copy in Swedish.

## Behaviour First

Visual improvements must never change or remove existing behaviour.

A UX polish pass is allowed to improve:

- layout
- spacing
- typography
- colours
- animations
- tactile feeling

It is NOT allowed to:

- remove event handlers
- change gestures
- remove interactions
- change user flows
- break existing functionality

Behaviour and presentation are separate implementation phases.

**Priority order:** functionality first → behaviour second → visual polish third.

No polish pass is allowed to ship if it breaks even a single existing interaction.

## Behaviour Regressions Are Bugs

No task is complete if tap, long press, storage, maps, delete, or camera flow breaks.

See `docs_engine/rules/implementation_rules.md` for the full behaviour checklist.

## Visual Regressions Are Bugs

No task is complete if Tailwind/global styling, button design, layout, typography, spacing, or cards are lost.

Unstyled HTML with working logic is a failed task.

## Pass Types

One pass type at a time — see `docs_engine/rules/implementation_rules.md`:

- **Bug Fix Pass** — fix only the stated bug
- **Feature Pass** — add only the requested feature
- **UX Pass** — polish visuals/interactions only, no behaviour changes
- **Docs Pass** — documentation only
- **Storage Pass** — storage, migration, backup/import only
- **Stabilization Pass** — baseline lock, regression fixes, verification only

## Regression Checklist (Every Task)

**Hard rule: no task is complete unless BOTH pass.** See `docs_engine/source/stable_baseline.md`.

Every task must end with this checklist verified in a browser:

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
- [ ] Tailwind styles load
- [ ] SNAP button is circular, green, 3D, and large
- [ ] Cards styled
- [ ] Backup panel styled
- [ ] Permission card styled
- [ ] Mobile layout matches the approved baseline

## Approved UI Baseline

Do not redesign. Restore and preserve this baseline unless explicitly instructed otherwise.

**Hero zone**

- Title: "MapSnap" (2xl bold)
- SNAP button: ~70% content width, max 320px, circular, green radial gradient, dark ring, layered glow/shadow, breathe idle animation
- **MVP 0.1:** No permanent helper text below the button — `aria-label` carries tap/long-press hint for screen readers
- **Wave 1 (approved):** Brief visible instruction — *"Tryck för position · Håll inne för position + bild"* — calm, unobtrusive, does not obstruct use
- Success toast "✓ Sparad" floats above button (~1s, with haptic when supported); Wave 1 expands to coordinated feedback including "Snap sparad" (ADR-018)
- Status: "Hämtar plats…" while capturing

**Snap list**

- Section header: "MINA SNAPPAR" (uppercase, tracked)
- Empty state: pin illustration + "Inga snappar ännu."
- Cards: rounded-3xl, soft shadow, optional photo banner (2.4:1), fallback title "Sparad plats"

**Design tokens**

- Surface `#FAFAF8`, elevated `#F5F4F1`, primary `#111827`, secondary `#6B7280`
- SNAP palette: highlight `#5BEA86`, top `#47D16C`, center `#2FB95C`, dark `#166534`, ring `#11502A`
- Custom utilities in `globals.css`: `snap-hero-glow`, `snap-hero-gradient`, `snap-hero-ring`, `card-shadow`

## Layout Principles

- Mobile-first, thumb-friendly
- Single primary action: the SNAP button
- No dashboard, no tabs, no settings screen in MVP
- Saved list scrolls below the capture zone

## SNAP Button

- Large, centered, impossible to miss
- Tap = location capture
- Long press = photo + location capture
- **Protected contract** (ADR-012): short press = position; long press = position + image — must not change casually
- Wave 1: brief visible instruction below hero (see Hero zone)
- Accessibility: `aria-label` carries tap/long-press hint for screen readers

## Wave 1 Feedback (approved, not yet implemented)

Coordinated capture feedback (~500–700ms): press state, haptic, discreet sound, glow, pulse, **radial waves at button boundary** (sonar-like, fade quickly), "Snap sparad" confirmation. Must not block persistence. Respect `prefers-reduced-motion`. Sound design allows future disable. ADR-018.

## Camera Flow (Long Press)

Browsers do not allow automatic shutter capture. Optimise for the minimum user actions security allows:

1. Long press SNAP
2. Short vibration (haptic confirmation)
3. Camera opens immediately (`<input capture="environment">`)
4. User taps shutter
5. Photo saved
6. GPS captured
7. Snap saved
8. ✓ Sparad toast

Do not attempt to auto-take a picture.

## Feedback

- Success: "✓ Sparad" (brief, auto-dismiss, with haptic when supported)
- In progress: "Hämtar plats…"
- Errors: short, actionable Swedish messages

## Place Cards

Show what matters for revisiting:

- Name or fallback "Sparad plats"
- Category
- Date/time
- Coordinates + accuracy if available
- Photo thumbnail if present
- Google Maps, Waze, Delete actions

## No Mandatory Forms

Users never fill in fields before their first save. Optional enrichment (name, note, title, favorite, tags) happens after capture — see `product_roadmap.md` Wave 1–2.

## RETURN Actions (existing)

Google Maps and Waze deep links are the approved Return path. Share and save-image are planned Wave 1 additions. No proprietary navigation.

## Compact Cards (experimental — Wave 1)

Direction: square thumbnail ~80–100px hypothesis, reduced card height, detail view for full image. Must preserve recognizable thumbnails — see `image_doctrine.md`, ADR-017.

## Outdoor Context

- High contrast, readable in sunlight
- Large touch targets (minimum 44px)
- Minimal chrome, no clutter

## PWA

Installable as standalone app. Works offline for viewing saved snaps; GPS and camera require device capabilities.

## Optional Onboarding Hint (planned, complements Wave 1 instruction)

One-time dismissible tip on first launch — supplements, does not replace, brief hero microcopy:

**💡 Tips**

"Håll inne SNAP för att spara ett foto tillsammans med platsen."

- Dismissible
- Never shown again after dismissal
- Persist dismissal in localStorage
