import { Plugin } from '@prisma/client';
import { JsonLdSchema } from './jsonLdSchema';

const plugin: Plugin = {
  id: '1',
  pluginId: 'plugin-a',
  name: 'Plugin A',
  author: 'John Doe',
  description: 'A sample Obsidian plugin.',
  repo: 'https://github.com/johndoe/sample-plugin',
  createdAt: 1672531200,
  nextUpdateAt: 1704067200,
  lastCommitAt: 1696118400,
  stargazers: 100,
  subscribers: 50,
  forks: 20,
  latestRelease: '1.0.1',
  latestReleaseDesc: 'Bug fixes and improvements.',
  latestReleaseAt: 1696118400,
  totalDownloads: 5000,
  totalIssues: 10,
  closedIssues: 8,
  openIssues: 2,
  totalPR: 5,
  openPR: 1,
  closedPR: 4,
  mergedPR: 3,
  commitCountInLastYear: 30,
  zScoreTrending: 1.5,
  aiDescription: 'Automates tasks in Obsidian.',
  aiCategories: 'Productivity',
  aiTags: 'automation, productivity',
  score: 0.45,
  scoreReason: 'High user ratings and active development.'
}

describe('JsonLdSchema', () => {
  test('getHomePageSchema returns correct schema', () => {
    const schema = JsonLdSchema.getHomePageSchema();

    expect(schema).toHaveProperty('@context', 'https://schema.org');
    expect(schema).toHaveProperty('@graph');
    expect(Array.isArray(schema['@graph'])).toBe(true);

    const website = schema['@graph'].find(item => item['@type'] === 'WebSite');
    expect(website).toHaveProperty('@id', 'https://www.obsidianstats.com/#website');
  });

  test('getFavoritesPageSchema returns correct schema', () => {
    const schema = JsonLdSchema.getFavoritesPageSchema();

    expect(schema).toHaveProperty('@context', 'https://schema.org');
    expect(schema).toHaveProperty('@type', 'WebPage');
    expect(schema).toHaveProperty('url', 'https://www.obsidianstats.com/favorites');
  });

  test('getMostDownloadedPageSchema processes plugins correctly', () => {
    const title = 'Most Downloaded Plugins';
    const description = 'List of most downloaded plugins';
    const canonical = 'https://www.obsidianstats.com/most-downloaded';
    const image = 'https://example.com/image.png';

    const schema = JsonLdSchema.getMostDownloadedPageSchema([plugin], title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(Array.isArray(schema.mainEntity)).toBe(true);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Plugin A');
    expect(schema.mainEntity[0]).toHaveProperty('aggregateRating.ratingValue', 45);
  });

  test('getNewPageSchema handles multiple plugins', () => {
    const title = 'New Plugins';
    const description = 'List of new plugins';
    const canonical = 'https://www.obsidianstats.com/new';
    const image = 'https://example.com/new-image.png';

    const schema = JsonLdSchema.getNewPageSchema([plugin], title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(1);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Plugin A');
  });

  test('getTagsPageSchema creates schema for tags', () => {
    const tags = ['tag1', 'tag2', 'tag3'];
    const title = 'Tags';
    const description = 'Browse by tags';
    const canonical = 'https://www.obsidianstats.com/tags';
    const image = 'https://example.com/tags-image.png';

    const schema = JsonLdSchema.getTagsPageSchema(tags, title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(tags.length);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'tag1');
  });

  test('getPostPageSchema generates schema for a post', () => {
    const post = {
      title: 'Sample Post',
      description: 'Description of the post',
      id: 'sample-post',
      publishedDate: '2023-04-01',
      modifiedDate: '2023-04-02',
      content: 'Content of the post',
    };
    const title = 'Sample Post';
    const description = 'A blog post example';
    const canonical = 'https://www.obsidianstats.com/posts/sample-post';
    const image = 'https://example.com/post-image.png';

    const schema = JsonLdSchema.getPostPageSchema(post, title, description, canonical, image);

    expect(schema).toHaveProperty('@type', 'BlogPosting');
    expect(schema).toHaveProperty('headline', 'Sample Post');
    expect(schema).toHaveProperty('datePublished', '2023-04-01');
    expect(schema).toHaveProperty('articleBody', 'Content of the post');
  });

  test('getTrendingPageSchema processes trending plugins', () => {
    const title = 'Trending Plugins';
    const description = 'List of trending plugins';
    const canonical = 'https://www.obsidianstats.com/trending';
    const image = 'https://example.com/trending-image.png';

    const schema = JsonLdSchema.getTrendingPageSchema([plugin], title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(1);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Plugin A');
  });

  test('getPluginPageSchema generates schema for a plugin', () => {
    const title = 'Plugin A';
    const description = 'A sample Obsidian plugin.';
    const canonical = 'https://www.obsidianstats.com/plugin/plugin-a';
    const image = 'https://example.com/plugin-image.png';

    const schema = JsonLdSchema.getPluginPageSchema(plugin, title, description, canonical, image);

    expect(schema).toHaveProperty('@type', 'SoftwareApplication');
    expect(schema).toHaveProperty('name', 'Plugin A');
    expect(schema).toHaveProperty('applicationCategory', 'Productivity');
    expect(schema).toHaveProperty('aggregateRating.ratingValue', 45);
  });

  test('getUpdatesPageSchema generates scheme for updates', () => {
    const title = 'Plugin Updates';
    const description = 'List of plugin updates';
    const canonical = 'https://www.obsidianstats.com/updates';
    const image = 'https://example.com/updates-image.png';

    const schema = JsonLdSchema.getUpdatesPageSchema([plugin], title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(1);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Plugin A');
  });

  test('getSharePageSchema generates schema for sharing', () => {
    const title = 'Share Plugin';
    const description = 'Share your favorite plugins';
    const canonical = 'https://www.obsidianstats.com/share';
    const image = 'https://example.com/share-image.png';

    const schema = JsonLdSchema.getSharePageSchema(title, description, canonical, image);

    expect(schema).toHaveProperty('@type', 'WebPage');
    expect(schema).toHaveProperty('url', 'https://www.obsidianstats.com/share');
  });

  test('getCategoriesPageSchema generates schema for categories', () => {
    const categories = ['Productivity', 'Writing', 'Note-taking'];
    const title = 'Categories';
    const description = 'Browse by categories';
    const canonical = 'https://www.obsidianstats.com/categories';
    const image = 'https://example.com/categories-image.png';

    const schema = JsonLdSchema.getCategoriesPageSchema(categories, title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(categories.length);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Productivity');
  });

  test('getCategoryPageSchema generates schema for a category', () => {
    const category = 'Productivity';
    const plugins = [plugin];
    const title = 'Productivity Plugins';
    const description = 'List of productivity plugins';
    const canonical = 'https://www.obsidianstats.com/category/productivity';
    const image = 'https://example.com/productivity-image.png';

    const schema = JsonLdSchema.getCategoryPageSchema(plugins, title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(plugins.length);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Plugin A');
  });

  test('getTagPageSchema generates schema for a tag', () => {
    const tag = 'productivity';
    const plugins = [plugin];
    const title = 'Productivity Plugins';
    const description = 'List of productivity plugins';
    const canonical = 'https://www.obsidianstats.com/tag/productivity';
    const image = 'https://example.com/productivity-image.png';

    const schema = JsonLdSchema.getTagPageSchema(plugins, title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(plugins.length);
    expect(schema.mainEntity[0]).toHaveProperty('name', 'Plugin A');
  });

  test('getPostsPageSchema generates schema for posts', () => {
    const posts = [
      {
        title: 'Post 1',
        description: 'Description of post 1',
        id: 'post-1',
        publishedDate: '2023-04-01',
        modifiedDate: '2023-04-02',
        content: 'Content of post 1',
      },
      {
        title: 'Post 2',
        description: 'Description of post 2',
        id: 'post-2',
        publishedDate: '2023-04-03',
        modifiedDate: '2023-04-04',
        content: 'Content of post 2',
      },
    ];
    const title = 'Blog Posts';
    const description = 'List of blog posts';
    const canonical = 'https://www.obsidianstats.com/posts';
    const image = 'https://example.com/posts-image.png';

    const schema = JsonLdSchema.getPostsPageSchema(posts, title, description, canonical, image);

    expect(schema).toHaveProperty('mainEntity');
    expect(schema.mainEntity.length).toBe(posts.length);
    expect(schema.mainEntity[0]).toHaveProperty('headline', 'Post 1');
    expect(schema.mainEntity[1]).toHaveProperty('headline', 'Post 2');
  });

  test('getPluginsPageSchema generates schema for plugins', () => {
    const plugins = [plugin];
    const title = 'Plugins';
    const description = 'List of plugins';
    const canonical = 'https://www.obsidianstats.com/plugins';
    const image = 'https://example.com/plugins-image.png';

    const schema = JsonLdSchema.getPluginsPageSchema(plugins, title, description, canonical, image);

    expect(schema['@type']).toBe('WebPage');
    expect(schema.name).toBe('Plugins');
    expect(schema.description).toBe('List of plugins');
    expect(schema.url).toBe('https://www.obsidianstats.com/plugins');
  });
});
