/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // More permissive configuration for Docker environment
  output: 'standalone',
  
  // Enable static export if that's what you're aiming for
  // Uncomment if you're doing a static export
  // output: 'export',
  
  // Simple image configuration
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  
  // Increase build timeout if needed
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

module.exports = nextConfig;
