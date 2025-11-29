import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { backendGet, backendPost } from '@/lib/api';

export type EntityType = 'plugin' | 'theme';

interface EntityRating {
  rating: number;
  reviewText?: string;
  updatedAt: string;
}

interface SubmitRatingPayload {
  rating: number;
  reviewText?: string;
}

interface SubmitRatingResponse {
  id: string;
  updatedAt: string;
}

interface RatingStats {
  totalReviews: number;
  averageRating: number;
  ratingCounts: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface RecentReview {
  id: string;
  rating: number;
  username?: string;
  updatedAt: string;
}

interface EntityRatingSummary {
  stats: RatingStats;
  recentReviews: RecentReview[];
}

/**
 * Query key factory for entity ratings
 */
export const entityRatingKeys = {
  all: (entityType: EntityType) => [`${entityType}Ratings`] as const,
  user: (entityType: EntityType, entityId: string) => 
    [`${entityType}Ratings`, 'user', entityId] as const,
  summary: (entityType: EntityType, entityId: string) => 
    [`${entityType}Ratings`, 'summary', entityId] as const,
};

/**
 * Get the entity path segment based on entity type
 */
function getEntityPath(entityType: EntityType): string {
  return entityType === 'plugin' ? 'plugins' : 'themes';
}

/**
 * Hook to fetch the current user's rating for an entity (plugin or theme)
 */
export function useUserEntityRating(
  entityType: EntityType,
  entityId: string,
  enabled: boolean = true
) {
  const entityPath = getEntityPath(entityType);
  
  return useQuery({
    queryKey: entityRatingKeys.user(entityType, entityId),
    queryFn: async () => {
      try {
        const response = await backendGet<EntityRating>(
          `/me/reviews/${entityPath}/${entityId}`
        );
        return response;
      } catch (error: any) {
        // Return default values for 404 (no rating yet)
        if (error.message.includes('404')) {
          return { rating: 0, reviewText: '', updatedAt: '' };
        }
        throw error;
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404s
      if (error.message.includes('404')) {
        return false;
      }
      return failureCount < 2;
    },
  }); 
}

/**
 * Hook to submit or update an entity rating (plugin or theme)
 */
export function useSubmitEntityRating(
  entityType: EntityType,
  entityId: string
) {
  const queryClient = useQueryClient();
  const entityPath = getEntityPath(entityType);

  return useMutation({
    mutationFn: async (payload: SubmitRatingPayload) => {
      return await backendPost<SubmitRatingResponse>(
        `/reviews/${entityPath}/${entityId}`,
        payload
      );
    },
    onMutate: async (newRating) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: entityRatingKeys.user(entityType, entityId),
      });

      // Snapshot the previous value
      const previousRating = queryClient.getQueryData<EntityRating>(
        entityRatingKeys.user(entityType, entityId)
      );

      // Optimistically update to the new value
      queryClient.setQueryData<EntityRating>(
        entityRatingKeys.user(entityType, entityId),
        (old) => ({
          rating: newRating.rating,
          reviewText: newRating.reviewText,
          updatedAt: old?.updatedAt || new Date().toISOString(),
        })
      );

      // Return a context object with the snapshotted value
      return { previousRating };
    },
    onError: (err, newRating, context) => {
      // Roll back to the previous value on error
      if (context?.previousRating) {
        queryClient.setQueryData(
          entityRatingKeys.user(entityType, entityId),
          context.previousRating
        );
      }
    },
    onSuccess: (data) => {
      // Update with the server response
      queryClient.setQueryData<EntityRating>(
        entityRatingKeys.user(entityType, entityId),
        (old) => ({
          rating: old?.rating || 0,
          reviewText: old?.reviewText,
          updatedAt: data.updatedAt,
        })
      );

      // Invalidate related queries (like rating summaries)
      queryClient.invalidateQueries({
        queryKey: entityRatingKeys.summary(entityType, entityId),
      });
    },
  });
}

/**
 * Hook to fetch entity rating summary (plugin or theme)
 */
export function useEntityRatingSummary(
  entityType: EntityType,
  entityId: string,
  enabled: boolean = true
) {
  const entityPath = getEntityPath(entityType);
  
  return useQuery({
    queryKey: entityRatingKeys.summary(entityType, entityId),
    queryFn: async () => {
      const response = await backendGet<EntityRatingSummary>(
        `/reviews/${entityPath}/${entityId}/summary`
      );
      return response;
    },
    enabled: enabled && !!entityId,
    staleTime: 2 * 60 * 1000, // 2 minutes - summaries don't change often
    retry: 1,
  });
}

// Legacy exports for backward compatibility
// These are deprecated and will be removed in a future version
/** @deprecated Use useUserEntityRating with entityType: 'plugin' instead */
export const useUserPluginRating = (pluginId: string, enabled: boolean = true) =>
  useUserEntityRating('plugin', pluginId, enabled);

/** @deprecated Use useSubmitEntityRating with entityType: 'plugin' instead */
export const useSubmitPluginRating = (pluginId: string) =>
  useSubmitEntityRating('plugin', pluginId);

/** @deprecated Use useEntityRatingSummary with entityType: 'plugin' instead */
export const usePluginRatingSummary = (pluginId: string, enabled: boolean = true) =>
  useEntityRatingSummary('plugin', pluginId, enabled);

/** @deprecated Use useUserEntityRating with entityType: 'theme' instead */
export const useUserThemeRating = (themeId: string, enabled: boolean = true) =>
  useUserEntityRating('theme', themeId, enabled);

/** @deprecated Use useSubmitEntityRating with entityType: 'theme' instead */
export const useSubmitThemeRating = (themeId: string) =>
  useSubmitEntityRating('theme', themeId);

/** @deprecated Use useEntityRatingSummary with entityType: 'theme' instead */
export const useThemeRatingSummary = (themeId: string, enabled: boolean = true) =>
  useEntityRatingSummary('theme', themeId, enabled);
