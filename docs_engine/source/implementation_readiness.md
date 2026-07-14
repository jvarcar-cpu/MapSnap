# Implementation Readiness Plan

> Recommended build sequence after roadmap ratification. **Do not start until explicitly scoped as a Feature or UX pass.**

**Ratified:** 2026-07-12  
**Roadmap:** `product_roadmap.md`

---

## Sequence

| Order | Unit | Scope boundary | Dependencies | Migration risk | Test requirements | Rollback | Docs update |
|-------|------|----------------|--------------|----------------|-------------------|----------|-------------|
| 1 | Baseline verification | Confirm W0 checklist; no code unless doc fixes | None | None | `verify-baseline.mjs` + manual mobile OPS-002 | N/A | `baseline_reconciliation.md` |
| 2 | Usage instruction | Hero microcopy only | None | None | Visual + a11y; capture time unchanged | Remove copy | `ux_doctrine.md` |
| 3 | SNAP feedback polish | Haptic, sound, glow, pulse, radial waves, toast text | None | Low | Reduced-motion; persistence not blocked; ~500–700ms | Revert CSS/JS feedback | `ux_doctrine.md`, ADR-018 |
| 4a | Snap model preparation (Sprint 2A) | Schema normalization, backup compat, migration | None | Low | Backup round-trip; existing snaps preserved | Revert `snapModel.ts` | `snap_model.md`, `data_doctrine.md`, ADR-019 |
| 4b | Title + notes UI (Sprint 2B) | Post-capture edit UI for `name` / `note` | Sprint 2A | Low — optional fields | Regression checklist; backup import | Revert UI only | `data_doctrine.md`, `known_issues.md` | **Completed** |
| 5 | Save image | "Spara bild" on snaps with photo | `photoDataUrl` | None — copy only | Per-platform manual test FEAS-001 | Remove action | `image_doctrine.md`, ADR-014 | **Completed** |
| 6 | Share Snap | Native share + unavailable message | Title optional | None | Share sheet + desktop unavailable UX | Remove action | `ux_doctrine.md` | **Completed** |
| 7 | Favorite | `favorite` field + toggle | Schema bump if needed | Low | Filter prep; backup round-trip | Remove field from UI | `data_doctrine.md` |
| 8 | Compact card experiment | List layout only; detail view for full image | Title, favorite | Medium — UX | Measurable recognition test | Revert to banner layout | ADR-017, `ux_doctrine.md` |
| 9 | Search / sort / filter | List controls only | Title, notes, favorite | Low | Performance with many snaps | Hide controls | `product_roadmap.md` status |
| 10 | Tags | Lightweight tag list on snap | Edit UI | Low | Backup import | Remove tags | `data_doctrine.md` |
| 11 | Snaptiser feasibility spike | Research only — notifications, geofencing | None | None | Document FEAS-002 findings | N/A | `snaptiser_doctrine.md`, `known_issues.md` |
| 12 | Time-based Snaptiser MVP | Local scheduled notification | Spike approval | Medium | Permission denied; app closed behavior | Disable feature flag | ADR-015 |
| 13 | Proximity Snaptiser experiment | Opt-in geolocation watch or periodic check | Time MVP | High | Battery; honesty about limits | Disable experiment | `snaptiser_doctrine.md` |
| 14 | Image experience expansion | Full-screen, zoom, compression | Save image | Medium | Quota limits MVP-001 | Revert viewers | `image_doctrine.md` |
| 15 | Backend reassessment | Decision only — no build | Waves 1–4 usage data | N/A | Product need evidence | N/A | ADR-016 review |

---

## Prerequisites (every implementation unit)

1. Generated steering docs current (`docs_engine/output/`)
2. Pass type declared in `current_phase.md` (Feature, UX, Storage, etc.)
3. Identity documents loaded for any Swedish user-facing copy
4. Feature Gate passed — documented in roadmap item
5. Behaviour + visual regression checklists pass after unit ships

---

## Recommended First Implementation Pass

**When scoped:** Start with **Order 1 (Baseline verification)** — already documented in `baseline_reconciliation.md`.

**First code pass:** **Order 2 (Usage instruction)** — lowest risk, highest clarity value, no SNAP contract change.

**First substantive feature pass:** **Orders 3–5** as a single Feature Pass only if explicitly grouped — otherwise one order per pass per `implementation_rules.md`.

---

## Rollback Expectation

All Wave 1–2 units must be reversible without data loss. Schema additions use optional fields. IndexedDB version bumps require migration or graceful defaults. Backup/export must round-trip new fields before release.
