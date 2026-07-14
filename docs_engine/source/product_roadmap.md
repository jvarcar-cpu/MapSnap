# MapSnap — Official Product Roadmap

> **Authoritative roadmap.** Single source of truth for what ships, in what order, and under what constraints.  
> Product philosophy: `Identity/product_doctrine.md` · Feature gate: `feature_gate.md` · Readiness: `implementation_readiness.md`

**Ratified:** 2026-07-12  
**Updated:** 2026-07-14 (product lifecycle pillars — ADR-020)  
**Status:** Active  
**Supersedes:** informal Phase 0.2 preview in `current_phase.md` (2026-07-11)

---

## Positioning

**MapSnap is not a map app. It is the fastest way to save a place that matters and return to it when it matters.**

Core concept (preserved): *The app captures the place before it is forgotten.*

**Evolved vision:** MapSnap exists to help people capture places that matter, enrich them with context, share them when needed, and protect them for the future.

MapSnap remains: fast, local-first, offline-first, calm, honest, minimal, thumb-first, practical, trustworthy. Coordinates remain the source of truth.

**Internal product goal:** MapSnap should feel lighter than it is.

**Offline First. Cloud Optional.**

**MapSnap should protect the user's memories without requiring an account.**

---

## Product Model — Core Pillars and Experience Qualities

### Core Pillars (product lifecycle)

| Pillar | Purpose | Includes |
|--------|---------|----------|
| **CAPTURE** | Capture a place immediately, reliably, with minimal friction | short press position; long press position + image; one-second interaction; offline operation; local persistence; clear confirmation; protected SNAP interaction |
| **ENRICH** | Give a captured place meaning and context after capture | title, notes, image, favorite, tags, category where justified, Snaptisers, future contextual metadata — **never required before capture** |
| **SHARE** | Communicate a place in the format appropriate to the situation | Quick Share (shipped); Professional Share; MapSnap-to-MapSnap Share; future Smart Share guidance — **a major product capability, not a single button** |
| **PROTECT** | Protect Snap history without requiring an account | local-first storage; backup; restore; backup reminders; export through native share/save flows; optional future cloud sync; data-loss warnings; user control over data |
| **DISCOVER** *(emerging)* | Help the user find, understand, and rediscover relevant Snap content | search, sort, filter, favorites, tags, nearby/collection views, resurfacing forgotten Snaps, Snaptisers, time/proximity relevance, collections — **scope emerging; not a social discovery feed** |

**Discover principle:** *Discover should help the user rediscover what they chose to save, not distract them with unrelated places.*

Discover is strategically approved but scope is emerging. It is grounded first in the user's own Snap collection — not public place discovery by default.

### Experience qualities (user experience)

The earlier model **Capture → Remember → Return → Delight** describes how the product should *feel*, not how work is organized.

| Quality | Strengthened by |
|---------|-----------------|
| **CAPTURE** | Capture pillar |
| **REMEMBER** | Enrich, Protect |
| **RETURN** | Share, Google Maps, Waze |
| **DELIGHT** | Cross-cutting — every pillar should feel fast, calm, trustworthy, and rewarding |

ADR-020 documents the relationship. Neither model is deleted; they answer different questions.

---

## Share Product Depth

Share is a product track with multiple modes. Only Quick Share is implemented.

### 1. Quick Share *(implemented — field validated)*

**Purpose:** Fast communication through SMS, WhatsApp, Messenger, Signal, email, and similar native destinations.

**Typical content:** title, note, coordinates, one map link; image file when the snap has `photoDataUrl`.

**Principle:** *The image provides visual context, the text provides useful context, and the map link provides navigation context.* Avoid duplication.

**Status:** Existing — Wave 1 Sprint 4. Field Validation 0006 (2026-07-14).

### 2. Professional Share *(future)*

**Purpose:** Structured documentation for insurance, roadside assistance, police reports, work orders, inspections, property documentation, damage reporting.

**Potential content:** image, title, note, date, time, coordinates, GPS accuracy, map link, optional documented image, future PDF report.

**Wording guardrail:** Use *"Recorded by MapSnap on the device."* — not *"Verified evidence."* Do not claim legal verification or tamper-proof evidence.

**Status:** Planned — Wave 4.

### 3. MapSnap-to-MapSnap Share *(future)*

**Purpose:** Transfer the Snap itself, not just a text/image representation.

**Potential behavior:** recipient opens or imports the Snap; review before saving; optional "Received Snap" area; local file/share-target experiment before backend; backend-hosted secure links later.

