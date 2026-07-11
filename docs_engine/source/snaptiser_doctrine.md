# Snaptiser Doctrine

> Product context: REMEMBER pillar — see `product_roadmap.md` Wave 3

**Ratified:** 2026-07-12

---

## Principle

**A saved place can also preserve an intention.**

A Snap does not only preserve a place. It may preserve an intention connected to the place.

Examples:

- Remember where the car is
- Buy honey here next time
- Good fishing spot
- Return here next summer
- Remind me when I am nearby
- Remind me tomorrow

---

## Product Rules

| Rule | Detail |
|------|--------|
| Optional | Snaptisers never slow Snap creation |
| After capture | Set and edit only post-capture |
| Local-first MVP | Time-based reminders first; proximity experimental |
| Honest limits | Do not claim full background geofencing without verification |

Snaptisers help the user remember: what mattered, what to do, when to return, when proximity makes the Snap relevant.

---

## Naming Status

**Snaptiser** is a MapSnap-specific working product term. Status: **provisional** — register in `Identity/vocabulary.md` when product approves for broad user-facing use.

---

## Implementation Tiers

| Tier | Status | Scope |
|------|--------|-------|
| **MVP** | Planned | Time-based: date, time, reminder text; notification permission; edit/remove; state on Snap card |
| **Experimental** | Planned spike | Proximity trigger near saved Snap; default or configurable radius |
| **Deferred** | Backend-dependent | Reliable background geofencing when app closed; cross-device sync of reminders |

See `known_issues.md` FEAS-002 for PWA notification and geofencing constraints.

**ADR:** ADR-015
