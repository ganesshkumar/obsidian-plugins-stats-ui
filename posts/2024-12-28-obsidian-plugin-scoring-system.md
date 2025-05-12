---
title: Obsidian Plugin Scoring System
description: Learn about a new scoring system designed to evaluate and rank Obsidian plugins based on GitHub metrics, user engagement, and activity.
excerpt: Discover how a fair scoring system ranks Obsidian plugins using GitHub metrics like stars, forks, downloads, and activity.
publishedDate: '2024-12-26'
modifiedDate: '2025-01-02'
tags:
  - scoring
  - feature
---

![Banner Scoring Plugins](/images/scoring-plugins-banner.webp)

The Obsidian plugin ecosystem is filled with creative tools, offering thousands of ways to enhance your note-taking experience. But with so many choices, how do you figure out which plugins are reliable, actively maintained, and popular? To make this easier, we have come up with a scoring system that uses GitHub metrics and user engagement data to rank plugins.

![Sample Scores](/images/sample-scores.gif)

## Goal of the plugin Scoring System

The goal is to create a simple and fair way to rank Obsidian plugins by considering:

- **User Engagement**: How well users interact with and adopt a plugin.
- **Codebase Activity**: How actively the plugin is maintained and updated.
- **Popularity**: How widely the plugin is used and trusted by the community.

## How does the scoring system v1 work?

The scoring system evaluates plugins based on several important metrics and calculates a score using a weighted formula. Each metric is normalized for fairness, and the total weight adds up to 1. The metrics include:

1. **GitHub Popularity**: _Stargazers_ and _forks_ are used to gauge developer interest and usage. Combined weight: _0.05_ (3% for stargazers, 2% for forks).

2. **Issue Management**: Plugins with a high _issue close ratio_ (closed issues / total issues) score better, showing the developer’s responsiveness to user-reported problems. Weight: _0.20_

3. **Pull Request Management**: A high _resolved PR ratio_ ((closed PRs + merged PRs) / total PRs) reflects efficient handling of contributions. Weight: _0.15_

4. **Commit Activity**: A greater number of _commits in the last year_ indicates active development. Weight: _0.1_

5. **Download Popularity**: Plugins with more _total downloads_ receive a higher score, representing widespread adoption in the Obsidian community. Weight: _0.2_

6. **Recency of Updates**: Plugins with a recent _release date_ (`latestReleaseAt`) get higher scores, emphasizing ongoing maintenance. Weight: _0.15_

7. **Plugin Age**: Older plugins (`createdAt`) are considered more mature and stable, scoring higher. Newer plugins scale slightly lower. Weight: _0.15_

## Score Calculation Rules:

1. The sum of all weights must equal 1 to ensure a balanced scoring system.
2. Plugins created over a year ago get a higher score due to normalized age.
3. Recently created plugins receive slightly lower scores.
4. Plugins with high stargazers and forks are scored higher but with lower cumulative weights (sum of 0.05) due to limited GitHub interaction among Obsidian users.
5. Plugins with a high issue close ratio score higher.
6. Plugins with a high closed + merged PR ratio score higher.
7. Plugins with more commits in the last year score higher (commitCountInLastYear).
8. Plugins with higher total downloads score higher.
9. Plugins with recent releases (latestReleaseAt) score higher.
10. Plugins with older creation dates (createdAt) score higher, as they reflect maturity and stability.

## Key adjustments for fairness

1. **Inverted Age Scaling**: Older plugins get higher scores by inversely scaling `createdAt`. The normalization formula for age ensures older plugins scale closer to 1 while newer ones scale closer to 0.

2. **Recency Offsets for Dates**: Metrics like `latestReleaseAt` and `lastCommitAt` subtract an offset (e.g., 30 days) from the current date to avoid penalizing plugins for natural gaps between updates.

3. **Trimmed Normalization**: The trimming ensures that extremely popular or unpopular plugins don’t disproportionately influence the scoring bounds.

---

![Introducing Scoring](/images/feature-score-intro.gif)

## Implementation details

### How we collect data

To collect the necessary metrics, we leverage the **GitHub GraphQL API**, which provides detailed and flexible access to repository data. Below is the query used to extract plugin metrics:

