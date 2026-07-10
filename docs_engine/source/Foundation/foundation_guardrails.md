# Foundation Guardrails

> Mandatory baseline for every PDE product.  
> Part of **PDE Foundation** — defines what every new project inherits before feature work begins.

---

## 1. Engineering Guardrails

Every new PDE project automatically inherits the full engineering baseline. These documents are never optional.

| Document | Purpose |
|----------|---------|
| **Foundation Constitution** | Governing principles for how PDE products are built and maintained |
| **Engineering Rules** | Permanent build discipline — scope control, layering, separation of concerns |
| **Regression Rules** | Behaviour and visual regressions are bugs; nothing ships that breaks approved baselines |
| **Behaviour Baseline** | Locked interaction patterns that must remain stable across releases |
| **Visual Baseline** | Locked visual system that must remain stable across releases |
| **Task Types** | Declared pass types — each task operates within one type and one scope |
| **Validation Rules** | How work is verified before it is considered complete |
| **Review Checklist** | Pre-merge checks that every change must pass |
| **Definition of Done** | Completion criteria — a task is not done until all criteria are met |

A project may extend these documents for product-specific needs. It may not omit them, hollow them out, or defer them until later.

Engineering guardrails exist before the first feature. They govern every line of code that follows.

---

## 2. Identity Guardrails

Every new PDE project automatically starts with a complete Product Identity layer. Identity is never created afterwards.

| Document | Purpose |
|----------|---------|
| **Identity Overview** | Purpose of Product Identity; how it relates to other docs_engine layers |
| **Product Doctrine** | Governing philosophy and permanent beliefs |
| **Voice** | Tone and character — how the product speaks |
| **Vocabulary** | Official terminology — the words the product owns |
| **Writing Rules** | Rules for all user-facing copy |
| **Product Quotes** | Canonical phrases that express the product permanently |

Identity exists before the first line of code.

No user-facing work — UI text, onboarding, dialogs, permissions, marketing, store descriptions, or documentation — may begin until Identity is loaded and understood.

Identity documents are protected. They are not implementation documents. Changes require explicit product approval.

---

## 3. User Continuity

One of the goals of PDE is to reduce onboarding between products.

Users should feel immediately familiar with every PDE product — not because products are identical, but because they share a family character.

Shared principles across the PDE ecosystem:

- **Calm interfaces** — nothing competes with the user's real-world context
- **Minimal interactions** — the fewest steps to accomplish the core action
- **Clear terminology** — consistent vocabulary within and across products where concepts overlap
- **Predictable behaviour** — interactions work the way users expect from prior PDE products
- **Offline-first where appropriate** — local capability before remote dependency
- **One-thumb usability** — designed for real-world, mobile, single-hand use
- **Respectful language** — human, direct, never manipulative or hype-driven

Products may differ in purpose. They should feel like members of the same family.

User continuity is not cosmetic. It is a structural advantage — earned through shared Identity, shared engineering discipline, and shared interaction philosophy.

---

## 4. Product Family Rules

Every PDE product must answer five questions before implementation begins:

| Question | Answered by |
|----------|-------------|
| **Who are we?** | Product Doctrine, Product Quotes |
| **How do we speak?** | Voice, Vocabulary, Writing Rules |
| **How do we feel?** | Voice, Visual Baseline, UX doctrine |
| **How do we behave?** | Behaviour Baseline, implementation doctrines |
| **How do users succeed?** | Product Doctrine, Vision, domain doctrines |

If any question lacks a documented answer, the product is not ready for feature work.

A product that cannot articulate its identity will invent it during implementation — and implementation-born identity is inconsistent, reactive, and expensive to fix.

---

## 5. Bootstrap Rule

Creating a new PDE project automatically generates four layers before feature development starts:

```
Engineering    — guardrails, baselines, rules, checklists
Product        — vision, doctrines, architecture, roadmap
Identity       — doctrine, voice, vocabulary, writing rules, quotes
Governance     — decisions, changelog, phase tracking, document rules
```

**Feature work is never allowed before these layers exist.**

Bootstrap is not a checklist to complete eventually. It is the precondition for all work. A repository without these layers is not a PDE product — it is an ungoverned codebase.

The bootstrap sequence is fixed. The content within each layer is product-specific. The structure is not.

---

## 6. Permanent Principle

Every project improves PDE Foundation.

Projects are incubators. Foundation is the distilled knowledge.

Whenever a project discovers:

- a better engineering rule
- a better identity rule
- a better governance rule
- a better user experience principle

the improvement should be evaluated for promotion into Foundation.

Promotion criteria:

1. **Generality** — the rule applies beyond the discovering product
2. **Evidence** — the rule was proven in practice, not theorised in isolation
3. **Clarity** — the rule can be stated without product-specific context
4. **Stability** — the rule is expected to remain valid across versions and teams

Not every project learning belongs in Foundation. Product-specific decisions stay in the product. Universal lessons rise.

Foundation grows slowly and deliberately. Individual products move fast within Foundation's guardrails. Together, the ecosystem compounds.

---

## Relationship to Other Layers

Foundation Guardrails sit above individual products. They define what every product inherits.

| Layer | Scope | Changes when |
|-------|-------|--------------|
| **Foundation** | All PDE products — engineering and identity baselines | A rule is promoted from a project with evidence and approval |
| **Product Identity** | One product — who it is | Product explicitly approves |
| **Product** | One product — what it builds, how, when | Scope, architecture, or phase changes |
| **Governance** | One product — decisions and history | Decisions are made or versions ship |

Foundation is timeless doctrine. Products are living implementations. The guardrails ensure every implementation starts from shared knowledge, not from zero.

---

## 7. MapSnap Incubator Lesson (PIE)

MapSnap MVP 0.1 demonstrated a permanent Foundation principle:

**Small products still require full engineering governance from the start.**

| Acceptable | Not acceptable |
|------------|----------------|
| Small, focused product docs | Thin or deferred engineering guardrails |
| Minimal feature scope | Skipping Identity before user-facing work |
| Lightweight MVP code | Implementation before docs_engine bootstrap |
| Local-first with backup/export | Assuming cloud sync will fix governance gaps later |

MapSnap shipped with: Product Identity layer, behaviour + visual baselines, docs_engine as product operating system, pass-type discipline, baseline verification, and IndexedDB-first storage doctrine. This is the minimum governance bar for future PDE products.

**Rule:** Future PDE products must be bootstrapped through PIE/Foundation before code begins. See ADR-011 in MapSnap `decisions.md`.
