import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  INSTALL_DISMISS_KEY,
  canOfferAndroidManualGuidance,
  canOfferIosHomeScreenGuidance,
  clearInstallGuidanceDismissed,
  isInstallGuidanceDismissed,
  isRunningStandalone,
  persistInstallGuidanceDismissed,
  selectInstallGuidanceMode,
} from "./pwaInstall.ts";

describe("isRunningStandalone", () => {
  it("hides guidance when display-mode is standalone", () => {
    assert.equal(
      isRunningStandalone({
        matchMedia: (q) => ({ matches: q.includes("standalone") }),
        navigator: {},
      }),
      true
    );
  });

  it("detects iOS Home Screen via navigator.standalone", () => {
    assert.equal(
      isRunningStandalone({
        matchMedia: () => ({ matches: false }),
        navigator: { standalone: true },
      }),
      true
    );
  });

  it("is false in ordinary browser tabs", () => {
    assert.equal(
      isRunningStandalone({
        matchMedia: () => ({ matches: false }),
        navigator: { standalone: false },
      }),
      false
    );
  });
});

describe("platform guidance selection helpers", () => {
  it("selects iOS/manual guidance from standalone capability, not full UA alone", () => {
    assert.equal(
      canOfferIosHomeScreenGuidance({ standalone: false, platform: "iPhone" }),
      true
    );
    assert.equal(
      canOfferIosHomeScreenGuidance({
        platform: "MacIntel",
        maxTouchPoints: 5,
      }),
      true
    );
    assert.equal(
      canOfferIosHomeScreenGuidance({
        platform: "Win32",
        maxTouchPoints: 0,
        userAgent: "Mozilla/5.0",
      }),
      false
    );
  });

  it("selects Android fallback surface from Android token only", () => {
    assert.equal(
      canOfferAndroidManualGuidance({
        userAgent: "Mozilla/5.0 (Linux; Android 14)",
      }),
      true
    );
    assert.equal(
      canOfferAndroidManualGuidance({
        userAgent: "Mozilla/5.0 (Windows NT 10.0)",
      }),
      false
    );
  });
});

describe("selectInstallGuidanceMode", () => {
  const base = {
    isStandalone: false,
    dismissed: false,
    engaged: true,
    hasInstallPrompt: false,
    iosHomeScreen: false,
    androidManual: false,
  };

  it("hides when already installed/standalone", () => {
    assert.equal(
      selectInstallGuidanceMode({ ...base, isStandalone: true }),
      "hidden"
    );
  });

  it("hides when not engaged so Capture stays primary", () => {
    assert.equal(
      selectInstallGuidanceMode({ ...base, engaged: false }),
      "hidden"
    );
  });

  it("browser install event enables direct install action", () => {
    assert.equal(
      selectInstallGuidanceMode({ ...base, hasInstallPrompt: true }),
      "prompt"
    );
  });

  it("absence of install event does not break — falls back by platform", () => {
    assert.equal(selectInstallGuidanceMode(base), "hidden");
    assert.equal(
      selectInstallGuidanceMode({ ...base, iosHomeScreen: true }),
      "ios-manual"
    );
    assert.equal(
      selectInstallGuidanceMode({ ...base, androidManual: true }),
      "android-manual"
    );
  });

  it("prompt mode wins over manual platform guidance", () => {
    assert.equal(
      selectInstallGuidanceMode({
        ...base,
        hasInstallPrompt: true,
        androidManual: true,
      }),
      "prompt"
    );
  });

  it("successful install / dismissal suppresses further promotion", () => {
    assert.equal(
      selectInstallGuidanceMode({ ...base, dismissed: true, hasInstallPrompt: true }),
      "hidden"
    );
  });
});

describe("dismissal persistence", () => {
  it("persists dismissal locally", () => {
    const store = new Map<string, string>();
    const storage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
    };

    assert.equal(isInstallGuidanceDismissed(storage), false);
    persistInstallGuidanceDismissed(storage);
    assert.equal(store.get(INSTALL_DISMISS_KEY), "1");
    assert.equal(isInstallGuidanceDismissed(storage), true);
    clearInstallGuidanceDismissed(storage);
    assert.equal(isInstallGuidanceDismissed(storage), false);
  });
});
