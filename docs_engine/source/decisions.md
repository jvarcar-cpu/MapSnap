# Decisions Log

## ADR-001: Coordinates as Source of Truth

**Status:** Accepted  
**Context:** MapSnap saves places, not map URLs.  
**Decision:** Store lat/lng only; generate Google/Waze links at render time.  
**Consequences:** Provider URL changes don't require data migration.

---

## ADR-002: IndexedDB for MVP Persistence

**Status:** Accepted (supersedes localStorage-only ADR-002 wording)  
**Context:** No backend in 0.1. localStorage quota is too small for photo snaps.  
**Decision:** Store full `SnapPlace` records in IndexedDB (`mapsnap-db`, object store `snaps`, key path `id`). Legacy `mapsnap.snaps.v1` in localStorage is migrated on first load (deduped by id); localStorage is not deleted automatically.  
**Consequences:** Data remains device-bound; no sync. Much larger practical storage than localStorage. Acceptable for MVP.

---

## ADR-003: Capture Before Organize

**Status:** Accepted  
**Context:** Users forget places when forced through forms.  
**Decision:** Save immediately on tap with defaults; optional fields stay empty.  
**Consequences:** List shows untitled Snaps with an intentionally empty title area and permanent MapSnap signature (ADR-021); Quick Share uses "MapSnap" when no user title.

---

## ADR-004: Photo as Data URL

**Status:** Accepted (MVP)  
**Context:** No cloud storage available.  
**Decision:** Store photos inline as base64 data URLs.  
**Consequences:** Storage limits; revisit before scaling photo usage.

---

## ADR-005: No Map SDK

**Status:** Accepted  
**Context:** MapSnap is not a map app.  
**Decision:** Deep-link to Google Maps and Waze instead of embedding maps.  
**Consequences:** User leaves app to navigate — intentional tradeoff.

---

## ADR-006: Swedish UI

**Status:** Accepted  
**Context:** Primary users and category labels are Swedish.  
**Decision:** All UI copy in Swedish for MVP 0.1.

---

## ADR-007: Single-Shot Geolocation

**Status:** Accepted  
**Context:** Privacy and battery.  
**Decision:** Request position only on explicit SNAP action; no background tracking.  
**Consequences:** No "nearby snaps" or passive features without revisiting this decision.

---

## ADR-008: Browser-Native Camera via File Input

**Status:** Accepted  
**Context:** MVP needs photo capture without a camera SDK or backend. Remote-desktop tools (e.g. Parsec) route browser input to the host machine, not the phone camera.  
**Decision:** Use `<input type="file" accept="image/*" capture="environment">` triggered only on long-press. Accept whatever picker the browser/OS provides. Desktop file picker is expected, not a defect. Selected image files on any platform are stored as `photoDataUrl`. Cancelling the picker saves nothing and does not block tap capture.  
**Consequences:** Camera quality and UX depend on the browser and device running MapSnap. Parsec/remote desktop cannot expose the phone camera to the desktop browser. No custom camera UI in MVP.

---

## ADR-009: HTTPS for Local Development

**Status:** Accepted  
**Context:** Mobile and Tailscale testing uses LAN/Tailscale IPs, not `localhost`. Browsers deny geolocation on insecure HTTP origins (`window.isSecureContext === false`). MapSnap diagnostics confirmed the app logic is correct; the dev server protocol was the root cause.  
**Decision:** Run Next.js dev with `--experimental-https` (mkcert self-signed certificates). Default `npm run dev` serves `https://localhost:3000`. Add `dev:network` with `-H 0.0.0.0` for phone/LAN testing. Document in `local_https_development.md`. No in-app HTTP workarounds.  
**Consequences:** First dev start may install mkcert CA and generate `./certificates/` (gitignored). IP-based access may show cert name warnings until cert is regenerated with that host. Production deploy unchanged.

---

## ADR-010: JSON Export/Import for MVP Backup

**Status:** Accepted  
**Context:** During MVP development and testing, origin changes (http ↔ https, localhost ↔ LAN IP, PWA reinstall, browser data clear) can still lose data. IndexedDB is more durable and capacious than localStorage but remains device-bound.  
**Decision:** Provide in-app JSON export/import as the approved temporary backup method. Export downloads `mapsnap-snaps-backup.json` and exposes copyable JSON for mobile fallback. Import validates snap shape (`id`, `latitude`, `longitude`, `createdAt`), merges by `id`, and never deletes existing snaps. No backend, no cloud sync.  
**Consequences:** Users can preserve coordinates during MVP testing. Cloud sync remains out of scope for MVP 0.1. Revisit before production scale.

