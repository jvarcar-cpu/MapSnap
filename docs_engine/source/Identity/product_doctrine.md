# Product Doctrine

> Part of **Product Identity** — see `identity_overview.md`.

The governing philosophy for MapSnap. All product, UX, and feature decisions must align with these principles.

---

## MapSnap Core Philosophy

MapSnap is not a map application.

MapSnap is not a note taking application.

MapSnap is not a travel planner.

MapSnap is a tool.

Like a camera.

Like a compass.

Like a flashlight.

You open it.

You perform one action.

You close it.

---

## The Snap Principle

Everything in MapSnap begins with one action.

**SNAP.**

If a feature slows down the SNAP flow, it must be questioned.

Capture first.

Organize later.

---

## The One-Second Rule

The user should never have to think.

Open.

SNAP.

Done.

If the user spends more time interacting with the interface than observing the real world, the interface has failed.

---

## Reality First

MapSnap exists to support real experiences.

The application should disappear into the background.

The world is the product.

MapSnap only remembers it.

---

## Offline First

The application must continue to work without internet.

The user's data belongs to the user.

Cloud synchronization is an optional enhancement, never a requirement.

---

## Coordinates are Truth

Coordinates are the primary source of truth.

Everything else is metadata.

Names.

Photos.

Ratings.

Categories.

Notes.

All can change.

Coordinates remain.

---

## Thumb First

Every important interaction must be comfortably usable with one thumb while standing outdoors.

---

## Tool First

Whenever a new feature is proposed, ask:

1. Does this make the SNAP experience faster?
2. Does this help the user return to a place?
3. Does this improve real-world usefulness?

If the answer is no, the feature does not belong in MapSnap.

---

## North Star

The perfect MapSnap session:

1. See something.
2. Open MapSnap.
3. Press SNAP.
4. Put the phone away.
5. Continue living.

---

## Golden Rule — Experience

The app should never become more interesting than the place being captured.

The world is the experience.

MapSnap is only the memory.

---

## Golden Rule — Capture Protection

Every new feature must make a Snap more valuable, never harder to create.

No required form before capture.

No menu before capture.

No added confirmation before capture.

No interaction that delays the Snap moment.

Enrichment happens after capture.

See `feature_gate.md` for the mandatory seven-question gate.

---

## Product Positioning

MapSnap is not a map app.

MapSnap is the fastest way to save a place that matters and return to it when it matters.

The app captures the place before it is forgotten.

**Evolved product vision:** MapSnap exists to help people capture places that matter, enrich them with context, share them when needed, and protect them for the future.

These statements complement each other. Positioning is the one-sentence promise. The evolved vision describes the full product lifecycle. The core concept describes capture urgency.

---

## Core Product Pillars (lifecycle)

Four approved Core Pillars organize product work. A fifth — Discover — is an emerging strategic direction.

| Pillar | Purpose |
|--------|---------|
| **CAPTURE** | Capture a place immediately, reliably, with minimal friction |
| **ENRICH** | Give a captured place meaning and context after capture — never required before capture |
| **SHARE** | Communicate a place in the format appropriate to the situation |
| **PROTECT** | Protect the user's Snap history without requiring an account |

**Offline First. Cloud Optional.**

**MapSnap should protect the user's memories without requiring an account.**

### Discover (emerging strategic pillar)

Help the user find, understand, and rediscover relevant Snap content as their collection grows. Strategically approved; scope emerging. Grounded first in the user's own Snap collection — not a social discovery feed, not public place discovery by default.

*Discover should help the user rediscover what they chose to save, not distract them with unrelated places.*

Roadmap detail: `product_roadmap.md`.

---

## Experience Qualities

The model **Capture → Remember → Return → Delight** describes how the product should *feel* — not how work is organized. It is preserved alongside the lifecycle pillars; neither model is deleted.

| Quality | Role |
|---------|------|
| **CAPTURE** | The moment of saving |
| **REMEMBER** | Meaning and context over time |
| **RETURN** | Revisiting and using a place when it matters |
| **DELIGHT** | Cross-cutting — fast, calm, trustworthy, rewarding |

**Lifecycle mapping:**

- Capture supports **Capture**
- Enrich strengthens **Remember**
- Share and navigation strengthen **Return**
- Protect preserves **Remember** and **Return** over time
- Discover resurfaces remembered places
- **Delight** is cross-cutting — every pillar should feel fast, calm, trustworthy, and rewarding

ADR-020 documents this relationship.

---

## Product Character

MapSnap must remain:

- fast
- local-first
- offline-first
- calm
- honest
- minimal
- thumb-first
- practical
- trustworthy

**Internal product goal:** MapSnap should feel lighter than it is.

---

## Share (product track)

Share is a major product capability with multiple modes — not a single button. Quick Share is implemented; Professional Share, MapSnap-to-MapSnap Share, and Smart Share are future directions. See `product_roadmap.md` Share Product Depth.

