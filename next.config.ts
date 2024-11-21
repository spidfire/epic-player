import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
 
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
