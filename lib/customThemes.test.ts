import { getScoreBgClass, getScoreTextClass } from './customThemes';

describe('customThemes', () => {
  describe('getScoreBgClass', () => {
    it('should return correct class for score > 0.8', () => {
      expect(getScoreBgClass(0.9)).toBe(
        'bg-emerald-500 text-white rounded-full p-1'
      );
    });

    it('should return correct class for score > 0.6', () => {
      expect(getScoreBgClass(0.7)).toBe(
        'bg-lime-500 text-white rounded-full p-1'
      );
    });

    it('should return correct class for score > 0.4', () => {
      expect(getScoreBgClass(0.5)).toBe(
        'bg-yellow-500 text-white rounded-full p-1'
      );
    });

    it('should return correct class for score > 0.2', () => {
      expect(getScoreBgClass(0.3)).toBe(
        'bg-amber-500 text-white rounded-full p-1'
      );
    });

    it('should return correct class for score <= 0.2', () => {
      expect(getScoreBgClass(0.1)).toBe(
        'bg-red-500 text-white rounded-full p-1'
      );
    });
  });

  describe('getScoreTextClass', () => {
    it('should return correct class for score > 0.8', () => {
      expect(getScoreTextClass(0.9)).toBe('text-emerald-500');
    });

    it('should return correct class for score > 0.6', () => {
      expect(getScoreTextClass(0.7)).toBe('text-lime-500');
    });

    it('should return correct class for score > 0.4', () => {
      expect(getScoreTextClass(0.5)).toBe('text-yellow-500');
    });

    it('should return correct class for score > 0.2', () => {
      expect(getScoreTextClass(0.3)).toBe('text-amber-500');
    });

    it('should return correct class for score <= 0.2', () => {
      expect(getScoreTextClass(0.1)).toBe('text-red-500');
    });
  });
});
