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
- **Wave 1 (shipped):** Brief visible instruction — *"Tryck för position · Håll inne för position + bild"* — calm, unobtrusive, does not obstruct use
- Success toast "Snap sparad" floats above button (~650ms, with haptic when supported); coordinated feedback: compress, haptic, discreet sound, glow, pulse, radial sonar waves (ADR-018)
- Status: "Hämtar plats…" while capturing

**Snap list**

- Section header: "MINA SNAPPAR" (uppercase, tracked)
- **Search (Wave 2 Sprint 2 — shipped):** rounded search field above list when snaps exist; placeholder "Sök bland dina Snappar"; search icon; clear (X) when text present; filters loaded collection by title (`name`) and notes (`note`) — case-insensitive, partial match; search empty state "Inga Snappar matchar din sökning." — no sort, filter, or tags yet
- Empty state: pin illustration + "Inga snappar ännu."
- Cards: rounded-3xl, soft shadow, optional photo banner (2.4:1); user title left when present; **MapSnap signature** upper-right always (ADR-021)
- Favorite toggle: small star upper-right overlay on card; ☆ inactive, ★ active with subtle gold — must not collide with signature
- **SnapSpot:** canonical visible label for the location line on every card (`📍 SnapSpot`) — not the user title; category remains metadata only (not shown on card) for future Discover
- **Card actions:** two-column grid after Maps links — Redigera / Dela, then Spara bild / Ta bort (Spara bild hidden without image); equal-width 48px targets; recognizable SVG icons (~18px) beside labels; Google Maps and Waze use official brand icons; Dela uses Share2, Spara bild uses Download; subtle accent colors on icons only

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

## Wave 1 Feedback (shipped — ADR-018)

Coordinated capture feedback (~500–700ms): press compress, haptic, discreet sound, glow, pulse, **radial waves at button boundary** (sonar-like, fade quickly), "Snap sparad" confirmation. Does not block persistence. Respects `prefers-reduced-motion`. Sound fails silently when unavailable. Sound design allows future disable.

## Camera Flow (Long Press)

Browsers do not allow automatic shutter capture. Optimise for the minimum user actions security allows:

1. Long press SNAP
2. Short vibration (haptic confirmation)
3. Camera opens immediately (`<input capture="environment">`)
4. User taps shutter
5. Photo saved
6. GPS captured
7. Snap saved
8. Snap sparad toast

Do not attempt to auto-take a picture.

## Feedback

- Success: "Snap sparad" (brief ~650ms, auto-dismiss, with haptic when supported; coordinated visual pulse and sonar waves when motion allowed)
- In progress: "Hämtar plats…"
- Errors: short, actionable Swedish messages

## Place Cards

Show what matters for revisiting:

### MapSnap Signature (ADR-021)

**User first. Product second.**

Card header layout:

```
[USER TITLE]                              MapSnap
```

- **Left:** user-defined title only — show nothing when absent or blank
- **Right:** permanent text signature "MapSnap" — subtle, secondary visual weight, always visible
- **No card fallback title** — do not show "Sparad plats", "Namnlös Snap", "Min Snap", or similar
- **Favorite:** separate overlay control; header reserves spacing so signature and star do not overlap
- Long user titles truncate; signature and favorite remain accessible on mobile

- **SnapSpot** — `📍 SnapSpot` on the location line (canonical visible label); coordinates and accuracy below
- Category is metadata for future Discover — do not show category on the card
- Date/time
- Coordinates + accuracy if available
- Photo thumbnail if present
- Google Maps, Waze, card actions (two-column grid with icons), Delete

## Action Icon Principle

Every action icon should be immediately recognizable without reading the text.

The icon reinforces the action.

The text confirms it.

MapSnap should feel calm, professional and familiar rather than decorative.

- Google Maps and Waze may use official brand colors
- Card action icons use subtle accent colors — icons only, labels stay primary/secondary text:
  - Redigera — muted orange (`#C77B30`)
  - Dela — muted blue (`#4B7FD4`); Share2 network icon
  - Spara bild — muted purple-gray (`#7C7088`); Download icon (never same as Dela)
  - Ta bort — muted red (`#C74444`)
- Icons are ~18–20px, aligned with labels, with subtle hover and press feedback

## No Mandatory Forms

Users never fill in fields before their first save. Optional enrichment (name, note, title, favorite, tags) happens after capture — see `product_roadmap.md` Wave 1–2.

## RETURN / SHARE Actions (existing)

Google Maps and Waze deep links are the approved Return path. Quick Share ("Dela") and save-image are shipped Wave 1 SHARE actions. **Quick Share is available on every snap card** — text and Google Maps link always; image file attached when `photoDataUrl` is present and `canShare` supports files. Save-image remains image-only. Favorite toggle is a shipped Wave 1 ENRICH action (metadata only — no filter yet). Professional Share is a future SHARE mode — see `product_roadmap.md`. No proprietary navigation.

## Compact Cards (experimental — Wave 2 Sprint 1)

**Iteration 1 (shipped):** Banner layout preserved with reduced height — photo aspect `3:1` (was `2.4:1`); content padding `p-4`; compressed metadata spacing; list gap `gap-3`. Navigation group (Google Maps, Waze) and action group (Redigera, Dela, Spara bild, Ta bort) separated by a low-contrast divider (`bg-black/[0.04]`). Typography hierarchy unchanged; 48px touch targets preserved. Icons authoritative — no redesign.

**Iteration 2 (planned):** Square thumbnail ~80–100px hypothesis, detail view for full image — see `image_doctrine.md`, ADR-017.

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
