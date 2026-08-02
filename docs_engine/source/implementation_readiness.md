# Implementation Readiness Plan

> Recommended build sequence after roadmap ratification. **Do not start until explicitly scoped as a Feature or UX pass.**

**Ratified:** 2026-07-12  
**Updated:** 2026-08-02 — Wave 2 Institutionally Complete; Wave 3 Discovery active  
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
| 7 | Favorite | `favorite` field + toggle | Schema bump if needed | Low | Filter prep; backup round-trip | Remove field from UI | `data_doctrine.md` | **Completed** |
| 7b | MapSnap signature | Card header signature + no fallback title | Favorite, title | Low | Card/share title helpers; baseline verification | Revert header layout | ADR-021, `ux_doctrine.md`, Identity | **Completed** |
| 7c | Snap card action polish | Two-column actions, icons, SnapSpot card label | Signature | Low | Button grid; touch targets; no behaviour change | Revert action layout | `ux_doctrine.md`, `vocabulary.md` | **Completed** |
| 7d | Action icon polish | Google Maps + Waze brand icons; SVG card action icons | Snap card polish | Low | Icon visibility; touch targets; no behaviour change | Revert icon components | `ux_doctrine.md` | **Completed** |
| 8 | Compact card experiment | List layout only; detail view for full image | Title, favorite, action polish | Medium — UX | Measurable recognition test | Revert to banner layout | ADR-017, `ux_doctrine.md` | **Iteration 1 shipped** |
| 9a | Search (title, notes) | Search field above list; local filter only | Title, notes | Low | Performance with many snaps; partial match | Hide search bar | `product_roadmap.md`, `ux_doctrine.md` | **Completed** |
| 9b | Sort / filter | List controls only | Search, favorite | Low | Performance with many snaps | Hide controls | `product_roadmap.md` status | **Completed** (Sprint 3 sort; Sprint 4 filter) |
| 9c | Capture Reliability + PWA install guidance | Long-press reliability, camera fallback, progressive install UX | SNAP button, manifest | Low–Medium | Gesture + install unit tests; iPhone field validation pending | Revert SnapButton / hide InstallGuidance | ADR-023, `capture_doctrine.md`, `ux_doctrine.md` | **Completed** (implementation 2026-08-02; iPhone FV pending) |
| 9d | Install Guidance Repositioning | Place install recommendation beneath SNAP; Contextual Guidance Principle | InstallGuidance, page hero | Low | Placement + reveal-delay unit tests | Move guidance back / hide | ADR-024, `ux_doctrine.md` | **Completed** (UX Pass 2026-08-02) |
| 10 | Tags | **Completed** — create/edit/remove/display + search with title/notes | Edit UI; schema `tags` ready | Low | Backup import of `tags`; search regression | Remove tags UI; field optional | `data_doctrine.md`, `ux_doctrine.md`, `product_roadmap.md` | **Completed** |
| 11 | Snaptiser feasibility spike | Research only — notifications, geofencing | None | None | Document FEAS-002 findings | N/A | `snaptiser_doctrine.md`, `known_issues.md` |
| 12 | Time-based Snaptiser MVP | Local scheduled notification | Spike approval | Medium | Permission denied; app closed behavior | Disable feature flag | ADR-015 |
| 13 | Proximity Snaptiser experiment | Opt-in geolocation watch or periodic check | Time MVP | High | Battery; honesty about limits | Disable experiment | `snaptiser_doctrine.md` |
| 14 | Image experience + Professional Share | Full-screen, zoom, compression, documented export, professional format | Save image, Quick Share | Medium | Quota limits MVP-001 | Revert viewers | `image_doctrine.md`, `product_roadmap.md` Wave 4 |
| 15 | Protect Snaps | Backup/restore UX, reminders, data-loss education, native backup export | Waves 1–4 usage | Medium | User trust; honest limits | Revert UX | `product_roadmap.md` Wave 5, `data_doctrine.md` |
| 16 | MapSnap-to-MapSnap Share / cloud reassessment | Decision only — no build until Protect proven | Waves 1–5 usage data | N/A | Product need evidence | N/A | ADR-016 review, `product_roadmap.md` Wave 6 |

---

## Prerequisites (every implementation unit)

1. Generated steering docs current (`docs_engine/output/`)
2. Pass type declared in `current_phase.md` (Feature, UX, Storage, etc.)
3. Identity documents loaded for any Swedish user-facing copy
4. Feature Gate passed — documented in roadmap item (Core Pillar mapping required)
5. Behaviour + visual regression checklists pass after unit ships

---

## Completed — Feature Pass: Tags (Order 10)

**Shipped:** 2026-08-02. Documentation Pass + Feature Gate preceded implementation.

### Acceptance criteria (Tags Feature Pass)

- [x] Create, edit, and remove tags on a Snap after capture
- [x] Tags displayed on the Snap card — visually lightweight; metadata, not primary content
- [x] Tags never shown or required before SNAP
- [x] Free-form user tags allowed; approximately five tags recommended without a hard technical limit
- [x] Search includes tags together with title and notes (combined retrieval)
- [x] Backup/import round-trips `tags`
- [x] SNAP contract unchanged (ADR-012); Capture / Share / Protect behaviour unchanged
- [x] Behaviour + visual regression checklists pass
- [x] Docs Engine source + outputs synchronized; `validate_docs.mjs` passes

### Explicit non-goals (preserved)

- Tag hierarchy, groups, colors, favorites, statistics, or tag cloud
- AI-generated or recommended tags
- Shared tags
- Discover engine or collections
- Advanced filtering beyond current roadmap
- Pre-capture tag UI
- Backend, cloud, or schema-required migration

### Feature Gate summary

| Pillar | Impact |
|--------|--------|
| Capture | No impact |
| Enrich | Strengthened |
| Share | Neutral |
| Protect | Neutral |
| Discover | Strengthened |

Full answers: `product_roadmap.md` Wave 2 item 4.

---

## Wave 2 — Institutionally Complete

**Closed:** 2026-08-02. Orders 1–10 shipped or closed. Organization / Early Discover delivery complete for Compact Cards Iteration 1, Search, Smart Sorting, Filter, Capture Reliability, Progressive Install Guidance, Contextual Guidance Principle, and Tags.

| Close-out criterion | Status |
|---------------------|--------|
| Implementation complete | ✓ |
| Documentation synchronized | ✓ |
| Baseline synchronized | ✓ |
| Verification complete | ✓ (desktop) |
| Pixel field validation complete | ✓ |
| iPhone Field Validation 0007 | Pending only — not Wave 2 delivery debt |

## Recommended Next Phase

**Wave 3 Discovery** — planning / feasibility only. Do not begin implementation.

**Next research unit when scoped:** Order 11 — Snaptiser feasibility spike (research only).

---

## Rollback Expectation

All Wave 1–2 units must be reversible without data loss. Schema additions use optional fields. IndexedDB version bumps require migration or graceful defaults. Backup/export must round-trip new fields before release.
