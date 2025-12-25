import { createYoga, createSchema } from 'graphql-yoga';
import { createComplexityRule, simpleEstimator, fieldExtensionsEstimator } from 'graphql-query-complexity';
import depthLimit from 'graphql-depth-limit';
import type { ValidationRule } from 'graphql';
import { PrismaClient, PullRequestEntry } from '@prisma/client';

import { PluginsCache } from '@/cache/plugins-cache';
import { toPluginsListItem } from '@/utils/plugins';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';
import { getMostDownloadedPlugins } from '@/lib/plugins';

const prisma = new PrismaClient();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per minute
const RATE_LIMIT_STORE_CLEANUP_THRESHOLD = 10000; // Clean up when store exceeds this size

// Query security configuration
const MAX_QUERY_DEPTH = 10; // Maximum nesting depth for queries
const MAX_QUERY_COMPLEXITY = 2000; // Maximum complexity score for queries

// Store for rate limiting (in-memory)
// Note: For production deployments with multiple instances, replace with Redis
// or another distributed cache to ensure consistent rate limiting across all instances.
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Extract client IP address from request headers
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

// Rate limiting function
function checkRateLimit(identifier: string): { allowed: boolean; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up expired entries periodically to prevent memory leaks
  if (rateLimitStore.size > RATE_LIMIT_STORE_CLEANUP_THRESHOLD) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || record.resetTime < now) {
    // Create new record
    const resetTime = now + RATE_LIMIT_WINDOW;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { allowed: true, resetTime };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, resetTime: record.resetTime };
}

const typeDefs = /* GraphQL */ `
  type PluginRatingInfo {
    avgRating: Float
    ratingCount: Int
    star5Count: Int
    star4Count: Int
    star3Count: Int
    star2Count: Int
    star1Count: Int
  }

  type Plugin {
    pluginId: ID!
    name: String
    author: String
    description: String
    osDescription: String
    osCategory: String
    osTags: String
    repo: String!
    createdAt: Float!
    latestReleaseAt: Float
    latestRelease: String
    totalDownloads: Float
    score: Float
    scoreReason: String
    closedIssues: Float
    openIssues: Float
    totalIssues: Float
    mergedPR: Float
    closedPR: Float
    openPR: Float
    totalPR: Float
    commitCountInLastYear: Float
    stargazers: Float
    subscribers: Float
    forks: Float
    zScoreTrending: Float
    ratingInfo: PluginRatingInfo
  }

  type BetaEntry {
    id: ID!
    prNumber: Int
    name: String
    description: String
    author: String
    repo: String
    type: String
    prStatus: String
    prLabels: String
    needManualReview: Boolean
    manualReviewReason: String
    createdAt: Float
  }

  type Category {
    name: String!
    pluginCount: Int!
    topPlugins: [Plugin!]!
  }

  type PluginScoreDetails {
    scoreReason: String
    closedIssues: Float
    openIssues: Float
    totalIssues: Float
    mergedPR: Float
    closedPR: Float
    openPR: Float
    totalPR: Float
    commitCountInLastYear: Float
    stargazers: Float
    subscribers: Float
    forks: Float
    totalDownloads: Float
    latestReleaseAt: Float
    createdAt: Float
    score: Float
  }

  type Query {
    plugins: [Plugin!]!
    categoriesLite: [Category!]!
    pluginScoreDetails(pluginId: ID!): PluginScoreDetails
    mostDownloaded(limit: Int = 25): [Plugin!]!
    mostDownloadedInDays(days: Int!, limit: Int = 25): [Plugin!]!
    betaEntries(type: String): [BetaEntry!]!
  }
`;

const mapPullRequestEntry = (entry: PullRequestEntry) => {
  const createdAtValue = (() => {
    const value = entry.createdAt as unknown;
    if (!value) return null;
    if (value instanceof Date) return value.getTime();
    const asDate = new Date(value as string);
    return Number.isNaN(asDate.getTime()) ? null : asDate.getTime();
  })();

  return {
    id: entry.id,
    prNumber: entry.prNumber,
    name: entry.name,
    description: entry.description,
    author: entry.author,
    repo: entry.repo,
    type: entry.type,
    prStatus: entry.prStatus,
    prLabels: entry.prLabels,
    needManualReview: entry.needManualReview,
    manualReviewReason: entry.manualReviewReason,
    createdAt: createdAtValue,
  };
};

