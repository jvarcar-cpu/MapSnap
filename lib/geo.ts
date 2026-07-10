export type GeoErrorCode = 1 | 2 | 3;

export type GeoResult =
  | {
      ok: true;
      latitude: number;
      longitude: number;
      accuracy?: number;
    }
  | {
      ok: false;
      error: string;
      code?: GeoErrorCode;
    };

const GPS_TIMEOUT_MS = 15000;

function mapGeoError(code: number): string {
  switch (code) {
    case 1:
      return "Platsåtkomst nekad.";
    case 2:
      return "Platsen är inte tillgänglig just nu.";
    case 3:
      return "Tidsgräns för GPS. Försök igen utomhus eller med bättre mottagning.";
    default:
      return "Kunde inte hämta din plats.";
  }
}

export function isSecureContext(): boolean {
  if (typeof window === "undefined") return true;
  return window.isSecureContext;
}

export type GeolocationPermissionState =
  | "prompt"
  | "granted"
  | "denied"
  | "unsupported";

export function watchGeolocationPermission(
  onChange: (state: GeolocationPermissionState) => void
): () => void {
  if (typeof navigator === "undefined" || !navigator.permissions?.query) {
    onChange("unsupported");
    return () => {};
  }

  let cancelled = false;
  let permissionStatus: PermissionStatus | null = null;
  let handleChange: (() => void) | null = null;

  navigator.permissions
    .query({ name: "geolocation" })
    .then((status) => {
      if (cancelled) return;
      permissionStatus = status;
      onChange(status.state as GeolocationPermissionState);
      handleChange = () => {
        onChange(status.state as GeolocationPermissionState);
      };
      status.addEventListener("change", handleChange);
    })
    .catch(() => {
      if (!cancelled) onChange("unsupported");
    });

  return () => {
    cancelled = true;
    if (permissionStatus && handleChange) {
      permissionStatus.removeEventListener("change", handleChange);
    }
  };
}

export function getCurrentPosition(): Promise<GeoResult> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve({
        ok: false,
        error: "Geolocation stöds inte i denna webbläsare.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          ok: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        resolve({
          ok: false,
          error: mapGeoError(error.code),
          code: error.code as GeoErrorCode,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: GPS_TIMEOUT_MS,
        maximumAge: 0,
      }
    );
  });
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Kunde inte läsa bilden."));
      }
    };
    reader.onerror = () => reject(new Error("Kunde inte läsa bilden."));
    reader.readAsDataURL(file);
  });
}
