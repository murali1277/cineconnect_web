import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export", // Instructs Next.js to generate static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required for static hosting on Hostinger
  },
  devIndicators: false, // Disables the Next.js development 'N' badge
};

export default nextConfig;