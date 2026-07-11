# MapSnap — Master Document

> Generated from docs_engine source. Snapshot template.

---

## Vision

**MapSnap is not a map app. It is the fastest way to save a place that matters and return to it when it matters.** The app captures the place before it is forgotten. Open. SNAP. Close. **Capture first. Organize later.**

## Current Phase

**Post-MVP 0.1 — Product Roadmap & Governance** — Roadmap ratified 2026-07-12; implementation not started. MVP 0.1 stable at https://mapsnap.se.

## Product Identity

Product Identity defines who MapSnap is — philosophy, voice, and language. See `Identity/identity_overview.md`.

| Document | Purpose |
|----------|---------|
| `Identity/product_doctrine.md` | Governing philosophy, pillars, golden rules |
| `Identity/product_quotes.md` | Canonical brand phrases |
| `Identity/voice.md` | Tone and character |
| `Identity/vocabulary.md` | Official terminology |
| `Identity/writing_rules.md` | Rules for user-facing copy |

**Doctrine summary:**

- MapSnap is a tool — open, SNAP, close
- Four pillars: CAPTURE, REMEMBER, RETURN, DELIGHT
- Coordinates are truth; everything else is metadata
- Offline first; thumb first; reality first; feel lighter than it is
- Golden Rule (Experience): app must never become more interesting than the place
- Golden Rule (Capture): every feature must make a Snap more valuable, never harder to create

**Protected:** Identity documents must be loaded before any user-facing copy. Changes require explicit product approval.

## Roadmap

**Authoritative:** `source/product_roadmap.md`

| Wave | Focus |
|------|-------|
| 0 | Baseline reconciliation (complete) |
| 1 | Instruction, feedback, title, notes, share, save image, favorite, compact cards |
| 2 | Search, sort, filter, tags |
| 3 | Snaptisers (time MVP; proximity experimental) |
| 4 | Image experience |
| 5 | Backend/cloud (deferred) |

Feature gate: `source/feature_gate.md` · Readiness: `source/implementation_readiness.md`

## Guardrails

1. MapSnap is a tool, not a map app, note app, or travel planner
2. Everything begins with SNAP — capture first, organize later
3. Coordinates are the source of truth; map providers are output channels only
4. Offline first — IndexedDB primary; backup/export approved; cloud sync deferred
5. Thumb first — one-thumb usability outdoors
6. Protected SNAP contract: short press = position; long press = position + image (ADR-012)
7. No silent or continuous location tracking
8. Behaviour and visual regressions are bugs — both checklists required every task
9. One pass type at a time: Bug Fix, Feature, UX, Docs, Storage, Stabilization
10. No implementation before generated steering docs are current
11. Feature Gate mandatory before any new feature

## Architecture Summary

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Geolocation | Browser Geolocation API |
| Persistence | IndexedDB (`mapsnap-db` / `snaps`) |
| PWA | Web App Manifest |

Client-only data flow. Production: Vercel, https://mapsnap.se. docs_engine is the product operating system.

## Current Baseline (MVP 0.1 — locked)

- Short tap → GPS → IndexedDB; long press (~600ms) → image + GPS
- Delete, empty state, Google Maps, Waze, backup/import — **existing**
- No post-capture edit UI yet — Wave 1

## Recent Decisions

- **ADR-012:** Protected SNAP interaction contract
- **ADR-013:** Local-first roadmap priority
- **ADR-014:** Save/download Snap image — Wave 1 required
- **ADR-015:** Snaptisers strategic capability
- **ADR-016:** Backend deferral
- **ADR-017:** Compact card experiment
- **ADR-018:** Coordinated feedback with radial waves

## Last Updated

2026-07-12
