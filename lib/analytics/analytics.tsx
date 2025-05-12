'use client';

import { createContext, useContext } from 'react';
import { IAnalyticsStrategy } from './types/analytics';
import {
  usePlausibleStrategy,
  withPlausibleProvider,
} from './strategies/plausible.strategy';

interface AnalyticsContextType {
  strategy: IAnalyticsStrategy;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(
  undefined
);

export const AnalyticsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const strategy = usePlausibleStrategy();

  const wrappedChildren = withPlausibleProvider(
    <AnalyticsContext.Provider value={{ strategy }}>
      {children}
    </AnalyticsContext.Provider>
  );

  return wrappedChildren;
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context.strategy;
};
