let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com'],  // Add Firebase storage domain if you're using it
  },
  trailingSlash: true,  // Important for correct routing in Firebase
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  output: 'export',
  // Merge with user config if it exists
  ...(userConfig?.default || {})
}

export default nextConfig
