/**
 * Pure long-press gesture helpers for SNAP capture.
 * Interaction model: arm on threshold; activate camera on release (user-gesture safe).
 */

export const LONG_PRESS_MS = 600;
export const MOVE_TOLERANCE_PX = 12;
/** After release activation attempt, wait before showing direct-action fallback. */
export const CAMERA_FALLBACK_MS = 900;

export type LongPressPhase =
  | "idle"
  | "pressing"
  | "armed"
  | "activating"
  | "fallback";

export type PressEndAction = "short-snap" | "activate-camera" | "noop";

export function shouldCancelForMovement(
  dx: number,
  dy: number,
  tolerancePx: number = MOVE_TOLERANCE_PX
): boolean {
  return Math.hypot(dx, dy) > tolerancePx;
}

/**
 * Resolve what happens when the press ends.
 * Camera opens on release after arming — not from the timer callback —
 * so browsers that require transient user activation can open the file input.
 */
export function resolvePressEnd(options: {
  phase: LongPressPhase;
  disabled?: boolean;
  suppressShort?: boolean;
}): PressEndAction {
  if (options.disabled) return "noop";
  if (options.phase === "armed" || options.phase === "activating") {
    return "activate-camera";
  }
  if (options.phase === "pressing" && !options.suppressShort) {
    return "short-snap";
  }
  return "noop";
}

/** Timer callback only arms the gesture; it must not open the camera. */
export function resolveThresholdReached(phase: LongPressPhase): LongPressPhase {
  if (phase !== "pressing") return phase;
  return "armed";
}

export function shouldShowCameraFallback(options: {
  activationAttempted: boolean;
  fileSelected: boolean;
  cameraLikelyOpened: boolean;
  cancelled: boolean;
}): boolean {
  if (options.cancelled || options.fileSelected || options.cameraLikelyOpened) {
    return false;
  }
  return options.activationAttempted;
}

export function progressRatio(
  elapsedMs: number,
  thresholdMs: number = LONG_PRESS_MS
): number {
  if (thresholdMs <= 0) return 1;
  return Math.min(1, Math.max(0, elapsedMs / thresholdMs));
}
