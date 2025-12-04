import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: true, // For base64 images from localStorage
  },
};

export default nextConfig;
