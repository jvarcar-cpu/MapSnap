# Docs Engine — Product Operating System

> MapSnap governance hub. Source of truth for knowledge, validation, governance, generated state, implementation context, and continuity.

## Role

docs_engine is the **product operating system** for MapSnap. It is not optional documentation — it governs how the product is built, verified, and continued across sessions and agents.

docs_engine owns:

| Domain | Location |
|--------|----------|
| **Knowledge** | `source/` — vision, doctrines, architecture, Identity, Foundation |
| **Validation** | `rules/implementation_rules.md`, `source/stable_baseline.md`, `scripts/verify-baseline.mjs` |
| **Governance** | `rules/`, `source/decisions.md`, `source/changelog.md` |
| **Institutional memory** | `source/chronicles/`, `source/knowledge_continuity.md` — append-only narrative (Chronicles) and continuity index |
| **Generated state** | `output/` — steering snapshots from `templates/` |
| **Implementation context** | `templates/AGENTS.template.md` → `output/AGENTS.md` |
| **Continuity** | `current_phase.md`, `next_task.md`, `known_issues.md`, `product_roadmap.md`, changelog, Chronicles |

## Hard Rules

1. **No implementation starts before generated steering docs are current.** Regenerate `output/` from `source/` and `templates/` before any product code pass.
2. **Behaviour and visual baselines are both required.** No task is complete unless both regression checklists pass (`stable_baseline.md`).
3. **One pass type at a time:** Bug Fix, Feature, UX, Docs, Storage, Stabilization — see `implementation_rules.md`.
4. **Product Identity is first-class and protected.** Load Identity documents before any user-facing copy. Do not auto-modify Identity without product approval.
5. **Source is authoritative; output is generated.** Edit `source/` and `templates/`, then regenerate `output/`. Do not hand-edit generated files.

## Layers

```
docs_engine/
├── source/           — authoritative product knowledge
│   ├── Identity/     — who MapSnap is (protected)
│   ├── Foundation/   — PDE-wide guardrails inherited from PIE
│   ├── chronicles/   — append-only institutional memory (Chronicles, registry, scope doctrine)
│   └── …             — vision, doctrines, phase, baseline, issues, knowledge_continuity
├── rules/            — engineering discipline and document rules
├── templates/        — generation templates for output/
└── output/           — generated steering snapshots (regenerate, do not hand-edit)
```

## Regeneration

MapSnap uses template-based generation. After source changes:

1. Regenerate all applicable outputs: `MASTER.md`, `AGENTS.md`, `SNAPSHOT.md`, `CURRENT_TASK.md`, `CURRENT_BASELINE.md`, `KNOWN_ISSUES.md`
2. Run `node scripts/validate_docs.mjs` for governance checks
3. Run `node scripts/verify-baseline.mjs [url]` for behaviour/visual baseline against the live dev server

## PIE / Foundation Lesson

MapSnap proved that small products still require full engineering governance from the start. Small product docs are acceptable. Thin engineering guardrails are not. Future PDE products must be bootstrapped through PIE/Foundation before code begins. See `Foundation/foundation_guardrails.md` §7 and ADR-011 in `decisions.md`.