```javascript
const QUERY = `
  query ($author: String!, $repo: String!) { 
    repository(owner: $author, name: $repo) { 
      forkCount
      description
      name
      stargazerCount
      createdAt
      pushedAt
      updatedAt
      totalIssues: issues {
        totalCount
      }
      closedIssues: issues(states: CLOSED) {
        totalCount
      }
      openIssues: issues(states: OPEN) {
        totalCount
      }
      openPR: pullRequests(states: OPEN) {
        totalCount
      }
        closedPR: pullRequests(states: CLOSED) {
        totalCount
      }
      mergedPR: pullRequests(states: MERGED) {
        totalCount
      }
      totalPR: pullRequests {
        totalCount
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history(since: "2024-01-01T00:00:00Z", until: "2024-12-31T23:59:59Z") {
              totalCount
            }
          }
        }
      }
      latestRelease {
        tagName
        name
        description
        publishedAt
        url
        isPrerelease
      }
    }
  }
`;
```

This query fetches the following information:

- Repository details such as forks, stargazers, and creation date.
- Counts for issues and pull requests, including total, closed, open, and merged.
- Commit history for the past year.
- Details of the latest release.

With this data, we compute metrics like issue close ratio, resolved PR ratio, and activity levels. These form the foundation of our scoring system for Obsidian plugins.

### How do we add normalization bounds?

Normalization bounds help standardize metrics by defining the minimum and maximum values for each metric. Here is how we calculate these bounds:

```javascript
export const calculateNormalizationBounds = (plugins) =>{
  const metrics = [
    'stargazers',
    'forks',
    'totalIssues',
    'closedIssues',
    'openIssues',
    'totalPR',
    'openPR',
    'closedPR',
    'mergedPR',
    'commitCountInLastYear', // Replacing releaseCountInLastYear
    'totalDownloads',
    'lastCommitAt',
    'createdAt',
    'latestReleaseAt',
  ];

  const bounds = {};

  metrics.forEach((metric) => {
    const valuesSet = new Set<number>();
    plugins.forEach((plugin) => {
      const v = plugin[metric];
      if (v !== null && v !== undefined) {
        valuesSet.add(v);
      }
    });

    let values = Array.from(valuesSet);
    // Trim outliers (TRIM_OUTLIERS_PERCENTAGE lowest and highest values)
    values.sort((a, b) => a - b);
    const trimCount = Math.floor(values.length * TRIM_OUTLIERS_PERCENTAGE);
    values = values.slice(trimCount, values.length - trimCount);

    if (metric === 'lastCommitAt' || metric === 'latestReleaseAt') {
      bounds[metric] = {
        min: Math.min(...values),
        max: Date.now() - OFFSET_DAYS,
      };
    } else if (metric === 'createdAt') {
      bounds[metric] = {
        min: -(Date.now() - OFFSET_DAYS),
        max: -FIRST_PLUGIN_CREATED_AT,
      };
    } else {
      bounds[metric] = {
        min: Math.min(...values),
        max: Math.max(...values),
      };
    }
  });

  return bounds;
}
```

This function calculates bounds for each metric by trimming extreme values and setting the appropriate minimum and maximum limits, ensuring fair normalization.

### How do we normalize metrics?

Normalization makes sure that all metrics are scaled between 0 and 1. Here is the function used:

```javascript
function normalizedSigmoid(x: number, min: number, max: number, k: number = 0.1): number {
  if (x < min) return 0;
  if (x > max) return 1;
  if (max === min) return 0.5;

  const midpoint = (min + max) / 2;

  // Sigmoid function centered at the midpoint
  const sigmoid = (value: number): number => {
    return 1 / (1 + Math.exp(-k * (value - midpoint)));
  };

  // Values at the boundaries
  const sMin = sigmoid(min);
  const sMax = sigmoid(max);

  // Normalize between 0 and 1
  return (sigmoid(x) - sMin) / (sMax - sMin);
}
```

This function makes sure that:

- Metrics below the minimum value are normalized to 0.
- Metrics above the maximum value are normalized to 1.
- Metrics in between are scaled proportionally.
- If `min` equals `max`, the value is normalized to 0.5 to handle edge cases.

### How do we calculate scores?

Finally, the plugin scores are calculated by combining normalized metrics with their respective weights:

