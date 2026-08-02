"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  INSTALL_GUIDANCE_ENTER_MS,
  INSTALL_GUIDANCE_EXIT_MS,
  canOfferAndroidManualGuidance,
  canOfferIosHomeScreenGuidance,
  installGuidanceRevealDelayMs,
  isInstallGuidanceDismissed,
  isRunningStandalone,
  persistInstallGuidanceDismissed,
  selectInstallGuidanceMode,
  type InstallGuidanceMode,
} from "@/lib/pwaInstall";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallGuidanceProps = {
  /** Engagement gate — keep promotion subordinate to Capture. */
  engaged: boolean;
  /** Duration of "Snap sparad" feedback; used to delay first reveal. */
  feedbackMs?: number;
};

type MotionPhase = "unmounted" | "entering" | "visible" | "exiting";

export function InstallGuidance({
  engaged,
  feedbackMs = 650,
}: InstallGuidanceProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<InstallGuidanceMode>("hidden");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);
  const [revealReady, setRevealReady] = useState(false);
  const [motionPhase, setMotionPhase] = useState<MotionPhase>("unmounted");
  const prevEngagedRef = useRef<boolean | null>(null);

  const recomputeMode = useCallback(
    (prompt: BeforeInstallPromptEvent | null) => {
      if (typeof window === "undefined") {
        setMode("hidden");
        return;
      }
      const nav = window.navigator;
      const next = selectInstallGuidanceMode({
        isStandalone: isRunningStandalone(window),
        dismissed: isInstallGuidanceDismissed(window.localStorage),
        engaged,
        hasInstallPrompt: Boolean(prompt),
        iosHomeScreen: canOfferIosHomeScreenGuidance(nav),
        androidManual: canOfferAndroidManualGuidance(nav),
      });
      setMode(next);
    },
    [engaged]
  );

  useEffect(() => {
    recomputeMode(deferredPrompt);
  }, [deferredPrompt, recomputeMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
    };

    const onInstalled = () => {
      setDeferredPrompt(null);
      persistInstallGuidanceDismissed(window.localStorage);
      setMode("hidden");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!engaged) {
      setRevealReady(false);
      prevEngagedRef.current = false;
      return;
    }

    const prev = prevEngagedRef.current;
    prevEngagedRef.current = true;
    const engagedTransition = prev === false;
    const delay = installGuidanceRevealDelayMs({
      engagedTransition,
      feedbackMs,
      reducedMotion,
    });

    const timer = window.setTimeout(() => {
      setRevealReady(true);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [engaged, feedbackMs, reducedMotion]);

  const wantsVisible = mode !== "hidden" && revealReady;

  useEffect(() => {
    if (wantsVisible) {
      if (motionPhase === "unmounted" || motionPhase === "exiting") {
        setMotionPhase(reducedMotion ? "visible" : "entering");
      }
      return;
    }

    if (motionPhase === "entering" || motionPhase === "visible") {
      if (reducedMotion) {
        setMotionPhase("unmounted");
      } else {
        setMotionPhase("exiting");
      }
    }
  }, [wantsVisible, motionPhase, reducedMotion]);

  useEffect(() => {
    if (motionPhase !== "entering") return;
    const timer = window.setTimeout(() => {
      setMotionPhase("visible");
    }, INSTALL_GUIDANCE_ENTER_MS);
    return () => window.clearTimeout(timer);
  }, [motionPhase]);

  useEffect(() => {
    if (motionPhase !== "exiting") return;
    const timer = window.setTimeout(() => {
      setMotionPhase("unmounted");
    }, INSTALL_GUIDANCE_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [motionPhase]);

  const handleDismiss = () => {
    persistInstallGuidanceDismissed(window.localStorage);
    setMode("hidden");
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt || installing) return;
    setInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (choice.outcome === "accepted") {
        persistInstallGuidanceDismissed(window.localStorage);
        setMode("hidden");
      } else {
        recomputeMode(null);
      }
    } catch {
      recomputeMode(null);
    } finally {
      setInstalling(false);
    }
  };

  const howTo = useMemo(() => {
    switch (mode) {
      case "ios-manual":
        return "Tryck Dela i webbläsaren och välj Lägg till på hemskärmen.";
      case "android-manual":
        return "Öppna webbläsarmenyn och välj Installera app eller Lägg till på hemskärmen om det finns.";
      default:
        return null;
    }
  }, [mode]);

  if (motionPhase === "unmounted") return null;

  const motionClass =
    motionPhase === "entering"
      ? "install-guidance-enter"
      : motionPhase === "exiting"
        ? "install-guidance-exit"
        : "";

  return (
    <aside
      className={`install-guidance mt-4 w-full max-w-[280px] overflow-hidden ${motionClass}`}
      aria-label="Installation"
    >
      <div className="relative rounded-2xl border border-dashed border-black/[0.08] bg-elevated/70 px-3.5 py-3 text-center">
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full text-secondary hover:text-primary"
          aria-label="Stäng installationsförslag"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ×
          </span>
        </button>

        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-secondary/70">
          Rekommenderas
        </p>
        <p className="mt-1 text-sm font-semibold text-primary">
          Installera MapSnap
        </p>
        <p className="mt-1 text-[12px] leading-snug text-secondary">
          Snabbare start • Bättre kamera • Helskärm
        </p>

        {howTo && (
          <p className="mt-2 text-[12px] leading-snug text-secondary/85">
            {howTo}
          </p>
        )}

        {mode === "prompt" && (
          <button
            type="button"
            onClick={() => {
              void handleInstallClick();
            }}
            disabled={installing}
            className="mt-3 min-h-[44px] w-full rounded-full border border-black/[0.07] bg-surface px-4 py-2 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/40 active:scale-[0.98] disabled:opacity-60"
          >
            {installing ? "Öppnar…" : "Installera"}
          </button>
        )}
      </div>
    </aside>
  );
}
