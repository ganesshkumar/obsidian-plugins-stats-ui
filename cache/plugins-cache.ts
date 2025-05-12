import { Plugin as PluginRecord, PrismaClient } from '@prisma/client';
import { supabaseServer } from '@/lib/supabase-server';
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
}

/**
 * Class representing a cache for plugins.
 */
export class PluginsCache {
  /**
   * Cached plugins data.
   * @type {PluginRecord[]}
   */
  static plugins: PluginRecord[];

  /**
   * Retrieves the cached plugins data. If the data is not cached, it fetches the data from the database.
   * @returns {Promise<PluginRecord[]>} The cached plugins data.
   */
  static async get(): Promise<PluginRecord[]> {
    if (!PluginsCache.plugins) {
      PluginsCache.plugins = await PluginsCache.fetch();
    }

    return PluginsCache.plugins;
  }

    /**
   * Retrieves the cached plugins data. If the data is not cached, it fetches the data from the database.
   * @returns {Promise<PluginRecord[]>} The cached plugins data.
   */
    static async getMetrics(): Promise<PluginMetrics[]> {
      if (!PluginsCache.plugins) {
        PluginsCache.plugins = await PluginsCache.fetch();
      }
      const plugins = PluginsCache.plugins.map(plugin => {
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
    let prisma: PrismaClient = new PrismaClient();
    let pluginRecords: Plugin[];
    
    if (process.env.NODE_ENV === "development") {
      pluginRecords = await prisma.plugin.findMany({
        where: {
          OR: [
            {osTags: { contains: 'recipe' }},
            {osTags: { contains: 'publish' }},
          ]
        }
      });
    } else {
      pluginRecords = await prisma.plugin.findMany({});
    }
    
    pluginRecords.forEach((plugin) => {
      plugin.osDescription = plugin.osDescription ? sanitizeInvisibleCharacters(sanitizeQuoteVariations(sanitizeDashVariations(plugin.osDescription))) : '';
      plugin.osTags = plugin.osTags ? sanitizeInvisibleCharacters(sanitizeQuoteVariations(sanitizeDashVariations(plugin.osTags))) : '';
      plugin.osCategory = plugin.osCategory ? sanitizeInvisibleCharacters(sanitizeQuoteVariations(sanitizeDashVariations(plugin.osCategory))) : '';
    });

    const { data, error } = await supabaseServer
      .from('plugin_rating_summary')
      .select('plugin_id, avg_rating, rating_count, star_5_count, star_4_count, star_3_count, star_2_count, star_1_count');

    if (error) {
      console.error('Error fetching plugin ratings:', error);
      return pluginRecords;
    }
    
    const ratingInfoMap: Record<string, PluginRatingInfo> = {};

    data?.forEach((rating) => {
      ratingInfoMap[rating.plugin_id] = {
        avgRating: rating.avg_rating,
        ratingCount: rating.rating_count,
        star5Count: rating.star_5_count,
        star4Count: rating.star_4_count,
        star3Count: rating.star_3_count,
        star2Count: rating.star_2_count,
        star1Count: rating.star_1_count,
      };
    });

    const plugins = pluginRecords.map((plugin) => {
      return {
        ...plugin,
        ratingInfo: ratingInfoMap[plugin.pluginId] || null
      } as Plugin;
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
