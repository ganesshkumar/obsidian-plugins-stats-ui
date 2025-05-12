export interface FeatureFlags {
  enableRating: boolean;
}

export type FeatureFlagKey = keyof FeatureFlags;