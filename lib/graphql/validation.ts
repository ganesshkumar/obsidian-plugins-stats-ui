import { GraphQLError } from 'graphql';

// Validation constants
export const ALLOWED_BETA_TYPES = ['plugin', 'theme'] as const;
export const PLUGIN_ID_REGEX = /^[a-zA-Z0-9-_]+$/;
export const MAX_LIMIT = 100;
export const MIN_LIMIT = 1;
export const MIN_DAYS = 1;
export const MAX_DAYS = 365;

/**
 * Validates the beta entry type parameter against allowed values
 * @param type - The type parameter to validate
 * @throws GraphQLError if type is invalid
 */
export function validateBetaType(type?: string): void {
  if (type && !ALLOWED_BETA_TYPES.includes(type as any)) {
    throw new GraphQLError(
      `Invalid type parameter. Allowed values are: ${ALLOWED_BETA_TYPES.join(', ')}`,
      { extensions: { code: 'BAD_USER_INPUT' } }
    );
  }
}

/**
 * Sanitizes and validates a plugin ID
 * @param pluginId - The plugin ID to sanitize
 * @returns The sanitized plugin ID
 * @throws GraphQLError if pluginId is invalid
 */
export function sanitizePluginId(pluginId: string): string {
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

/**
 * Validates and normalizes a limit parameter
 * @param limit - The limit parameter to validate (optional, defaults to 25)
 * @returns The validated limit value
 * @throws GraphQLError if limit is invalid
 */
export function validateLimit(limit?: number): number {
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

/**
 * Validates a days parameter
 * @param days - The number of days to validate
 * @returns The validated days value
 * @throws GraphQLError if days is invalid
 */
export function validateDays(days: number): number {
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
