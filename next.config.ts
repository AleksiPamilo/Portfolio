import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.pmlo.dev",
        port: "",
        pathname: "/image/**"
      }
    ]
  }
};

export default nextConfig;
