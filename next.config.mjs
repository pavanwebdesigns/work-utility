/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Avoid serving a stale prerendered homepage shell on client-side back navigation.
    staleTimes: {
      dynamic: 30,
      static: 0,
    },
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://workutilities.com/:path*",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      };
    }
    return config;
  },
};

export default nextConfig;
