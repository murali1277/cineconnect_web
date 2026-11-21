import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export", // Instructs Next.js to generate static HTML/CSS/JS files
  images: {
    unoptimized: true, // Required for static hosting on Hostinger
  },
};

export default nextConfig;