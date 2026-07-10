# Document Rules

## Purpose

docs_engine holds MapSnap product governance — vision, identity, architecture, and decisions. It is the **product operating system**: the single source of truth for *why* the product works the way it does, *how* work is verified, and *what* state is current.

docs_engine owns knowledge, validation, governance, generated state, implementation context, and continuity. See `source/docs_engine_overview.md`.

**Hard rule:** No implementation starts before generated steering docs in `output/` are current.

---

## Product Identity

Product Identity lives in `source/Identity/`. It defines who MapSnap is — not how it is built.

| Document | Purpose |
|----------|---------|
| `Identity/identity_overview.md` | Purpose of Product Identity; layer separation |
| `Identity/product_doctrine.md` | Governing philosophy and principles |
| `Identity/product_quotes.md` | Canonical brand phrases |
| `Identity/voice.md` | Tone and character |
| `Identity/vocabulary.md` | Official terminology |
| `Identity/writing_rules.md` | Rules for all user-facing copy |

### Protected Documents

Product Identity documents are **protected**.

- AI must **not** modify Identity documents automatically
- Changes require **explicit product approval**
- Identity documents are **not** implementation documents — they define product character, not code behavior
- Identity must remain **timeless**; implementation follows identity

---

## Writing Standards

- Write in clear English for internal docs (UI copy stays Swedish in the app)
- One topic per file under `source/`
- Keep files short; split when a doc exceeds ~150 lines
- Use present tense for current state, past tense for changelog entries

## File Ownership

| File | Updates when |
|------|--------------|
| `Identity/product_doctrine.md` | Core philosophy or feature-gate criteria change (product approval required) |
| `Identity/product_quotes.md` | New or revised canonical quotes (product approval required) |
| `Identity/voice.md` | Tone or character definition changes (product approval required) |
| `Identity/vocabulary.md` | Official terminology changes (product approval required) |
| `Identity/writing_rules.md` | Copy composition rules change (product approval required) |
| `product_vision.md` | Scope or positioning changes |
| `capture_doctrine.md` | Capture flow behavior changes |
| `data_doctrine.md` | Schema, storage, or data model changes |
| `ux_doctrine.md` | UI patterns or copy strategy changes |
| `architecture_state.md` | Stack, structure, or boundary changes |
| `local_https_development.md` | Dev HTTPS workflow or certificate setup changes |
| `decisions.md` | Any architectural or product decision |
| `changelog.md` | Every shipped version |
| `current_phase.md` | Phase transitions or milestone updates |
| `known_issues.md` | New operational or verification issues |
| `next_task.md` | Next recommended task after phase or docs pass |
| `docs_engine_overview.md` | docs_engine role or regeneration workflow changes |

## Guardrails (Always True)

Derived from `Identity/product_doctrine.md`:

1. MapSnap is a tool, not a map app, note app, or travel planner
2. Everything begins with SNAP — capture first, organize later
3. Coordinates are the source of truth; everything else is metadata
4. Map providers are output channels only
5. Offline first — cloud sync is optional, never required
6. Thumb first — one-thumb usability outdoors
7. No backend in MVP 0.1
8. No silent or continuous location tracking
9. The One-Second Rule — interface must not compete with the real world
10. Tool First — every feature must improve capture speed, revisiting, or real-world usefulness
11. Golden Rule — the app must never become more interesting than the place being captured

## Prohibited

- Copying governance text verbatim from other projects
- Documenting features that don't exist without marking them as planned
- Storing secrets or credentials in docs_engine
- Auto-modifying Product Identity documents without explicit product approval
