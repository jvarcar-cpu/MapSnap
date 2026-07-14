"use client";

import { memo } from "react";
import type { SnapFilterMode } from "@/lib/snapFilter";

type SnapFilterBarProps = {
  value: SnapFilterMode;
  onChange: (mode: SnapFilterMode) => void;
};

const FILTER_OPTIONS: { mode: SnapFilterMode; label: string }[] = [
  { mode: "all", label: "Alla" },
  { mode: "favorites", label: "Favoriter" },
  { mode: "withImages", label: "Med bild" },
];

export const SnapFilterBar = memo(function SnapFilterBar({
  value,
  onChange,
}: SnapFilterBarProps) {
  return (
    <div className="mb-5">
      <p
        id="snap-filter-label"
        className="mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-secondary/70"
      >
        Filtrera
      </p>
      <div
        role="group"
        aria-labelledby="snap-filter-label"
        className="flex rounded-full border border-black/[0.06] bg-elevated/80 p-1"
      >
        {FILTER_OPTIONS.map(({ mode, label }) => {
          const active = value === mode;

          return (
            <button
              key={mode}
              type="button"
              onClick={() => onChange(mode)}
              aria-pressed={active}
              className={[
                "min-h-[36px] flex-1 rounded-full px-2 text-[13px] font-medium transition-colors duration-150",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
                "focus-visible:outline-snap/40",
                active
                  ? "bg-white text-primary shadow-sm"
                  : "text-secondary hover:text-primary",
              ].join(" ")}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
});
