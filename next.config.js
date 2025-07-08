/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    domains: ['localhost'],
  },
  // Enable static export for better performance
  output: 'standalone',
}

module.exports = nextConfig
