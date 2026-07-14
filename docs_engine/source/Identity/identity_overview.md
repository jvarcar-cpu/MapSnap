# Product Identity — Overview

> Foundation document for the Product Identity layer in docs_engine.  
> Designed for reuse in PDE Foundation as the basis for a **Product Identity Engine**.

---

## What Product Identity Is

Product Identity defines **who a product is** — not what it does technically, nor when features ship.

It is not only about branding. Branding is one surface. Product Identity is the full character of a product: what it believes, how it speaks, which words it owns, and which principles it will not compromise.

It answers:

- What does the product believe?
- How does the product speak?
- Which words does the product use?
- Which phrases express the product permanently?

Product Identity is **timeless**. It should remain valid across versions, platforms, and team changes. Implementation follows identity; identity does not follow implementation.

### Ecosystem Continuity

Within PDE, Product Identity serves a second purpose beyond any single product: **continuity across the entire ecosystem**.

Users who have used one PDE product should already understand part of a new one before they ever open it. They recognise the calm. They recognise the language. They recognise how interactions behave. They recognise what success feels like.

This continuity is not accidental. It is designed — through shared voice principles, shared interaction philosophy, shared engineering discipline, and shared respect for the user. It is considered a **strategic product advantage**: reduced onboarding, increased trust, and a family of tools that compound in value as the ecosystem grows.

A new PDE product does not invent its character during development. It inherits Foundation guardrails and establishes its own Identity before the first line of code. Users meet a product that already knows who it is.

---

## What Product Identity Is Not

Product Identity documents are **not** implementation documents. They do not describe code, APIs, storage, or UI components. They govern how the product presents itself and what it stands for.

Changes to Product Identity require **explicit product approval**. AI and automated tooling must not modify Identity documents without that approval.

---

## The Identity Layer

```
docs_engine/source/Identity/
├── identity_overview.md    — this document
├── product_doctrine.md     — governing philosophy
├── product_quotes.md       — canonical brand phrases
├── voice.md                — tone and character
├── vocabulary.md           — official terminology
└── writing_rules.md        — rules for all user-facing copy
```

Together these five documents plus this overview form **Product Identity**.

Before any user-facing work — UI text, onboarding, dialogs, permissions, website, README, store description, or user documentation — load all five documents. Only then write.

---

## How Identity Differs from Other docs_engine Layers

docs_engine holds multiple layers. Each has a distinct purpose. Product Identity is one layer among several.

| Layer | Location | Purpose | Changes when |
|-------|----------|---------|--------------|
| **Foundation** | `Foundation/foundation_guardrails.md` | Mandatory baseline for all PDE products — engineering and identity guardrails | A rule is promoted from a project with evidence and approval |
| **Product Identity** | `Identity/` | Who MapSnap is — philosophy, voice, language | Product explicitly approves |
| **Vision** | `product_vision.md` | What MapSnap is building toward — scope, promise, direction | Scope or positioning changes |
| **Doctrine** (implementation) | `capture_doctrine.md`, `data_doctrine.md`, `ux_doctrine.md` | How specific domains behave — capture flow, data model, UI patterns | Domain behavior changes |
| **Architecture** | `architecture_state.md`, `decisions.md` | How the system is structured — stack, boundaries, ADRs | Stack or boundary changes |
| **Engineering** | `rules/implementation_rules.md`, `rules/architecture_rules.md` | How we build — discipline, layering, regressions | Process or technical standards change |
| **Roadmap** | `current_phase.md`, `product_roadmap.md`, `feature_gate.md`, `implementation_readiness.md`, `changelog.md` | What ships when — phases, waves, gates, shipped history | Phase transitions or releases |

### Vision vs Identity

**Vision** describes the product direction — MVP scope, success criteria, lifecycle pillars, long-term gates. It is strategic and may evolve as the product grows.

**Identity** describes the product character — beliefs and language that should not shift with each release. Vision says where we go; Identity says who we are on the way.

**Lifecycle pillars** (Capture, Enrich, Share, Protect, Discover) describe how product work is organized. **Experience qualities** (Capture, Remember, Return, Delight) describe how the product should feel. Both live in vision and doctrine; they answer different questions and must not contradict. See ADR-020.

### Doctrine vs Identity

**Product Doctrine** (`Identity/product_doctrine.md`) is the philosophical core *within* Identity — Snap Principle, Golden Rule, Tool First, and similar permanent beliefs.

**Implementation doctrines** (`capture_doctrine.md`, etc.) translate philosophy into domain-specific rules — how capture works, how data is stored, how UI behaves. They change when behavior changes; they reference Identity but are not Identity themselves.

### Architecture & Engineering vs Identity

**Architecture** and **Engineering** describe *how the system is built* — directories, dependencies, pass types, regression checklists. They are operational and technical.

**Identity** describes *how the product presents and what it believes*. A developer can refactor storage without touching Identity. A copywriter cannot write UI text without loading Identity first.

### Roadmap vs Identity

**Roadmap** (`product_roadmap.md`, `current_phase.md`, `feature_gate.md`, `changelog.md`) is temporal — what phase we are in, what ships, what is next.

**Identity** is atemporal — valid in MVP 0.1 and in every future version unless product explicitly revises it.

---

## PDE Foundation — Product Identity Engine

This structure is designed to become part of **PDE Foundation** as a reusable **Product Identity Engine**.

The engine provides:

1. **Canonical identity documents** — doctrine, quotes, voice, vocabulary, writing rules
2. **Load order** — agents and tooling must read Identity before generating user-facing output
3. **Protection rules** — Identity documents are not auto-modified
4. **Separation from implementation** — vision, architecture, engineering, and roadmap remain distinct layers

A product adopting PDE Foundation inherits this pattern: Identity defines *who the product is*; other layers define *what it builds, how it builds, and when it ships*.

See also: `Foundation/foundation_guardrails.md` — the mandatory baseline every PDE product inherits, including Identity guardrails and the bootstrap rule.

Implementation must follow Identity. Identity must remain timeless.

---

## MapSnap Signature

Approved product identity rule (ADR-021):

- **Every Snap carries the MapSnap signature** — permanent, subtle "MapSnap" text in the card header upper-right.
- **User first. Product second.** — User title is primary on the left; signature is secondary on the right.
- **No generic card fallback titles** — Untitled Snaps leave the title area empty; the signature is not a replacement title.
- **SnapSpot** remains the location/coordinate context in share text — not the Snap title.

Identity governs the principle; `ux_doctrine.md` governs layout and visual hierarchy.
