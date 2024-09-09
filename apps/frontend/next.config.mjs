/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@kuma/ui'],
  env: {
    API_ROUTE: process.env.API_ROUTE,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;
