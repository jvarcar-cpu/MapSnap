"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { readFileAsDataUrl } from "@/lib/geo";
import {
  CAMERA_FALLBACK_MS,
  LONG_PRESS_MS,
  MOVE_TOLERANCE_PX,
  resolvePressEnd,
  resolveThresholdReached,
  shouldCancelForMovement,
  shouldShowCameraFallback,
  type LongPressPhase,
} from "@/lib/longPressGesture";
import { vibrateLongPress } from "@/lib/viewTransition";
import { SnapCelebrate } from "@/components/SnapCelebrate";

type SnapButtonProps = {
  onSnap: (photoDataUrl?: string) => void;
  onCameraCancelled?: () => void;
  onPhotoReadError?: () => void;
  disabled?: boolean;
  celebrating?: boolean;
  reducedMotion?: boolean;
};

const CAMERA_INPUT_ID = "mapsnap-camera-input";

function devLog(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
}

export function SnapButton({
  onSnap,
  onCameraCancelled,
  onPhotoReadError,
  disabled,
  celebrating = false,
  reducedMotion = false,
}: SnapButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<LongPressPhase>("idle");
  const activePointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const tapHandledRef = useRef(false);
  const suppressTapRef = useRef(false);
  const cameraOpenedRef = useRef(false);
  const fileSelectedRef = useRef(false);
  const activationAttemptedRef = useRef(false);
  const duplicateGuardRef = useRef(false);

  const [pressed, setPressed] = useState(false);
  const [phase, setPhase] = useState<LongPressPhase>("idle");
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  const setPhaseBoth = useCallback((next: LongPressPhase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
      clearFallbackTimer();
    };
  }, [clearTimer, clearFallbackTimer]);

  const resetInteraction = useCallback(() => {
    activePointerIdRef.current = null;
    tapHandledRef.current = false;
    setPressed(false);
    clearTimer();
    if (phaseRef.current !== "fallback" && phaseRef.current !== "activating") {
      setPhaseBoth("idle");
    }
  }, [clearTimer, setPhaseBoth]);

  const scheduleFallbackCheck = useCallback(() => {
    clearFallbackTimer();
    fallbackTimerRef.current = setTimeout(() => {
      const show = shouldShowCameraFallback({
        activationAttempted: activationAttemptedRef.current,
        fileSelected: fileSelectedRef.current,
        cameraLikelyOpened: cameraOpenedRef.current,
        cancelled: false,
      });
      if (show && !duplicateGuardRef.current) {
        setShowFallback(true);
        setFallbackMessage(
          "Kameran öppnades inte. Tryck Öppna kamera för att fortsätta."
        );
        setPhaseBoth("fallback");
      }
    }, CAMERA_FALLBACK_MS);
  }, [clearFallbackTimer, setPhaseBoth]);

  const openCameraFromGesture = useCallback(() => {
    if (duplicateGuardRef.current) return;
    const input = inputRef.current;
    if (!input) {
      setShowFallback(true);
      setFallbackMessage(
        "Kameran kunde inte öppnas. Tryck Öppna kamera för att fortsätta."
      );
      setPhaseBoth("fallback");
      return;
    }

    duplicateGuardRef.current = true;
    activationAttemptedRef.current = true;
    fileSelectedRef.current = false;
    cameraOpenedRef.current = false;
    setPhaseBoth("activating");
    setShowFallback(false);
    setFallbackMessage(null);
    devLog("SNAP long press — activate camera from user gesture");

    const markOpened = () => {
      cameraOpenedRef.current = true;
    };
    window.addEventListener("blur", markOpened, { once: true });
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) markOpened();
      },
      { once: true }
    );

    try {
      input.click();
      devLog("Camera input click dispatched");
    } catch {
      cameraOpenedRef.current = false;
    }

    const handleWindowFocus = () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.setTimeout(() => {
        if (
          activationAttemptedRef.current &&
          !fileSelectedRef.current &&
          cameraOpenedRef.current &&
          phaseRef.current !== "fallback"
        ) {
          cameraOpenedRef.current = false;
          duplicateGuardRef.current = false;
          activationAttemptedRef.current = false;
          onCameraCancelled?.();
          setPhaseBoth("idle");
        }
      }, 800);
    };
    window.addEventListener("focus", handleWindowFocus);
    scheduleFallbackCheck();

    window.setTimeout(() => {
      duplicateGuardRef.current = false;
    }, 1200);
  }, [onCameraCancelled, scheduleFallbackCheck, setPhaseBoth]);

  const fireShortTap = useCallback(() => {
    if (
      disabled ||
      tapHandledRef.current ||
      suppressTapRef.current ||
      phaseRef.current === "armed" ||
      phaseRef.current === "activating" ||
      phaseRef.current === "fallback"
    ) {
      return;
    }
    tapHandledRef.current = true;
    devLog("SNAP short tap");
    onSnap();
  }, [disabled, onSnap]);

  const cancelGesture = useCallback(() => {
    clearTimer();
    suppressTapRef.current = false;
    setPressed(false);
    activePointerIdRef.current = null;
    if (phaseRef.current === "pressing" || phaseRef.current === "armed") {
      setPhaseBoth("idle");
    }
  }, [clearTimer, setPhaseBoth]);

  const finishInteraction = useCallback(() => {
    const action = resolvePressEnd({
      phase: phaseRef.current,
      disabled,
      suppressShort: suppressTapRef.current,
    });

    clearTimer();
    setPressed(false);
    activePointerIdRef.current = null;

    if (action === "activate-camera") {
      suppressTapRef.current = true;
      openCameraFromGesture();
      return;
    }

    if (action === "short-snap") {
      setPhaseBoth("idle");
      fireShortTap();
      return;
    }

    if (phaseRef.current !== "fallback" && phaseRef.current !== "activating") {
      setPhaseBoth("idle");
    }
  }, [
    clearTimer,
    disabled,
    fireShortTap,
    openCameraFromGesture,
    setPhaseBoth,
  ]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (showFallback) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* some browsers may reject capture — continue without it */
    }

    tapHandledRef.current = false;
    suppressTapRef.current = false;
    activationAttemptedRef.current = false;
    activePointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    setPressed(true);
    setPhaseBoth("pressing");
    clearTimer();
    clearFallbackTimer();

    timerRef.current = setTimeout(() => {
      const next = resolveThresholdReached(phaseRef.current);
      if (next !== "armed") return;
      setPhaseBoth("armed");
      suppressTapRef.current = true;
      vibrateLongPress();
      devLog("SNAP long press armed");
    }, LONG_PRESS_MS);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    if (phaseRef.current !== "pressing" && phaseRef.current !== "armed") return;

    const dx = e.clientX - startXRef.current;
    const dy = e.clientY - startYRef.current;
    if (shouldCancelForMovement(dx, dy, MOVE_TOLERANCE_PX)) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      cancelGesture();
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current === null) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    /* Finish before releasePointerCapture so lostcapture cannot cancel an armed press. */
    finishInteraction();

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    cancelGesture();
  };

  const handleLostPointerCapture = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    if (activePointerIdRef.current === null) return;
    /* Release path already handled pointerup; cancel leftover press/arm. */
    if (phaseRef.current === "pressing" || phaseRef.current === "armed") {
      cancelGesture();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (showFallback) {
      e.preventDefault();
      return;
    }
    if (suppressTapRef.current || phaseRef.current === "armed") {
      suppressTapRef.current = false;
      e.preventDefault();
      return;
    }
    if (tapHandledRef.current) {
      e.preventDefault();
      return;
    }
    /* Keyboard / accessibility activation without pointer sequence */
    if (phaseRef.current === "idle") {
      fireShortTap();
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    cameraOpenedRef.current = false;
    fileSelectedRef.current = true;
    activationAttemptedRef.current = false;
    duplicateGuardRef.current = false;
    clearFallbackTimer();
    setShowFallback(false);
    setFallbackMessage(null);
    setPhaseBoth("idle");
    devLog("Camera file selected");

    try {
      const dataUrl = await readFileAsDataUrl(file);
      onSnap(dataUrl);
    } catch {
      onPhotoReadError?.();
    }
  };

  const handleFallbackOpen = () => {
    if (duplicateGuardRef.current) return;
    setFallbackMessage(null);
    openCameraFromGesture();
  };

  const handleFallbackDismiss = () => {
    clearFallbackTimer();
    setShowFallback(false);
    setFallbackMessage(null);
    activationAttemptedRef.current = false;
    duplicateGuardRef.current = false;
    setPhaseBoth("idle");
  };

  const idle = !pressed && !disabled && phase === "idle";
  const showProgress = phase === "pressing" || phase === "armed";

  return (
    <div
      className={[
        "relative flex w-[70%] max-w-[320px] flex-col items-center justify-center overflow-visible",
        idle ? "animate-breathe" : "",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300",
          pressed || phase === "armed" ? "opacity-30" : "opacity-100",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(circle, rgba(91, 234, 134, 0.14) 0%, transparent 72%)",
          transform: "scale(1.2)",
        }}
        aria-hidden
      />

      <div className="relative w-full">
        {showProgress && (
          <svg
            className="pointer-events-none absolute inset-[-6px] z-[2] h-[calc(100%+12px)] w-[calc(100%+12px)]"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(17, 80, 42, 0.12)"
              strokeWidth="3"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(47, 185, 92, 0.85)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="289"
              strokeDashoffset={phase === "armed" || reducedMotion ? 0 : 289}
              transform="rotate(-90 50 50)"
              className={
                phase === "pressing" && !reducedMotion
                  ? "snap-longpress-ring"
                  : undefined
              }
            />
          </svg>
        )}

        <button
          type="button"
          disabled={disabled}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onLostPointerCapture={handleLostPointerCapture}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          style={{
            width: "100%",
            aspectRatio: "1",
            transform:
              pressed || celebrating || phase === "armed"
                ? "scale(0.96)"
                : "scale(1)",
            transition: pressed
              ? "transform 0.1s ease-out, box-shadow 0.1s ease-out"
              : celebrating
                ? "transform 0.12s ease-out, box-shadow 0.2s ease-out"
                : "transform 0.28s ease-out, box-shadow 0.28s ease-out",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
            touchAction: "none",
          }}
          className={[
            "relative z-[1] flex select-none items-center justify-center rounded-full touch-manipulation",
            "text-[clamp(1.875rem,7vw,2.5rem)] font-bold tracking-[0.28em] text-white",
            pressed || phase === "armed"
              ? "snap-hero-glow-pressed snap-hero-gradient-pressed"
              : celebrating
                ? "snap-hero-glow-celebrate snap-hero-gradient snap-hero-ring"
                : "snap-hero-glow snap-hero-gradient snap-hero-ring",
            disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
          ].join(" ")}
          aria-label="SNAP – tryck för att snappa, håll inne för foto"
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-full snap-hero-highlight"
            aria-hidden
          />
          <span className="relative pl-[0.28em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
            SNAP
          </span>
        </button>
      </div>

      <SnapCelebrate active={celebrating} reducedMotion={reducedMotion} />

      {showFallback && (
        <div
          className="animate-fade-in mt-4 flex w-full max-w-[280px] flex-col items-center gap-2"
          role="status"
        >
          {fallbackMessage && (
            <p className="text-center text-[13px] leading-snug text-secondary">
              {fallbackMessage}
            </p>
          )}
          <button
            type="button"
            onClick={handleFallbackOpen}
            className="min-h-[44px] w-full rounded-full bg-snap px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-snap-dark active:scale-[0.98]"
          >
            Öppna kamera
          </button>
          <button
            type="button"
            onClick={handleFallbackDismiss}
            className="min-h-[40px] text-sm text-secondary underline-offset-2 hover:underline"
          >
            Avbryt
          </button>
        </div>
      )}

      <input
        id={CAMERA_INPUT_ID}
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={handleFileChange}
        aria-hidden
        tabIndex={-1}
      />
    </div>
  );
}
