const autoprefixer = require('autoprefixer');

module.exports = {
  experimental: {
    middleware: false,
    legacyBrowsers: false,
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
