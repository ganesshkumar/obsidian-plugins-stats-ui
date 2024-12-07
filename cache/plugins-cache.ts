import { Plugin, PrismaClient } from '@prisma/client';

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
   * Fetches the plugins data from the database.
   * @returns {Promise<Plugin[]>} The plugins data from the database.
   * @private
   */
  private static async fetch(): Promise<Plugin[]> {
    let prisma: PrismaClient = new PrismaClient();
    return await prisma.plugin.findMany({});
  }
}
