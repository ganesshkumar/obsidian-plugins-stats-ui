const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const PrismaClient = require('@prisma/client').PrismaClient;

const daysAgo = (days) => Date.now() - (days * 24 * 60 * 60 * 1000);

async function getNewPlugins(prisma) {
  const newPlugins = await prisma.plugin.findMany({
    where: {
      createdAt: {
        gt: daysAgo(30),
      },
    },
  });
  newPlugins.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return newPlugins;
}

async function getNewReleases(prisma) {
  const newReleases = await prisma.plugin.findMany({
    where: {
      latestReleaseAt: {
        gt: daysAgo(30),
      },
    },
  });
  newReleases.sort((a, b) => new Date(b.latestReleaseAt) - new Date(a.latestReleaseAt));
  return newReleases;
}

async function getSortedPostsData() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

async function generateRSS() {
  const prisma = new PrismaClient();
  const newPlugins = await getNewPlugins(prisma);
  const newReleases = await getNewReleases(prisma);
  const allPostsData = await getSortedPostsData();

  const items = [
    ...newPlugins.map((plugin) => ({
      title: `New Obsidian Plugin - ${plugin.name}`,
      description: plugin.description,
      link: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
      pubDate: new Date(plugin.createdAt)
    })),
    ...newReleases.map((plugin) => ({
      title: `New version for Obsidian plugin ${plugin.name}`,
      description: `New version ${plugin.latestRelease} was released for ${plugin.name} on ${new Date(
        plugin.latestReleaseAt
      ).toISOString().split('T')[0]}`,
      link: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}?version=${plugin.latestRelease}`,
      pubDate: new Date(plugin.latestReleaseAt)
    })),
    ...allPostsData.map((post) => ({
      title: post.title,
      description: post.description,
      link: `https://obsidian-plugin-stats.ganesshkumar.com/posts/${post.id}`,
      pubDate: new Date(post.publishedDate)
    }))
  ];

  return `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Obsidian Plugin Stats</title>
    <link>https://obsidian-plugin-stats.ganesshkumar.com</link>
    <description>Latest updates on Obsidian plugins</description>
    <language>en-us</language>
    <atom:link href="https://obsidian-plugin-stats.ganesshkumar.com/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .filter((item) => item.pubDate < new Date())
      .map(
        (item) => `
    <item>
      <title>${item.title}</title>
      <description>${item.description}</description>
      <link>${item.link}</link>
      <pubDate>${item.pubDate?.toUTCString()}</pubDate>
      <guid>${item.link}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;
}

async function saveRSSFeed() {
  const rss = await generateRSS();
  const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
  fs.writeFileSync(rssPath, rss, 'utf8');
  console.log('✅ RSS feed saved to public/rss.xml');
}

saveRSSFeed();
