import { createYoga, createSchema } from 'graphql-yoga';
import { GraphQLError } from 'graphql';
import { PrismaClient, PullRequestEntry } from '@prisma/client';
import { PluginsCache } from '@/cache/plugins-cache';
import { toPluginsListItem } from '@/utils/plugins';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';
import { getMostDownloadedPlugins } from '@/lib/plugins';

const prisma = new PrismaClient();

// Validation constants
const ALLOWED_BETA_TYPES = ['plugin', 'theme'] as const;
const PLUGIN_ID_REGEX = /^[a-zA-Z0-9-_]+$/;
const MAX_LIMIT = 100;
const MIN_LIMIT = 1;
const MIN_DAYS = 1;
const MAX_DAYS = 365;

// Validation helper functions
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
      const sanitizedPluginId = sanitizePluginId(args.pluginId);
      const plugins = await PluginsCache.get();
      const plugin = plugins.find((p) => p.pluginId === sanitizedPluginId);
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
      const validatedLimit = validateLimit(args.limit);
      const plugins = await PluginsCache.get();
      const sorted = [...plugins]
        .sort((a, b) => (b.totalDownloads ?? 0) - (a.totalDownloads ?? 0))
        .slice(0, validatedLimit);
      return sorted.map(toPluginsListItem);
    },
    mostDownloadedInDays: async (
      _: unknown,
      args: { days: number; limit?: number }
    ) => {
      const validatedDays = validateDays(args.days);
      const validatedLimit = validateLimit(args.limit);
      const top = await getMostDownloadedPlugins(validatedDays, validatedLimit);
      return top.map(toPluginsListItem);
    },
    betaEntries: async (_: unknown, args: { type?: string }) => {
      validateBetaType(args.type);
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
  plugins: [
    {
      onResponse({ response }) {
        response.headers.set('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600');
      },
    },
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};
