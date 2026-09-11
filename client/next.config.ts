import type { NextConfig } from "next";
import { env } from "@/lib/env";

const config: NextConfig = {
  async rewrites() {
    const serverOrigin = new URL(env.NEXT_PUBLIC_SERVER_ORIGIN).origin;
    return [
      {
        source: "/api/:path*",
        destination: `${serverOrigin}/api/:path*`,
      },
    ];
  },
};

export default config;
