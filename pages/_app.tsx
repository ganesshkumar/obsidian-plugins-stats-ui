import React from 'react';
import { FeatureFlagProvider } from '@/lib/feature-flag/feature-flags';
import { AnalyticsProvider } from '../lib/analytics/analytics';
import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider';
import '../styles/globals.css';
import 'dotenv/config';

const ObsidianPluginStatsApp = ({ Component, pageProps }) => {
  return (
    <ReactQueryProvider>
      <AnalyticsProvider>
        <FeatureFlagProvider>
          <Component {...pageProps} />
        </FeatureFlagProvider>
      </AnalyticsProvider>
    </ReactQueryProvider>
  );
};

export default ObsidianPluginStatsApp;