---

## ADR-011: PIE/Foundation Bootstrap Before Code (MapSnap Lesson)

**Status:** Accepted — promoted to Foundation  
**Context:** MapSnap MVP 0.1 proved that even a small, single-feature PWA benefits from full engineering governance: Identity layer, behaviour + visual baselines, docs_engine, pass-type discipline, and baseline verification. Attempting thin guardrails or deferring governance creates expensive rework.  
**Decision:** Future PDE products must be bootstrapped through PIE/Foundation before feature code begins. Small product docs are acceptable; thin engineering guardrails are not. MapSnap's governance model (docs_engine, Identity, stable baseline, verification script) is the minimum bar for new PDE products.  
**Consequences:** New products inherit Foundation guardrails and complete Identity before implementation. MapSnap remains the reference incubator for this lesson. See `Foundation/foundation_guardrails.md` §7.

---

## ADR-012: Protected SNAP Interaction Contract

**Status:** Accepted  
**Context:** Product discovery reaffirmed that capture speed is non-negotiable. UX polish and instructions must not alter core gestures.  
**Decision:** Short press saves position only. Long press saves position and opens image capture. This contract is protected — changes require explicit ADR revision. Wave 1 may add visible instruction microcopy and feedback polish that do not alter gestures.  
**Consequences:** Feature Gate and regression checklists enforce interaction stability. `capture_doctrine.md` documents the contract.

---

## ADR-013: Local-First Roadmap Priority

**Status:** Accepted  
**Context:** MapSnap value is proven offline without backend. Feature creep toward cloud-first would delay user value.  
**Decision:** Official roadmap prioritizes no-backend improvements first (Waves 1–4). Backend/cloud (Wave 6 per ADR-020; formerly Wave 5) deferred until local product value is mature and need is proven.  
**Consequences:** No backend becomes a prerequisite for core use. `product_roadmap.md` is authoritative ordering.

---

## ADR-014: Save/Download Snap Image (Wave 1 Required)

**Status:** Accepted  
**Context:** Users need the Snap photo outside the app without re-opening the camera. RETURN pillar gap.  
**Decision:** Wave 1 must include "Spara bild" — download/copy of `photoDataUrl` without removing or altering the Snap-attached image. Platform limitations documented honestly (FEAS-001).  
**Consequences:** Implementation must verify Android, iOS Safari, desktop behavior. See `image_doctrine.md`.

---

## ADR-015: Snaptisers as Strategic Product Capability

**Status:** Accepted  
**Context:** A saved place can preserve an intention, not only coordinates. Reminders are strategically valuable but PWA limits apply.  
**Decision:** Snaptisers enter the official roadmap (Wave 3). Time-based local MVP first; proximity experimental; full background geofencing deferred without verification.  
**Consequences:** `snaptiser_doctrine.md` governs scope. Provisional vocabulary term until Identity promotes it.

---

## ADR-016: Backend / Cloud Deferral

**Status:** Accepted  
**Context:** Account systems, sync, and hosted sharing add weight without proven need at current maturity.  
**Decision:** Wave 6 backend scope is deferred (renumbered from Wave 5 per ADR-020; Protect is Wave 5). Core MapSnap must work fully without accounts or cloud.  
**Consequences:** Reassess only after Waves 1–5 value is shipped and measured. Protect pillar (Wave 5) precedes cloud.

---

## ADR-017: Compact Card Experiment with Recognizable Thumbnails

**Status:** Accepted (experimental)  
**Context:** Growing snap lists need denser layout; images are mnemonic aids.  
**Decision:** Wave 1 includes an experimental compact card layout: ~square thumbnail (80–100px hypothesis), reduced height, detail view for full image. Exact dimensions not fixed until UX validation.  
**Consequences:** Must pass Feature Gate item 5 (no disproportionate weight). Failure reverts to current banner layout.

---

## ADR-018: Coordinated SNAP Feedback Model

**Status:** Accepted  
**Context:** Capture should feel confident and polished without delaying persistence.  
**Decision:** Wave 1 feedback sequence ~500–700ms: press state, haptic, discreet sound, glow, pulse, radial waves at button boundary (sonar-like, quick fade), "Snap sparad" confirmation. Respect `prefers-reduced-motion`. Sound must be disableable later. Persistence must not wait on animation completion.  
**Consequences:** UX pass scoped separately from gesture changes. Documented in `ux_doctrine.md`.

