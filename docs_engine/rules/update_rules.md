# Update Rules

## Implementation Discipline

All work must follow `docs_engine/rules/implementation_rules.md`:

1. Behaviour regressions are bugs
2. Visual regressions are bugs
3. One pass type at a time (Bug Fix, Feature, UX, Docs, Storage, Stabilization)
4. Every task ends with the regression checklist
5. No implementation before generated steering docs are current

## When to Update Docs

Update docs_engine **in the same change** when you:

- Change core philosophy or feature-gate criteria → `Identity/product_doctrine.md` (product approval required)
- Change capture behavior → `capture_doctrine.md`
- Change data schema or storage key → `data_doctrine.md`, `decisions.md`, `changelog.md`
- Change UI patterns → `ux_doctrine.md`
- Add/remove stack components → `architecture_state.md`, `decisions.md`
- Ship a version → `changelog.md`, `current_phase.md`
- Make a reversible product/architecture choice → `decisions.md`

## Decision Format

Use ADR-style entries in `decisions.md`:

```
## ADR-NNN: Title
**Status:** Accepted | Superseded | Deprecated
**Context:** ...
**Decision:** ...
**Consequences:** ...
```

## Changelog Format

Follow Keep a Changelog style:

```
## [version] — YYYY-MM-DD
### Added / Changed / Fixed / Removed
```

## Phase Transitions

When exiting a phase:

1. Mark exit criteria in `current_phase.md`
2. Add changelog entry
3. Write new `current_phase.md` section for next phase

## Output Directory

`docs_engine/output/` is reserved for generated snapshots (e.g. from templates). Do not hand-edit generated files — regenerate from source.

Expected generated outputs:

- `MASTER.md` — vision, phase, identity summary, architecture, decisions
- `AGENTS.md` — agent instructions and hard rules
- `SNAPSHOT.md` — current state snapshot
- `CURRENT_TASK.md` — active or recommended task
- `CURRENT_BASELINE.md` — locked baseline reference
- `KNOWN_ISSUES.md` — operational and verification issues

## Review Checklist

Before merging any change:

- [ ] Pass type declared and scope respected (`implementation_rules.md`)
- [ ] Regression checklist completed (`implementation_rules.md`)
- [ ] Guardrails still hold
- [ ] Relevant source docs updated
- [ ] Decision logged if non-obvious
- [ ] Changelog updated if user-visible

Before merging a UX polish pass:

- [ ] Behaviour First rule respected (`ux_doctrine.md`)
- [ ] Visual baseline preserved (`ux_doctrine.md` — Approved UI Baseline)
- [ ] No event handlers removed or gestures changed
- [ ] All capture flows verified on a real touch device or mobile browser
