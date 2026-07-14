# MapSnap — Official Product Roadmap

> **Authoritative roadmap.** Single source of truth for what ships, in what order, and under what constraints.  
> Product philosophy: `Identity/product_doctrine.md` · Feature gate: `feature_gate.md` · Readiness: `implementation_readiness.md`

**Ratified:** 2026-07-12  
**Status:** Active  
**Supersedes:** informal Phase 0.2 preview in `current_phase.md` (2026-07-11)

---

## Positioning

**MapSnap is not a map app. It is the fastest way to save a place that matters and return to it when it matters.**

Core concept (preserved): *The app captures the place before it is forgotten.*

MapSnap remains: fast, local-first, offline-first, calm, honest, minimal, thumb-first, practical, trustworthy. Coordinates remain the source of truth.

**Internal product goal:** MapSnap should feel lighter than it is.

---

## Product Model — Four Pillars

| Pillar | Meaning | Includes |
|--------|---------|----------|
| **CAPTURE** | Save the place immediately | position, optional image, offline capability, one-second interaction, reliable local persistence |
| **REMEMBER** | Add meaning after capture | title, notes, favorite, tags, image, Snaptiser/reminders |
| **RETURN** | Use the Snap when relevant again | Google Maps, Waze, sharing, export, save/download image |
| **DELIGHT** | Direct, safe, responsive, polished — without slowing capture | haptic, sound, visual pulse, glow, radial waves, short confirmation, restrained transitions |

Enrichment belongs to REMEMBER and RETURN. It must not block CAPTURE.

---

## Prioritization Model

1. No-backend value first
2. Core UX clarity and polish
3. Enrichment of existing Snaps
4. Better organization of growing Snap collections
5. Image usability
6. Local reminders / Snaptisers
7. Backend / cloud only when justified by proven need

---

## Roadmap Item Schema

Each item below includes: **user value**, **pillar**, **backend**, **complexity**, **dependencies**, **risk**, **acceptance criteria**, **affects SNAP interaction**, **ADR**.

**Statuses:** Existing · Approved · Planned · Experimental · Deferred · Backend-dependent

---

## Wave 0 — Baseline Reconciliation

**Purpose:** Documented product truth matches the actual app. No unnecessary redesign.

| Item | Status | Notes |
|------|--------|-------|
| Delete behavior | **Existing** | `PlaceCard` → `deleteSnap` → IndexedDB hard delete; list updates |
| Empty state | **Existing** | Pin illustration + "Inga snappar ännu." + encouragement copy |
| Google Maps / Waze | **Existing** | `MapOpenButtons` — runtime URLs from coordinates (RETURN) |
| Local / offline storage | **Existing** | IndexedDB `mapsnap-db` / `snaps`; legacy localStorage migration |
| Backup / export / import | **Existing** | `SnapBackupPanel` — JSON export, copy, file download, merge import |
| Image handling | **Existing** | Long press → file input → `photoDataUrl` base64 inline |
| Snap card layout | **Existing** | `rounded-3xl`, optional 2.4:1 photo banner, fallback "Sparad plats" |
| SNAP button interaction | **Existing** | Short tap = position; long press (~600ms) = position + image |

### Verified discrepancies (docs vs code)

| Topic | Doc said | Code / baseline says | Resolution |
|-------|----------|----------------------|------------|
| Long-press threshold | `capture_doctrine.md`: 500ms | `SnapButton.tsx`: 600ms; `stable_baseline.md`: ~600ms | **Code is truth.** Update capture doctrine to 600ms. |
| Hero helper text | `ux_doctrine.md`: no permanent helper text | No visible instruction in UI | **Resolved** Wave 1 Sprint 1 — microcopy shipped (ADR-012 interaction unchanged). |
| Success confirmation | Roadmap target: "Snap sparad" | `SuccessFeedback`: "✓ Sparad" | **Resolved** Wave 1 Sprint 1 — coordinated feedback shipped (ADR-018). |
| Title / notes | Schema fields exist | Edit UI shipped Sprint 2B | **Resolved** Wave 1 Sprint 2B. |
| Return / navigation | — | Google Maps + Waze only | Treat as **existing RETURN** — not a new feature. |

