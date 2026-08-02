/**
 * Progressive PWA installation guidance helpers.
 * Capability-oriented — avoid brittle full user-agent string matching in UI logic.
 */

export const INSTALL_DISMISS_KEY = "mapsnap.installGuidance.dismissed.v1";

/** Wait after Snap feedback ends before revealing install guidance (calm, non-interruptive). */
export const INSTALL_GUIDANCE_POST_FEEDBACK_MS = 500;

/** Enter / exit motion durations — keep subordinate to SNAP celebrate (~650ms). */
export const INSTALL_GUIDANCE_ENTER_MS = 320;
export const INSTALL_GUIDANCE_EXIT_MS = 220;

export type InstallGuidanceMode =
  | "hidden"
  | "prompt"
  | "ios-manual"
  | "android-manual";

/**
 * Delay before first paint of install guidance.
 * After false→true engagement: wait for Snap feedback, then a short calm pause.
 * When already engaged (returning visit): minimal or zero delay.
 */
export function installGuidanceRevealDelayMs(options: {
  engagedTransition: boolean;
  feedbackMs: number;
  reducedMotion: boolean;
}): number {
  if (!options.engagedTransition) {
    return options.reducedMotion ? 0 : 80;
  }
  const postFeedback = options.reducedMotion
    ? 0
    : INSTALL_GUIDANCE_POST_FEEDBACK_MS;
  return Math.max(0, options.feedbackMs) + postFeedback;
}
export type NavigatorInstallSignals = {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
  /** Present on iOS Safari (true when launched from Home Screen). */
  standalone?: boolean;
};

export type WindowInstallSignals = {
  matchMedia?: (query: string) => { matches: boolean };
  navigator?: NavigatorInstallSignals;
};

export function isRunningStandalone(win: WindowInstallSignals): boolean {
  if (win.matchMedia?.("(display-mode: standalone)").matches) return true;
  if (win.matchMedia?.("(display-mode: fullscreen)").matches) return true;
  if (win.navigator?.standalone === true) return true;
  return false;
}

/**
 * Surfaces where Home Screen install is typically via Share → Add to Home Screen.
 * Prefers capability signals over exact browser strings.
 */
export function canOfferIosHomeScreenGuidance(
  nav: NavigatorInstallSignals
): boolean {
  if (typeof nav.standalone === "boolean") return true;
  const platform = nav.platform ?? "";
  const maxTouchPoints = nav.maxTouchPoints ?? 0;
  if (platform === "MacIntel" && maxTouchPoints > 1) return true;
  const ua = nav.userAgent ?? "";
  return /iPhone|iPad|iPod/i.test(ua);
}

/** Neutral Android manual-install surface when beforeinstallprompt is absent. */
export function canOfferAndroidManualGuidance(
  nav: NavigatorInstallSignals
): boolean {
  return /Android/i.test(nav.userAgent ?? "");
}

export function isInstallGuidanceDismissed(
  storage: Pick<Storage, "getItem"> | null | undefined
): boolean {
  if (!storage) return false;
  try {
    return storage.getItem(INSTALL_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function persistInstallGuidanceDismissed(
  storage: Pick<Storage, "setItem"> | null | undefined
): void {
  if (!storage) return;
  try {
    storage.setItem(INSTALL_DISMISS_KEY, "1");
  } catch {
    /* quota / private mode — ignore */
  }
}

export function clearInstallGuidanceDismissed(
  storage: Pick<Storage, "removeItem"> | null | undefined
): void {
  if (!storage) return;
  try {
    storage.removeItem(INSTALL_DISMISS_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Select install guidance mode from platform capability signals.
 * Engagement gate keeps promotion subordinate to Capture.
 */
export function selectInstallGuidanceMode(signals: {
  isStandalone: boolean;
  dismissed: boolean;
  engaged: boolean;
  hasInstallPrompt: boolean;
  iosHomeScreen: boolean;
  androidManual: boolean;
}): InstallGuidanceMode {
  if (signals.isStandalone || signals.dismissed || !signals.engaged) {
    return "hidden";
  }
  if (signals.hasInstallPrompt) return "prompt";
  if (signals.iosHomeScreen) return "ios-manual";
  if (signals.androidManual) return "android-manual";
  return "hidden";
}
