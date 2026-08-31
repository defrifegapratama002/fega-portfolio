import type { NextConfig } from "next";

/**
 * Static export so the site can be hosted anywhere (GitHub Pages, Vercel, any
 * static host). For GitHub Pages project sites set NEXT_PUBLIC_BASE_PATH to
 * "/fega-portfolio" at build time (the deploy workflow does this).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
