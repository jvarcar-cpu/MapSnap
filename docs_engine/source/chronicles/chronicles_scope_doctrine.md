# Chronicles Scope Doctrine v0.1

## Purpose

Chronicles define MapSnap's permanent institutional memory system.

Source code explains **how** the product works.
Doctrine explains **what** is true.
ADR explains **which** path was chosen.
Changelog explains **when** institutional meaning changed.

Chronicles explain **why** — the problems that existed, how thinking evolved, what was rejected, and what insights changed the product.

## Institutional Role

| Artifact | Role | Answers |
|----------|------|---------|
| **Doctrine** | Truth | What is binding product knowledge? |
| **ADR** | Decision | Which path was chosen? |
| **Changelog** | Timeline | When did institutional meaning change? |
| **Chronicle** | Narrative | Why did the product evolve this way? |
| **Phase / Baseline** | Operational state | What is the current product baseline? |

Chronicles are **not** a substitute for doctrine, ADRs, changelog, or phase documents.
Chronicles are **not** documentation of current behaviour.
Chronicles are **not** implementation guides.

Chronicles preserve reasoning, narrative, and lessons across time.

## MapSnap Chronicles

MapSnap maintains one product Chronicle beginning on Day 1 — the first historically significant milestone that establishes the product as a publicly reachable lineage.

The Day 1 entry records:

- Why the product exists
- How early behaviour shaped architecture
- First validation in real use
- Identity formation
- Production and public presence milestones

## Phase vs Chronicle

Phase documents and Chronicles are **distinct artifact types**.

| Dimension | Phase / Baseline | Chronicle |
|-----------|------------------|-----------|
| Nature | Operational | Historical |
| Purpose | Current scope, exit criteria, locked baseline | Curated narrative, significance, lessons learned |
| Answers | What is the current product state? | Why did this evolution matter? |

Not every phase transition creates a Chronicle. Chronicles record historically significant evolution only.

## Append-Only Discipline

- History is never rewritten.
- If understanding changes, add a new entry. Never modify historical entry body content.
- Record significant milestones only — not routine maintenance.

## Relationship to PDE

MapSnap was conceived and developed independently before PDE Foundation reached operational maturity. MapSnap Chronicles record MapSnap's own lineage. They do not claim PDE as creator.

MapSnap may later serve as a reference case for Product Onboarding into the PDE ecosystem. That is an architectural discovery — not a ratified PDE decision and not a MapSnap subsystem.

See `docs_engine/source/knowledge_continuity.md`.
