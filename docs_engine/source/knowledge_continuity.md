# Knowledge Continuity v0.1

## Purpose

Knowledge Continuity is MapSnap's institutional lens for preserving reasoning across time — not just state, events, or decisions.

MapSnap docs_engine composes several artifact types. Each answers a different question.

| Component | Role | Location |
|-----------|------|----------|
| **Chronicles** | Curated narrative memory — **why** significant milestones mattered | `docs_engine/source/chronicles/` |
| **Doctrine & Identity** | Binding product truth — **what** MapSnap is | `docs_engine/source/Identity/`, domain doctrines |
| **ADR** | Durable decisions — **which** path was chosen | `docs_engine/source/decisions.md` |
| **Changelog** | Timeline — **when** meaning changed | `docs_engine/source/changelog.md` |
| **Phase & Baseline** | Operational state — **what** is current and locked | `source/current_phase.md`, `source/stable_baseline.md` |
| **Roadmap** | Planned product work — **what** ships next | `source/product_roadmap.md`, `source/feature_gate.md`, `source/implementation_readiness.md` |
| **Field Validation Log** | Verified real-world observations — **what** was seen in the field | `source/field_validation_log.md` (MapSnap only; not PDE) |

Chronicles are append-only. They do not outrank doctrine or ADR authority.

## Institutional Memory Entries

| Date | Entry | Significance |
|------|-------|--------------|
| 2026-07-11 | CHRONICLE-MSN-0001 — *The First Public Presence* | MapSnap became publicly available at https://mapsnap.se — first public production domain in this product lineage |
| 2026-07-11 | Pre-PDE lineage preserved | MapSnap was not created by PDE; developed independently before PDE Foundation operational maturity |
| 2026-07-11 | Product Onboarding reference case (discovery only) | MapSnap may later inform how externally created products enter the PDE ecosystem — not a ratified PDE decision |
| 2026-07-12 | Official product roadmap ratified | `product_roadmap.md` — Waves 0–5, Feature Gate, ADRs 012–018; post-MVP 0.1 governance pass |
| 2026-07-14 | Core Product Lifecycle Pillars ratified | ADR-020 — Capture, Enrich, Share, Protect; Discover emerging; experience qualities preserved; Share product track; Wave 5 Protect, Wave 6 cloud |
| 2026-07-14 | Field Validation 0006 — Quick Share SMS | Successful real-device share test; duplicate text polish decision |

## Production Domain Record

| Field | Value |
|-------|-------|
| **First public production domain** | https://mapsnap.se |
| **Ratified** | 2026-07-11 (CHRONICLE-MSN-0001) |
| **Hosting** | Vercel |
| **Deployment** | Continuous deployment from GitHub repository |
| **Transport** | HTTPS |

## Rules

- Capture significant milestones in Chronicles; record operational detail in phase, architecture, and changelog documents.
- Do not describe MapSnap as a PDE-generated product.
- Do not promote architectural discoveries mentioned in Chronicles into binding MapSnap governance without explicit ADR or doctrine review.

See `docs_engine/source/chronicles/chronicles_scope_doctrine.md` and `docs_engine/source/chronicles/chronicle_registry.md`.
