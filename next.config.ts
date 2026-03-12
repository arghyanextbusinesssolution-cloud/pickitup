import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Limit the number of workers to reduce memory usage
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
