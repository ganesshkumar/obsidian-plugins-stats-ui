import {
  EntityType,
  Plugin as PluginRecord,
  PluginStats,
  PrismaClient,
  Review,
} from '@prisma/client';
import { PluginRatingInfo } from '@/domain/plugins/models/PluginRatingInfo';
import { Plugin } from '@/domain/plugins/models/Plugin';

export type PluginMetrics = {
  pluginId: string;
  name: string;
  createdAt: number;
  lastCommitAt: number;
  stargazers: number;
  subscribers: number;
  forks: number;
  latestRelease: string;
  latestReleaseDesc: string;
  latestReleaseAt: number;
  totalDownloads: number;
  totalIssues: number;
  closedIssues: number;
  openIssues: number;
  totalPR: number;
  openPR: number;
  closedPR: number;
  mergedPR: number;
  commitCountInLastYear: number;
  score: number;
};

/**
 * Class representing a cache for plugins.
 * Implements a stale-while-revalidate caching strategy with a 1-hour TTL.
 */
export class PluginsCache {
  /**
   * Cached plugins data.
   * @type {PluginRecord[]}
   */
  static plugins: PluginRecord[];

  /**
   * Timestamp of when the cache was last fetched.
   * @type {number | null}
   */
  static lastFetchedAt: number | null = null;

  /**
   * Flag to prevent concurrent refresh operations.
   * @type {boolean}
   */
  static isRefreshing: boolean = false;

  /**
   * Cache Time-To-Live in milliseconds (1 hour).
   * @type {number}
   */
  static CACHE_TTL_MS: number = 60 * 60 * 1000;

  /**
   * Checks if the cache has expired.
   * @returns {boolean} True if the cache is expired, false otherwise.
   */
  private static isCacheExpired(): boolean {
    if (!PluginsCache.lastFetchedAt) return true;
    return Date.now() - PluginsCache.lastFetchedAt > PluginsCache.CACHE_TTL_MS;
  }

  /**
   * Triggers a background refresh of the cache if it's expired and not already refreshing.
   * Returns immediately without waiting for the refresh to complete.
   */
  private static triggerBackgroundRefresh(): void {
    if (PluginsCache.isCacheExpired() && !PluginsCache.isRefreshing) {
      PluginsCache.isRefreshing = true;
      PluginsCache.fetch()
        .then((freshData) => {
          PluginsCache.plugins = freshData;
          PluginsCache.lastFetchedAt = Date.now();
          console.log(
            'PluginsCache: Background refresh completed successfully.'
          );
        })
        .catch((err) => {
          console.error('PluginsCache: Background refresh failed:', err);
        })
        .finally(() => {
          PluginsCache.isRefreshing = false;
        });
    }
  }

  /**
   * Retrieves the cached plugins data. If the data is not cached, it fetches the data from the database.
   * If the cache is expired, it returns stale data immediately and triggers a background refresh.
   * @returns {Promise<PluginRecord[]>} The cached plugins data.
   */
  static async get(): Promise<PluginRecord[]> {
    // No cache - must fetch and wait
    if (!PluginsCache.plugins) {
      PluginsCache.plugins = await PluginsCache.fetch();
      PluginsCache.lastFetchedAt = Date.now();
      return PluginsCache.plugins;
    }

    // Cache exists but may be expired - trigger background refresh if needed
    PluginsCache.triggerBackgroundRefresh();

    return PluginsCache.plugins;
  }

  /**
   * Retrieves the cached plugins metrics. If the data is not cached, it fetches the data from the database.
   * If the cache is expired, it returns stale data immediately and triggers a background refresh.
   * @returns {Promise<PluginMetrics[]>} The cached plugins metrics.
   */
  static async getMetrics(): Promise<PluginMetrics[]> {
    // No cache - must fetch and wait
    if (!PluginsCache.plugins) {
      PluginsCache.plugins = await PluginsCache.fetch();
      PluginsCache.lastFetchedAt = Date.now();
    } else {
      // Cache exists but may be expired - trigger background refresh if needed
      PluginsCache.triggerBackgroundRefresh();
    }
    const plugins = PluginsCache.plugins.map((plugin) => {
      return {
        pluginId: plugin.pluginId,
        name: plugin.name,
        createdAt: plugin.createdAt,
        lastCommitAt: plugin.lastCommitAt,
        stargazers: plugin.stargazers,
        subscribers: plugin.subscribers,
        forks: plugin.forks,
        latestRelease: plugin.latestRelease,
        latestReleaseDesc: plugin.latestReleaseDesc,
        latestReleaseAt: plugin.latestReleaseAt,
        totalDownloads: plugin.totalDownloads,
        totalIssues: plugin.totalIssues,
        closedIssues: plugin.closedIssues,
        openIssues: plugin.openIssues,
        totalPR: plugin.totalPR,
        openPR: plugin.openPR,
        closedPR: plugin.closedPR,
        mergedPR: plugin.mergedPR,
        commitCountInLastYear: plugin.commitCountInLastYear,
        score: plugin.score,
      } as PluginMetrics;
    });
    return plugins;
  }

