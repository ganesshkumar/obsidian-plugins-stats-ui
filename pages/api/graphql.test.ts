/**
 * @jest-environment node
 */

import { GraphQLError } from 'graphql';

// Test helpers - extract validation functions from graphql.ts for testing
const ALLOWED_BETA_TYPES = ['plugin', 'theme'] as const;
const PLUGIN_ID_REGEX = /^[a-zA-Z0-9-_]+$/;
const MAX_LIMIT = 100;
const MIN_LIMIT = 1;
const MIN_DAYS = 1;
const MAX_DAYS = 365;

function validateBetaType(type?: string): void {
  if (type && !ALLOWED_BETA_TYPES.includes(type as any)) {
    throw new GraphQLError(
      `Invalid type parameter. Allowed values are: ${ALLOWED_BETA_TYPES.join(', ')}`,
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  }
}

function sanitizePluginId(pluginId: string): string {
  if (!pluginId || typeof pluginId !== 'string') {
    throw new GraphQLError('Plugin ID is required and must be a string', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  const trimmedId = pluginId.trim();
  if (!trimmedId) {
    throw new GraphQLError('Plugin ID cannot be empty', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  if (!PLUGIN_ID_REGEX.test(trimmedId)) {
    throw new GraphQLError(
      'Plugin ID can only contain alphanumeric characters, hyphens, and underscores',
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  }

  return trimmedId;
}

function validateLimit(limit?: number): number {
  const validatedLimit = limit ?? 25;
  if (typeof validatedLimit !== 'number' || !Number.isFinite(validatedLimit)) {
    throw new GraphQLError('Limit must be a valid number', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  if (validatedLimit < MIN_LIMIT) {
    throw new GraphQLError(`Limit must be at least ${MIN_LIMIT}`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  if (validatedLimit > MAX_LIMIT) {
    throw new GraphQLError(`Limit cannot exceed ${MAX_LIMIT}`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return Math.floor(validatedLimit);
}

function validateDays(days: number): number {
  if (typeof days !== 'number' || !Number.isFinite(days)) {
    throw new GraphQLError('Days must be a valid number', {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  if (days < MIN_DAYS) {
    throw new GraphQLError(`Days must be at least ${MIN_DAYS}`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  if (days > MAX_DAYS) {
    throw new GraphQLError(`Days cannot exceed ${MAX_DAYS}`, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return Math.floor(days);
}

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
