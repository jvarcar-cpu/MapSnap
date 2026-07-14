# MapSnap Feature Gate

> **Mandatory gate.** No feature enters implementation until it passes all criteria below.  
> Philosophy: `Identity/product_doctrine.md` · Roadmap: `product_roadmap.md`

**Ratified:** 2026-07-12  
**Updated:** 2026-07-14 (Core Pillar alignment — ADR-020)

---

## Golden Rule (Capture Protection)

**Every new feature must make a Snap more valuable, never harder to create.**

**Every new feature must strengthen at least one Core Pillar without weakening the others.**

Core Pillars: **CAPTURE**, **ENRICH**, **SHARE**, **PROTECT**. Discover features require additional guardrails (below).

Consequences:

- No required form before capture
- No menu before capture
- No added confirmation before capture
- No interaction that delays the Snap moment
- Enrichment happens after capture

This complements the Experience Golden Rule in `Identity/product_doctrine.md`: the app must never become more interesting than the place being captured.

---

## Mandatory Gate — Seven Questions

Before a feature may enter implementation, it must pass **all** of the following:

| # | Question | If failed |
|---|----------|-----------|
| 1 | Does it slow down or complicate the Snap moment? | Reject or redesign |
| 2 | Does it strengthen at least one Core Pillar (Capture, Enrich, Share, Protect) without materially weakening another? | Reject |
| 3 | Is it understandable without a manual? | Simplify |
| 4 | Does it preserve offline / local-first behavior where reasonably possible? | Justify explicitly in ADR |
| 5 | Does it add visible interface weight disproportionate to its value? | Redesign |
| 6 | Can it live after capture instead of before capture? | It should |
| 7 | Does it preserve MapSnap's calm and minimal identity? | Reject or defer |

### Discover-specific guardrails

For features mapped to the **DISCOVER** pillar (emerging), also require:

| Question | If failed |
|----------|-----------|
| Is this helping the user rediscover their own meaningful content? | Reject or redesign |
| Or is it introducing unrelated attention and noise? | Reject unless future product strategy explicitly changes |

Discover must not become a social discovery feed or public place discovery by default.

---

## How to Apply

1. Propose feature with **Core Pillar** mapping (CAPTURE / ENRICH / SHARE / PROTECT / DISCOVER).
2. Note which **experience qualities** it strengthens (Remember, Return, Delight) if relevant.
3. Run all seven questions — document answers in roadmap item or ADR.
4. For Discover features, run Discover guardrails.
5. If any answer blocks approval, redesign or move to Deferred.
6. Register in `product_roadmap.md` with status before implementation.
7. UX polish that touches SNAP must confirm **interaction contract** unchanged (ADR-012).

---

## Automatic Rejections

- Backend-first features without proven local-first limitation
- Pre-capture metadata requirements
- Proprietary navigation replacing Google Maps / Waze
- Undo when delete already suffices
- Dashboard complexity (tabs, settings sprawl) without pillar justification
- Social discovery feeds or public place discovery without explicit strategy change
- Legal verification or tamper-proof evidence claims in Share outputs
