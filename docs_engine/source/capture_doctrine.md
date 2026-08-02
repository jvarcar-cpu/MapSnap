# Capture Doctrine

> Product context: Snap Principle, One-Second Rule — see `Identity/product_doctrine.md`  
> Protected interaction: ADR-012 · Roadmap: `product_roadmap.md`

## Protected SNAP Interaction Contract

**This contract must not change casually.**

| Gesture | Behavior |
|---------|----------|
| **Short press** | Save position |
| **Long press** | Save position and open image capture |

Approved instruction microcopy (Wave 1): *"Tryck för position · Håll inne för position + bild"* — visible, calm, unobtrusive. Does not alter gestures.

## Primary Rule

Capture must complete in one interaction. No forms before save.

## Tap Capture

1. User taps SNAP
2. App requests GPS (single shot, not continuous tracking)
3. Location saves immediately to IndexedDB
4. Default category: `Annat`
5. Default rating: undefined
6. Name and note remain empty unless user adds them later

## Long Press Capture

1. User presses SNAP and holds
2. Immediate subtle progress feedback begins (ring toward photo threshold); cancelled if the gesture cancels or moves beyond tolerance
3. At ~600ms (`LONG_PRESS_MS` in `lib/longPressGesture.ts`) the gesture arms — short vibration confirms threshold; short-press is suppressed
4. On release while armed, hidden `<input type="file" accept="image/*" capture="environment">` is activated from that user gesture (not from the timer callback alone)
5. Browser/OS shows camera on mobile; file picker on desktop/remote-desktop (expected)
6. User taps shutter — browsers do not allow automatic capture
7. After image selection/capture: GPS is fetched, photo stored as a data URL, snap saved
8. Success toast "Snap sparad" shown with coordinated feedback (ADR-018)
9. If the user cancels the picker: do nothing harmful — calm Swedish note when cancellation is detected; tap capture still works
10. If reading the image fails: save location-only snap with a Swedish error message
11. If camera activation does not occur (compatibility): show compact direct-action **"Öppna kamera"** — no silent no-op; do not create a broken or duplicate Snap

### Compatibility notes (Wave 2 Capture Reliability Pass)

- Timer-delayed synthetic `.click()` is treated as a compatibility risk for transient user activation — not claimed as universal
- Progress feedback must not slow short press and must respect `prefers-reduced-motion`
- Duplicate activation remains prevented
- No continuous GPS; SNAP storage contract unchanged

## Timing Budget

Target: under 3 seconds from tap to "Snap sparad" on a typical mobile connection with GPS available.

## Anti-Patterns

- Requiring name, category, note, or tags before save
- Showing a confirmation dialog before save (except compact camera fallback when activation fails)
- Continuous background location tracking
- Blocking save on optional field validation
- Silently doing nothing after a completed long-press gesture
- Showing or collecting tags before SNAP (tags are Enrich-only — Wave 2)

## Error Philosophy

If GPS fails, tell the user clearly in Swedish and do not save a partial record without coordinates.

If storage fails, tell the user and do not pretend the snap was saved.

If camera is cancelled after it opened, do not save a photo snap — no harsh error unless the user expected a save.

If camera never opens after long press, offer direct retry ("Öppna kamera") rather than failing silently.
