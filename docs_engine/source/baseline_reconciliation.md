---

**Historical Record**

The following reconciliation reflects the product state at the time it was written.

The authoritative current product state is documented below under **Wave 1 Reconciliation** and in `CURRENT_BASELINE.md`.

---

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
| Card photo banner | ✅ Pass | 3:1 aspect compact banner (Iteration 1); square thumbnail deferred |
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

---

## Wave 1 Reconciliation — 2026-07-14

> **Authoritative current-state verification.** Confirms Wave 1 shipped capabilities against code after Action Icon Polish closure.

**Verified:** 2026-07-14  
**Method:** Repository inspection + automated baseline script + unit tests

### Summary

Wave 1 Core Value track is institutionally closed. **Compact Cards Iteration 1** shipped (Wave 2 Sprint 1). Square thumbnail + detail view deferred to Iteration 2. Documentation reconciled to match implementation. MVP 0.1 interaction baseline unchanged (ADR-012).

### Capture & SNAP

| Check | Result | Evidence |
|-------|--------|----------|
| Short tap → GPS save | ✅ Pass | `SnapButton` → `saveSnap` |
| Long press ~600ms → camera | ✅ Pass | `SnapButton.tsx` timer 600ms |
| Hero instruction visible | ✅ Pass | `page.tsx` — *Tryck för position · Håll inne för position + bild* |
| Coordinated feedback | ✅ Pass | `SnapCelebrate`, `SuccessFeedback` — "Snap sparad", radial waves (ADR-018) |
| Protected contract | ✅ Pass | No pre-capture forms |

### Snap Model & Enrich

| Check | Result | Evidence |
|-------|--------|----------|
| Authoritative `Snap` type | ✅ Pass | `types/place.ts` |
| Normalization on load/save/import | ✅ Pass | `lib/snapModel.ts`, `lib/storage.ts` |
| Title + notes edit | ✅ Pass | `SnapEditForm`, `lib/snapEdit.ts`, `PlaceCard` |
| No card fallback title | ✅ Pass | `snapCardTitle()` — empty when absent; ADR-021 |
| MapSnap signature | ✅ Pass | `PlaceCard.tsx` header upper-right |
| Favorite toggle | ✅ Pass | `FavoriteToggle`, `lib/snapFavorite.ts` — optimistic `saveSnap()` |
| Category metadata only | ✅ Pass | Default `Annat` on capture; not shown on card |

### Share, Return & Protect paths

| Check | Result | Evidence |
|-------|--------|----------|
| Google Maps + Waze links | ✅ Pass | `MapOpenButtons.tsx` — brand SVG icons |
| Quick Share every card | ✅ Pass | `shareSnap()` — text + map link always; image file when supported |
| Share text SnapSpot label | ✅ Pass | `buildShareSnapText` — `📍 SnapSpot`, `🌍 Öppna i Google Maps` |
| Save image (photo snaps only) | ✅ Pass | `lib/saveSnapImage.ts` — copy only, never mutates Snap |
| JSON backup/import | ✅ Pass | `SnapBackupPanel`, `exportSnapsJson` / `importSnapsFromJson` |

### Card UX (Wave 1 polish)

| Check | Result | Evidence |
|-------|--------|----------|
| SnapSpot on card | ✅ Pass | `PlaceCard` — `📍 SnapSpot` location line |
| Two-column action grid | ✅ Pass | Redigera / Dela; Spara bild / Ta bort (image only) |
| SVG action icons ~18px | ✅ Pass | `components/icons/SnapActionIcons.tsx` |
| Dela Share2 / Spara bild Download | ✅ Pass | Distinct icons; accent colors on icons only |
| 48px touch targets | ✅ Pass | `min-h-[48px]` on action buttons and map links |

### Wave 1 Exit Criteria

- [x] Sprints 1–5 shipped and documented
- [x] MapSnap signature shipped (ADR-021)
- [x] Snap card + action icon polish shipped
- [x] Field Validation 0005, 0006 recorded
- [x] Compact Cards Iteration 1 shipped — banner compression, action-group divider
- [x] Search shipped — title/notes filter, search bar, search empty state
- [x] Smart Sorting shipped — Nyast / Äldst / Närmast, memoized sort, nearest GPS
- [x] Filter shipped — Alla / Favoriter / Med bild, memoized filter, search → filter → sort pipeline
- [ ] Compact Cards Iteration 2 — square thumbnail, detail view
- [x] IndexedDB version `1` unchanged
- [x] Protected SNAP interaction unchanged
