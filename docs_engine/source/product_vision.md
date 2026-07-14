# MapSnap — Product Vision

> Full product philosophy: `Identity/product_doctrine.md`  
> Official roadmap: `product_roadmap.md` · Feature gate: `feature_gate.md`

## Positioning

**MapSnap is not a map app. It is the fastest way to save a place that matters and return to it when it matters.**

Core concept: *The app captures the place before it is forgotten.*

## Evolved Product Vision

**MapSnap exists to help people capture places that matter, enrich them with context, share them when needed, and protect them for the future.**

These statements complement each other — they do not compete. Positioning describes what MapSnap is for the user in one sentence. The evolved vision describes the full product lifecycle. The core concept describes the urgency of capture.

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

Enrichment must never be required before capture.

## Product Lifecycle — Core Pillars

MapSnap organizes product work around five lifecycle stages. Four are **approved Core Pillars**; one is an **emerging strategic direction**.

| Pillar | Purpose |
|--------|---------|
| **CAPTURE** | Capture a place immediately, reliably, and with minimal friction |
| **ENRICH** | Give a captured place meaning and context after capture |
| **SHARE** | Communicate a place in the format appropriate to the situation |
| **PROTECT** | Protect the user's Snap history without requiring an account |
| **DISCOVER** *(emerging)* | Help the user find, understand, and rediscover relevant Snap content as their collection grows |

**Offline First. Cloud Optional.**

**MapSnap should protect the user's memories without requiring an account.**

Pillar detail: `product_roadmap.md` · `Identity/product_doctrine.md`

## Experience Qualities

The earlier four-pillar model — **Capture → Remember → Return → Delight** — is preserved as **experience qualities**, not competing product lifecycle stages.

| Experience quality | Role |
|--------------------|------|
| **CAPTURE** | The moment of saving — aligns with the Capture pillar |
| **REMEMBER** | Meaning and context over time — strengthened by Enrich and Protect |
| **RETURN** | Revisiting and using a place when it matters — strengthened by Share and navigation |
| **DELIGHT** | Cross-cutting quality — fast, calm, trustworthy, rewarding in every pillar |

**Mapping (one authoritative interpretation):**

- Capture supports **Capture**
- Enrich strengthens **Remember**
- Share and navigation strengthen **Return**
- Protect preserves **Remember** and **Return** over time
- Discover resurfaces remembered places
- Delight remains cross-cutting — *every pillar should feel fast, calm, trustworthy, and rewarding*

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

Every future feature must pass the Feature Gate in `feature_gate.md` and strengthen at least one Core Pillar without weakening the others.

Prioritization: no-backend value first; enrichment after capture; data protection before backend maturity; backend only when proven necessary. See phased roadmap in `product_roadmap.md`.

The Golden Rules apply: the app must never become more interesting than the place; every feature must make a Snap more valuable, never harder to create.
