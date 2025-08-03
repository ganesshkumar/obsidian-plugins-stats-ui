const autoprefixer = require('autoprefixer');

module.exports = {
  experimental: {
    middleware: false,
    legacyBrowsers: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
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
};
