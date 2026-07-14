# Stable Interaction + Visual Baseline

**Locked:** 2026-06-28 (Emergency Stabilization Pass)

This document freezes the approved MapSnap MVP baseline. Do not change behaviour and visuals in the same pass. Any task that touches one must verify both before completion.

## Visual Baseline (must remain)

| Element | Requirement |
|---------|-------------|
| **SNAP button** | Circular, large (~70% width, max 320px), green radial 3D gradient, dark ring, glow/shadow, breathe idle animation |
| **Hero zone** | Title "MapSnap"; permanent instruction *"Tryck för position · Håll inne för position + bild"* below button |
| **Toast** | "Snap sparad" floats above button (~650ms) |
| **List section** | Header "MINA SNAPPAR" (uppercase, tracked) |
| **Cards** | `rounded-3xl`, `card-shadow`, elevated background, optional photo banner |
| **Backup panel** | Dashed border, rounded-2xl, green copy button |
| **Permission card** | Rounded-3xl, elevated, numbered steps, green retry button |
| **Styling stack** | `app/layout.tsx` imports `globals.css`; Tailwind directives present; `tailwind.config.ts` scans `app/` and `components/` |

### SNAP button CSS utilities (`globals.css`)

- `snap-hero-glow` / `snap-hero-glow-pressed`
- `snap-hero-gradient` / `snap-hero-gradient-pressed`
- `snap-hero-highlight` (decorative, `pointer-events-none`)
- `snap-hero-ring`

### Layout tokens

- Surface `#FAFAF8`, elevated `#F5F4F1`, primary `#111827`, secondary `#6B7280`
- SNAP palette: highlight `#5BEA86`, center `#2FB95C`, dark `#166534`, ring `#11502A`

## Behaviour Baseline (must remain)

| Interaction | Requirement |
|-------------|-------------|
| **Short tap** | GPS capture → IndexedDB save → list update → "Snap sparad" toast |
| **Long press (~600ms)** | Hidden `<input type="file" accept="image/*" capture="environment">` inside `SnapButton`; `click()` in long-press handler path |
| **Photo flow** | Read image as data URL → GPS → save with `photoDataUrl` → list update → toast |
| **Duplicate guards** | No short tap after successful long press |
| **Camera cancel** | Mild Swedish message ("Inget foto valdes."); no broken snap |
| **Maps** | Google Maps and Waze open with saved coordinates |
| **Delete** | Removes from list and IndexedDB |
| **Edit** | "Redigera" on card → optional title (`name`) + notes (`note`) → `saveSnap()` |
| **Favorite** | Star toggle upper-right → optimistic `saveSnap()`; `favorite: true` only |
| **Save image** | "Spara bild" on cards with `photoDataUrl` — copy only; hidden without image |
| **Share** | "Dela" on every card — native Web Share; text + Google Maps link; image file when supported |
| **Storage** | IndexedDB `mapsnap-db` / `snaps` (legacy `mapsnap.snaps.v1` localStorage migrated on load) |
| **Backup** | JSON export/import/merge by id (`mapsnap-snaps-array-v1`) |

### Wave 1 card baseline (shipped)

| Element | Requirement |
|---------|-------------|
| **Card header** | User title left when present; **MapSnap signature** upper-right always (ADR-021); no "Sparad plats" fallback |
| **Favorite** | Star overlay upper-right; header spacing avoids signature collision |
| **Location line** | `📍 SnapSpot` — category not shown on card |
| **Notes** | Line-clamped in list; full text in edit form |
| **Map links** | Google Maps + Waze — official brand-color SVG icons beside labels |
| **Action grid** | Two columns: Redigera / Dela, then Spara bild / Ta bort (Spara bild if image); 48px targets; SVG icons ~18px |
| **Action icons** | Dela Share2 (blue accent); Spara bild Download (purple-gray); Redigera orange; Ta bort red — labels unchanged |

### Interaction owner

`components/SnapButton.tsx` owns all pointer/touch/click handlers and the hidden camera input. Decorative layers use `pointer-events-none`. The main `<button>` receives events directly.

## Completion Rule (hard)

**No task is complete unless BOTH pass:**

### A. Behaviour regression checklist

- [ ] Short tap saves GPS snap
- [ ] Long press opens camera/file input
- [ ] Photo snap saves with `photoDataUrl`
- [ ] Snap list updates without refresh
- [ ] Success toast appears
- [ ] Google Maps opens
- [ ] Waze opens
- [ ] Delete works
- [ ] Permission retry works when denied

### B. Visual regression checklist

- [ ] App is not unstyled HTML
- [ ] SNAP button visible, circular, large, green, 3D
- [ ] Tailwind/global styles load (`/_next/static/css/...`)
- [ ] Cards styled (rounded, shadow, elevated)
- [ ] Backup panel styled
- [ ] Permission card styled
- [ ] Mobile layout matches approved baseline

If any checkbox fails, fix only that issue. Do not mix pass types.

## Dev server note (OPS-001)

`npm run dev` uses HTTPS and may bind to a non-3000 port if another process holds 3000. **Always open the exact URL printed in the terminal** (e.g. `https://localhost:3000` or `https://localhost:3003`).

Old dev servers or wrong ports can serve stale, broken UI (unstyled HTML, missing routes, webpack cache errors).

**If Next stale cache appears:**

1. Stop the dev server
2. Remove `.next` directory
3. Restart dev server (`npm run dev`)
4. Open the **current** printed port/URL

See `known_issues.md` (OPS-001) for full operational guidance.

## Reference files (do not break)

- `app/layout.tsx` — `import "./globals.css"`
- `app/globals.css` — Tailwind + SNAP hero utilities
- `tailwind.config.ts` — content paths, tokens, animations
- `components/SnapButton.tsx` — interaction + camera input
- `app/page.tsx` — orchestration only (no gesture handlers on page)
- `components/PlaceCard.tsx`, `PlaceList.tsx`, `SnapBackupPanel.tsx`, `LocationPermissionCard.tsx`
