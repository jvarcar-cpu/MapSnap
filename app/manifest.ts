import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MapSnap",
    short_name: "MapSnap",
    description: "Fånga platser innan de glöms bort.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#2FB95C",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
