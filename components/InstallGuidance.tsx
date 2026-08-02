"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  canOfferAndroidManualGuidance,
  canOfferIosHomeScreenGuidance,
  isInstallGuidanceDismissed,
  isRunningStandalone,
  persistInstallGuidanceDismissed,
  selectInstallGuidanceMode,
  type InstallGuidanceMode,
} from "@/lib/pwaInstall";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type InstallGuidanceProps = {
  /** Engagement gate — keep promotion subordinate to Capture. */
  engaged: boolean;
};

export function InstallGuidance({ engaged }: InstallGuidanceProps) {
  const [mode, setMode] = useState<InstallGuidanceMode>("hidden");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

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

  const copy = useMemo(() => {
    switch (mode) {
      case "prompt":
        return {
          title: "Lägg till MapSnap på hemskärmen",
          body: "Snabbare öppning. Dina Snappar stannar på enheten.",
          action: "Installera",
        };
      case "ios-manual":
        return {
          title: "Lägg till på hemskärmen",
          body: "Tryck Dela i webbläsaren och välj Lägg till på hemskärmen.",
          action: null,
        };
      case "android-manual":
        return {
          title: "Lägg till på hemskärmen",
          body: "Öppna webbläsarmenyn och välj Installera app eller Lägg till på hemskärmen om det finns.",
          action: null,
        };
      default:
        return null;
    }
  }, [mode]);

  if (mode === "hidden" || !copy) return null;

  return (
    <aside
      className="animate-fade-in mt-8 rounded-2xl border border-dashed border-black/[0.08] bg-elevated/80 px-4 py-4"
      aria-label="Installation"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">{copy.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-secondary">
            {copy.body}
          </p>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded-full px-2 py-1 text-sm text-secondary hover:text-primary"
          aria-label="Stäng installationsförslag"
        >
          Stäng
        </button>
      </div>

      {mode === "prompt" && copy.action && (
        <button
          type="button"
          onClick={() => {
            void handleInstallClick();
          }}
          disabled={installing}
          className="mt-3 min-h-[44px] w-full rounded-full border border-black/[0.07] bg-surface px-4 py-2.5 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/40 active:scale-[0.98] disabled:opacity-60"
        >
          {installing ? "Öppnar…" : copy.action}
        </button>
      )}
    </aside>
  );
}
