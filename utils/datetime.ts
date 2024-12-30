export const ONE_DAY = 24 * 60 * 60 * 1000;
export const isNotXDaysOld = (datetime: number, days: number) =>
  datetime >= Date.now() - days * ONE_DAY;
export const daysAgo = (days: number) =>
  Date.now() - days * 24 * 60 * 60 * 1000;
