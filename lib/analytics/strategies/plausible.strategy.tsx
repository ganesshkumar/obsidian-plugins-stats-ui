
import React, { ReactNode } from 'react';
import PlausibleProvider, { usePlausible } from 'next-plausible';
import { IAnalyticsStrategy } from '../types/analytics';

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
