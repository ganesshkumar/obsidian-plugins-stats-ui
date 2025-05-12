export interface FeatureFlags {
  enablePluginRating: boolean;
}

export const FeatureFlagKeyMap = {
  enablePluginRating: 'enable-plugin-rating',
};

export type FeatureFlagKey = keyof FeatureFlags;
