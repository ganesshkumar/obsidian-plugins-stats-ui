import { EntityType, Theme as ThemeRecord, PluginStats, PrismaClient } from '@prisma/client';
import { ThemeRatingInfo } from '@/domain/themes/models/ThemeRatingInfo';
import { Theme } from '@/domain/themes/models/Theme';

export class ThemesCache {
  static themes: Theme[] = [];

  static async get(): Promise<Theme[]> {
    if (!ThemesCache.themes || ThemesCache.themes.length === 0) {
      ThemesCache.themes = await ThemesCache.fetch();
    }

    return ThemesCache.themes;
  }

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