const resolvers = {
  Query: {
    plugins: async (): Promise<IPluginsListItem[]> => {
      const plugins = await PluginsCache.get();
      return plugins.map(toPluginsListItem);
    },
    categoriesLite: async () => {
      const plugins = await PluginsCache.get();
      const downloadsById: Record<string, number> = {};
      plugins.forEach((plugin) => {
        downloadsById[plugin.pluginId] = plugin.totalDownloads ?? 0;
      });

      const categoriesData: Record<string, number> = {};
      const topPluginsByCategories: Record<string, IPluginsListItem[]> = {};

      plugins.forEach((plugin) => {
        if (!plugin || !plugin.osCategory) return;
        if (categoriesData[plugin.osCategory] === undefined) {
          categoriesData[plugin.osCategory] = 0;
          topPluginsByCategories[plugin.osCategory] = [];
        }
        categoriesData[plugin.osCategory]++;
        topPluginsByCategories[plugin.osCategory].push(toPluginsListItem(plugin));
      });

      return Object.keys(categoriesData).map((category) => {
        const top = topPluginsByCategories[category]
          .sort((a, b) => (downloadsById[b.pluginId] ?? 0) - (downloadsById[a.pluginId] ?? 0))
          .slice(0, 10);
        return {
          name: category,
          pluginCount: categoriesData[category],
          topPlugins: top,
        };
      });
    },
    pluginScoreDetails: async (_: unknown, args: { pluginId: string }) => {
      const plugins = await PluginsCache.get();
      const plugin = plugins.find((p) => p.pluginId === args.pluginId);
      if (!plugin) return null;
      return {
        scoreReason: plugin.scoreReason,
        closedIssues: plugin.closedIssues ?? null,
        openIssues: plugin.openIssues ?? null,
        totalIssues: plugin.totalIssues ?? null,
        mergedPR: plugin.mergedPR ?? null,
        closedPR: plugin.closedPR ?? null,
        openPR: plugin.openPR ?? null,
        totalPR: plugin.totalPR ?? null,
        commitCountInLastYear: plugin.commitCountInLastYear ?? null,
        stargazers: plugin.stargazers ?? null,
        subscribers: plugin.subscribers ?? null,
        forks: plugin.forks ?? null,
        totalDownloads: plugin.totalDownloads ?? null,
        latestReleaseAt: plugin.latestReleaseAt ?? null,
        createdAt: plugin.createdAt ?? null,
        score: plugin.score ?? null,
      };
    },
    mostDownloaded: async (_: unknown, args: { limit?: number }) => {
      const plugins = await PluginsCache.get();
      const sorted = [...plugins]
        .sort((a, b) => (b.totalDownloads ?? 0) - (a.totalDownloads ?? 0))
        .slice(0, args.limit ?? 25);
      return sorted.map(toPluginsListItem);
    },
    mostDownloadedInDays: async (
      _: unknown,
      args: { days: number; limit?: number }
    ) => {
      const top = await getMostDownloadedPlugins(args.days, args.limit ?? 25);
      return top.map(toPluginsListItem);
    },
    betaEntries: async (_: unknown, args: { type?: string }) => {
      const entries = await prisma.pullRequestEntry.findMany({
        where: {
          prStatus: 'open',
          type: args.type
            ? args.type
            : { in: ['plugin', 'theme'] },
          name: { not: null },
          needManualReview: false,
          prLabels: {
            mode: 'insensitive',
            not: { contains: 'installation not recommended' },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
      return entries.map(mapPullRequestEntry);
    },
  },
};

const schema = createSchema({ typeDefs, resolvers });

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  cors: {
    origin: '*',
    credentials: false,
  },
  maskedErrors: false,
  // Add validation rules for query complexity and depth limiting
  validationRules: [
    // Limit query depth to prevent deeply nested queries
    depthLimit(MAX_QUERY_DEPTH) as unknown as ValidationRule,
    // Analyze query complexity to prevent expensive operations
    createComplexityRule({
      maximumComplexity: MAX_QUERY_COMPLEXITY,
      estimators: [
        // Custom estimator for fields with complexity metadata
        fieldExtensionsEstimator(),
        // Default complexity of 1 per field
        simpleEstimator({ defaultComplexity: 1 }),
      ],
      onComplete: (complexity: number) => {
        console.log(`Query complexity: ${complexity}`);
      },
      createError: (max: number, actual: number) => {
        return new Error(
          `Query is too complex: ${actual}. Maximum allowed complexity: ${max}. ` +
          `Please simplify your query by requesting fewer fields or reducing nesting depth.`
        );
      },
    }) as unknown as ValidationRule,
  ],
  plugins: [
    {
      onResponse({ response }) {
        response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600');
      },
    },
    // Rate limiting plugin
    {
      onRequest({ request, fetchAPI }) {
        // Get client identifier (IP address from headers or connection)
        const ip = getClientIP(request);
        
        const { allowed, resetTime } = checkRateLimit(ip);
        
        if (!allowed) {
          const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
          return new fetchAPI.Response(
            JSON.stringify({
              errors: [{
                message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`,
                extensions: {
                  code: 'RATE_LIMIT_EXCEEDED',
                  retryAfter,
                },
              }],
            }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': retryAfter.toString(),
                'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(resetTime).toISOString(),
              },
            }
          );
        }

        // Add rate limit headers to successful requests
        const record = rateLimitStore.get(ip);
        if (record) {
          request.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
          request.headers.set('X-RateLimit-Remaining', (RATE_LIMIT_MAX_REQUESTS - record.count).toString());
          request.headers.set('X-RateLimit-Reset', new Date(record.resetTime).toISOString());
        }
      },
      onResponse({ response, request }) {
        // Add rate limit headers to response
        const ip = getClientIP(request);
        
        const record = rateLimitStore.get(ip);
        if (record) {
          response.headers.set('X-RateLimit-Limit', RATE_LIMIT_MAX_REQUESTS.toString());
          response.headers.set('X-RateLimit-Remaining', Math.max(0, RATE_LIMIT_MAX_REQUESTS - record.count).toString());
          response.headers.set('X-RateLimit-Reset', new Date(record.resetTime).toISOString());
        }
      },
    },
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};
