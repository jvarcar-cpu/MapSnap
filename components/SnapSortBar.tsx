"use client";

import { memo } from "react";
import type { SnapSortMode } from "@/lib/snapSort";

type SnapSortBarProps = {
  value: SnapSortMode;
  onChange: (mode: SnapSortMode) => void;
  resolvingNearest?: boolean;
};

const SORT_OPTIONS: { mode: SnapSortMode; label: string }[] = [
  { mode: "newest", label: "Nyast" },
  { mode: "oldest", label: "Äldst" },
  { mode: "nearest", label: "Närmast" },
];

export const SnapSortBar = memo(function SnapSortBar({
  value,
  onChange,
  resolvingNearest = false,
}: SnapSortBarProps) {
  return (
    <div className="mb-5">
      <p
        id="snap-sort-label"
        className="mb-2 px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-secondary/70"
      >
        Sortera
      </p>
      <div
        role="group"
        aria-labelledby="snap-sort-label"
        className={[
          "flex rounded-full border border-black/[0.06] bg-elevated/80 p-1",
          resolvingNearest ? "opacity-90" : "",
        ].join(" ")}
      >
        {SORT_OPTIONS.map(({ mode, label }) => {
          const active = value === mode;
          const busy = resolvingNearest && mode === "nearest";

          return (
            <button
              key={mode}
              type="button"
              onClick={() => onChange(mode)}
              disabled={busy}
              aria-pressed={active}
              className={[
                "min-h-[36px] flex-1 rounded-full px-2 text-[13px] font-medium transition-colors duration-150",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
                "focus-visible:outline-snap/40",
                active
                  ? "bg-white text-primary shadow-sm"
                  : "text-secondary hover:text-primary",
                busy ? "cursor-wait" : "",
              ].join(" ")}
            >
              {busy ? "…" : label}
            </button>
          );
        })}
      </div>
    </div>
  );
});
