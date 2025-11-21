import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { backendGet, backendPost } from '@/lib/api';

interface PluginRating {
  rating: number;
  updatedAt: string;
}

interface SubmitRatingPayload {
  rating: number;
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

interface PluginRatingSummary {
  stats: RatingStats;
  recentReviews: RecentReview[];
}

/**
 * Query key factory for plugin ratings
 */
export const pluginRatingKeys = {
  all: ['pluginRatings'] as const,
  user: (pluginId: string) => ['pluginRatings', 'user', pluginId] as const,
  summary: (pluginId: string) => ['pluginRatings', 'summary', pluginId] as const,
};

/**
 * Hook to fetch the current user's rating for a plugin
 */
export function useUserPluginRating(pluginId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: pluginRatingKeys.user(pluginId),
    queryFn: async () => {
      try {
        const response = await backendGet<PluginRating>(
          `/me/reviews/plugins/${pluginId}`
        );
        return response;
      } catch (error: any) {
        // Return default values for 404 (no rating yet)
        if (error.message.includes('404')) {
          return { rating: 0, updatedAt: '' };
        }
        throw error;
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minute
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
 * Hook to submit or update a plugin rating
 */
export function useSubmitPluginRating(pluginId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SubmitRatingPayload) => {
      return await backendPost<SubmitRatingResponse>(
        `/reviews/plugins/${pluginId}`,
        payload
      );
    },
    onMutate: async (newRating) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: pluginRatingKeys.user(pluginId),
      });

      // Snapshot the previous value
      const previousRating = queryClient.getQueryData<PluginRating>(
        pluginRatingKeys.user(pluginId)
      );

      // Optimistically update to the new value
      queryClient.setQueryData<PluginRating>(
        pluginRatingKeys.user(pluginId),
        (old) => ({
          rating: newRating.rating,
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
          pluginRatingKeys.user(pluginId),
          context.previousRating
        );
      }
    },
    onSuccess: (data) => {
      // Update with the server response
      queryClient.setQueryData<PluginRating>(
        pluginRatingKeys.user(pluginId),
        (old) => ({
          rating: old?.rating || 0,
          updatedAt: data.updatedAt,
        })
      );

      // Invalidate related queries (like rating summaries)
      queryClient.invalidateQueries({
        queryKey: pluginRatingKeys.summary(pluginId),
      });
    },
  });
}

/**
 * Hook to fetch plugin rating summary
 */
export function usePluginRatingSummary(pluginId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: pluginRatingKeys.summary(pluginId),
    queryFn: async () => {
      const response = await backendGet<PluginRatingSummary>(
        `/reviews/plugins/${pluginId}/summary`
      );
      return response;
    },
    enabled: enabled && !!pluginId,
    staleTime: 2 * 60 * 1000, // 2 minutes - summaries don't change often
    retry: 1,
  });
}
