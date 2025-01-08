/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.SITE_URL || 'https://www.obsidianstats.com/',
  generateRobotsTxt: true,
};
