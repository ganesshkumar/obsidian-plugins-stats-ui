import { Theme as ThemeRecord, PrismaClient } from '@prisma/client';

export class ThemesCache {
  static themes: ThemeRecord[] = [];

  static async get(): Promise<ThemeRecord[]> {
    if (!ThemesCache.themes || ThemesCache.themes.length === 0) {
      ThemesCache.themes = await ThemesCache.fetch();
    }

    return ThemesCache.themes;
  }

  private static async fetch(): Promise<ThemeRecord[]> {
    const prisma: PrismaClient = new PrismaClient();
    return await prisma.theme.findMany({});
  }
}