```javascript
export const calculateScore = (plugin, bounds, debug = false) => {
  const weights = {
    stargazers: 0.03, // Adjusted lower weight for stargazers
    forks: 0.02, // Adjusted lower weight for forks
    closedIssuesRatio: 0.2, // Responsiveness to issue resolution
    resolvedPRRatio: 0.15, // PR resolution efficiency
    commitCountInLastYear: 0.1, // Recent commit activity
    totalDownloads: 0.2, // Plugin popularity
    latestReleaseAt: 0.15, // Recency of the latest release
    createdAt: 0.15, // Age of the plugin
  };

  // Derived Metrics
  const closedIssuesRatio = plugin.totalIssues
    ? plugin.closedIssues / plugin.totalIssues
    : 1;

  const resolvedPRRatio = plugin.totalPR
    ? (plugin.closedPR + plugin.mergedPR) / plugin.totalPR
    : 1;

  const derivedMetrics = {
    closedIssuesRatio,
    resolvedPRRatio,
    createdAt: -plugin.createdAt,
  };

  let score = 0;

  let reason = '';

  // Calculate normalized and weighted score
  Object.keys(weights).forEach((metric) => {
    const value =
      derivedMetrics[metric] !== undefined
        ? derivedMetrics[metric]
        : plugin[metric] || 0; // Get value
    const { min, max } = bounds[metric] || { min: 0, max: 1 }; // Get normalization bounds

    let normalizedValue = normalizedSigmoid(value, min, max, 0.25);

    score += normalizedValue * weights[metric]; // Apply weight
    reason += `${!!reason ? '\n' : ''}${metric}:${value}:${normalizedValue.toFixed(2)}:${weights[metric].toFixed(2)}:${(normalizedValue * weights[metric]).toFixed(2)}`;

    if (debug) {
      console.log(
        `Metric: ${metric}, Value: ${value}, Normalized: ${normalizedValue}, Weight: ${weights[metric]}, Contribution: ${normalizedValue * weights[metric]}`
      );
      console.log(`Score: ${score}\n`);
    }
  });

  return {
    score,
    reason,
  };
};
```

The score is calculated by:

- Normalizing each metric using the `normalize` function.
- Multiplying the normalized value by its weight.
- Summing up the weighted values to get the final score.

This calculation runs every day at **6:00 AM** to ensure plugin scores are always up-to-date, reflecting the latest data and activity.

To make the scoring fair, the system removes the lowest 5% and highest 5% of values for each metric before calculating the normalization bounds. This helps avoid extreme values affecting the results, ensuring a more accurate evaluation of the top Obsidian plugins.

## Formula for scoring

The scoring formula aggregates weighted metrics:

```javascript
const score =
  normalized_stargazers * 0.03 +
  normalized_forks * 0.02 +
  normalized_closedIssuesRatio * 0.2 +
  normalized_resolvedPRRatio * 0.15 +
  normalized_commitCountInLastYear * 0.1 +
  normalized_totalDownloads * 0.2 +
  normalized_latestReleaseAt * 0.15 +
  normalized_createdAt * 0.15;
```

## A heuristic approach

It is important to note that this scoring system is based on a heuristic approach. The weights and metrics have been carefully chosen to reflect what we believe are critical factors for evaluating plugins, but they are not definitive. This is an initial version of the scoring system and may evolve based on community feedback and further refinement.

## Top 10 plugins by score

Here are the top 10 plugins based on the scoring system for Obsidian:

1. Score 94 - [Text Generator](/plugins/obsidian-textgenerator-plugin)
2. Score 93 - [Obsidian Memos](/plugins/obsidian-memos)
3. Score 87 - [Meta Bind Plugin](/plugins/obsidian-meta-bind-plugin)
4. Score 86 - [Tasks](/plugins/obsidian-tasks-plugin)
5. Score 85 - [Remotely Save](/plugins/remotely-save)
6. Score 84 - [Day Planner](/plugins/obsidian-day-planner)
7. Score 83 - [Projects](/plugins/obsidian-projects)
8. Score 81 - [Local REST API](/plugins/obsidian-local-rest-api)
9. Score 81 - [Novel Word Count](/plugins/novel-word-count)
10. Score 80 - [Latex Suite](/plugins/obsidian-latex-suite)

## Feedback Welcome

We aim to improve this scoring system with valuable input from the Obsidian community. Please share your feedback, suggest improvements, or let us know how we can better evaluate plugin quality and activity. You can join the discussion on our [GitHub Discussion](https://github.com/ganesshkumar/obsidian-plugins-stats-ui/discussions/52).

By working together, we can make the Obsidian ecosystem even better and help users find the best plugins for their needs.
