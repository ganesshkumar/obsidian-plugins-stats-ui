import { Plugin, PullRequestEntry, Theme } from '@prisma/client';
import { Post } from './abstractions';
import Constants from '../constants';

const author = {
  '@type': 'Person',
  '@id': 'https://www.obsidianstats.com/#author',
  name: 'Ganessh Kumar',
  image: {
    '@type': 'ImageObject',
    '@id': 'https://gravatar.com/ganesshkumar',
    url: 'https://gravatar.com/ganesshkumar',
    caption: 'ganesshkumar',
    inLanguage: 'en-US',
  },
  sameAs: ['https://www.ganesshkumar.com'],
  worksFor: {
    '@id': 'https://www.obsidianstats.com/#organization',
  },
};

const organization = {
  '@type': 'Organization',
  '@id': 'https://www.codebuss.com/#organization',
  name: 'Codebuss',
  url: 'https://www.codebuss.com',
  sameAs: [
    'https://www.facebook.com/61565685916740',
    'https://www.instagram.com/codebuss/',
  ],
  email: 'contact.codebuss@gmail.com',
  logo: {
    '@type': 'ImageObject',
    '@id': 'https://www.codebuss.com/#logo',
    url: 'https://www.codebuss.com/images/codebuss.png',
    contentUrl: 'https://www.codebuss.com/images/codebuss.png',
    caption: 'Codebuss',
    inLanguage: 'en-US',
    width: '500',
    height: '120',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'contact.codebuss@gmail.com',
      contactType: 'customer support',
    },
  ],
};

const breadcrumbs = {
  plugins: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
    ],
  },
  pluginsNew: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'New',
        item: 'https://www.obsidianstats.com/new',
      },
    ],
  },
  pluginsUpdates: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Updates',
        item: 'https://www.obsidianstats.com/updates',
      },
    ],
  },
  pluginsMostDownloaded: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Most Downloaded',
        item: 'https://www.obsidianstats.com/most-downloaded',
      },
    ],
  },
  pluginsTrending: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Trending',
        item: 'https://www.obsidianstats.com/trending',
      },
    ],
  },
  pluginsShare: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Share',
        item: 'https://www.obsidianstats.com/share',
      },
    ],
  },
  pluginsFavorites: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Favorites',
        item: 'https://www.obsidianstats.com/favorites',
      },
    ],
  },
  pluginsCategories: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Categories',
        item: 'https://www.obsidianstats.com/categories',
      },
    ],
  },
  pluginsCategory: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.obsidianstats.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plugins',
          item: 'https://www.obsidianstats.com/plugins',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Categories',
          item: 'https://www.obsidianstats.com/categories',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name,
          item: url,
        },
      ],
    };
  },
  pluginsTags: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Tags',
        item: 'https://www.obsidianstats.com/tags',
      },
    ],
  },
  pluginsTag: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.obsidianstats.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plugins',
          item: 'https://www.obsidianstats.com/plugins',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tags',
          item: 'https://www.obsidianstats.com/tags',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name,
          item: url,
        },
      ],
    };
  },
  plugin: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.obsidianstats.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plugins',
          item: 'https://www.obsidianstats.com/plugins',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: url,
        },
      ],
    };
  },
  posts: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Posts',
        item: 'https://www.obsidianstats.com/posts',
      },
    ],
  },
  post: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.obsidianstats.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Posts',
          item: 'https://www.obsidianstats.com/posts',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: url,
        },
      ],
    };
  },
  tool: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.obsidianstats.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tools',
          item: 'https://www.obsidianstats.com/tools',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: url,
        },
      ],
    };
  },
  beta: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Beta',
        item: 'https://www.obsidianstats.com/beta',
      },
    ],
  },
  betaPlugins: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Beta',
        item: 'https://www.obsidianstats.com/beta',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/beta/plugins',
      },
    ],
  },
  betaThemes: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Beta',
        item: 'https://www.obsidianstats.com/beta',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Themes',
        item: 'https://www.obsidianstats.com/beta/themes',
      },
    ],
  },
  themes: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.obsidianstats.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://www.obsidianstats.com/themes',
      },
    ],
  },
  theme: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.obsidianstats.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Themes',
          item: 'https://www.obsidianstats.com/themes',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: url,
        },
      ],
    };
  },
};

