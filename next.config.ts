// next.config.ts
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
};
// next.config.js ou .ts
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
