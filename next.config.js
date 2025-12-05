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
      //
      // 1) Next.js build assets – safe to cache for a long time (hashed filenames)
      //
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 31 days
          },
        ],
      },
      //
      // 2) Generic static files: images + fonts
      //    Any URL ending with png|jpg|svg|webp|woff2
      //   
      {
        source: '/:path*.(png|jpg|jpeg|gif|svg|webp|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable', // 7 days
          },
        ],
      },
      //
      // 3) Page-level caching – 2 hours for main views
      //
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate', // 2 hours
          },
        ],
      },
      {
        source: '/new',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/updates',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/favorites',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/most-downloaded',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/trending',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/migrate',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/share',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/timeline',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/plugins',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/plugins/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/categories',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/categories/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/posts',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/posts/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/scorer',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/scorer/build',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/tags',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/tags/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/tools',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      {
        source: '/tools/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=7200, must-revalidate',
          },
        ],
      },
      //
      // 4) 404 page – long cache, as in your vercel.json
      //
      {
        source: '/404',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=15552000, immutable', // ~180 days
          },
        ],
      },
    ];
  },
};
