import { Plugin } from "@prisma/client"
import { get } from "http"
import { Post } from "./abstractions"

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
          inLanguage: 'en-US',
        },
        {
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
        },
        {
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
      ],
    }
  },
  getFavoritesPageSchema: () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/favorites',
      url: 'https://obsidian-plugin-stats.ganesshkumar.com/favorites',
      name: 'Mark your favorite Obsidian plugins and stay updated on their latest releases',
      description: 'Discover and track your favorite Obsidian plugins with our comprehensive stats and updates. Stay informed about the latest releases, trending plugins, and more. Perfect for Obsidian enthusiasts looking to enhance their productivity and plugin management.',
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png',
        width: '512',
        height: '512',
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
      publisher: {
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
      }
    }
  },
  getMostDownloadedPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plugin.score,
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
    }
  },
  getNewPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plugin.score,
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
    }
  },
  getTrendingPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plugin.score,
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
    }
  },
  getUpdatesPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plugin.score,
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
    }
  },
  getSharePageSchema: (title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
    }
  },
  getCategoriesPageSchema(categories: string[], title: string, description: string, canonical: string, image: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: categories.map(category => ({
        '@type': 'Thing',
        name: category,
      })),
    }
  },
  getCategoryPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plugin.score,
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
    }
  },
  getTagsPageSchema: (tags: string[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: tags.map(category => ({
        '@type': 'Thing',
        name: category,
      })),
    }
  },
  getTagPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: plugins.map(plugin => ({
        '@type': 'SoftwareApplication',
        name: plugin.name,
        applicationCategory: plugin.aiCategories,
        operatingSystem: 'All',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plugin.score,
        },
        downloadUrl: `https://obsidian-plugin-stats.ganesshkumar.com/plugins/${plugin.pluginId}`,
        softwareVersion: plugin.latestRelease,
        datePublished: plugin.latestReleaseAt,
        author: {
          '@type': 'Person',
          name: plugin.author,
        },
      })),
    }
  },
  getPostsPageSchema: (posts: Post[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
      mainEntity: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `https://obsidian-plugin-stats.ganesshkumar.com/posts/${post.id}`,
        datePublished: post.publishedDate,
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
        image: {
          '@type': 'ImageObject',
          url: image,
          width: '512',
          height: '512',
        },
      }))
    }
  },
  getPostPageSchema: (post: Post, title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
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
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
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
    }
  },
  getPluginsPageSchema: (plugins: Plugin[], title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': canonical,
      url: canonical,
      name: title,
      description: description,
      inLanguage: 'en-US',
      isPartOf: {
        '@id': 'https://obsidian-plugin-stats.ganesshkumar.com/#website',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
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
      publisher: {
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
      },
    }
  },
  getPluginPageSchema: (plugin: Plugin, title: string, description: string, canonical: string, image: string) => {
    return {
      '@context': 'https://schema.org',
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
        ratingValue: plugin.score,
      },
      downloadUrl: `obsidian://show-plugin?id=${plugin.pluginId}`,
      softwareVersion: plugin.latestRelease,
      datePublished: plugin.latestReleaseAt,
      author: {
      '@type': 'Person',
      name: plugin.author,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: '512',
        height: '512',
      },
      publisher: {
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
      },
    }
  },
}
