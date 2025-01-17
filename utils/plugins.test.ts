import { sanitizeTag, getDescription, tagDenyList } from './plugins';

describe('plugins utils', () => {
  describe('sanitizeTag', () => {
    it('should sanitize tags by converting to lowercase and removing spaces', () => {
      expect(sanitizeTag(' Obsidian Plugin ')).toBe('obsidianplugin');
      expect(sanitizeTag('  Obsidian-Plugin  ')).toBe('obsidian-plugin');
    });
  });

  describe('getDescription', () => {
    it('should return osDescription if it is valid', () => {
      const plugin = {
        osDescription: 'This is a valid AI description.',
        description: 'This is a fallback description.',
      };
      expect(getDescription(plugin)).toBe('This is a valid AI description.');
    });

    it('should return description if osDescription is invalid', () => {
      const plugin = {
        osDescription: 'I apologize, but I cannot provide a summary.',
        description: 'This is a fallback description.',
      };
      expect(getDescription(plugin)).toBe('This is a fallback description.');
    });

    it('should return an empty string if plugin is undefined', () => {
      expect(getDescription(undefined)).toBe('');
    });

    it('should return an empty string if plugin has no description', () => {
      const plugin = {};
      expect(getDescription(plugin)).toBe('');
    });

    it('should remove markdown syntax from osDescription', () => {
      const plugin = {
        osDescription: '**This is a valid AI description.**',
        description: 'This is a fallback description.',
      };
      expect(getDescription(plugin)).toBe('This is a valid AI description.');
    });
  });

  describe('tagDenyList', () => {
    it('should contain specific tags', () => {
      expect(tagDenyList).toContain('obsidian');
      expect(tagDenyList).toContain('plugin');
    });
  });
});