  /**
   * Fetches the plugins data from the database.
   * @returns {Promise<PluginRecord[]>} The plugins data from the database.
   * @private
   */
  private static async fetch(): Promise<Plugin[]> {
    const prisma: PrismaClient = new PrismaClient();
    let pluginRecords: Plugin[];

    if (process.env.NODE_ENV == 'development') {
      pluginRecords = await prisma.plugin.findMany({
        // orderBy: { createdAt: 'desc' },
        // take: 50,
      });
    } else if (process.env.NODE_ENV === 'test') {
      pluginRecords = await prisma.plugin.findMany({
        where: {
          OR: [
            { osTags: { contains: 'recipe' } },
            { osTags: { contains: 'publish' } },
          ],
        },
      });
    } else {
      pluginRecords = await prisma.plugin.findMany({});
    }

    pluginRecords.forEach((plugin) => {
      plugin.osDescription = plugin.osDescription
        ? sanitizeInvisibleCharacters(
            sanitizeQuoteVariations(
              sanitizeDashVariations(plugin.osDescription)
            )
          )
        : '';
      plugin.osTags = plugin.osTags
        ? sanitizeInvisibleCharacters(
            sanitizeQuoteVariations(sanitizeDashVariations(plugin.osTags))
          )
        : '';
      plugin.osCategory = plugin.osCategory
        ? sanitizeInvisibleCharacters(
            sanitizeQuoteVariations(sanitizeDashVariations(plugin.osCategory))
          )
        : '';
    });

    const pluginStatsRecords: PluginStats[] = await prisma.pluginStats.findMany(
      {}
    );

    if (!pluginRecords || !pluginRecords.length) {
      console.error('No plugins found in the database.');
      return pluginRecords;
    }

    const ratingInfoMap: Record<string, PluginRatingInfo> = {};

    pluginStatsRecords?.forEach((pluginStats) => {
      if (pluginStats.entityType === EntityType.PLUGIN) {
        ratingInfoMap[pluginStats.entityId] = {
          avgRating: pluginStats.averageRating,
          ratingCount:
            pluginStats.ratingCount5 +
            pluginStats.ratingCount4 +
            pluginStats.ratingCount3 +
            pluginStats.ratingCount2 +
            pluginStats.ratingCount1,
          star5Count: pluginStats.ratingCount5,
          star4Count: pluginStats.ratingCount4,
          star3Count: pluginStats.ratingCount3,
          star2Count: pluginStats.ratingCount2,
          star1Count: pluginStats.ratingCount1,
        };
      }
    });

    // Reviews
    const reviews: Review[] = await prisma.review.findMany({
      where: {
        entityType: EntityType.PLUGIN,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const reviewsByPlugin: Record<string, Review[]> = {};
    reviews.forEach((review) => {
      if (!reviewsByPlugin[review.entityId]) {
        reviewsByPlugin[review.entityId] = [];
      }
      reviewsByPlugin[review.entityId].push(review);
    });

    // Final assembly of plugins with ratings and reviews
    const plugins = pluginRecords.map((plugin) => {
      return serializeDates({
        ...plugin,
        ratingInfo: ratingInfoMap[plugin.pluginId] || null,
        reviews: reviewsByPlugin[plugin.pluginId] || [],
      } as Plugin);
    });

    return plugins;
  }
}

// Define the invisible characters array once to avoid repetition
const invisibleCharacters = [
  /\u0000/g, // NULL
  /\u0001/g, // START OF HEADING
  /\u0003/g, // END OF TEXT
  /\u0008/g, // BACKSPACE
  ///\u000D/g, // CARRIAGE RETURN
  ///\u000A/g, // LINE FEED
  /\u001B/g, // ESCAPE
  /\u200B/g, // ZERO WIDTH SPACE
  /\u200C/g, // ZERO WIDTH NON-JOINER
  /\u200D/g, // ZERO WIDTH JOINER
  /\uFEFF/g, // ZERO WIDTH NO-BREAK SPACE
  /\u00A0/g, // NO-BREAK SPACE
  /\u202F/g, // NARROW NO-BREAK SPACE
  /\u205F/g, // MEDIUM MATHEMATICAL SPACE
];

const sanitizeInvisibleCharacters = (input: string): string => {
  return invisibleCharacters.reduce((sanitized, regex) => {
    return sanitized.replace(regex, '');
  }, input);
};

const sanitizeQuoteVariations = (text: string): string => {
  const quoteVariations = /[“”‘’′″`]/g;
  return text.replace(quoteVariations, (match) => {
    if (['“', '”', '″'].includes(match)) return '"';
    if (['‘', '’', '′'].includes(match)) return "'";
    return match;
  });
};

const dashRegex = /[—–‒―⁓]/g;

export const sanitizeDashVariations = (input: string): string => {
  return input.replace(dashRegex, '-');
};

function serializeDates<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_key, value) =>
      value instanceof Date ? value.toISOString() : value
    )
  );
}
