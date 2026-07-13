"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { readFileAsDataUrl } from "@/lib/geo";
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

const LONG_PRESS_MS = 600;

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
  const longPressTriggeredRef = useRef(false);
  const awaitingPointerUpRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const tapHandledRef = useRef(false);
  const suppressTapRef = useRef(false);
  const cameraOpenedRef = useRef(false);
  const fileSelectedRef = useRef(false);
  const [pressed, setPressed] = useState(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const resetInteraction = useCallback(() => {
    awaitingPointerUpRef.current = false;
    activePointerIdRef.current = null;
    tapHandledRef.current = false;
    setPressed(false);
    clearTimer();
  }, [clearTimer]);

  const openCamera = useCallback(() => {
    devLog("SNAP long press");
    const input = inputRef.current;
    if (!input) return;

    cameraOpenedRef.current = true;
    fileSelectedRef.current = false;
    devLog("Camera input opened");
    input.click();

    const handleWindowFocus = () => {
      window.removeEventListener("focus", handleWindowFocus);
      window.setTimeout(() => {
        if (cameraOpenedRef.current && !fileSelectedRef.current) {
          cameraOpenedRef.current = false;
          onCameraCancelled?.();
        }
      }, 800);
    };
    window.addEventListener("focus", handleWindowFocus);
  }, [onCameraCancelled]);

  const fireShortTap = useCallback(() => {
    if (
      disabled ||
      tapHandledRef.current ||
      longPressTriggeredRef.current ||
      suppressTapRef.current
    ) {
      return;
    }
    tapHandledRef.current = true;
    devLog("SNAP short tap");
    onSnap();
  }, [disabled, onSnap]);

  const finishInteraction = useCallback(
    (wasLongPress: boolean) => {
      if (tapHandledRef.current && !wasLongPress) {
        resetInteraction();
        return;
      }

      const shouldTap = !wasLongPress && !disabled && !tapHandledRef.current;
      resetInteraction();

      if (shouldTap) {
        fireShortTap();
      }
    },
    [disabled, fireShortTap, resetInteraction]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    tapHandledRef.current = false;
    suppressTapRef.current = false;
    longPressTriggeredRef.current = false;
    awaitingPointerUpRef.current = true;
    activePointerIdRef.current = e.pointerId;
    setPressed(true);
    clearTimer();

    timerRef.current = setTimeout(() => {
      if (!awaitingPointerUpRef.current) return;
      longPressTriggeredRef.current = true;
      suppressTapRef.current = true;
      vibrateLongPress();
      openCamera();
    }, LONG_PRESS_MS);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!awaitingPointerUpRef.current) return;
    if (
      activePointerIdRef.current !== null &&
      activePointerIdRef.current !== e.pointerId
    ) {
      return;
    }

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const wasLongPress = longPressTriggeredRef.current;
    finishInteraction(wasLongPress);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    const wasLongPress = longPressTriggeredRef.current;
    finishInteraction(wasLongPress);
  };

  const handleLostPointerCapture = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    if (!awaitingPointerUpRef.current) return;

    const wasLongPress = longPressTriggeredRef.current;
    finishInteraction(wasLongPress);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (suppressTapRef.current || longPressTriggeredRef.current) {
      suppressTapRef.current = false;
      longPressTriggeredRef.current = false;
      e.preventDefault();
      return;
    }
    if (tapHandledRef.current) {
      e.preventDefault();
      return;
    }
    fireShortTap();
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
    devLog("Camera file selected");

    try {
      const dataUrl = await readFileAsDataUrl(file);
      onSnap(dataUrl);
    } catch {
      onPhotoReadError?.();
    }
  };

  const idle = !pressed && !disabled;

  return (
    <div
      className={[
        "relative flex w-[70%] max-w-[320px] items-center justify-center",
        idle ? "animate-breathe" : "",
      ].join(" ")}
    >
      <SnapCelebrate active={celebrating} reducedMotion={reducedMotion} />

      <div
        className={[
          "pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300",
          pressed ? "opacity-30" : "opacity-100",
        ].join(" ")}
        style={{
          background:
            "radial-gradient(circle, rgba(91, 234, 134, 0.14) 0%, transparent 72%)",
          transform: "scale(1.2)",
        }}
        aria-hidden
      />

      <button
        type="button"
        disabled={disabled}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handleLostPointerCapture}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{
          width: "100%",
          aspectRatio: "1",
          transform: pressed || celebrating ? "scale(0.96)" : "scale(1)",
          transition: pressed
            ? "transform 0.1s ease-out, box-shadow 0.1s ease-out"
            : celebrating
              ? "transform 0.12s ease-out, box-shadow 0.2s ease-out"
              : "transform 0.28s ease-out, box-shadow 0.28s ease-out",
        }}
        className={[
          "relative flex select-none items-center justify-center rounded-full touch-manipulation",
          "text-[clamp(1.875rem,7vw,2.5rem)] font-bold tracking-[0.28em] text-white",
          pressed
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

      <input
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
