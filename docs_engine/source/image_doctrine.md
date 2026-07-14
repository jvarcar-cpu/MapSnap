# Image Doctrine

> Product context: REMEMBER pillar, RETURN pillar — see `product_roadmap.md`

**Ratified:** 2026-07-12

---

## Principle

**A Snap image is a visual memory aid, not decoration.**

---

## Consequences

| Rule | Rationale |
|------|-----------|
| Thumbnails must remain recognizable | Users scan lists to find places |
| Compression must not destroy recognition value | Mnemonic purpose over byte savings |
| User must be able to save the image outside MapSnap | RETURN without re-shooting (Wave 1 — ADR-014) |
| Image presence improves recognition without dominating UI | Compact cards experiment must preserve cognitive value |
| Layout optimization preserves cognitive purpose | Smaller cards ≠ invisible images |

---

## Technical Notes (MVP)

- Photos stored as inline base64 `photoDataUrl` in IndexedDB (ADR-004)
- Long press is the only capture entry point (ADR-008, ADR-012)
- Save/download creates a **copy** — never removes or alters the Snap-attached image

### Save implementation (Sprint 3)

| Platform | Mechanism |
|----------|-----------|
| Desktop browsers | `<a download>` via blob URL |
| Android Chrome / PWA | `<a download>` via blob URL; share fallback if blocked |
| iOS Safari / PWA | Web Share API with `File` when supported; no fake download success |

Filename: `MapSnap_YYYY-MM-DD_HH-mm-ss.jpg` from snap `createdAt` (local time); fallback `MapSnap.jpg`. Code: `lib/saveSnapImage.ts`.

---

## Platform Honesty

Image save/download behavior varies by browser and OS. Document limitations in `known_issues.md` (FEAS-001). Do not claim parity across iOS Safari, Android Chrome, and desktop without verification.
