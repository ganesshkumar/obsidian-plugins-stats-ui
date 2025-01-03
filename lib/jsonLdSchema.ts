import { Plugin } from "@prisma/client"
import { Post } from "./abstractions"

const author = {
  '@type': 'Person',
  '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#author',
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
    '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#organization',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'New',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/new',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Updates',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/updates',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Most Downloaded',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/most-downloaded',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Trending',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/trending',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Share',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/share',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Favorites',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/favorites',
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
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Categories',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/categories',
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
          item: 'https://obsidian-plugin-stats.ganesshkumar.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plugins',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Categories',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com/categories',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name,
          item: url,
        },
      ],
    }
  },
  pluginsTags: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Plugins',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Tags',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/tags',
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
          item: 'https://obsidian-plugin-stats.ganesshkumar.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plugins',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Tags',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com/tags',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name,
          item: url,
        },
      ],
    }
  },
  plugin: (name: string, url: string) => {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Plugins',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com/plugins',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: url,
        },
      ],
    }
  },
  posts: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Posts',
        item: 'https://obsidian-plugin-stats.ganesshkumar.com/posts',
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
          item: 'https://obsidian-plugin-stats.ganesshkumar.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Posts',
          item: 'https://obsidian-plugin-stats.ganesshkumar.com/posts',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name,
          item: url,
        },
      ],
    }
  }
}

export const JsonLdSchema = {
  getHomePageSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          url: 'https://obsidian-plugin-stats.ganesshkumar.com/',
          name: 'Obsidian Plugin Stats',
          publisher: {
            '@id': 'https://www.codebuss.com/#organization',
          },
          potentialAction: {
              "@type": "SearchAction",
              "target": "https://obsidian-plugin-stats.ganesshkumar.com/plugins?q={query}",
              "query-input": "required name=query",
              "query": "required"
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
          ]
        },
      ],
    }
  },
  getFavoritesPageSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/favorites',
          url: 'https://obsidian-plugin-stats.ganesshkumar.com/favorites',
          name: 'Mark your favorite Obsidian plugins and stay updated on their latest releases',
          description: 'Discover and track your favorite Obsidian plugins with our comprehensive stats and updates. Stay informed about the latest releases, trending plugins, and more. Perfect for Obsidian enthusiasts looking to enhance their productivity and plugin management.',
          inLanguage: 'en-US',
          isPartOf: {
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          },
          author,
        },
        breadcrumbs.pluginsFavorites,
      ]
    }
  },
  getMostDownloadedPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return getJsonLdSchemaForPageWithPlugins(plugins, title, description, canonical, image, breadcrumbs.pluginsMostDownloaded);
  },
  getNewPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return getJsonLdSchemaForPageWithPlugins(plugins, title, description, canonical, image, breadcrumbs.pluginsNew);
  },
  getTrendingPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return getJsonLdSchemaForPageWithPlugins(plugins, title, description, canonical, image, breadcrumbs.pluginsTrending);
  },
  getUpdatesPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return getJsonLdSchemaForPageWithPlugins(plugins, title, description, canonical, image, breadcrumbs.pluginsUpdates);
  },
  getSharePageSchema: (title: string, description: string, canonical: string, image: string) => {
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          },
        },
        breadcrumbs.pluginsShare,
      ]
    }
  },
  getCategoriesPageSchema(categories: string[], title: string, description: string, canonical: string, image: string) {
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          },
          author,
          // mainEntity: categories.map(category => ({
          //   '@type': 'Thing',
          //   name: category,
          // })),
        },
        breadcrumbs.pluginsCategories,
      ]
    }
  },
  getCategoryPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string, category: string) => {
    return getJsonLdSchemaForPageWithPlugins(plugins, title, description, canonical, image, breadcrumbs.pluginsCategory(category, canonical));
  },
  getTagsPageSchema: (tags: string[], title: string, description: string, canonical: string, image: string) => {
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          },
          author,
          // mainEntity: tags.map(tag => ({
          //   '@type': 'Thing',
          //   name: tag,
          // })),
        },
        breadcrumbs.pluginsTags,
      ]
      
    }
  },
  getTagPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string, tag: string) => {
    return getJsonLdSchemaForPageWithPlugins(plugins, title, description, canonical, image, breadcrumbs.pluginsTag(title, canonical));
  },
  getPostsPageSchema: (posts: Post[], title: string, description: string, canonical: string, image: string) => {
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          },
          author,
          // mainEntity: posts.map(post => ({
          //   '@type': 'BlogPosting',
          //   headline: post.title,
          //   description: post.description,
          //   url: `https://obsidian-plugin-stats.ganesshkumar.com/posts/${post.id}`,
          //   datePublished: post.publishedDate,
          //   author: {
          //     '@type': 'Person',
          //     '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#author',
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
          //       '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#organization',
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
      ]
    }
  },
  getPostPageSchema: (post: Post, title: string, description: string, canonical: string, image: string) => {
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
            type: 'WebSite',
            name: 'Obsidian Plugin Stats',
            url: 'https://obsidian-plugin-stats.ganesshkumar.com',
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
      ]
    }
  },
  getPluginsPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
          },
          author,
        },
        breadcrumbs.plugins,
      ]
    }
  },
  getPluginPageSchema: (plugin: Plugin, title: string, description: string, canonical: string, image: string) => {
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
          applicationCategory: plugin.aiCategories,
          aggregateRating: {
            '@type': 'AggregateRating',
            worstRating: 0,
            bestRating: 100,
            ratingValue: Math.round(plugin.score * 100),
            ratingCount: plugin.stargazers + plugin.forks + 1,   
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          downloadUrl: `obsidian://show-plugin?id=${plugin.pluginId}`,
          softwareVersion: plugin.latestRelease,
          datePublished: plugin.latestReleaseAt,
          author: {
            '@type': 'Person',
            name: plugin.author,
          },
        },
        breadcrumbs.plugin(plugin.name, canonical),
      ]
    }
  },
}

const getJsonLdSchemaForPageWithPlugins = (plugins: Plugin[], title: string, description: string, canonical: string, image: string, breadcrumbSchema?: any) => {
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
          '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
        },
        author: {
          '@type': 'Person',
          '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#author',
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
            '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#organization',
          },
        },
      },
      ...plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          worstRating: 0,
          bestRating: 100,
          ratingValue: Math.round(plugin.score * 100),
          ratingCount: plugin.stargazers + plugin.forks + 1,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
      breadcrumbSchema ? breadcrumbSchema : null,
    ],
  }
};
