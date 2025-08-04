import React from 'react';
import { FeatureFlagProvider } from '@/lib/feature-flag/feature-flags';
import { AnalyticsProvider } from '../lib/analytics/analytics';
import '../styles/globals.css';
import 'dotenv/config';

const ObsidianPluginStatsApp = ({ Component, pageProps }) => {
  return (
    <AnalyticsProvider>
      <FeatureFlagProvider>
        <Component {...pageProps} />
      </FeatureFlagProvider>
    </AnalyticsProvider>
  );
};

export default ObsidianPluginStatsApp;