**Status:** Planned — Wave 6. **Not currently implemented.**

### 4. Smart Share *(exploratory)*

**Purpose:** Help the user select an appropriate share format based on context (quick share, roadside assistance, insurance documentation, place recommendation, work documentation).

**Guardrail:** Smart Share may suggest a format but must not invent facts or classify sensitive situations as certainty.

**Status:** Experimental — long-term direction only.

---

## Prioritization Model

1. No-backend value first
2. Core UX clarity and polish
3. Enrichment of existing Snaps (Enrich)
4. Share depth where field evidence supports it
5. Organization and early Discover (user's own collection)
6. Snaptisers / contextual Discover
7. Image + Professional Share
8. Data Protection (Protect) before backend/cloud maturity
9. MapSnap-to-MapSnap Share / cloud only when proven necessary

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
| Google Maps / Waze | **Existing** | `MapOpenButtons` — runtime URLs from coordinates (Return) |
| Local / offline storage | **Existing** | IndexedDB `mapsnap-db` / `snaps`; legacy localStorage migration |
| Backup / export / import | **Existing** | `SnapBackupPanel` — JSON export, copy, file download, merge import |
| Image handling | **Existing** | Long press → file input → `photoDataUrl` base64 inline |
| Snap card layout | **Existing** | `rounded-3xl`, optional 2.4:1 photo banner; user title left when present; MapSnap signature upper-right (ADR-021) |
| SNAP button interaction | **Existing** | Short tap = position; long press (~600ms) = position + image |

### Verified discrepancies (docs vs code)

| Topic | Doc said | Code / baseline says | Resolution |
|-------|----------|----------------------|------------|
| Long-press threshold | `capture_doctrine.md`: 500ms | `SnapButton.tsx`: 600ms; `stable_baseline.md`: ~600ms | **Code is truth.** Update capture doctrine to 600ms. |
| Hero helper text | `ux_doctrine.md`: no permanent helper text | No visible instruction in UI | **Resolved** Wave 1 Sprint 1 — microcopy shipped (ADR-012 interaction unchanged). |
| Success confirmation | Roadmap target: "Snap sparad" | `SuccessFeedback`: "✓ Sparad" | **Resolved** Wave 1 Sprint 1 — coordinated feedback shipped (ADR-018). |
| Title / notes | Schema fields exist | Edit UI shipped Sprint 2B | **Resolved** Wave 1 Sprint 2B. |
| Return / navigation | — | Google Maps + Waze only | Treat as **existing Return** — not a new feature. |

---

## Wave 1 — Core Value

**Priority:** Highest · **Backend:** None

| # | Item | Status | Pillar | Notes |
|---|------|--------|--------|-------|
| 1 | UX Polish (instruction + SNAP feedback) | **Existing** | DELIGHT / CAPTURE | Field Validation 0005 |
| 2 | Title + Notes | **Existing** | ENRICH | Sprint 2B |
| 3 | Save Image | **Existing** | ENRICH / RETURN | Sprint 3; ADR-014 |
| 4 | Quick Share | **Existing** | SHARE | Sprint 4; field validated — Field Validation 0006 |
| 5 | Favorite | **Existing** | ENRICH | Sprint 5 |
| 5b | Snap card action polish | **Existing** | DELIGHT / ENRICH | Two-column actions, SnapSpot label |
| 5c | MapSnap signature | **Existing** | ENRICH / DELIGHT | ADR-021 — header signature, no fallback title |
| 5d | Action icon polish | **Existing** | DELIGHT / RETURN | Google Maps + Waze brand icons; SVG card actions; Share2 / Download |
| 6 | Compact Snap cards with visible thumbnails | **Experimental** | DELIGHT / ENRICH | ADR-017 |

### Wave 1 item detail (reference)

#### 1. SNAP usage instruction + feedback

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Users understand short vs long press; confident capture feedback |
| Pillar | DELIGHT / CAPTURE |
| Acceptance | Microcopy shipped; coordinated feedback ~500–700ms; radial waves; "Snap sparad"; ADR-018 |
| Affects SNAP interaction | No — feedback only |
| ADR | ADR-012, ADR-018 |

#### 2–4. Title, Notes, Save Image, Quick Share

Shipped — see `stable_baseline.md`, `current_phase.md`, Field Validation 0003–0006.

#### 5. Favorite

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Quick access to important Snaps |
| Pillar | ENRICH |
| Backend | No |
| Complexity | Low |
| Dependencies | Schema field `favorite?: boolean` |
| Risk | Clutter on capture UI — reject |
| Acceptance | Mark/unmark favorite after capture; visible on card; not on SNAP button |
| Affects SNAP interaction | No |
| Shipped | Sprint 5 — star toggle on card; optimistic `saveSnap()` |

#### 5b. Snap card action polish

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Faster scanning of card actions; consistent location identity |
| Pillar | DELIGHT / ENRICH |
| Backend | No |
| Complexity | Low |
| Dependencies | MapSnap signature, existing card actions |
| Risk | Touch target shrink — reject |
| Acceptance | Two-column equal-width actions; SnapSpot on card; category hidden on card only |
| Affects SNAP interaction | No |
| Shipped | Snap Card Polish pass — prepares foundation for Compact Cards |

#### 5c. MapSnap signature

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Clear product identity without competing with user content |
| Pillar | ENRICH / DELIGHT |
| Backend | No |
| Complexity | Low |
| Dependencies | Title helpers (`snapCardTitle`, `snapShareTitle`) |
| Risk | Header clutter — reject |
| Acceptance | Permanent "MapSnap" upper-right; user title left only when set; no "Sparad plats" fallback |
| Affects SNAP interaction | No |
| ADR | ADR-021 |

#### 5d. Action icon polish

| Field | Value |
|-------|-------|
| Status | **Existing** |
| User value | Recognizable actions at a glance; familiar map brand icons |
| Pillar | DELIGHT / RETURN |
| Backend | No |
| Complexity | Low |
| Dependencies | Snap card action polish |
| Risk | Decorative clutter — reject |
| Acceptance | Google Maps + Waze brand SVGs; card action SVGs ~18px; Dela Share2, Spara bild Download; subtle accent colors on icons only; 48px touch targets preserved |
| Affects SNAP interaction | No |
| Shipped | Action Icon Polish + accent polish (0.2.13–0.2.14) |

#### 6. Compact Snap cards

| Field | Value |
|-------|-------|
| Status | **Iteration 1 shipped** — Iteration 2 (thumbnail + detail view) planned |
| User value | More Snaps on screen; faster visual recognition |
| Pillar | DELIGHT / ENRICH |
| Dependencies | Title, favorite UI |
| Risk | Thumbnails too small; touch targets shrink |
| Acceptance | Iteration 1: reduced height; banner `3:1`; action-group divider; 48px targets. Iteration 2: ~square thumbnail (80–100px hypothesis); detail view for full image |
| Affects SNAP interaction | No |
| ADR | ADR-017 |

---

## Wave 2 — Organization / Early Discover

**Purpose:** Help users find and organize their own growing Snap collection. Early Discover — grounded in the user's saved content only.

**Backend:** None

| # | Item | Status | Pillar | Complexity | Affects SNAP | ADR |
|---|------|--------|--------|------------|--------------|-----|
| 1 | Search (title, notes) | Planned | DISCOVER / ENRICH | Medium | No | — |
| 2 | Sort (newest, oldest, nearest) | Planned | DISCOVER | Medium | No | — |
| 3 | Filter (all, favorites, with images) | Planned | DISCOVER | Low–Medium | No | — |
| 4 | Tags | Planned | ENRICH / DISCOVER | Medium | No | — |
| 5 | Nearby / collection views | Planned | DISCOVER | Medium | No | Feature gate |
| 6 | Color / category markers | Experimental | ENRICH | Medium | No | Feature gate |
| 7 | Quick edit (title, note) | Planned | ENRICH | Low | No | — |

**Discover guardrail:** Every Wave 2 item must help the user rediscover their own meaningful content — not introduce unrelated attention or noise.

---

## Wave 3 — Snaptisers / Contextual Discover

**Strategic capability — approved for roadmap.** See `snaptiser_doctrine.md`.

**Naming:** "Snaptiser" is a MapSnap-specific working product term (vocabulary status: **provisional**).

| Scope | Status | Pillar | Notes |
|-------|--------|--------|-------|
| Time-based reminder (date, time, text) | Planned | ENRICH / DISCOVER | Local-first MVP candidate |
| Proximity-based reminder | Experimental | DISCOVER | PWA/geofencing limits — see FEAS-002 |
| Reminder state on Snap | Planned | ENRICH | Visual indicator |
| Edit / remove Snaptiser | Planned | ENRICH | After capture only |
| Notification permission handling | Planned | — | Honest failure UX |
| Resurfacing forgotten Snap content | Planned | DISCOVER | Relevance without noise |

**Backend:** None for MVP. Native-app or backend may be needed for reliable background proximity — **Deferred** until spike proves otherwise.

| ADR | ADR-015 |

---

## Wave 4 — Image + Professional Share

**Backend:** None unless later proven necessary

| Item | Status | Pillar | Notes |
|------|--------|--------|-------|
| Full-screen image view | Planned | ENRICH | |
| Image zoom | Planned | ENRICH | |
| Multiple images per Snap | Planned | ENRICH | Must not harm capture interaction |
| Compression / optimization | Planned | PROTECT | |
| Image metadata handling | Planned | ENRICH | |
| Documented image export | Planned | SHARE | Field Validation 0004 direction |
| Professional Share format | Planned | SHARE | Insurance, roadside, work documentation |
| Optional PDF report | Planned | SHARE | No legal verification claims |
| Stronger export / save | Planned | SHARE / PROTECT | |

**Professional Share wording:** *"Recorded by MapSnap on the device."* — not verified evidence.

---

## Wave 5 — Protect

**Purpose:** Protect the user's memories without requiring an account.

**Core philosophy:** Offline First. Cloud Optional.

**Product principle:** *MapSnap should protect the user's memories without requiring an account.*

**Status:** Approved direction — **not implemented**. Data protection before backend/cloud maturity.

| Capability | Status | Pillar | Notes |
|------------|--------|--------|-------|
| Protect Snaps | Planned | PROTECT | Local safeguards for data integrity and loss prevention |
| Clearer backup and restore UX | Planned | PROTECT | Guided restore complements existing import |
| Native backup export | Planned | PROTECT / SHARE | Share JSON backup via platform share API |
| Backup reminders | Planned | PROTECT | When collection grows or risk detected |
| Data-loss education | Planned | PROTECT | Honest warnings |
| Optional file-based local vault | Planned | PROTECT | Where technically feasible |
| Future cloud sync | Backend-dependent | PROTECT | Optional — never required for core use |

No backend, account system, or cloud sync in this wave until local protection paths are proven.

---

## Wave 6 — MapSnap-to-MapSnap Share / Cloud

**Status:** **Deferred** until Waves 1–5 value is mature

| Capability | Status | Pillar | Notes |
|------------|--------|--------|-------|
| Received Snap / import | Backend-dependent | SHARE | Review before saving; "Mottagen Snap" provisional |
| Shared Snap links | Backend-dependent | SHARE | Privacy-conscious hosted links when proven necessary |
| Account-optional sync strategy | Backend-dependent | PROTECT | Never required for core use |
| Privacy-conscious cloud backup | Backend-dependent | PROTECT | |
| Device sync | Backend-dependent | PROTECT | |
| Shared collections / collaborative maps | Deferred | — | Out of current scope |
| Cloud notifications | Deferred | — | |

**Backend must not become a prerequisite for core MapSnap use.** ADR-016.

Smart Share (contextual format guidance) remains **Experimental** — long-term, within Share pillar.

---

## Explicitly Deferred or Rejected

| Decision | Rationale |
|----------|-----------|
| Undo after Snap | Delete is already simple — **not needed** |
| Replace empty state | Existing empty state works — refine only if UX problems verified |
| Proprietary navigation | **Rejected** — Google Maps and Waze provide Return |
| Metadata before save | **Rejected** |
| Backend-first development | **Rejected** for current stage |
| Large menus around SNAP | **Rejected** |
| Social discovery feed | **Rejected** — Discover is user's own collection first |
| Public place discovery by default | **Rejected** — unless future strategy explicitly changes |
| Legal verification / tamper-proof evidence claims | **Rejected** — Professional Share uses honest device-recorded wording |

---

## Existing Capabilities (do not reintroduce as new)

- Delete Snap
- Empty-state first-Snap prompt
- Open in Google Maps / Waze (= Return) — official brand icons on links
- Offline local-first storage
- JSON backup / export / import
- Hero usage instruction + coordinated SNAP feedback (Wave 1 Sprint 1)
- Snap model normalization (`lib/snapModel.ts`, ADR-019)
- Title + notes edit (Enrich)
- Save image (Enrich / Return)
- Quick Share on every card (Share)
- Favorite toggle (Enrich)
- MapSnap signature on every card (ADR-021)
- Snap card two-column action grid with SVG icons and SnapSpot label

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
| `field_validation_log.md` | Verified real-world observations |
| `decisions.md` ADR-020 | Core pillars and experience model |
