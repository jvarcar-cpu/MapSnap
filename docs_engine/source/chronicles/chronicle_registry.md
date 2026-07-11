# Chronicle Registry v0.1

## Purpose

The chronicle registry lists MapSnap Chronicles and their institutional role.

Chronicles are append-only institutional memory. This registry is the index — not the memory itself.

## Chronicle Areas

| Chronicle | Scope | Location | Status | First entry |
|-----------|-------|----------|--------|-------------|
| MapSnap Chronicles | MapSnap product lineage — origin, identity, validation, public presence, and future milestones | `docs_engine/source/chronicles/MAPSNAP_CHRONICLES.md` | Active | CHRONICLE-MSN-0001 (2026-07-11) — *The First Public Presence* |

## Entry Identification

MapSnap Chronicle entries use the prefix `CHRONICLE-MSN-` followed by a zero-padded sequence number.

| Prefix | Chronicle |
|--------|-----------|
| `CHRONICLE-MSN-` | MapSnap |

## Chronicle Naming

| Element | Convention |
|---------|------------|
| **ID** | Prefix + sequence (e.g., `CHRONICLE-MSN-0001`) |
| **Title** | Event-oriented historical milestone |
| **Status** | Ratified entries are permanent — do not modify body content |

## Rules

| Rule | Meaning |
|------|---------|
| Append-only | Registry rows may gain entries. Historical entry bodies are never rewritten. |
| Day 1 required | The first entry records the product's foundational public milestone. |
| Milestone discipline | Register the Chronicle before writing entries. Do not create orphan Chronicle files outside this registry. |
| Cross-reference | Entries link to related ADRs, doctrines, and phase documents — not duplicate their authority. |
| Pre-PDE lineage | MapSnap predates PDE Foundation operational maturity. Chronicles preserve that distinction. |

## Rule

Chronicle entries outrank generated summaries and informal handoff narrative.
Chronicle entries do not outrank doctrine or durable ADR authority.
