import { ONE_DAY, isNotXDaysOld, daysAgo } from './datetime';

describe('datetime utils', () => {
  describe('ONE_DAY', () => {
    it('should be equal to 24 hours in milliseconds', () => {
      expect(ONE_DAY).toBe(24 * 60 * 60 * 1000);
    });
  });

  describe('isNotXDaysOld', () => {
    it('should return true if the datetime is within the specified number of days', () => {
      const now = Date.now();
      expect(isNotXDaysOld(now - ONE_DAY, 2)).toBe(true);
      expect(isNotXDaysOld(now - 2 * ONE_DAY, 2)).toBe(true);
      expect(isNotXDaysOld(now - 3 * ONE_DAY, 2)).toBe(false);
    });

    it('should return false if the datetime is older than the specified number of days', () => {
      const now = Date.now();
      expect(isNotXDaysOld(now - 3 * ONE_DAY, 2)).toBe(false);
    });
  });

  describe('daysAgo', () => {
    it('should return the timestamp for the specified number of days ago', () => {
      const now = Date.now();
      expect(daysAgo(1)).toBeCloseTo(now - ONE_DAY, -2);
      expect(daysAgo(2)).toBeCloseTo(now - 2 * ONE_DAY, -2);
    });
  });
});
