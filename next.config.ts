import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/accounts",
        permanent: true,
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