---

## Wave 1 — Core Value and UX Polish

**Priority:** Highest · **Backend:** None

### 1. SNAP usage instruction

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Users understand short vs long press without a manual |
| Pillar | DELIGHT / CAPTURE (clarity only) |
| Backend | No |
| Complexity | Low |
| Dependencies | None |
| Risk | Clutter on hero — keep brief and calm |
| Acceptance | Visible microcopy "Tryck för position · Håll inne för position + bild"; unobtrusive; no modal for normal use; does not increase capture time |
| Affects SNAP interaction | No — instruction only |
| ADR | — |

### 2. SNAP interaction feedback

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Confident, satisfying capture without delay |
| Pillar | DELIGHT |
| Backend | No |
| Complexity | Medium |
| Dependencies | None |
| Risk | Decorative noise; blocking persistence; ignoring reduced-motion |
| Acceptance | Coordinated sequence ~500–700ms: press/down state, haptic, discreet sound, brief glow, pulse from button, **radial waves at button boundary** (sonar-like, fade quickly), "Snap sparad" confirmation; persistence not blocked; `prefers-reduced-motion` respected; sound design allows future mute |
| Affects SNAP interaction | No — feedback only |
| ADR | ADR-018 |

### 3. Title

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Recognize places in the list |
| Pillar | REMEMBER |
| Backend | No |
| Complexity | Low–Medium |
| Dependencies | Post-capture edit UI pattern |
| Risk | Accidental pre-capture forms — reject |
| Acceptance | User-defined title after capture; fallback "Sparad plats"; optional, never required |
| Affects SNAP interaction | No |
| ADR | — |

### 4. Notes

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Preserve context and intention |
| Pillar | REMEMBER |
| Backend | No |
| Complexity | Low–Medium |
| Dependencies | Title edit pattern |
| Risk | Required fields — reject |
| Acceptance | Short or multi-line notes; optional; after capture only |
| Affects SNAP interaction | No |
| ADR | — |

### 5. Share Snap

| Field | Value |
|-------|-------|
| Status | **Approved** |
| User value | Send place to others or other apps |
| Pillar | RETURN |
| Backend | No |
| Complexity | Medium |
| Dependencies | Title (optional but improves share text) |
| Risk | `navigator.share` unavailable on some desktop browsers |
| Acceptance | Native share where supported; includes title, note when present, coordinates, usable map link; clear fallback when share unavailable |
| Affects SNAP interaction | No |
| ADR | — |

### 6. Save / download Snap image

| Field | Value |
|-------|-------|
| Status | **Approved** — required first-wave feature |
| User value | Keep photo outside MapSnap without re-shooting |
| Pillar | RETURN |
| Backend | No |
| Complexity | Medium |
| Dependencies | Snaps with `photoDataUrl` |
| Risk | Platform limits on PWA download; iOS Safari behavior |
| Acceptance | Clear "Spara bild" action; best practical quality; predictable filename; no data loss; copy remains attached to Snap; success/failure feedback. See `image_doctrine.md` and known issues FEAS-001 |
| Affects SNAP interaction | No |
| ADR | ADR-014 |

### 7. Favorite

| Field | Value |
|-------|-------|
| Status | **Approved** |
| User value | Quick access to important Snaps |
| Pillar | REMEMBER |
| Backend | No |
| Complexity | Low |
| Dependencies | Schema field `favorite?: boolean` |
| Risk | Clutter on capture UI — reject |
| Acceptance | Mark/unmark favorite after capture; visible on card; not on SNAP button |
| Affects SNAP interaction | No |
| ADR | — |

### 8. Compact Snap cards with visible thumbnails

