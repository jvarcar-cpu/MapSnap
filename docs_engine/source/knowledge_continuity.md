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
| **Working method** | How MapSnap develops — Feature Pass discipline, Shared Discovery separation, Product Integration | `rules/implementation_rules.md`, this document |

Chronicles are append-only. They do not outrank doctrine or ADR authority.

## Shared Discovery and Ownership Separation

A MapSnap working session may produce discoveries that belong to MapSnap, PDE Foundation, or another institution.

| Rule | Meaning |
|------|---------|
| **Session may be shared** | Chat or Cursor location does not determine ownership |
| **Ownership is not shared** | Every separated discovery receives exactly one institutional owner |
| **Discovery Separation** | Multi-owner discoveries are separated before Institutional Integration or Product Integration |
| **MapSnap retains** | Product findings, roadmap decisions, UX doctrine, Feature Pass outcomes |
| **Foundation receives** | Foundation-owned governance discoveries (routed to PDE — not absorbed into MapSnap architecture) |

Discovery Separation assigns ownership and work packages. It performs **no** product implementation.

## Product Integration Pass

When an external or Foundation discovery changes MapSnap's **working method** but not its product architecture, MapSnap executes its own **Product Integration Pass** (Docs Pass).

| Allowed | Forbidden |
|---------|-----------|
| Update MapSnap methodology, continuity, and completion discipline | Import Foundation constitutional architecture into MapSnap product architecture |
| Record historical provenance of shared sessions | Copy Foundation capability internals, contracts, or lifecycle phases into MapSnap |
| Resume roadmap from last completed sprint | Mutate product identity, UX, schemas, or behaviour without product authority |

PDE Foundation Institutional Integration does **not** directly mutate MapSnap. MapSnap changes only through its own Product Integration Pass.

## Historical Provenance — WP-AGSE-MSP-0001

| Field | Value |
|-------|-------|
| **Context** | During active MapSnap Wave 2 development, a Foundation discovery (Architectural Governance Session Establishment) emerged in a shared working session |
| **Owner** | PDE Foundation — not MapSnap |
| **MapSnap receipt** | Product Integration Pass WP-AGSE-MSP-0001 — development methodology only |
| **Product architecture** | **Unchanged** — that Foundation capability is not MapSnap architecture, subsystem, or product constitutional surface |
| **Status** | **Complete** (2026-07-25) |
| **Resume point** | Wave 2 — Feature Pass — Tags shipped; next Order 11 Snaptiser spike when scoped |

## Institutional Memory Entries

| Date | Entry | Significance |
|------|-------|--------------|
| 2026-07-11 | CHRONICLE-MSN-0001 — *The First Public Presence* | MapSnap became publicly available at https://mapsnap.se — first public production domain in this product lineage |
| 2026-07-11 | Pre-PDE lineage preserved | MapSnap was not created by PDE; developed independently before PDE Foundation operational maturity |
| 2026-07-11 | Product Onboarding reference case (discovery only) | MapSnap may later inform how externally created products enter the PDE ecosystem — not a ratified PDE decision |
| 2026-07-12 | Official product roadmap ratified | `product_roadmap.md` — Waves 0–5, Feature Gate, ADRs 012–018; post-MVP 0.1 governance pass |
| 2026-07-14 | Core Product Lifecycle Pillars ratified | ADR-020 — Capture, Enrich, Share, Protect; Discover emerging; experience qualities preserved; Share product track; Wave 5 Protect, Wave 6 cloud |
| 2026-07-14 | Field Validation 0006 — Quick Share SMS | Successful real-device share test; duplicate text polish decision |
| 2026-07-14 | Wave 1 institutionally closed | All shipped sprints verified; reconciliation complete; product ready for Compact Cards |
| 2026-07-14 | Wave 2 Sprint 1 — Compact Cards Iteration 1 | Reduced-height banner cards; action-group divider; Wave 2 organization track begins |
| 2026-07-14 | Wave 2 Sprint 2 — Search | Local title/notes filter; search bar; search empty state |
| 2026-07-14 | Wave 2 Sprint 3 — Smart Sorting | Nyast / Äldst / Närmast list reorder; nearest one-time GPS |
| 2026-07-14 | Wave 2 Sprint 4 — Filter | Alla / Favoriter / Med bild; search → filter → sort pipeline |
| 2026-07-14 | Wave 1 Core Value shipped | Sprints 1–5, MapSnap signature (ADR-021), snap card + action icon polish |
| 2026-07-14 | ADR-021 — MapSnap Signature | User first. Product second. No card fallback title |
| 2026-07-14 | SnapSpot canonical label | Location line on cards and in Quick Share; category remains metadata |
| 2026-07-25 | WP-AGSE-MSP-0001 Product Integration | Shared Discovery / Discovery Separation / Product Integration methodology integrated; product architecture unchanged; Wave 2 resumes at Tags |
| 2026-08-02 | ADR-023 — Capture Reliability + PWA install guidance | Long-press user-gesture-safe activation, progress feedback, Öppna kamera fallback; progressive install guidance; Field Validation 0007 (iPhone pending); Tags remains next |
| 2026-08-02 | ADR-024 — Contextual Guidance Placement | Install guidance repositioned beneath SNAP; Contextual Guidance Principle in UX doctrine; capability remains ADR-023; Tags remains next |
| 2026-08-02 | Tags Documentation Pass | Tags institutionalized — definition, Wave 2 scope, UX principles, Feature Gate; Feature Pass — Tags ready; no new ADR; no implementation |
| 2026-08-02 | Feature Pass — Tags | Create/edit/remove/display tags; search title+notes+tags; normalization; legacy compatible; Wave 2 early organization complete for tags |

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
- Do not import Foundation constitutional architecture into MapSnap product architecture.
- Governance methodology must not overshadow product simplicity.

See `docs_engine/source/chronicles/chronicles_scope_doctrine.md` and `docs_engine/source/chronicles/chronicle_registry.md`.
