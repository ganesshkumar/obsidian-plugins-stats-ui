import { EntityType, Theme as ThemeRecord, PluginStats, PrismaClient } from '@prisma/client';
import { ThemeRatingInfo } from '@/domain/themes/models/ThemeRatingInfo';
import { Theme } from '@/domain/themes/models/Theme';

/**
 * Class representing a cache for themes.
 * Implements a stale-while-revalidate caching strategy with a 1-hour TTL.
 */
export class ThemesCache {
  /**
   * Cached themes data.
   * @type {Theme[]}
   */
  static themes: Theme[] = [];

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
    if (!ThemesCache.lastFetchedAt) return true;
    return (Date.now() - ThemesCache.lastFetchedAt) > ThemesCache.CACHE_TTL_MS;
  }

  /**
   * Triggers a background refresh of the cache if it's expired and not already refreshing.
   * Returns immediately without waiting for the refresh to complete.
   */
  private static triggerBackgroundRefresh(): void {
    if (ThemesCache.isCacheExpired() && !ThemesCache.isRefreshing) {
      ThemesCache.isRefreshing = true;
      ThemesCache.fetch()
        .then((freshData) => {
          ThemesCache.themes = freshData;
          ThemesCache.lastFetchedAt = Date.now();
          console.log('ThemesCache: Background refresh completed successfully.');
        })
        .catch((err) => {
          console.error('ThemesCache: Background refresh failed:', err);
        })
        .finally(() => {
          ThemesCache.isRefreshing = false;
        });
    }
  }

  /**
   * Retrieves the cached themes data. If the data is not cached, it fetches the data from the database.
   * If the cache is expired, it returns stale data immediately and triggers a background refresh.
   * @returns {Promise<Theme[]>} The cached themes data.
   */
  static async get(): Promise<Theme[]> {
    // No cache - must fetch and wait
    if (!ThemesCache.themes || ThemesCache.themes.length === 0) {
      ThemesCache.themes = await ThemesCache.fetch();
      ThemesCache.lastFetchedAt = Date.now();
      return ThemesCache.themes;
    }

    // Cache exists but may be expired - trigger background refresh if needed
    ThemesCache.triggerBackgroundRefresh();

    return ThemesCache.themes;
  }

  /**
   * Fetches the themes data from the database.
   * @returns {Promise<Theme[]>} The themes data from the database.
   * @private
   */
  private static async fetch(): Promise<Theme[]> {
    const prisma: PrismaClient = new PrismaClient();
    const themeRecords = await prisma.theme.findMany({});

    if (!themeRecords || !themeRecords.length) {
      console.error('No themes found in the database.');
      return themeRecords;
    }

    const themeStatsRecords: PluginStats[] = await prisma.pluginStats.findMany({});

    const ratingInfoMap: Record<string, ThemeRatingInfo> = {};

    themeStatsRecords?.forEach((themeStats) => {
      if (themeStats.entityType === EntityType.THEME) {
        ratingInfoMap[themeStats.entityId] = {
          avgRating: themeStats.averageRating,
          ratingCount: themeStats.ratingCount5 + themeStats.ratingCount4 + themeStats.ratingCount3 + themeStats.ratingCount2 + themeStats.ratingCount1,
          star5Count: themeStats.ratingCount5,
          star4Count: themeStats.ratingCount4,
          star3Count: themeStats.ratingCount3,
          star2Count: themeStats.ratingCount2,
          star1Count: themeStats.ratingCount1,
        };
      }
    });

    const themes = themeRecords.map((theme) => {
      // Use the repo name's second part (after /) as the theme identifier
      const themeId = theme.repo.split('/')[1];
      return {
        ...theme,
        ratingInfo: ratingInfoMap[themeId] || null,
      } as Theme;
    });

    return themes;
  }
}