| Field | Value |
|-------|-------|
| Status | **Experimental** |
| User value | More Snaps on screen; faster visual recognition |
| Pillar | DELIGHT / REMEMBER |
| Backend | No |
| Complexity | Medium–High |
| Dependencies | Title, favorite UI |
| Risk | Thumbnails too small to recognize; touch targets shrink |
| Acceptance | Reduced vertical height; ~square thumbnail (80–100px hypothesis); title, date, distance, favorite alongside; full image in detail view; cards without images supported; measurable UX criteria before locking dimensions |
| Affects SNAP interaction | No |
| ADR | ADR-017 |

---

## Wave 2 — Organization

**Backend:** None

| # | Item | Status | Pillar | Complexity | Affects SNAP | ADR |
|---|------|--------|--------|------------|--------------|-----|
| 1 | Search (title, notes) | Planned | REMEMBER | Medium | No | — |
| 2 | Sort (newest, oldest, nearest) | Planned | REMEMBER | Medium | No | — |
| 3 | Filter (all, favorites, with images) | Planned | REMEMBER | Low–Medium | No | — |
| 4 | Tags | Planned | REMEMBER | Medium | No | — |
| 5 | Color / category markers | Experimental | REMEMBER | Medium | No | Feature gate |
| 6 | Quick edit (title, note) | Planned | REMEMBER | Low | No | — |

---

## Wave 3 — Snaptisers

**Strategic capability — approved for roadmap.** See `snaptiser_doctrine.md`.

**Naming:** "Snaptiser" is a MapSnap-specific working product term (vocabulary status: **provisional** — requires Identity approval before broad marketing use).

| Scope | Status | Notes |
|-------|--------|-------|
| Time-based reminder (date, time, text) | Planned | Local-first MVP candidate |
| Proximity-based reminder | Experimental | PWA/geofencing limits — see FEAS-002 |
| Reminder state on Snap | Planned | Visual indicator |
| Edit / remove Snaptiser | Planned | After capture only |
| Notification permission handling | Planned | Honest failure UX |

**Backend:** None for MVP. Native-app or backend may be needed for reliable background proximity — **Deferred** until spike proves otherwise.

| ADR | ADR-015 |

---

## Wave 4 — Image Experience

**Backend:** None unless later proven necessary

| Item | Status |
|------|--------|
| Full-screen image view | Planned |
| Image zoom | Planned |
| Multiple images per Snap | Planned — must not harm capture interaction |
| Compression / optimization | Planned |
| Metadata handling | Planned |
| Stronger export / save | Planned |
| Optional image caption | Planned |

---

## Wave 5 — Backend / Cloud

**Status:** **Deferred**

Account system, encrypted cloud backup, device sync, shared collections, user-to-user sharing, collaborative maps, hosted Snap links, cloud notifications — only when local product value is mature and proven need exists.

**Backend must not become a prerequisite for core MapSnap use.** ADR-016.

---

## Explicitly Deferred or Rejected

| Decision | Rationale |
|----------|-----------|
| Undo after Snap | Delete is already simple — **not needed** |
| Replace empty state | Existing empty state works — refine only if UX problems verified |
| Proprietary navigation | **Rejected** — Google Maps and Waze provide RETURN |
| Metadata before save | **Rejected** |
| Backend-first development | **Rejected** for current stage |
| Large menus around SNAP | **Rejected** |

---

## Existing Capabilities (do not reintroduce as new)

- Delete Snap
- Empty-state first-Snap prompt
- Open in Google Maps / Waze (= RETURN / "find my way back")
- Offline local-first storage
- JSON backup / export / import

---

## Protected SNAP Interaction Contract

**Immutable unless explicit ADR revision.**

- **Short press:** save position
- **Long press:** save position + open image capture

Instruction microcopy and feedback polish must not alter this contract. ADR-012.

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `feature_gate.md` | Mandatory gate before implementation |
| `image_doctrine.md` | Image as memory aid |
| `snaptiser_doctrine.md` | Intention preservation + technical scope |
| `implementation_readiness.md` | Recommended build sequence |
| `baseline_reconciliation.md` | Wave 0 verification record |
