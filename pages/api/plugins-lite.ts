import type { NextApiRequest, NextApiResponse } from 'next';
import { PluginsCache } from '@/cache/plugins-cache';
import { toPluginsListItem } from '@/utils/plugins';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const plugins = await PluginsCache.get();
    const pluginsForPage: IPluginsListItem[] = plugins.map(toPluginsListItem);

    // Cache for CDN; allow stale while revalidating.
    res.setHeader(
      'Cache-Control',
      's-maxage=3600, stale-while-revalidate=3600'
    );

    res.status(200).json({ plugins: pluginsForPage, generatedAt: Date.now() });
  } catch (error) {
    console.error('Failed to load plugins-lite', error);
    res.status(500).json({ error: 'Failed to load plugins data' });
  }
}
