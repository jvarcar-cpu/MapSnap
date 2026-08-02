import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CAMERA_FALLBACK_MS,
  LONG_PRESS_MS,
  MOVE_TOLERANCE_PX,
  progressRatio,
  resolvePressEnd,
  resolveThresholdReached,
  shouldCancelForMovement,
  shouldShowCameraFallback,
} from "./longPressGesture.ts";

describe("longPressGesture constants", () => {
  it("keeps the protected long-press threshold", () => {
    assert.equal(LONG_PRESS_MS, 600);
  });

  it("defines movement tolerance and fallback delay", () => {
    assert.ok(MOVE_TOLERANCE_PX > 0);
    assert.ok(CAMERA_FALLBACK_MS > LONG_PRESS_MS);
  });
});

describe("shouldCancelForMovement", () => {
  it("allows small finger jitter", () => {
    assert.equal(shouldCancelForMovement(4, 3), false);
  });

  it("cancels when movement exceeds tolerance", () => {
    assert.equal(shouldCancelForMovement(20, 0), true);
    assert.equal(shouldCancelForMovement(0, MOVE_TOLERANCE_PX + 1), true);
  });
});

describe("resolveThresholdReached", () => {
  it("arms only from pressing", () => {
    assert.equal(resolveThresholdReached("pressing"), "armed");
    assert.equal(resolveThresholdReached("idle"), "idle");
    assert.equal(resolveThresholdReached("armed"), "armed");
    assert.equal(resolveThresholdReached("fallback"), "fallback");
  });
});

describe("resolvePressEnd", () => {
  it("short press remains position-only activation", () => {
    assert.equal(
      resolvePressEnd({ phase: "pressing" }),
      "short-snap"
    );
  });

  it("recognizes long-press threshold as camera activation on release", () => {
    assert.equal(resolvePressEnd({ phase: "armed" }), "activate-camera");
    assert.equal(resolvePressEnd({ phase: "activating" }), "activate-camera");
  });

  it("cancelled or idle gestures do not open the camera", () => {
    assert.equal(resolvePressEnd({ phase: "idle" }), "noop");
    assert.equal(resolvePressEnd({ phase: "fallback" }), "noop");
  });

  it("long press does not also trigger short press", () => {
    assert.equal(
      resolvePressEnd({ phase: "armed", suppressShort: true }),
      "activate-camera"
    );
    assert.equal(
      resolvePressEnd({ phase: "pressing", suppressShort: true }),
      "noop"
    );
  });

  it("disabled state blocks both actions", () => {
    assert.equal(
      resolvePressEnd({ phase: "pressing", disabled: true }),
      "noop"
    );
    assert.equal(resolvePressEnd({ phase: "armed", disabled: true }), "noop");
  });
});

describe("shouldShowCameraFallback", () => {
  it("shows direct-action fallback when activation was attempted but camera did not open", () => {
    assert.equal(
      shouldShowCameraFallback({
        activationAttempted: true,
        fileSelected: false,
        cameraLikelyOpened: false,
        cancelled: false,
      }),
      true
    );
  });

  it("does not show fallback when camera likely opened or file selected", () => {
    assert.equal(
      shouldShowCameraFallback({
        activationAttempted: true,
        fileSelected: false,
        cameraLikelyOpened: true,
        cancelled: false,
      }),
      false
    );
    assert.equal(
      shouldShowCameraFallback({
        activationAttempted: true,
        fileSelected: true,
        cameraLikelyOpened: false,
        cancelled: false,
      }),
      false
    );
  });

  it("prevents duplicate silent failure paths when cancelled", () => {
    assert.equal(
      shouldShowCameraFallback({
        activationAttempted: true,
        fileSelected: false,
        cameraLikelyOpened: false,
        cancelled: true,
      }),
      false
    );
  });
});

describe("progressRatio", () => {
  it("starts at zero and completes at threshold", () => {
    assert.equal(progressRatio(0), 0);
    assert.equal(progressRatio(300), 0.5);
    assert.equal(progressRatio(600), 1);
    assert.equal(progressRatio(900), 1);
  });
});
