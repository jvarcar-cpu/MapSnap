# Baseline Reconciliation — Wave 0

> Verification record for roadmap Wave 0. **Code is authoritative** over informal discussion summaries.

**Verified:** 2026-07-12  
**Method:** Repository inspection — source files, components, storage layer

---

## Summary

MVP 0.1 baseline matches documented core capabilities. No critical product-doc false claims found. Several doc/code timing mismatches reconciled below.

---

## Interaction Verification

| Check | Result | Evidence |
|-------|--------|----------|
| Short tap saves position | ✅ Pass | `SnapButton.fireShortTap` → `page.createSnap` → `saveSnap` |
| Long press opens image capture | ✅ Pass | 600ms timer → `input.click()` with `capture="environment"` |
| Long press saves position + image | ✅ Pass | `handleFileChange` → `onSnap(dataUrl)` → GPS + `photoDataUrl` |
| Duplicate-fire guards | ✅ Pass | `suppressTapRef`, `longPressTriggeredRef` |
| Camera cancel | ✅ Pass | Window focus handler → "Inget foto valdes." |
| Protected contract intact | ✅ Pass | No pre-capture forms or menus |

---

## List and RETURN Verification

| Check | Result | Evidence |
|-------|--------|----------|
| Delete | ✅ Pass | `PlaceCard.handleDelete` → `deleteSnap` → list filter |
| Empty state | ✅ Pass | `PlaceList` — pin + "Inga snappar ännu." + encouragement |
| Google Maps | ✅ Pass | `MapOpenButtons` → `googleMapsUrl` |
| Waze | ✅ Pass | `MapOpenButtons` → `wazeUrl` |
| Fallback title | ✅ Pass | Card: no fallback; `snapCardTitle()` empty when absent; MapSnap signature always (ADR-021) |

---

## Storage Verification

| Check | Result | Evidence |
|-------|--------|----------|
| IndexedDB primary | ✅ Pass | `lib/db.ts`, `mapsnap-db` / `snaps` |
| Legacy migration | ✅ Pass | `migrateFromLocalStorage` on load |
| Export JSON | ✅ Pass | `exportSnapsJson`, file download, clipboard |
| Import merge | ✅ Pass | `importSnapsFromJson` — merge by id, no delete |
| Offline-capable | ✅ Pass | Client-only; no network for CRUD |

---

## Visual / Layout Verification

| Check | Result | Evidence |
|-------|--------|----------|
| SNAP button hero | ✅ Pass | ~70% width, green gradient, breathe animation |
| No visible usage instruction | ✅ Gap (planned W1) | `aria-label` only — Swedish hint in accessibility |
| Card photo banner | ✅ Pass | 2.4:1 aspect, not compact thumbnail |
| Success toast | ✅ Pass | "✓ Sparad" — roadmap targets "Snap sparad" in W1 |
| Haptic | ✅ Partial | 20ms vibrate on success and long-press threshold only |
| Sound / radial waves | ❌ Not implemented | Planned Wave 1 feedback |

---

## Schema vs UI

| Field | In `SnapPlace` type | Editable in UI |
|-------|---------------------|----------------|
| `name` | Yes | No — shows fallback only |
| `note` | Yes | No |
| `category` | Yes | Set to `Annat` on capture only |
| `favorite` | No | — |
| `tags` | No | — |
| `photoDataUrl` | Yes | Capture only |

---

## Doc Discrepancies Resolved

1. **Long-press ms:** `capture_doctrine.md` updated to 600ms to match code.
2. **Helper text policy:** `ux_doctrine.md` updated — Wave 1 microcopy is approved exception.
3. **Phase 0.2 preview:** Superseded by `product_roadmap.md`.

---

## Wave 0 Exit Criteria

- [x] All existing capabilities verified against code
- [x] Discrepancies documented
- [x] No unnecessary redesign ordered
- [x] Protected SNAP interaction confirmed unchanged
