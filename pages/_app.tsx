import React, { useEffect } from 'react';
import { AnalyticsProvider } from '../lib/analytics/analytics';
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
    <ReactQueryProvider>
      <UserProvider>
        <AnalyticsProvider>
          <Component {...pageProps} />
        </AnalyticsProvider>
      </UserProvider>
    </ReactQueryProvider>
  );
};

export default ObsidianPluginStatsApp;
