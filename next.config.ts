import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: false,
  },
};

export default nextConfig;
