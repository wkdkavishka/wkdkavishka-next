import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export",
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
  distDir: "dist",
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons", "three"],
  },
};

export default nextConfig;
