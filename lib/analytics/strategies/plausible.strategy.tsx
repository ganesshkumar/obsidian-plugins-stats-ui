'use client';

import PlausibleProvider, { usePlausible } from 'next-plausible';
import { IAnalyticsStrategy } from '../types/analytics';
import { ReactNode } from 'react';

export const usePlausibleStrategy = (): IAnalyticsStrategy => {
  const plausible = usePlausible();
  return {
    trackEvent: (event, props) => plausible(event, props),
  };
};

export const withPlausibleProvider = (children: ReactNode) => {
  return (
    <PlausibleProvider
      domain="obsidianstats.com"
      customDomain="https://plausible.obsidianstats.com"
      selfHosted
      trackLocalhost
      enabled
    >
      {children}
    </PlausibleProvider>
  );
};
