import { prisma } from './client';

export const Repo = {
  getPluginsByIds: async (pluginIds: string[]) => {
    return prisma.plugin.findMany({
      where: { pluginId: { in: pluginIds } },
      select: { pluginId: true, name: true }
    });
  },

  upsertUserFromGoogle: async (params: { sub: string; email?: string | null }) => {
    const now = Date.now();
    return prisma.user.upsert({
      where: { googleSub: params.sub },
      update: { updatedAt: now, email: params.email ?? undefined },
      create: {
        uuid: crypto.randomUUID(),
        googleSub: params.sub,
        email: params.email ?? undefined,
        createdAt: now,
        updatedAt: now
      }
    });
  },

  setPseudoname: (userId: string, pseudoname: string) =>
    prisma.user.update({ where: { id: userId }, data: { pseudoname, updatedAt: Date.now() } }),

  createOrUpdateReview: async (input: {
    pluginId: string;
    pluginVersion: string;
    userId: string;
    rating: number;
    review?: string | null;
  }) => {
    const now = Date.now();
    const review = await prisma.review.upsert({
      where: { pluginId_pluginVersion_userId: { ...input } },
      update: { rating: input.rating, review: input.review ?? null, updatedAt: now },
      create: { ...input, review: input.review ?? null, createdAt: now, updatedAt: now }
    });

    // naive aggregate maintenance (optional)
    const agg = await prisma.ratingAggregate.findUnique({
      where: { pluginId_pluginVersion: { pluginId: input.pluginId, pluginVersion: input.pluginVersion } }
    });
    if (!agg) {
      await prisma.ratingAggregate.create({
        data: {
          pluginId: input.pluginId,
          pluginVersion: input.pluginVersion,
          count: 1,
          sum: input.rating,
          average: input.rating,
          updatedAt: now
        }
      });
    } else {
      // Cheap recompute (avoid drift): compute from reviews for that version
      const { _avg, _sum, _count } = await prisma.review.aggregate({
        where: { pluginId: input.pluginId, pluginVersion: input.pluginVersion },
        _avg: { rating: true },
        _sum: { rating: true },
        _count: { rating: true }
      });
      await prisma.ratingAggregate.update({
        where: { pluginId_pluginVersion: { pluginId: input.pluginId, pluginVersion: input.pluginVersion } },
        data: {
          count: _count.rating ?? 0,
          sum: _sum.rating ?? 0,
          average: _avg.rating ?? 0,
          updatedAt: now
        }
      });
    }
    return review;
  },

  latestReviews: (pluginId: string, pluginVersion: string, take: number) =>
    prisma.review.findMany({
      where: { pluginId, pluginVersion },
      orderBy: { createdAt: 'desc' },
      take,
      select: {
        rating: true,
        review: true,
        createdAt: true,
        user: { select: { pseudoname: true } }
      }
    }),

  paginatedReviews: async (pluginId: string, pluginVersion: string, cursor?: string, limit = 20) => {
    return prisma.review.findMany({
      where: { pluginId, pluginVersion },
      orderBy: { createdAt: 'desc' },
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {})
    });
  }
};