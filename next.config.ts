import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow mobile testing via Tailscale/LAN IP without blocking /_next assets in dev.
  allowedDevOrigins: ["100.104.107.81", "localhost", "127.0.0.1"],
};

export default nextConfig;
