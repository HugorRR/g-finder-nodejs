/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = nextConfig; 