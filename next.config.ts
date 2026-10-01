import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "cc-west-usa.oss-us-west-1.aliyuncs.com", // CJ Dropshipping image CDN
      },
      {
        protocol: "https",
        hostname: "api.teemdrop.com",
      },
      {
        protocol: "https",
        hostname: "**", // Permite imágenes de cualquier CDN en modo desarrollo
      },
    ],
  },
};

export default nextConfig;
