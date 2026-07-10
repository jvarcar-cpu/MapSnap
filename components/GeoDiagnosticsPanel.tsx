"use client";

import { useCallback, useEffect, useState } from "react";

const GEO_ERROR_CODES: Record<number, string> = {
  1: "PERMISSION_DENIED",
  2: "POSITION_UNAVAILABLE",
  3: "TIMEOUT",
};

function formatBool(value: boolean): string {
  return value ? "true" : "false";
}

export function GeoDiagnosticsPanel() {
  const [mounted, setMounted] = useState(false);
  const [isSecureContext, setIsSecureContext] = useState<boolean | null>(null);
  const [origin, setOrigin] = useState("");
  const [userAgent, setUserAgent] = useState("");
  const [geolocationExists, setGeolocationExists] = useState<boolean | null>(
    null
  );
  const [permissionState, setPermissionState] = useState("…");
  const [gpsResult, setGpsResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsSecureContext(window.isSecureContext);
    setOrigin(window.location.origin);
    setUserAgent(navigator.userAgent);
    setGeolocationExists(!!navigator.geolocation);

    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          setPermissionState(status.state);
        })
        .catch(() => {
          setPermissionState("query failed");
        });
    } else {
      setPermissionState("unsupported");
    }
  }, []);

  const testGps = useCallback(() => {
    setGpsResult(null);
    setTesting(true);

    if (!navigator.geolocation) {
      setGpsResult("navigator.geolocation missing");
      setTesting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setGpsResult("SUCCESS");
        setTesting(false);
      },
      (error) => {
        setGpsResult(GEO_ERROR_CODES[error.code] ?? `UNKNOWN (${error.code})`);
        setTesting(false);
      }
    );
  }, []);

  if (!mounted || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <section
      className="mb-8 w-full rounded-2xl border border-dashed border-amber-500/40 bg-amber-50/80 p-4 text-left"
      aria-label="GPS-diagnostik (utveckling)"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
        GPS-diagnostik (dev)
      </p>

      <dl className="mt-3 space-y-2 font-mono text-[11px] leading-relaxed text-primary/90">
        <div>
          <dt className="text-secondary">window.isSecureContext</dt>
          <dd>{isSecureContext === null ? "…" : formatBool(isSecureContext)}</dd>
        </div>
        <div>
          <dt className="text-secondary">window.location.origin</dt>
          <dd className="break-all">{origin || "…"}</dd>
        </div>
        <div>
          <dt className="text-secondary">navigator.userAgent</dt>
          <dd className="break-all">{userAgent || "…"}</dd>
        </div>
        <div>
          <dt className="text-secondary">permissions.geolocation</dt>
          <dd>{permissionState}</dd>
        </div>
        <div>
          <dt className="text-secondary">navigator.geolocation</dt>
          <dd>
            {geolocationExists === null
              ? "…"
              : geolocationExists
                ? "exists"
                : "missing"}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={testGps}
        disabled={testing}
        className="mt-4 min-h-[44px] w-full rounded-full border border-amber-600/30 bg-white px-4 py-2 text-sm font-semibold text-amber-900 transition active:scale-[0.98] disabled:opacity-60"
      >
        {testing ? "Testar…" : "Testa GPS"}
      </button>

      {gpsResult && (
        <p
          className="mt-3 font-mono text-sm font-semibold text-primary"
          role="status"
        >
          {gpsResult}
        </p>
      )}
    </section>
  );
}
