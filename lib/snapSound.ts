let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const Ctx =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    if (!audioContext || audioContext.state === "closed") {
      audioContext = new Ctx();
    }
    return audioContext;
  } catch {
    return null;
  }
}

/**
 * Very discreet snap confirmation tone. Fails silently when audio is unavailable.
 */
export function playSnapSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const run = () => {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.06);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    };

    if (ctx.state === "suspended") {
      void ctx.resume().then(run).catch(() => {});
      return;
    }
    run();
  } catch {
    // Graceful degradation — sound is optional
  }
}
