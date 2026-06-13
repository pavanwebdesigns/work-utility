/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
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
