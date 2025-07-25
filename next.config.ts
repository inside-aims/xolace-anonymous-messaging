import type { NextConfig } from "next";

const MAIN_DOMAIN = process.env.NEXT_PUBLIC_APP_URL || 'https://xolace.app';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'messages.xolace.app',
          },
        ],
        destination: MAIN_DOMAIN,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
