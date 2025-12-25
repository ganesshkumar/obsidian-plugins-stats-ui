'use client';

import {
  ApolloClient,
  ApolloProvider as BaseApolloProvider,
  HttpLink,
  InMemoryCache,
  type FieldPolicy,
  type NormalizedCacheObject,
} from '@apollo/client';
import { useState, useEffect, type ReactNode } from 'react';

interface IApolloProviderProps {
  children: ReactNode;
}

const ONE_HOUR_MS = 60 * 60 * 1000;
const GC_INTERVAL_MS = 15 * 60 * 1000; // Run garbage collection every 15 minutes

// Fields that use TTL caching
const TTL_CACHED_FIELDS = [
  'plugins',
  'categoriesLite',
  'mostDownloaded',
  'mostDownloadedInDays',
  'betaEntries',
  'pluginScoreDetails',
] as const;

const ttlFieldPolicy = <T,>(): FieldPolicy<T> => ({
  read(existing) {
    if (!existing) return undefined;
    const value = (existing as any).value as T | undefined;
    const ts = (existing as any).ts as number | undefined;
    if (!ts || Date.now() - ts > ONE_HOUR_MS) return undefined;
    return value;
  },
  merge(_, incoming) {
    return { value: incoming, ts: Date.now() } as any;
  },
});

const createApolloClient = (): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
      useGETForQueries: true,
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            plugins: ttlFieldPolicy(),
            categoriesLite: ttlFieldPolicy(),
            mostDownloaded: ttlFieldPolicy(),
            mostDownloadedInDays: ttlFieldPolicy(),
            betaEntries: ttlFieldPolicy(),
            pluginScoreDetails: ttlFieldPolicy(),
          },
        },
      },
    }),
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
      },
      watchQuery: {
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-first',
      },
    },
    devtools: {
      enabled: process.env.NODE_ENV !== 'production',
    },
  });

// Garbage collection function to evict expired cache entries
const evictExpiredEntries = (client: ApolloClient<NormalizedCacheObject>) => {
  const cache = client.cache as InMemoryCache;
  
  TTL_CACHED_FIELDS.forEach((fieldName) => {
    try {
      // Use extract to inspect cache without triggering queries
      const cacheData = cache.extract();
      const rootQuery = cacheData['ROOT_QUERY'];
      
      if (rootQuery && rootQuery[fieldName]) {
        const cached = rootQuery[fieldName];
        const ts = (cached as any).ts as number | undefined;
        
        // If timestamp exists and entry is expired, evict it
        if (ts && Date.now() - ts > ONE_HOUR_MS) {
          cache.evict({
            id: 'ROOT_QUERY',
            fieldName,
          });
        }
      }
    } catch (error) {
      // Silently handle errors - entry might not exist or be malformed
      console.debug(`Could not check/evict cache for ${fieldName}:`, error);
    }
  });

  // Remove dangling references
  cache.gc();
};

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const [client] = useState(() => createApolloClient());

  useEffect(() => {
    // Set up periodic garbage collection
    const intervalId = setInterval(() => {
      evictExpiredEntries(client);
    }, GC_INTERVAL_MS);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [client]);

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};
