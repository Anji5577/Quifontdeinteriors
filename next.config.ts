import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: every route is pre-rendered to /out.
  output: "export",
  trailingSlash: true,
  // Images are pre-optimised by scripts/build-images.mjs (AVIF + WebP).
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
