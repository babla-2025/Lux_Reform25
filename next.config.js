/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    domains: ['localhost'],
    unoptimized: true, // Required for static export
  },
  
  // Environment-based output configuration
  output: process.env.EXPORT_MODE === 'static' ? 'export' : 'standalone',
  
  // Base path for GitHub Pages deployment
  basePath: process.env.GITHUB_PAGES === 'true' ? '/tax_Luxembourg' : '',
  
  // Asset prefix for GitHub Pages
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/tax_Luxembourg' : '',
  
  // Disable server-side features for static export
  trailingSlash: true,
  
  // Disable static generation for dynamic pages during static export
  ...(process.env.EXPORT_MODE === 'static' && {
    output: 'export',
    distDir: 'out',
  }),
  
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