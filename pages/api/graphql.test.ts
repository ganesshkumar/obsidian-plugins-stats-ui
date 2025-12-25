/**
 * @jest-environment node
 */

import { GraphQLError } from 'graphql';
import {
  validateBetaType,
  sanitizePluginId,
  validateLimit,
  validateDays,
  ALLOWED_BETA_TYPES,
  PLUGIN_ID_REGEX,
  MAX_LIMIT,
  MIN_LIMIT,
  MIN_DAYS,
  MAX_DAYS,
} from '@/lib/graphql/validation';

describe('GraphQL Input Validation', () => {
  describe('validateBetaType', () => {
    it('should accept valid type "plugin"', () => {
      expect(() => validateBetaType('plugin')).not.toThrow();
    });

    it('should accept valid type "theme"', () => {
      expect(() => validateBetaType('theme')).not.toThrow();
    });

    it('should accept undefined type', () => {
      expect(() => validateBetaType(undefined)).not.toThrow();
    });

    it('should reject invalid type', () => {
      expect(() => validateBetaType('invalid')).toThrow(GraphQLError);
      expect(() => validateBetaType('invalid')).toThrow('Invalid type parameter');
    });

    it('should reject malicious input', () => {
      expect(() => validateBetaType('<script>alert("xss")</script>')).toThrow(GraphQLError);
      expect(() => validateBetaType('plugin\'; DROP TABLE plugins; --')).toThrow(GraphQLError);
    });
  });

  describe('sanitizePluginId', () => {
    it('should accept valid plugin IDs', () => {
      expect(sanitizePluginId('obsidian-git')).toBe('obsidian-git');
      expect(sanitizePluginId('my_plugin_123')).toBe('my_plugin_123');
      expect(sanitizePluginId('Plugin-Name_v2')).toBe('Plugin-Name_v2');
    });

    it('should trim whitespace', () => {
      expect(sanitizePluginId('  my-plugin  ')).toBe('my-plugin');
    });

    it('should reject empty strings', () => {
      expect(() => sanitizePluginId('')).toThrow(GraphQLError);
      expect(() => sanitizePluginId('   ')).toThrow(GraphQLError);
    });

    it('should reject non-string input', () => {
      expect(() => sanitizePluginId(null as any)).toThrow(GraphQLError);
      expect(() => sanitizePluginId(undefined as any)).toThrow(GraphQLError);
      expect(() => sanitizePluginId(123 as any)).toThrow(GraphQLError);
    });

    it('should reject invalid characters', () => {
      expect(() => sanitizePluginId('plugin/with/slashes')).toThrow(GraphQLError);
      expect(() => sanitizePluginId('plugin with spaces')).toThrow(GraphQLError);
      expect(() => sanitizePluginId('plugin@special')).toThrow(GraphQLError);
      expect(() => sanitizePluginId('plugin$money')).toThrow(GraphQLError);
      expect(() => sanitizePluginId('<script>alert("xss")</script>')).toThrow(GraphQLError);
    });

    it('should reject SQL injection attempts', () => {
      expect(() => sanitizePluginId("'; DROP TABLE plugins; --")).toThrow(GraphQLError);
      expect(() => sanitizePluginId("1' OR '1'='1")).toThrow(GraphQLError);
    });
  });

  describe('validateLimit', () => {
    it('should accept valid limits', () => {
      expect(validateLimit(10)).toBe(10);
      expect(validateLimit(50)).toBe(50);
      expect(validateLimit(100)).toBe(100);
    });

    it('should use default value when undefined', () => {
      expect(validateLimit(undefined)).toBe(25);
    });

    it('should floor decimal values', () => {
      expect(validateLimit(25.7)).toBe(25);
      expect(validateLimit(50.2)).toBe(50);
    });

    it('should reject values below minimum', () => {
      expect(() => validateLimit(0)).toThrow(GraphQLError);
      expect(() => validateLimit(-1)).toThrow(GraphQLError);
    });

    it('should reject values above maximum', () => {
      expect(() => validateLimit(101)).toThrow(GraphQLError);
      expect(() => validateLimit(1000)).toThrow(GraphQLError);
    });

    it('should reject non-finite numbers', () => {
      expect(() => validateLimit(Infinity)).toThrow(GraphQLError);
      expect(() => validateLimit(-Infinity)).toThrow(GraphQLError);
      expect(() => validateLimit(NaN)).toThrow(GraphQLError);
    });

    it('should reject non-number types', () => {
      expect(() => validateLimit('10' as any)).toThrow(GraphQLError);
      // Note: null/undefined are acceptable and will use the default value
      expect(validateLimit(null as any)).toBe(25);
      expect(validateLimit(undefined)).toBe(25);
    });
  });

  describe('validateDays', () => {
    it('should accept valid days', () => {
      expect(validateDays(7)).toBe(7);
      expect(validateDays(30)).toBe(30);
      expect(validateDays(365)).toBe(365);
    });

    it('should floor decimal values', () => {
      expect(validateDays(7.5)).toBe(7);
      expect(validateDays(30.9)).toBe(30);
    });

    it('should reject values below minimum', () => {
      expect(() => validateDays(0)).toThrow(GraphQLError);
      expect(() => validateDays(-1)).toThrow(GraphQLError);
    });

    it('should reject values above maximum', () => {
      expect(() => validateDays(366)).toThrow(GraphQLError);
      expect(() => validateDays(1000)).toThrow(GraphQLError);
    });

    it('should reject non-finite numbers', () => {
      expect(() => validateDays(Infinity)).toThrow(GraphQLError);
      expect(() => validateDays(-Infinity)).toThrow(GraphQLError);
      expect(() => validateDays(NaN)).toThrow(GraphQLError);
    });

    it('should reject non-number types', () => {
      expect(() => validateDays('7' as any)).toThrow(GraphQLError);
      // Note: days is a required parameter, so null should throw
      expect(() => validateDays(null as any)).toThrow(GraphQLError);
    });
  });
});
