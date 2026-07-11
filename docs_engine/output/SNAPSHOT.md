# MapSnap Snapshot — 2026-07-11

## Status

MVP 0.1 — stable local-first PWA baseline; publicly reachable at https://mapsnap.se

## Phase

MVP 0.1 — Capture Foundation (stable, exit criteria met; public presence 2026-07-11)

## What Works

- SNAP core flow: short tap saves GPS snap; long press opens camera/file capture + GPS snap
- Large tactile SNAP button: circular, green, 3D gradient, ~70% width
- IndexedDB primary storage (`mapsnap-db` / `snaps`)
- Legacy localStorage (`mapsnap.snaps.v1`) migrates to IndexedDB on load
- JSON backup/import/export (merge by id)
- Google Maps and Waze deep links from saved coordinates
- Delete removes snap from list and storage
- PWA manifest, Swedish UI, HTTPS dev workflow
- Product Identity layer complete and protected
- Foundation guardrails documented
- Baseline verification script (`scripts/verify-baseline.mjs`) — automated checks pass against dev server
- Public production deployment at https://mapsnap.se (Vercel, GitHub CD, HTTPS)
- CHRONICLE-MSN-0001 ratified — first institutional memory entry

## Known Limitations

- No post-capture edit UI (name, note, category) — planned for 0.2
- Photo storage as inline base64 — quota limits at scale
- No backend, auth, or cloud sync
- Manual mobile verification still required for long-press camera and denied-permission card
- Old dev servers / wrong ports can serve stale broken UI (see KNOWN_ISSUES.md OPS-001)

## Storage

- Primary: IndexedDB `mapsnap-db` / object store `snaps`
- Legacy migration source: `mapsnap.snaps.v1` in localStorage (one-time import on load)
- Backup/recovery: JSON export/import (approved MVP method)
- Backend/cloud sync: out of scope for MVP 0.1
- Data model: local-first, user-owned

## Stack

Next.js 15 · TypeScript · Tailwind · Geolocation API · IndexedDB · PWA · Vercel (production)

## Next Step

Phase 0.2 — Enrich & Revisit when explicitly scoped. See `next_task.md`.

## Institutional Memory

CHRONICLE-MSN-0001 — *The First Public Presence* (2026-07-11). MapSnap was not created by PDE.
