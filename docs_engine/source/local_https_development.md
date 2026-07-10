# Local HTTPS Development

## Why HTTPS in Dev

MapSnap uses browser APIs that require a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts):

- **Geolocation** — blocked when `window.isSecureContext === false`
- **Camera / file capture** — works on some platforms over HTTP, but mobile browsers enforce secure context for location

Remote mobile testing over Tailscale or LAN uses an IP address, not `localhost`. Browsers treat `http://100.x.x.x:3000` as insecure, so geolocation permission stays `denied` even though `navigator.geolocation` exists.

**Fix:** run the Next.js dev server over HTTPS. No app-level workarounds.

## Default Workflow

Same as before — install once, then dev:

```bash
npm install
npm run dev
```

Open **https://localhost:3000** (not `http://`).

On first run, Next.js downloads [mkcert](https://github.com/FiloSottile/mkcert), generates a locally-trusted certificate, and may prompt to install its root CA. Certificates are stored in `./certificates/` (gitignored).

Hot reload, Turbopack, and HMR work unchanged over HTTPS.

## Mobile / Tailscale / LAN Testing

Use the network dev script when testing from a phone or another machine:

```bash
npm run dev:network
```

Then open **https://&lt;your-machine-ip&gt;:3000** — for example `https://100.104.107.81:3000` on Tailscale.

The default certificate covers `localhost`, `127.0.0.1`, and `::1`. Accessing via IP may show a certificate name mismatch warning; proceed to trust the connection. `window.isSecureContext` is still `true` over HTTPS, so geolocation can prompt.

To include your Tailscale/LAN IP in the certificate (fewer warnings), regenerate once with that host:

```bash
npx next dev --experimental-https -H 100.104.107.81
```

Replace the IP with yours. Next.js adds it to the mkcert SAN list alongside localhost. After generation, stop the server and return to `npm run dev` or `npm run dev:network` — existing certs in `./certificates/` are reused until hosts change.

`next.config.ts` `allowedDevOrigins` must list hostnames used for cross-origin `/_next/*` requests in dev (HMR). Update if your Tailscale IP changes.

## Verification Checklist

After starting HTTPS dev, confirm in the Geo Diagnostics panel (or browser console):

| Check | Expected |
|-------|----------|
| `window.isSecureContext` | `true` |
| `permissions.geolocation` | `prompt` or `granted` (not `denied` from insecure context) |
| GPS test button | Returns coordinates or a permission error — not silent denial |
| Long-press camera | Still opens camera / file picker |

## Scripts

| Script | Command | Use |
|--------|---------|-----|
| `dev` | `next dev --experimental-https` | Daily local development |
| `dev:network` | `next dev --experimental-https -H 0.0.0.0` | Phone / Tailscale / LAN access |

## Constraints

- HTTPS flags are **development only**. Production uses normal TLS from the host (e.g. Vercel).
- Do not commit `./certificates/` or `*.pem` files.
- mkcert root CA is machine-local; phones need the cert warning accepted unless you install the CA on the device (out of scope for MVP).

## Troubleshooting

**Server falls back to HTTP**

mkcert failed (common on paths with spaces, permission issues, or blocked download). Check terminal output. Fix path/permissions and delete `./certificates/` to retry.

**HMR blocked from phone**

Add your IP to `allowedDevOrigins` in `next.config.ts`.

**Still `denied` after HTTPS**

Reset site permissions in the browser for the origin. Ensure the URL bar shows `https://`, not `http://`.

**Stale dev server / wrong port / broken UI**

Old dev servers or wrong ports can serve stale, broken UI. Always open the **exact URL printed by `npm run dev`**. If Next stale cache appears:

1. Stop the dev server
2. Remove `.next` directory
3. Restart dev server
4. Open the current printed port/URL

See `known_issues.md` (OPS-001) and `stable_baseline.md`.
