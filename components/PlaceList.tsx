"use client";

import type { SnapPlace } from "@/types/place";
import { PlaceCard } from "./PlaceCard";

type PlaceListProps = {
  places: SnapPlace[];
  onDelete: (id: string) => void;
  onUpdate: (snap: SnapPlace) => void;
  newestId?: string | null;
};

function LocationPinIllustration() {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-5 h-12 w-12 opacity-25"
      aria-hidden
    >
      <path
        d="M24 2C14.06 2 6 10.06 6 20c0 11.25 18 33 18 33s18-21.75 18-33C42 10.06 33.94 2 24 2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        className="text-secondary"
      />
      <circle
        cx="24"
        cy="20"
        r="6"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-secondary"
      />
    </svg>
  );
}

export function PlaceList({ places, onDelete, onUpdate, newestId }: PlaceListProps) {
  if (places.length === 0) {
    return (
      <div className="animate-fade-in px-2 py-10 text-center">
        <LocationPinIllustration />
        <p className="text-base font-medium text-primary">Inga snappar ännu.</p>
        <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-secondary">
          Din första upptäckt är bara ett tryck bort.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {places.map((place) => (
        <li key={place.id}>
          <PlaceCard
            place={place}
            onDelete={onDelete}
            onUpdate={onUpdate}
            animate={place.id === newestId}
          />
        </li>
      ))}
    </ul>
  );
}
