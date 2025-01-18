/**
 * Represents the metrics of a plugin.
 * 
 * @category Scorer
 * @typedef {object} PluginMetrics
 */
export type PluginMetrics = {
  /**
   * The unique identifier of the plugin.
   */
  pluginId: string;

  /**
   * The name of the plugin.
   */
  name: string;

  /**
   * The timestamp when the plugin was created.
   */
  createdAt: number;

  /**
   * The timestamp of the last commit made to the plugin.
   */
  lastCommitAt: number;

  /**
   * The number of stargazers of the plugin.
   */
  stargazers: number;

  /**
   * The number of subscribers of the plugin.
   */
  subscribers: number;

  /**
   * The number of forks of the plugin.
   */
  forks: number;

  /**
   * The version of the latest release of the plugin.
   */
  latestRelease: string;

  /**
   * The description of the latest release of the plugin.
   */
  latestReleaseDesc: string;

  /**
   * The timestamp of the latest release of the plugin.
   */
  latestReleaseAt: number;

  /**
   * The total number of downloads of the plugin.
   */
  totalDownloads: number;

  /**
   * The total number of issues reported for the plugin.
   */
  totalIssues: number;

  /**
   * The number of closed issues of the plugin.
   */
  closedIssues: number;

  /**
   * The number of open issues of the plugin.
   */
  openIssues: number;

  /**
   * The total number of pull requests made to the plugin.
   */
  totalPR: number;

  /**
   * The number of open pull requests of the plugin.
   */
  openPR: number;

  /**
   * The number of closed pull requests of the plugin.
   */
  closedPR: number;

  /**
   * The number of merged pull requests of the plugin.
   */
  mergedPR: number;

  /**
   * The number of commits made to the plugin in the last year.
   */
  commitCountInLastYear: number;

  /**
   * The score of the plugin based on various metrics.
   */
  score: number;
}
