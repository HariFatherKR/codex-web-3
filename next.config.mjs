/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  eslint: {
    // Vercel builds shouldn't be blocked by lint conflicts between branches
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
