"use client";

import { googleMapsUrl, wazeUrl } from "@/lib/maps";
import { GoogleMapsIcon, WazeIcon } from "./icons/SnapActionIcons";

type MapOpenButtonsProps = {
  latitude: number;
  longitude: number;
};

const linkClass =
  "flex min-h-[48px] flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[0.07] bg-surface px-4 py-3 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-snap/20 hover:bg-snap-muted/40 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snap/40";

export function MapOpenButtons({ latitude, longitude }: MapOpenButtonsProps) {
  return (
    <div className="flex flex-1 gap-3">
      <a
        href={googleMapsUrl(latitude, longitude)}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <GoogleMapsIcon />
        Google Maps
      </a>
      <a
        href={wazeUrl(latitude, longitude)}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <WazeIcon />
        Waze
      </a>
    </div>
  );
}
