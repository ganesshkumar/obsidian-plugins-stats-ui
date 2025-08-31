import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { Repo } from '@mono/store/src/repositories';
import { AuthGuard } from './util/auth-guard';

@Controller('v1')
export class ReviewsController {
  @UseGuards(AuthGuard)
  @Post('plugins/lookup')
  async lookup(@Body() body: { items: { pluginId: string; version: string }[] }) {
    const ids = body.items.map(i => i.pluginId);
    const plugins = await Repo.getPluginsByIds(ids);
    // compute aggregates + attach latest reviews (10)
    const results = await Promise.all(
      body.items.map(async (it) => {
        const latest = await Repo.latestReviews(it.pluginId, it.version, 10);
        // compute average quickly (from aggregate if present)
        return {
          pluginId: it.pluginId,
          name: plugins.find(p => p.pluginId === it.pluginId)?.name ?? it.pluginId,
          version: it.version,
          average: latest.length ? (latest.reduce((a, r) => a + r.rating, 0) / latest.length) : 0,
          count: latest.length,
          latest: latest.map(r => ({
            rating: r.rating,
            review: r.review,
            createdAt: r.createdAt,
            pseudoname: r.user?.pseudoname ?? 'anon'
          }))
        };
      })
    );
    return { results };
  }

  @Get('plugins/:pluginId/:version/reviews')
  async paginated(
    @Param('pluginId') pluginId: string,
    @Param('version') version: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit = '20'
  ) {
    const items = await Repo.paginatedReviews(pluginId, version, cursor, Number(limit));
    const nextCursor = items.length ? items[items.length - 1].id : undefined;
    return { items, nextCursor };
  }

  @UseGuards(AuthGuard)
  @Post('reviews')
  async create(@Body() b: { pluginId: string; pluginVersion: string; rating: number; review?: string }) {
    if (b.rating < 1 || b.rating > 5) throw new Error('invalid rating');
    if (b.review && b.review.length > 2048) throw new Error('review too long');
    // user injected by guard
    const userId = (global as any).__req_user.id as string;
    await Repo.createOrUpdateReview({ pluginId: b.pluginId, pluginVersion: b.pluginVersion, userId, rating: b.rating, review: b.review });
    return { ok: true };
  }
}