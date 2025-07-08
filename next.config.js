/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  images: {
    domains: ['localhost'],
    unoptimized: true, // Required for static export
  },
  
  // Environment-based output configuration
  output: process.env.EXPORT_MODE === 'static' ? 'export' : 'standalone',
  
  // Base path for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/tax_Luxembourg' : '',
  
  // Asset prefix for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES ? '/tax_Luxembourg' : '',
  
  // Disable server-side features for static export
  trailingSlash: true,
  
  // Disable static generation for dynamic pages
  generateBuildId: () => 'build',
  
  // Configure pages that should not be prerendered
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  
  // Webpack configuration for better build performance
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  }
}

module.exports = nextConfig