export const JsonLdSchema = {
  getHomePageSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://www.obsidianstats.com/#website',
          url: 'https://www.obsidianstats.com/',
          name: Constants.AppName,
          publisher: {
            '@id': 'https://www.codebuss.com/#organization',
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.obsidianstats.com/plugins?q={query}',
            'query-input': 'required name=query',
            query: 'required',
          },
          inLanguage: 'en-US',
        },
        organization,
        {
          '@type': 'Person',
          '@id': 'https://www.ganesshkumar.com/#ganesshkumar',
          name: 'Ganessh Kumar',
          url: 'https://www.ganesshkumar.com/about',
          image: 'https://www.ganesshkumar.com/ganesshkumar.png',
          sameAs: [
            'https://www.ganesshkumar.com',
            'https://github.com/ganesshkumar',
            'https://www.linkedin.com/in/ganessh-kumar-r-p-676a4719/',
          ],
        },
      ],
    };
  },
  getFavoritesPageSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://www.obsidianstats.com/favorites',
          url: 'https://www.obsidianstats.com/favorites',
          name: 'Mark your favorite Obsidian plugins and stay updated on their latest releases',
          description:
            'Discover and track your favorite Obsidian plugins with our comprehensive stats and updates. Stay informed about the latest releases, trending plugins, and more. Perfect for Obsidian enthusiasts looking to enhance their productivity and plugin management.',
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
          author,
        },
        breadcrumbs.pluginsFavorites,
      ],
    };
  },
  getMostDownloadedPageSchema: (
    plugins: Plugin[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForPageWithPlugins(
      plugins,
      [],
      title,
      description,
      canonical,
      image,
      breadcrumbs.pluginsMostDownloaded
    );
  },
  getNewPageSchema: (
    plugins: Plugin[],
    themes: Theme[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForPageWithPlugins(
      plugins,
      themes,
      title,
      description,
      canonical,
      image,
      breadcrumbs.pluginsNew
    );
  },
  getTrendingPageSchema: (
    plugins: Plugin[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForPageWithPlugins(
      plugins,
      [],
      title,
      description,
      canonical,
      image,
      breadcrumbs.pluginsTrending
    );
  },
  getUpdatesPageSchema: (
    plugins: Plugin[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForPageWithPlugins(
      plugins,
      [],
      title,
      description,
      canonical,
      image,
      breadcrumbs.pluginsUpdates
    );
  },
  getSharePageSchema: (
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
        },
        breadcrumbs.pluginsShare,
      ],
    };
  },
  getCategoriesPageSchema(
    categories: string[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
          author,
          // mainEntity: categories.map(category => ({
          //   '@type': 'Thing',
          //   name: category,
          // })),
        },
        breadcrumbs.pluginsCategories,
      ],
    };
  },
  getCategoryPageSchema: (
    plugins: Plugin[],
    title: string,
    description: string,
    canonical: string,
    image: string,
    category: string
  ) => {
    return getJsonLdSchemaForPageWithPlugins(
      plugins,
      [],
      title,
      description,
      canonical,
      image,
      breadcrumbs.pluginsCategory(category, canonical)
    );
  },
  getTagsPageSchema: (
    tags: string[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
          author,
          // mainEntity: tags.map(tag => ({
          //   '@type': 'Thing',
          //   name: tag,
          // })),
        },
        breadcrumbs.pluginsTags,
      ],
    };
  },
  getTagPageSchema: (
    plugins: Plugin[],
    title: string,
    description: string,
    canonical: string,
    image: string,
    tag: string
  ) => {
    return getJsonLdSchemaForPageWithPlugins(
      plugins,
      [],
      title,
      description,
      canonical,
      image,
      breadcrumbs.pluginsTag(title, canonical)
    );
  },
  getPostsPageSchema: (
    posts: Post[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
          author,
          // mainEntity: posts.map(post => ({
          //   '@type': 'BlogPosting',
          //   headline: post.title,
          //   description: post.description,
          //   url: `https://www.obsidianstats.com/posts/${post.id}`,
          //   datePublished: post.publishedDate,
          //   author: {
          //     '@type': 'Person',
          //     '@id': 'https://www.obsidianstats.com/#author',
          //     name: 'Ganessh Kumar',
          //     image: {
          //       '@type': 'ImageObject',
          //       '@id': 'https://gravatar.com/ganesshkumar',
          //       url: 'https://gravatar.com/ganesshkumar',
          //       caption: 'ganesshkumar',
          //       inLanguage: 'en-US',
          //     },
          //     sameAs: ['https://www.ganesshkumar.com'],
          //     worksFor: {
          //       '@id': 'https://www.obsidianstats.com/#organization',
          //     },
          //   },
          //   image: {
          //     '@type': 'ImageObject',
          //     url: image,
          //     width: '512',
          //     height: '512',
          //   },
          // }))
        },
        breadcrumbs.posts,
      ],
    };
  },
  getPostPageSchema: (
    post: Post,
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
            type: 'WebSite',
            name: Constants.AppName,
            url: 'https://www.obsidianstats.com',
          },
          author,
          headline: post.title,
          datePublished: post.publishedDate,
          dateModified: post.modifiedDate,
          articleBody: post.content,
          image: {
            '@type': 'ImageObject',
            url: image,
            width: '512',
            height: '512',
          },
        },
        breadcrumbs.post(post.title, canonical),
      ],
    };
  },
  getPluginsPageSchema: (
    plugins: Plugin[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
          author,
        },
        breadcrumbs.plugins,
      ],
    };
  },
  getPluginPageSchema: (
    plugin: Plugin,
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          operatingSystem: 'All',
          applicationCategory: plugin.osCategory,
          aggregateRating: {
            '@type': 'AggregateRating',
            '@id': canonical + '#aggregateRating',
            worstRating: 0,
            bestRating: 100,
            ratingValue: Math.round(plugin.score * 100),
            ratingCount: plugin.stargazers + plugin.forks + 1,
          },
          offers: {
            '@type': 'Offer',
            '@id': canonical + '#offers',
            price: '0',
            priceCurrency: 'USD',
          },
          downloadUrl: `obsidian://show-plugin?id=${plugin.pluginId}`,
          softwareVersion: plugin.latestRelease,
          datePublished: plugin.latestReleaseAt,
          author: {
            '@type': 'Person',
            '@id': canonical + '#author',
            name: plugin.author,
          },
        },
        breadcrumbs.plugin(plugin.name, canonical),
      ],
    };
  },
  getThemesPageSchema: (
    themes: Theme[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://www.obsidianstats.com/#website',
          },
          author,
        },
        breadcrumbs.themes,
      ],
    };
  },
  getThemePageSchema: (
    theme: Theme,
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          operatingSystem: 'All',
          applicationCategory: 'Theme',
          offers: {
            '@type': 'Offer',
            '@id': canonical + '#offers',
            price: '0',
            priceCurrency: 'USD',
          },
          downloadUrl: `https://www.obsidianstats.com/themes/${theme.repo.split('/')[1]}`,
          datePublished: theme.createdAt,
          author: {
            '@type': 'Person',
            '@id': canonical + '#author',
            name: theme.repo.split('/')[0],
          },
        },
        breadcrumbs.theme(theme.name, canonical),
      ],
    };
  },
  getTimelinePageSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Daily Plugin Changes Dataset',
      description:
        'A JSON dataset tracking daily plugin changes, including additions, removals, and updates by date.',
      url: 'https://www.obsidianstats.com/data/plugins-history.json',
      sameAs:
        'https://github.com/ganesshkumar/obsidian-stats-dataset/plugins-history.json',
      creator: organization,
      keywords: 'plugins, dataset, changes, version control, daily updates',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      dateModified: '2025-01-14',
      distribution: [
        {
          '@type': 'DataDownload',
          encodingFormat: 'application/json',
          contentUrl: 'https://www.obsidianstats.com/data/plugins-history.json',
        },
      ],
    };
  },
  getToolPageSchema: (
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': canonical,
          url: canonical,
          name: title,
          description: description,
          inLanguage: 'en-US',
          operatingSystem: 'All',
          applicationCategory: 'UtilitiesApplication',
          aggregateRating: {
            '@type': 'AggregateRating',
            '@id': canonical + '#aggregateRating',
            worstRating: 0,
            bestRating: 5,
            ratingValue: 5,
            ratingCount: 5,
          },
          offers: {
            '@type': 'Offer',
            '@id': canonical + '#offers',
            price: '0',
            priceCurrency: 'USD',
          },
          downloadUrl: `https://chatgpt.com/g/g-67f63dc319588191a4bb13d0def278b0-obsidian-dataview-query-wizard`,
          softwareVersion: '1.0.0',
          datePublished: '2025-04-10',
          author: {
            '@type': 'Person',
            '@id': canonical + '#author',
            name: 'Ganessh Kumar',
          },
        },
        breadcrumbs.plugin(title, canonical),
      ],
    };
  },
  getBetaIndexPageSchema: (
    entries: PullRequestEntry[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForBetaEntries(
      entries,
      title,
      description,
      canonical,
      image,
      breadcrumbs.beta
    );
  },
  getBetaPluginsPageSchema: (
    entries: PullRequestEntry[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForBetaEntries(
      entries,
      title,
      description,
      canonical,
      image,
      breadcrumbs.betaPlugins
    );
  },
  getBetaThemesPageSchema: (
    entries: PullRequestEntry[],
    title: string,
    description: string,
    canonical: string,
    image: string
  ) => {
    return getJsonLdSchemaForBetaEntries(
      entries,
      title,
      description,
      canonical,
      image,
      breadcrumbs.betaThemes
    );
  },
};

const getJsonLdSchemaForPageWithPlugins = (
  plugins: Plugin[],
  themes: Theme[],
  title: string,
  description: string,
  canonical: string,
  image: string,
  breadcrumbSchema?: any
) => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: title,
        description: description,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': 'https://www.obsidianstats.com/#website',
        },
        author: {
          '@type': 'Person',
          '@id': 'https://www.obsidianstats.com/#author',
          name: 'Ganessh Kumar',
          image: {
            '@type': 'ImageObject',
            '@id': 'https://gravatar.com/ganesshkumar',
            url: 'https://gravatar.com/ganesshkumar',
            caption: 'ganesshkumar',
            inLanguage: 'en-US',
          },
          sameAs: ['https://www.ganesshkumar.com'],
          worksFor: {
            '@id': 'https://www.obsidianstats.com/#organization',
          },
        },
      },
      ...plugins.map((plugin) => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.osCategory,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          '@id': canonical + '#aggregateRating',
          worstRating: 0,
          bestRating: 100,
          ratingValue: Math.round(plugin.score * 100),
          ratingCount: plugin.stargazers + plugin.forks + 1,
        },
        offers: {
          '@type': 'Offer',
          '@id': canonical + '#offers',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl: `https://www.obsidianstats.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          '@id': canonical + '#author',
          name: plugin.author,
        },
      })),
      ...themes.map((theme) => ({
        '@type': 'SoftwareApplication',
        name: theme.name,
        applicationCategory: 'Theme',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          '@id': canonical + '#offers',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl: `https://www.obsidianstats.com/themes/${theme.repo.split('/')[1]}`,
        datePublished: theme.createdAt,
        author: {
          '@type': 'Person',
          '@id': canonical + '#author',
          name: theme.repo.split('/')[0],
        },
      })),
      breadcrumbSchema ? breadcrumbSchema : null,
    ],
  };
};

const getJsonLdSchemaForBetaEntries = (
  entries: PullRequestEntry[],
  title: string,
  description: string,
  canonical: string,
  image: string,
  breadcrumbSchema?: any
) => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonical,
        url: canonical,
        name: title,
        description: description,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': 'https://www.obsidianstats.com/#website',
        },
        author: {
          '@type': 'Person',
          '@id': 'https://www.obsidianstats.com/#author',
          name: 'Ganessh Kumar',
        },
      },
      ...entries.map((entry) => ({
        '@type': 'SoftwareApplication',
        name: entry.name,
        description: entry.description,
        applicationCategory:
          entry.type === 'theme' ? 'Theme' : 'UtilitiesApplication',
        operatingSystem: 'All',
        beta: true,
        dateCreated: entry.createdAt,
        author: entry.author
          ? {
              '@type': 'Person',
              name: entry.author,
            }
          : undefined,
      })),
      breadcrumbSchema ? breadcrumbSchema : null,
    ],
  };
};
