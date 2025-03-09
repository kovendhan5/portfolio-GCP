/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // This is critical for Docker deployments
  output: 'standalone',
  
  // Simple image configuration
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  
  // Increase timeout for builds
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
