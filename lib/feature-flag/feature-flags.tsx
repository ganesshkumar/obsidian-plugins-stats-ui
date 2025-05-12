'use client';

import { ReactNode, useEffect, useRef } from 'react';
import {
  GrowthBook,
  GrowthBookProvider,
  useGrowthBook,
} from '@growthbook/growthbook-react';
import { FeatureFlagKey, FeatureFlagKeyMap, FeatureFlags } from './types/flags';
import { useAnalytics } from '../analytics/analytics';

const growthbook = new GrowthBook({
  apiHost: 'https://growthbookapi.obsidianstats.com',
  clientKey: 'sdk-enqBUVjMi1J4Nvcx', // dev = "sdk-LX4vbNdwC77FVA",
  enableDevMode: process.env.NODE_ENV === 'development',
  trackingCallback: (experiment, result) => {
    // This is where you would send an event to your analytics provider
    console.log('Viewed Experiment', {
      experimentId: experiment.key,
      variationId: result.key,
    });
  },
});

type Props = {
  children: ReactNode;
};

const getGbAnonUserId = () => {
  if (typeof window === 'undefined') {
    return 'nouser';
  }

  let anonId = localStorage.getItem('gbAnonUserId');
  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem('gbAnonId', anonId);
  }
  return anonId;
};

export const FeatureFlagProvider = ({ children }: Props) => {
  useEffect(() => {
    growthbook.setAttributes({
      id: getGbAnonUserId(),
    });

    if (typeof window !== 'undefined' && !!localStorage) {
      growthbook.updateAttributes({
        com: {
          obsidianstats: {
            plugins: {
              enableRating:
                localStorage.getItem(
                  'com.obsidianstats.plugins.enableRating'
                ) === 'true',
            },
          },
        },
      });
    }

    growthbook.init({
      streaming: false,
    });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
};

export const useFeatureFlag = <K extends FeatureFlagKey>(
  flagKey: K,
  defaultValue: FeatureFlags[K]
): FeatureFlags[K] => {
  const sbFlagkey = FeatureFlagKeyMap[flagKey];

  const gb = useGrowthBook();
  const { trackEvent } = useAnalytics();
  const tracked = useRef(false);
  const value = (gb?.getFeatureValue?.(sbFlagkey, defaultValue) ??
    defaultValue) as FeatureFlags[K];

  useEffect(() => {
    if (typeof window === 'undefined') return; // skip SSR
    if (!tracked.current) {
      trackEvent(`Feature Flag: ${sbFlagkey}`, {
        props: {
          value,
        },
      });
      tracked.current = true;
    }
  }, [sbFlagkey, value, trackEvent]);

  return value;
};
