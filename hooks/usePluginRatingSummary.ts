import { useEffect, useState } from 'react';
import { backendGet } from '@/lib/api';

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

interface UsePluginRatingSummaryReturn {
  data: PluginRatingSummary | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to fetch plugin rating summary from backend
 * 
 * @param pluginId - The ID of the plugin to fetch ratings for
 * @param isAuthenticated - Whether the user is authenticated
 * @returns Object containing rating data, loading state, and error
 */
export const usePluginRatingSummary = (
  pluginId: string,
  isAuthenticated: boolean
): UsePluginRatingSummaryReturn => {
  const [data, setData] = useState<PluginRatingSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !pluginId) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchRatingSummary = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await backendGet<PluginRatingSummary>(
          `/reviews/plugins/${pluginId}/summary`
        );
        setData(response);
      } catch (err) {
        console.error('Error fetching plugin rating summary:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while fetching rating summary.'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRatingSummary();
  }, [pluginId, isAuthenticated, refetchTrigger]);

  const refetch = () => {
    setRefetchTrigger(prev => prev + 1);
  };

  return { data, loading, error, refetch };
};
