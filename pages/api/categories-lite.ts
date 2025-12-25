import type { NextApiRequest, NextApiResponse } from 'next';
import { PluginsCache } from '@/cache/plugins-cache';

interface ITopPluginLite {
  pluginId: string;
  name: string;
}

interface ICategoriesPayload {
  categories: string[];
  pluginCountByCategories: Record<string, number>;
  topPluginsByCategories: Record<string, ITopPluginLite[]>;
  generatedAt: number;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ICategoriesPayload | { error: string }>
) {
  try {
    const plugins = await PluginsCache.get();

    const downloadsById: Record<string, number> = {};
    plugins.forEach((plugin) => {
      downloadsById[plugin.pluginId] = plugin.totalDownloads ?? 0;
    });

    const categoriesData: Record<string, number> = {};
    const topPluginsByCategories: Record<string, ITopPluginLite[]> = {};

    plugins.forEach((plugin) => {
      if (!plugin || !plugin.osCategory) {
        return;
      }
      if (categoriesData[plugin.osCategory] === undefined) {
        categoriesData[plugin.osCategory] = 0;
        topPluginsByCategories[plugin.osCategory] = [];
      }
      categoriesData[plugin.osCategory]++;
      topPluginsByCategories[plugin.osCategory].push({
        pluginId: plugin.pluginId,
        name: plugin.name,
      });
    });

    Object.keys(topPluginsByCategories).forEach((category) => {
      topPluginsByCategories[category] = topPluginsByCategories[category]
        .sort((a, b) => {
          const aDownloads = downloadsById[a.pluginId] ?? 0;
          const bDownloads = downloadsById[b.pluginId] ?? 0;
          return bDownloads - aDownloads;
        })
        .slice(0, 10);
    });

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');

    res.status(200).json({
      categories: Object.keys(categoriesData),
      pluginCountByCategories: categoriesData,
      topPluginsByCategories,
      generatedAt: Date.now(),
    });
  } catch (error) {
    console.error('Failed to load categories-lite', error);
    res.status(500).json({ error: 'Failed to load categories data' });
  }
}
