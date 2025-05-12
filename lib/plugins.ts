import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { PluginsCache } from '../cache/plugins-cache';

interface TopDownloadedStat {
  _id: string;
  totalDownloads: number;
}

export const getMostDownloadedPlugins = async (nDays: number, topN: number) => {
  const prisma = new PrismaClient();
  const plugins = await PluginsCache.get();

  try {
    // Calculate the timestamp for the specified number of days ago
    const daysAgo = moment().subtract(nDays, 'days').startOf('day').valueOf();

    const topPluginsJson = await prisma.deltaDownloads.aggregateRaw({
      pipeline: [
        // 1. Only consider the documents for the last 7 days
        { $match: { timestamp: { $gte: daysAgo } } },

        // 2. Sort by pluginId first (ascending), then by timestamp (descending)
        { $sort: { timestamp: -1 } },

        // 3. Group by pluginId and collect deltaDownload values in an array
        {
          $group: {
            _id: '$pluginId',
            downloadsArray: { $push: '$deltaDownloads' },
          },
        },

        // 4. Slice the first 7 from downloadsArray and sum them
        {
          $project: {
            _id: 1,
            totalDownloads: { $sum: { $slice: ['$downloadsArray', nDays] } },
          },
        },

        // 5. Sort by sumLast7Days in descending order and limit to top 25
        { $sort: { totalDownloads: -1 } },
        { $limit: topN },
      ],
    });

    const topPlugins = topPluginsJson as any as TopDownloadedStat[];

    return topPlugins.map((plugin) => ({
      ...plugins.find((p) => p.pluginId === plugin._id),
      totalDownloads: plugin.totalDownloads,
    }));
  } catch (error) {
    console.error('Error fetching top plugins:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
