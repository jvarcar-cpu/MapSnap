# MapSnap — Product Vision

> Full product philosophy: `Identity/product_doctrine.md`

## What MapSnap Is

MapSnap is a tool — like a camera, compass, or flashlight — for people who discover places in the real world and need to save them instantly before context fades.

Open. SNAP. Close.

## What MapSnap Is Not

- Not a map application
- Not a note taking application
- Not a travel planner
- Not a navigation app
- Not a social platform
- Not a cloud-backed note system

## Core Promise

**Capture first. Organize later.**

The user should be able to save a GPS location in one tap, with zero mandatory fields. See the One-Second Rule and North Star in `Identity/product_doctrine.md`.

## MVP Scope (0.1)

- Tap to save current GPS coordinates
- Long press to attach a photo
- Local list of saved places
- Open saved coordinates in Google Maps or Waze
- All data stored locally in the browser

## Success Criteria

A place is captured when coordinates are saved. Everything else — name, category, photo — is optional enrichment added after capture or never.

## Long-Term Direction

Every future feature must pass the Tool First gate in `Identity/product_doctrine.md`:

1. **Capture speed** — does it make the SNAP experience faster?
2. **Revisiting** — does it help the user return to a place?
3. **Real-world usefulness** — does it improve usefulness outdoors?

Features that add dashboard complexity, require accounts, or turn MapSnap into a map viewer are out of scope unless they directly serve capture or revisiting.

The Golden Rule applies: the app must never become more interesting than the place being captured.
