"use client";

import type { SnapPlace } from "@/types/place";
import { MapOpenButtons } from "./MapOpenButtons";
import { deleteSnap } from "@/lib/storage";

type PlaceCardProps = {
  place: SnapPlace;
  onDelete: (id: string) => void;
  animate?: boolean;
};

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("sv-SE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function formatCoords(lat: number, lng: number): string {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

export function PlaceCard({ place, onDelete, animate }: PlaceCardProps) {
  const handleDelete = () => {
    void deleteSnap(place.id).then((result) => {
      if (result.ok) {
        onDelete(place.id);
      }
    });
  };

  const displayName = place.name?.trim() || "Sparad plats";
  const category = place.category ?? "Annat";

  return (
    <article
      className={[
        "overflow-hidden rounded-3xl border border-black/[0.05] bg-elevated card-shadow transition-shadow duration-300",
        animate ? "animate-card-in" : "",
      ].join(" ")}
      style={{ viewTransitionName: `snap-${place.id}` }}
    >
      {place.photoDataUrl && (
        <div className="aspect-[2.4/1] w-full overflow-hidden bg-surface">
          <img
            src={place.photoDataUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold leading-snug text-primary">
            {displayName}
          </h3>
          <p className="mt-1.5 text-sm font-medium text-snap">
            📍 {category}
          </p>
          <p className="mt-1 text-sm text-secondary">{formatTime(place.createdAt)}</p>
        </div>

        <p className="mt-3 font-mono text-xs leading-relaxed text-secondary/70">
          {formatCoords(place.latitude, place.longitude)}
          {place.accuracy != null && (
            <span className="ml-2 text-secondary/50">
              ±{Math.round(place.accuracy)} m
            </span>
          )}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <MapOpenButtons latitude={place.latitude} longitude={place.longitude} />
          <button
            type="button"
            onClick={handleDelete}
            className="min-h-[48px] shrink-0 rounded-full border border-black/[0.07] bg-surface px-6 py-3 text-sm font-medium text-secondary transition-all duration-200 ease-out hover:bg-black/[0.03] active:scale-[0.97]"
            aria-label="Ta bort snap"
          >
            Ta bort
          </button>
        </div>
      </div>
    </article>
  );
}
