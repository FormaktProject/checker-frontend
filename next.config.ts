import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
          bodySizeLimit: "200mb",
          allowedOrigins: [
          "checkerist.com",
          "www.checkerist.com",
          "checker-frontend-phi.vercel.app",
          "localhost:3000"
          ],
        },
    },
  
  images: {
    domains: ['blob.vercel-storage.com'],
    unoptimized: true,
  },
};

export default nextConfig;
