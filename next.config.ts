import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: outputs plain HTML/CSS/JS to ./out for Cloudflare Pages.
  output: "export",
  // next/image optimization needs a server; serve images as-is instead.
  images: { unoptimized: true },
  // Emit /about/index.html instead of /about.html so Pages routing is clean.
  trailingSlash: true,
};

export default nextConfig;
