import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https'
      },
      {
        hostname: 'res.cloudinary.com',
        protocol: 'https'
      },
    ]
  },
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true
  }
};

export default nextConfig;
