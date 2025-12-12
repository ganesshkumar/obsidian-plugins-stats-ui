/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  staticPageGenerationTimeout: 300,
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    autoPrerender: false,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['github.com', 'raw.githubusercontent.com', 'placehold.co'],
    minimumCacheTTL: 604800, // 7 days
  },
  async headers() {
    return [
      {
        // 1. Static build assets (hashed) - cache forever
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }], // 1 year
      },
      // 2. Your versioned images - cache forever
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=2678400, immutable' }], // 31 days
      },
      // 3. Generic static files - shorter cache (if not versioned)
      {
        source: '/:path*.(png|jpg|jpeg|gif|svg|webp|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, immutable' }], // 7 days
      },
      // 4. 404 page
      {
        source: '/404',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=15552000, immutable' }], // 180 days
      },
      // 5. All HTML pages - no cache (catch-all)
      {
        source: '/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }], // no cache
      },
    ];
  },
};
