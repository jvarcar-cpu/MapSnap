# MapSnap Feature Gate

> **Mandatory gate.** No feature enters implementation until it passes all criteria below.  
> Philosophy: `Identity/product_doctrine.md` · Roadmap: `product_roadmap.md`

**Ratified:** 2026-07-12

---

## Golden Rule (Capture Protection)

**Every new feature must make a Snap more valuable, never harder to create.**

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
| 2 | Does it help the user capture, remember, return, or safely manage a meaningful place? | Reject |
| 3 | Is it understandable without a manual? | Simplify |
| 4 | Does it preserve offline / local-first behavior where reasonably possible? | Justify explicitly in ADR |
| 5 | Does it add visible interface weight disproportionate to its value? | Redesign |
| 6 | Can it live after capture instead of before capture? | It should |
| 7 | Does it preserve MapSnap's calm and minimal identity? | Reject or defer |

---

## How to Apply

1. Propose feature with pillar mapping (CAPTURE / REMEMBER / RETURN / DELIGHT).
2. Run all seven questions — document answers in roadmap item or ADR.
3. If any answer blocks approval, redesign or move to Deferred.
4. Register in `product_roadmap.md` with status before implementation.
5. UX polish that touches SNAP must confirm **interaction contract** unchanged (ADR-012).

---

## Automatic Rejections

- Backend-first features without proven local-first limitation
- Pre-capture metadata requirements
- Proprietary navigation replacing Google Maps / Waze
- Undo when delete already suffices
- Dashboard complexity (tabs, settings sprawl) without pillar justification
