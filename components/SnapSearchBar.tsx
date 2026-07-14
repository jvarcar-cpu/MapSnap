"use client";

import { memo } from "react";

type SnapSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[18px] w-[18px] shrink-0 text-secondary/60"
      aria-hidden
    >
      <circle
        cx="8.75"
        cy="8.75"
        r="5.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 13l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      aria-hidden
    >
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const SnapSearchBar = memo(function SnapSearchBar({
  value,
  onChange,
}: SnapSearchBarProps) {
  const hasValue = value.length > 0;

  return (
    <div className="relative mb-5">
      <label htmlFor="snap-search" className="sr-only">
        Sök bland dina Snappar
      </label>
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </span>
      <input
        id="snap-search"
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="Sök bland dina Snappar"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={[
          "w-full rounded-full border border-black/[0.06] bg-elevated/80 py-2.5",
          "pl-10 text-[15px] text-primary placeholder:text-secondary/55",
          hasValue ? "pr-10" : "pr-4",
          "transition-colors duration-150",
          "focus:border-black/[0.1] focus:bg-elevated focus:outline-none",
          "focus-visible:ring-2 focus-visible:ring-snap/25",
        ].join(" ")}
      />
      {hasValue && (
        <button
          type="button"
          onClick={() => onChange("")}
          className={[
            "absolute right-1.5 top-1/2 flex h-8 w-8 min-h-[32px] min-w-[32px]",
            "-translate-y-1/2 items-center justify-center rounded-full",
            "text-secondary/70 transition-colors hover:bg-black/[0.04] hover:text-secondary",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
            "focus-visible:outline-snap/40",
          ].join(" ")}
          aria-label="Rensa sökning"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  );
});
