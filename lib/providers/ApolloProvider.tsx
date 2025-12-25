'use client';

import {
  ApolloClient,
  ApolloProvider as BaseApolloProvider,
  HttpLink,
  InMemoryCache,
  type FieldPolicy,
  type NormalizedCacheObject,
} from '@apollo/client';
import { useState, type ReactNode } from 'react';

interface IApolloProviderProps {
  children: ReactNode;
}

const ONE_HOUR_MS = 60 * 60 * 1000;

const ttlFieldPolicy = <T>(): FieldPolicy<T> => ({
  read(existing) {
    if (!existing) return undefined;
    const value = (existing as any).value as T | undefined;
    const ts = (existing as any).ts as number | undefined;
    if (!ts || Date.now() - ts > ONE_HOUR_MS) return undefined;
    return value;
  },
  merge(_, incoming) {
    return { value: incoming, ts: Date.now() };
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
        nextFetchPolicy: 'cache-first',
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

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const [client] = useState(() => createApolloClient());
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};
