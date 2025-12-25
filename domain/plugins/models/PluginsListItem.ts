import { PluginRatingInfo } from './PluginRatingInfo';

export interface IPluginsListItem {
  pluginId: string;
  name?: string | null;
  author?: string | null;
  description?: string | null;
  osDescription?: string | null;
  osCategory?: string | null;
  osTags?: string | null;
  repo: string;
  createdAt: number;
  latestReleaseAt?: number | null;
  latestRelease?: string | null;
  totalDownloads?: number | null;
  zScoreTrending?: number | null;
  score?: number | null;
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
  ratingInfo?: PluginRatingInfo | null;
}
