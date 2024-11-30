import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Disable TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during build
  },
  /* config options here */
};

export default nextConfig;
