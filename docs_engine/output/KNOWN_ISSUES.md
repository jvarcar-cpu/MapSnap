# MapSnap — Known Issues

> Generated from `docs_engine/source/known_issues.md`. Do not hand-edit.

**Updated:** 2026-07-07

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

**Severity:** Planned, not implemented  
**Status:** Out of scope for 0.1

Name, note, and category cannot be edited after capture. List shows fallback title "Sparad plats" until edit flow ships in a future phase.
