import { Theme as ThemeRecord } from '@prisma/client';
import { ThemeRatingInfo } from './ThemeRatingInfo';

export type Theme = ThemeRecord & {
  ratingInfo?: ThemeRatingInfo;
};
