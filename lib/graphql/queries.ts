import { gql } from '@apollo/client';
import { IBetaEntry } from '@/components/BetaEntryCard';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';

export interface IPluginsQueryResult {
  plugins: IPluginsListItem[];
}

export interface IMostDownloadedQueryResult {
  mostDownloaded: IPluginsListItem[];
  last30: IPluginsListItem[];
  last7: IPluginsListItem[];
}

interface ICategoryLite {
  name: string;
  pluginCount: number;
  topPlugins: Array<{ pluginId: string; name: string; totalDownloads?: number | null }>;
}

export interface ICategoriesLiteQueryResult {
  categoriesLite: ICategoryLite[];
}

export interface IBetaEntriesQueryResult {
  betaEntries: IBetaEntry[];
}

export interface IPluginScoreDetails {
  scoreReason?: string | null;
  closedIssues?: number | null;
  openIssues?: number | null;
  totalIssues?: number | null;
  mergedPR?: number | null;
  closedPR?: number | null;
  openPR?: number | null;
  totalPR?: number | null;
  commitCountInLastYear?: number | null;
  stargazers?: number | null;
  subscribers?: number | null;
  forks?: number | null;
  totalDownloads?: number | null;
  latestReleaseAt?: number | null;
  createdAt?: number | null;
  score?: number | null;
}

export interface IPluginScoreDetailsResult {
  pluginScoreDetails: IPluginScoreDetails | null;
}

export const GET_PLUGINS_QUERY = gql`
  query GetPlugins {
    plugins {
      pluginId
      name
      author
      description
      osDescription
      osCategory
      osTags
      repo
      createdAt
      totalDownloads
      score
      ratingInfo {
        avgRating
        ratingCount
        star5Count
        star4Count
        star3Count
        star2Count
        star1Count
      }
      latestRelease
      latestReleaseAt
      zScoreTrending
    }
  }
`;

export const GET_MOST_DOWNLOADED_QUERY = gql`
  query GetMostDownloaded {
    mostDownloaded(limit: 25) {
      pluginId
      name
      author
      description
      osDescription
      osCategory
      osTags
      repo
      createdAt
      totalDownloads
      score
    }
    last30: mostDownloadedInDays(days: 30, limit: 25) {
      pluginId
      name
      author
      description
      osDescription
      osCategory
      osTags
      repo
      createdAt
      totalDownloads
      score
    }
    last7: mostDownloadedInDays(days: 7, limit: 25) {
      pluginId
      name
      author
      description
      osDescription
      osCategory
      osTags
      repo
      createdAt
      totalDownloads
      score
    }
  }
`;

export const GET_CATEGORIES_LITE_QUERY = gql`
  query GetCategoriesLite {
    categoriesLite {
      name
      pluginCount
      topPlugins {
        pluginId
        name
        totalDownloads
      }
    }
  }
`;

export const GET_BETA_ENTRIES_QUERY = gql`
  query GetBetaEntries($type: String) {
    betaEntries(type: $type) {
      id
      prNumber
      name
      description
      author
      repo
      type
      prStatus
      prLabels
      needManualReview
      manualReviewReason
      createdAt
    }
  }
`;

export const GET_PLUGIN_SCORE_DETAILS_QUERY = gql`
  query PluginScoreDetails($pluginId: ID!) {
    pluginScoreDetails(pluginId: $pluginId) {
      scoreReason
      closedIssues
      openIssues
      totalIssues
      mergedPR
      closedPR
      openPR
      totalPR
      commitCountInLastYear
      stargazers
      subscribers
      forks
      totalDownloads
      latestReleaseAt
      createdAt
      score
    }
  }
`;
