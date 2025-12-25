import React, { useEffect } from 'react';
import { AnalyticsProvider } from '../lib/analytics/analytics';
import { ApolloProvider } from '@/lib/providers/ApolloProvider';
import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider';
import { UserProvider } from '@/lib/contexts/UserContext';
import { initializeAuth } from '@/lib/auth';
import '../styles/globals.css';
import 'dotenv/config';

const ObsidianPluginStatsApp = ({ Component, pageProps }) => {
  // Initialize authentication on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <ApolloProvider>
      <ReactQueryProvider>
        <UserProvider>
          <AnalyticsProvider>
            <Component {...pageProps} />
          </AnalyticsProvider>
        </UserProvider>
      </ReactQueryProvider>
    </ApolloProvider>
  );
};

export default ObsidianPluginStatsApp;
