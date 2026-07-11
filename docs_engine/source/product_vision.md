# MapSnap — Product Vision

> Full product philosophy: `Identity/product_doctrine.md`  
> Official roadmap: `product_roadmap.md` · Feature gate: `feature_gate.md`

## Positioning

**MapSnap is not a map app. It is the fastest way to save a place that matters and return to it when it matters.**

Core concept: *The app captures the place before it is forgotten.*

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

## Product Pillars

1. **CAPTURE** — save the place immediately
2. **REMEMBER** — add meaning after capture
3. **RETURN** — use the Snap when it matters again
4. **DELIGHT** — restrained polish without slowing capture

## MVP Scope (0.1) — Shipped

- Tap to save current GPS coordinates
- Long press to attach a photo
- Local list of saved places
- Open saved coordinates in Google Maps or Waze
- Delete snaps
- JSON backup / export / import
- All data stored locally in the browser (IndexedDB)

## Success Criteria

A place is captured when coordinates are saved. Everything else — name, category, photo — is optional enrichment added after capture or never.

## Direction

Every future feature must pass the Feature Gate in `feature_gate.md` and the Tool First questions in `Identity/product_doctrine.md`.

Prioritization: no-backend value first; enrichment after capture; backend only when proven necessary. See phased roadmap in `product_roadmap.md`.

The Golden Rules apply: the app must never become more interesting than the place; every feature must make a Snap more valuable, never harder to create.
