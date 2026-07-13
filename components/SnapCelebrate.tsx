"use client";

type SnapCelebrateProps = {
  active: boolean;
  reducedMotion: boolean;
};

export function SnapCelebrate({ active, reducedMotion }: SnapCelebrateProps) {
  if (!active || reducedMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center overflow-visible"
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full snap-celebrate-pulse" />
      <span className="absolute inset-0 rounded-full snap-sonar-wave snap-sonar-wave-1" />
      <span className="absolute inset-0 rounded-full snap-sonar-wave snap-sonar-wave-2" />
      <span className="absolute inset-0 rounded-full snap-sonar-wave snap-sonar-wave-3" />
    </div>
  );
}
