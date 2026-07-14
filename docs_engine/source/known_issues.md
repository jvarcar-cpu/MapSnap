# Known Issues

> Operational and verification issues. Not product defects unless marked as bugs.

## OPS-001: Stale Dev Server / Wrong Port

**Severity:** Operational — can look like a broken product  
**Status:** Active (documented)

Old dev servers or wrong ports can serve stale, broken UI. Symptoms include unstyled HTML, 404 on routes, missing SNAP button styling, or webpack cache errors.

**Always open the exact URL printed by `npm run dev`.** Do not assume port 3000 if another process holds it — Next.js may bind to 3001, 3002, 3003, etc.

**If Next stale cache appears:**

1. Stop the dev server
2. Remove `.next` directory
3. Restart dev server (`npm run dev`)
4. Open the **current** printed port/URL from terminal output

See also: `stable_baseline.md` (Dev server note), `local_https_development.md` (Troubleshooting).

---

## OPS-002: Manual Mobile Verification Still Required

**Severity:** Verification gap  
**Status:** Active

Automated baseline verification (`scripts/verify-baseline.mjs`) covers desktop browser checks. These flows still require manual verification on a real mobile device or mobile browser:

- Long-press camera capture (device picker, shutter, photo snap)
- Location permission denied card and retry when geolocation is blocked
- HTTPS over Tailscale/LAN IP with certificate warnings

---

## MVP-001: Photo Storage Size Limits

**Severity:** Known constraint (by design for MVP)  
**Status:** Accepted

Photos are stored as inline base64 data URLs in IndexedDB. Large photo volume will hit quota limits. Backup/export is the approved recovery method. Cloud sync is out of scope for MVP 0.1.

---

## MVP-002: No Post-Capture Edit UI

**Severity:** Planned — Wave 1 roadmap  
**Status:** Approved for implementation when scoped

Name, note, and title cannot be edited after capture. List shows fallback title "Sparad plats" until edit flow ships. Schema fields `name` and `note` exist; UI pending.

---

## FEAS-001: Image Save/Download Platform Variance

**Severity:** Technical feasibility — document before Wave 1  
**Status:** Implemented (Sprint 3) — field verification pending

Saving a Snap image to the device photo roll or downloads folder varies by platform:

- **Desktop:** `<a download>` with blob URL — implemented in `lib/saveSnapImage.ts`
- **Android Chrome / PWA:** Blob download primary; Web Share with file as fallback if download blocked
- **iOS Safari / PWA:** Web Share API with `File` when `navigator.canShare` supports files; direct download not claimed as success — user saves via share sheet (e.g. "Save Image")

Do not claim parity without per-platform field verification. Success messaging is honest: failure when share cancelled or all mechanisms fail.

---

## FEAS-002: Snaptiser / Notification / Geofencing Limits

**Severity:** Technical feasibility — blocks proximity MVP claims  
**Status:** Active (spike required before Wave 3)

PWA and browser constraints affect Snaptisers:

| Capability | PWA reality |
|------------|-------------|
| Time-based notifications | Possible with permission; reliability varies when app closed — OS-dependent |
| Background geofencing | **Not reliably available** in web/PWA without native wrapper |
| Periodic location checks | Battery cost; requires foreground or limited background APIs |
| Installed PWA vs browser tab | Behavior may differ — test both |

Roadmap separates: time-based local MVP (feasible), proximity experiment (uncertain), native/backend (deferred).

---

## FEAS-003: Haptic / Audio / Reduced-Motion

**Severity:** Implementation guidance — Wave 1 feedback  
**Status:** Active

- `navigator.vibrate` unsupported on iOS Safari — degrade gracefully
- Web Audio for short sounds requires user-gesture context on some browsers
- `prefers-reduced-motion: reduce` must shorten or disable pulse, radial waves, and sound
- Sound should be architected for future user disable (settings not in MVP)
