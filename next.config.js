module.exports = {
  experimental: {
    middleware: false,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  images: {
    domains: ['github.com', 'raw.githubusercontent.com'],
    minimumCacheTTL: 604800, // 7 days
  },
};
  