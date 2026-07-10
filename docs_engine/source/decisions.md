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
**Consequences:** List may show many "Sparad plats" entries until edit flow exists.

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
