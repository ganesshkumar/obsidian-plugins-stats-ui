"use client";

import { ReactNode, useEffect, useRef } from "react";
import { GrowthBook, GrowthBookProvider, useGrowthBook } from "@growthbook/growthbook-react";
import { FeatureFlagKey, FeatureFlags } from "./types/flags";
import { useAnalytics } from "../analytics/analytics";

const growthbook = new GrowthBook({
  apiHost: "https://growthbookapi.obsidianstats.com",
  clientKey: "sdk-LX4vbNdwC77FVA",
  enableDevMode: process.env.NODE_ENV === "development",
  trackingCallback: (experiment, result) => {
    // This is where you would send an event to your analytics provider
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key
    });
  },
});

growthbook.init({
  // Optional, enable streaming updates
  streaming: false
})

type Props = {
  children: ReactNode;
};

const getGbAnonUserId = () => {
  let anonId = localStorage.getItem('gbAnonUserId');
  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem('gbAnonId', anonId);
  }
  return anonId;
}

export const FeatureFlagProvider = ({ children }: Props) => {
  useEffect(() => {
    growthbook.setAttributes({
      id: getGbAnonUserId(),
    });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      {children}
    </GrowthBookProvider>
  );
};

export const useFeatureFlag = <K extends FeatureFlagKey>(
  flagKey: K,
  defaultValue: FeatureFlags[K]
): FeatureFlags[K] => {
  const gb = useGrowthBook();
  const { trackEvent } = useAnalytics();
  const tracked = useRef(false);

  const value = (gb?.getFeatureValue?.(flagKey, defaultValue) ?? defaultValue) as FeatureFlags[K];

  useEffect(() => {
    if (typeof window === "undefined") return; // skip SSR
    if (!tracked.current) {
      trackEvent("Feature Flag Exposed", {
        flag: flagKey,
        value,
      });
      tracked.current = true;
    }
  }, [flagKey, value, trackEvent]);

  return value;
}