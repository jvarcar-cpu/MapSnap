export function withViewTransition(update: () => void): void {
  if (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    typeof document.startViewTransition === "function"
  ) {
    document.startViewTransition(update);
  } else {
    update();
  }
}

export function vibrateSuccess(): void {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(20);
  }
}

export function vibrateLongPress(): void {
  vibrateSuccess();
}
