'use client';

import { ApolloClient, ApolloProvider as BaseApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { useState, type ReactNode } from 'react';

interface IApolloProviderProps {
  children: ReactNode;
}

const createApolloClient = (): ApolloClient<unknown> =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    cache: new InMemoryCache(),
    devtools: {
      enabled: process.env.NODE_ENV !== 'production',
    }
  });

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const [client] = useState(() => createApolloClient());
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>;
};
