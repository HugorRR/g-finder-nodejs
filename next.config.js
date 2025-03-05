/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['vercel.com'],
    unoptimized: true,
  },
  output: 'standalone',
};

module.exports = nextConfig; 