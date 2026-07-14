"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GeoDiagnosticsPanel } from "@/components/GeoDiagnosticsPanel";
import { LocationPermissionCard } from "@/components/LocationPermissionCard";
import { SnapButton } from "@/components/SnapButton";
import { PlaceList } from "@/components/PlaceList";
import { SnapBackupPanel } from "@/components/SnapBackupPanel";
import { SuccessFeedback } from "@/components/SuccessFeedback";
import {
  getCurrentPosition,
  isSecureContext,
  watchGeolocationPermission,
  type GeolocationPermissionState,
} from "@/lib/geo";
import { generateId } from "@/lib/id";
import { loadSnaps, saveSnap } from "@/lib/storage";
import { playSnapSound } from "@/lib/snapSound";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { vibrateSuccess, withViewTransition } from "@/lib/viewTransition";
import type { SnapPlace } from "@/types/place";
import { DEFAULT_CATEGORY } from "@/types/place";

export default function HomePage() {
  const [places, setPlaces] = useState<SnapPlace[]>([]);
  const [capturing, setCapturing] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const [newestId, setNewestId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [geoPermission, setGeoPermission] =
    useState<GeolocationPermissionState>("unsupported");
  const [secureContext, setSecureContext] = useState(true);
  const [locationHost, setLocationHost] = useState("");
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingPhotoRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    void loadSnaps().then(setPlaces);
    setSecureContext(isSecureContext());
    setLocationHost(window.location.host);
    return watchGeolocationPermission(setGeoPermission);
  }, []);

  useEffect(() => {
    if (geoPermission === "granted") {
      setPermissionDenied(false);
    }
  }, [geoPermission]);

  const FEEDBACK_MS = reducedMotion ? 480 : 650;

  const showFeedback = useCallback(() => {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    vibrateSuccess();
    if (!reducedMotion) {
      playSnapSound();
      setCelebrating(true);
    }
    setFeedback(true);
    setFeedbackKey((k) => k + 1);
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback(false);
      setCelebrating(false);
    }, FEEDBACK_MS);
  }, [FEEDBACK_MS, reducedMotion]);

  const createSnap = useCallback(
    async (photoDataUrl?: string) => {
      setCapturing(true);
      setError(null);
      setPermissionDenied(false);
      pendingPhotoRef.current = photoDataUrl;

      const geo = await getCurrentPosition();
      if (geo.ok) {
        if (process.env.NODE_ENV === "development") {
          console.log("GPS success");
        }
      }
      if (!geo.ok) {
        if (geo.code === 1) {
          setPermissionDenied(true);
          setError(null);
        } else {
          setError(geo.error);
          setPermissionDenied(false);
        }
        setCapturing(false);
        return;
      }

      const snap: SnapPlace = {
        id: generateId(),
        latitude: geo.latitude,
        longitude: geo.longitude,
        accuracy: geo.accuracy,
        createdAt: new Date().toISOString(),
        category: DEFAULT_CATEGORY,
        ...(photoDataUrl ? { photoDataUrl } : {}),
      };

      const result = await saveSnap(snap);
      if (!result.ok) {
        setError(result.error ?? "Kunde inte spara platsen.");
        setCapturing(false);
        return;
      }

      if (process.env.NODE_ENV === "development") {
        console.log("Snap saved");
      }

      pendingPhotoRef.current = undefined;

      withViewTransition(() => {
        void loadSnaps().then(setPlaces);
        setNewestId(snap.id);
      });

      showFeedback();
      setCapturing(false);
    },
    [showFeedback]
  );

  const handleSnap = useCallback(
    (photoDataUrl?: string) => {
      void createSnap(photoDataUrl);
    },
    [createSnap]
  );

  const handleCameraCancelled = useCallback(() => {
    setError("Inget foto valdes.");
  }, []);

  const handlePhotoReadError = useCallback(() => {
    setError("Kunde inte läsa bilden. Platsen sparas utan foto.");
    void createSnap();
  }, [createSnap]);

  const handleRetryLocation = useCallback(() => {
    void createSnap(pendingPhotoRef.current);
  }, [createSnap]);

  const handleDelete = useCallback((id: string) => {
    withViewTransition(() => {
      setPlaces((prev) => prev.filter((p) => p.id !== id));
    });
    if (newestId === id) setNewestId(null);
  }, [newestId]);

  const handleUpdate = useCallback((updated: SnapPlace) => {
    withViewTransition(() => {
      setPlaces((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    });
  }, []);

  const handleImportSuccess = useCallback(() => {
    withViewTransition(() => {
      void loadSnaps().then(setPlaces);
    });
  }, []);

  const showPermissionCard =
    permissionDenied || geoPermission === "denied";
  const showPromptHint =
    geoPermission === "prompt" && !showPermissionCard;

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col bg-surface px-6 pb-14">
      <section className="flex flex-col items-center pt-12">
        <h1 className="mb-12 text-2xl font-bold tracking-tight text-primary">
          MapSnap
        </h1>

        <GeoDiagnosticsPanel />

        <div className="relative flex w-full flex-col items-center">
          {feedback && (
            <div className="absolute -top-1 z-10 -translate-y-full pb-3">
              <SuccessFeedback id={feedbackKey} />
            </div>
          )}

          <SnapButton
            onSnap={handleSnap}
            onCameraCancelled={handleCameraCancelled}
            onPhotoReadError={handlePhotoReadError}
            disabled={capturing}
            celebrating={celebrating}
            reducedMotion={reducedMotion}
          />

          <p className="mt-3 max-w-[280px] text-center text-[13px] leading-snug text-secondary/75">
            Tryck för position · Håll inne för position + bild
          </p>

          <div className="mt-8 flex h-5 items-center justify-center">
            {capturing && (
              <p className="animate-fade-in text-sm text-snap" role="status">
                Hämtar plats…
              </p>
            )}
          </div>

          {showPromptHint && (
            <p
              className="animate-fade-in mt-6 max-w-xs text-center text-sm text-secondary"
              role="status"
            >
              Webbläsaren kommer fråga om platsåtkomst.
            </p>
          )}

          {showPermissionCard && (
            <LocationPermissionCard
              onRetry={handleRetryLocation}
              showHttpsWarning={!secureContext}
              locationHost={locationHost}
            />
          )}

          {error && !showPermissionCard && (
            <p
              className="animate-fade-in mt-6 max-w-xs text-center text-sm text-secondary"
              role="alert"
            >
              {error}
              {!secureContext && (
                <>
                  {" "}
                  Plats kan kräva HTTPS i mobilens webbläsare. Om det inte
                  fungerar via denna adress behöver vi köra MapSnap via HTTPS.
                </>
              )}
            </p>
          )}
        </div>
      </section>

      <section className="mt-16 border-t border-black/[0.05] pt-10">
        <h2 className="mb-6 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary/80">
          MINA SNAPPAR
        </h2>
        <PlaceList
          places={places}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          newestId={newestId}
        />
        <SnapBackupPanel onImportSuccess={handleImportSuccess} />
      </section>
    </main>
  );
}
