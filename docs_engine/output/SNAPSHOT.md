# MapSnap Snapshot — 2026-07-07

## Status

MVP 0.1 — stable local-first PWA baseline

## Phase

MVP 0.1 — Capture Foundation (stable, exit criteria met)

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

Next.js 15 · TypeScript · Tailwind · Geolocation API · IndexedDB · PWA

## Next Step

PDE bootstrap — begin next PDE product through PIE/Foundation before feature code. MapSnap 0.2 (Enrich & Revisit) deferred until explicitly scoped. See `next_task.md`.