---

## ADR-019: Snap Model Evolution Policy

**Status:** Accepted  
**Context:** Wave 1 Sprint 2 adds title and notes UI; later waves add favorite, tags, Snaptisers, and image metadata. Existing IndexedDB records and JSON backups must keep working.  
**Decision:** `Snap` in `types/place.ts` is the authoritative persisted record. Product "title" maps to `name`; "notes" to `note`. Legacy keys `title` / `notes` normalize on load/import. New fields are optional only. Validation and normalization live in `lib/snapModel.ts`. Backup remains a JSON array (`mapsnap-snaps-array-v1`); unknown keys round-trip. IndexedDB stays at version 1 (schemaless documents) until a structural store change is unavoidable.  
**Consequences:** Sprint 2B edit UI writes `name` and `note`. No parallel title/notes keys in new code. Required-field or envelope changes require ADR + format version bump. Documented in `snap_model.md`.

---

## ADR-020: Core Product Lifecycle Pillars and Experience Model

**Status:** Accepted  
**Context:** Real-world use of Capture, enrichment, image saving, and Share Snap (including puncture/roadside and insurance documentation scenarios) showed that Share and data protection are major product areas — not side features. The earlier four-pillar model (Capture, Remember, Return, Delight) remains valuable but describes user experience, not product lifecycle. Competing truths must be avoided.  
**Decision:**

1. **Core Product Pillars (lifecycle):** CAPTURE, ENRICH, SHARE, PROTECT — approved. DISCOVER — emerging strategic pillar; scope not yet mature.
2. **Experience qualities (preserved):** CAPTURE, REMEMBER, RETURN, DELIGHT — DELIGHT is cross-cutting, not a lifecycle stage.
3. **Mapping:** Capture supports Capture; Enrich strengthens Remember; Share and navigation strengthen Return; Protect preserves Remember and Return; Discover resurfaces remembered places.
4. **Share product track:** Quick Share (implemented), Professional Share, MapSnap-to-MapSnap Share, Smart Share (exploratory) — documented in `product_roadmap.md`.
5. **Protect principles:** Offline First. Cloud Optional. MapSnap should protect the user's memories without requiring an account. Data protection (Wave 5) precedes backend/cloud maturity (Wave 6).
6. **Discover guardrails:** User's own Snap collection first; not a social discovery feed; not public place discovery by default.
7. **Positioning preserved:** MapSnap is not a map app; fastest way to save and return; captures the place before it is forgotten. Evolved vision complements positioning.

**Consequences:** `product_vision.md`, `product_roadmap.md`, `Identity/product_doctrine.md`, `feature_gate.md`, and `Identity/vocabulary.md` updated. Roadmap renumbered: Wave 5 = Protect, Wave 6 = MapSnap-to-MapSnap Share / Cloud (formerly Wave 5). Feature Gate requires Core Pillar alignment and Discover guardrails. Protected SNAP interaction unchanged (ADR-012).

---

## ADR-021: MapSnap Signature on Snap Cards

**Status:** Accepted  
**Context:** Untitled Snaps showed generic fallback "Sparad plats" in the card header, competing with user content and diluting product identity. Share payloads needed a meaningful fallback for recipients without reusing generic place labels.  
**Decision:**

1. **Every Snap carries the MapSnap signature** — permanent text "MapSnap" in the card header upper-right; subtle, secondary visual weight.
2. **User first. Product second.** — User-defined title occupies the primary left position when present; signature does not replace title.
3. **No card fallback title** — When `name` is absent or blank, the left title area remains intentionally empty. Do not show "Sparad plats", "Namnlös Snap", "Min Snap", or similar.
4. **Quick Share fallback** — When no user title, share title and first text line use "MapSnap" (not "Sparad plats").
5. **Future extensions** — Signature may extend to Professional Share, PDF/export, MapSnap-to-MapSnap transfer, and Discover views; not implemented in this ADR.
6. **Optional `name` field unchanged** — Title remains optional; edit flow unchanged.

**Consequences:** `PlaceCard.tsx` header layout updated; `snapCardTitle()` and `snapShareTitle()` in `lib/snapEdit.ts`; `snapDisplayTitle()` removed; Identity and UX doctrine updated; favorite toggle placement preserved with header spacing.

