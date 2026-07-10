# MapSnap — Master Document

> Generated from docs_engine source. Snapshot template.

---

## Vision

MapSnap is a tool — like a camera, compass, or flashlight — for people who discover places in the real world and need to save them instantly before context fades. Open. SNAP. Close. **Capture first. Organize later.**

## Current Phase

**MVP 0.1 — Capture Foundation** — Stable local-first PWA baseline complete (2026-07-07)

## Product Identity

Product Identity defines who MapSnap is — philosophy, voice, and language. See `Identity/identity_overview.md`.

| Document | Purpose |
|----------|---------|
| `Identity/product_doctrine.md` | Governing philosophy |
| `Identity/product_quotes.md` | Canonical brand phrases |
| `Identity/voice.md` | Tone and character |
| `Identity/vocabulary.md` | Official terminology |
| `Identity/writing_rules.md` | Rules for user-facing copy |

**Doctrine summary:**

- MapSnap is a tool — open, SNAP, close
- Capture first. Organize later.
- Coordinates are truth; everything else is metadata
- Offline first; thumb first; reality first
- North Star: see something → SNAP → put phone away → continue living
- Golden Rule: the app must never become more interesting than the place

**Voice summary:** calm, trustworthy, minimal, human, respectful, outdoors — never marketing or hype.

**Protected:** Identity documents must be loaded before any user-facing copy. Changes require explicit product approval.

## Guardrails

1. MapSnap is a tool, not a map app, note app, or travel planner
2. Everything begins with SNAP — capture first, organize later
3. Coordinates are the source of truth; map providers are output channels only
4. Offline first — IndexedDB primary; localStorage legacy migration only; backup/export is approved MVP recovery; cloud sync out of scope
5. Thumb first — one-thumb usability outdoors
6. No backend in MVP 0.1
7. No silent or continuous location tracking
8. Behaviour and visual regressions are bugs — both checklists required every task
9. One pass type at a time: Bug Fix, Feature, UX, Docs, Storage, Stabilization
10. No implementation before generated steering docs are current
11. Future PDE products bootstrap through PIE/Foundation before code (ADR-011)

## Architecture Summary

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Geolocation | Browser Geolocation API |
| Persistence | IndexedDB (`mapsnap-db` / `snaps`) |
| PWA | Web App Manifest |

Client-only data flow. No API routes for snap CRUD. HTTPS required for secure context (geolocation, mobile testing). docs_engine is the product operating system.

## Current Baseline

- SNAP button: visible, large, circular, green, 3D
- Short tap → GPS snap → IndexedDB
- Long press → camera/file capture + GPS snap with `photoDataUrl`
- JSON backup/import/export works
- Google Maps and Waze links work; delete works
- Baseline verification script passes
- Manual mobile verification still required (long-press camera, denied-permission card)

## Recent Decisions

- **ADR-010:** JSON export/import as approved MVP backup method; no cloud sync
- **ADR-011:** PIE/Foundation bootstrap before code — MapSnap incubator lesson for all future PDE products

## Last Updated

2026-07-07
