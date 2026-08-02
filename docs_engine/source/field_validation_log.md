# Field Validation Log

> **MapSnap product-level knowledge source.** Records verified real-world observations from using MapSnap in reality.  
> **Not** a bug tracker, changelog, or roadmap. Belongs to MapSnap docs_engine only — not institutionalized into PDE.

**Introduced:** 2026-07-13  
**Status:** Active

---

## Purpose

Capture verified behaviour and product insight observed in the field — devices, platforms, and real situations — so future roadmap and implementation decisions rest on evidence, not assumption.

Each entry is numbered, dated, and scoped to what was actually observed.

---

## Field Validation 0001 — Platform comparison

**Date:** 2026-07-13 (verified prior to log formalization)  
**Devices:** Google Pixel 9a · Redmi Note 9

### Observations

- Redmi displayed install prompt.
- Installed PWA reused existing IndexedDB data.
- Existing Snap appeared after installation.
- Pixel did not automatically display install prompt.

### Notes

Platform-specific PWA install behaviour varies by device and browser policy.

---

## Field Validation 0002 — Navigation behaviour

**Date:** 2026-07-13 (verified prior to log formalization)  
**Platform:** Android Chrome

### Observation

Opening Waze from Chrome presents application chooser.

Installed PWA behaved differently.

### Conclusion

Platform behaviour. Not currently treated as a MapSnap defect.

---

## Field Validation 0003 — Real-world puncture scenario

**Date:** 2026-07-13 (verified prior to log formalization)  
**Situation:** Vehicle puncture

### Observation

Sharing both image and location would have been significantly more useful than sharing only coordinates.

### Outcome

Validated Wave 1 feature: **Share Snap** should support:

- title
- note
- coordinates
- map link
- image

---

## Field Validation 0004 — Insurance documentation

**Date:** 2026-07-13 (verified prior to log formalization)

### Observation

Captured image plus:

- date
- time
- coordinates
- GPS accuracy

would improve insurance reporting.

### Outcome

Documented image export direction.

**Future:** Optional documented image overlay.

---

## Field Validation 0005 — Wave 1 Sprint 1 UX Polish Validation

**Date:** 2026-07-14  
**Devices:** Google Pixel 9a · Redmi Note 9

### Verified

- Instruction text visible.
- Sound works.
- Toast ("Snap sparad") works.
- Pulse and radial waves are now visible after deployment.
- Protected SNAP interaction unchanged.

### Observation

The pulse effect on the button surface itself is subtle and not clearly perceptible.

### Decision

**Accepted.** No further adjustment in Wave 1 Sprint 1.

### Reason

The surrounding pulse and sonar waves provide sufficient feedback. Further tuning would produce limited user value compared to continuing the roadmap.

---

## Field Validation 0006 — Quick Share SMS (successful share test)

**Date:** 2026-07-14  
**Devices:** Google Pixel 9a (SMS share)  
**Scenario:** Real-device Quick Share after Wave 1 Sprint 4 polish

### Verified

- Image arrived in SMS share
- Title arrived
- Note arrived (when present)
- Coordinates and map link arrived
- Android created an automatic map preview from the shared link
- Waze link was absent (single Google Maps URL only — as designed)
- Share text polish at validation time: `📍 Position`, `🌍 Öppna plats`; no redundant "Image attached." copy
- **Label update (0.2.8):** canonical share labels are now `📍 SnapSpot` and `🌍 Öppna i Google Maps` — same minimal format, SnapSpot terminology aligned with cards

### Observation

Duplicate text/link presentation was identified — Android SMS map preview already supplies navigation context alongside explicit coordinates and Google Maps URL in the message body.

### Decision

**Simplify Quick Share to one map link and remove redundant "Image attached." copy.** Shipped 2026-07-14 (changelog 0.2.6).

### Outcome

Validates Share as a major product capability (SHARE pillar). Supports future Professional Share direction (Field Validation 0003, 0004) without implying legal verification.

---

## Field Validation 0007 — Capture Reliability and PWA Installation Guidance

**Date:** 2026-08-02 (implementation + initial observations)  
**Pixel physical validation recorded:** 2026-08-02 (Wave 2 institutional close-out)  
**Devices / sessions:** Redmi Note 9 · Google Pixel 9a · iPhone browser (probably Safari)  
**Pass:** Wave 2 Compatibility Feature Pass — Capture Reliability and PWA Installation Guidance  
**Physical iPhone retest:** Not available — remains pending; do not claim iPhone completion

### Verified observations

- **Redmi Note 9:** PWA installation opportunity observed; MapSnap installed successfully (also Field Validation 0001).
- **Pixel 9a:** Equivalent automatic installation opportunity not observed (also Field Validation 0001); progressive Android manual install guidance path applies.
- **iPhone browser:** Long-press produced no visible response; camera did not open.
- **iPhone:** Automatic PWA installation prompt not observed.

### Hypotheses only (not confirmed causes)

Possible contributors to the iPhone long-press failure may include touch/pointer lifecycle differences, cancellation before threshold, browser-native long-press handling, loss of transient user activation on timer-delayed `input.click()`, or other iOS interaction differences. **Do not treat these as proven root causes.**

### Implementation status

Implemented compatibility behaviour (ADR-023; placement ADR-024):

- Long-press progress feedback (cancellable; reduced-motion aware)
- User-gesture-safe camera activation on release after arming (not timer-only `.click()`)
- Compact **"Öppna kamera"** direct-action fallback when activation does not occur
- Progressive PWA install guidance: standalone detection; `beforeinstallprompt` when available; iOS/Android manual guidance otherwise; dismissible; engagement-gated; local dismissal persistence
- Install recommendation placed beneath SNAP instruction (Contextual Guidance Principle)

### Institutional validation status (Wave 2 close-out)

| Surface | Status |
|---------|--------|
| Desktop | ✓ verified (automated baseline + unit tests) |
| Android / Pixel | ✓ physically validated |
| iPhone | Field Validation 0007 remains **pending** — not claimed complete |

### Pending physical validation

Explicitly **pending** — do not record as passed:

- [ ] iPhone Safari long-press visual feedback
- [ ] iPhone Safari camera activation
- [ ] iPhone direct-action fallback ("Öppna kamera")
- [ ] iPhone installed-PWA behaviour
- [ ] iPhone manual installation guidance

### Completed physical validation (this entry)

- [x] Pixel installation fallback guidance — physically validated (Android / Pixel)
- [x] Desktop automated verification — baseline script + unit tests

### Status summary

| Layer | Status |
|-------|--------|
| Verified field observations | Recorded above |
| Implementation | Complete (ADR-023 / ADR-024) |
| Desktop verification | ✓ verified |
| Android / Pixel physical validation | ✓ complete |
| iPhone Field Validation | **Pending** — capability not marked field-validated on iPhone |
| Android automatic install parity | Not assumed; guidance is progressive |

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| `product_roadmap.md` | Roadmap items may cite field validation outcomes |
| `known_issues.md` | Operational and feasibility issues — separate from field observations |
| `changelog.md` | Shipped changes — separate timeline |
| `knowledge_continuity.md` | Institutional memory index — references this log |
