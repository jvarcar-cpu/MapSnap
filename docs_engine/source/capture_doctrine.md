# Capture Doctrine

> Product context: Snap Principle, One-Second Rule — see `Identity/product_doctrine.md`

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

1. User long-presses SNAP (500ms)
2. Short vibration confirms long-press threshold
3. Hidden `<input type="file" accept="image/*" capture="environment">` is triggered immediately — no other entry point
4. Browser/OS shows camera on mobile; file picker on desktop/remote-desktop (expected)
5. User taps shutter — browsers do not allow automatic capture
6. After image selection/capture: GPS is fetched, photo stored as data URL, snap saved
7. Success toast "✓ Sparad" shown
8. If the user cancels the picker: do nothing — no snap, no error, tap capture still works
9. If reading the image fails: save location-only snap with a Swedish error message

## Timing Budget

Target: under 3 seconds from tap to "✓ Sparad" on a typical mobile connection with GPS available.

## Anti-Patterns

- Requiring name, category, or note before save
- Showing a confirmation dialog before save
- Continuous background location tracking
- Blocking save on optional field validation

## Error Philosophy

If GPS fails, tell the user clearly in Swedish and do not save a partial record without coordinates.

If storage fails, tell the user and do not pretend the snap was saved.

If camera is cancelled, do nothing — no error unless the user expected a save.
