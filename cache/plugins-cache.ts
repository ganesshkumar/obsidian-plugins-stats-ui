import { Plugin, PrismaClient } from '@prisma/client';

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
   * @type {Plugin[]}
   */
  static plugins: Plugin[];

  /**
   * Retrieves the cached plugins data. If the data is not cached, it fetches the data from the database.
   * @returns {Promise<Plugin[]>} The cached plugins data.
   */
  static async get(): Promise<Plugin[]> {
    if (!PluginsCache.plugins) {
      PluginsCache.plugins = await PluginsCache.fetch();
    }
    return PluginsCache.plugins;
  }

    /**
   * Retrieves the cached plugins data. If the data is not cached, it fetches the data from the database.
   * @returns {Promise<Plugin[]>} The cached plugins data.
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
   * @returns {Promise<Plugin[]>} The plugins data from the database.
   * @private
   */
  private static async fetch(): Promise<Plugin[]> {
    let prisma: PrismaClient = new PrismaClient();
    return await prisma.plugin.findMany({});
  }
}
