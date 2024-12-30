import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PluginsTableView } from './PluginsTableView';
import { Plugin } from '@prisma/client';

const plugin1: Plugin = {
  id: '1',
  pluginId: 'plugin-1',
  name: 'Plugin 1',
  author: 'Author 1',
  description: 'Description 1',
  repo: 'Repo 1',
  createdAt: 1620000000000,
  nextUpdateAt: 1620000000000,
  lastCommitAt: 1620000000000,
  stargazers: 10,
  subscribers: 5,
  forks: 2,
  latestRelease: '1.0.0',
  latestReleaseDesc: 'Initial release',
  latestReleaseAt: 1620000000000,
  totalDownloads: 100,
  totalIssues: 10,
  closedIssues: 5,
  openIssues: 5,
  totalPR: 5,
  openPR: 2,
  closedPR: 2,
  mergedPR: 1,
  commitCountInLastYear: 50,
  zScoreTrending: 1.5,
  aiDescription: 'AI Description 1',
  aiCategories: 'Category 1',
  aiTags: 'Tag 1',
  score: 4.5,
  scoreReason:
    'stargazers:21:0.05:0.03:0.00\nforks:3:0.10:0.02:0.00\nclosedIssuesRatio:0.5714285714285714:0.57:0.20:0.11\nresolvedPRRatio:0:0.00:0.15:0.00\ncommitCountInLastYear:0:0.00:0.10:0.00\ntotalDownloads:5373:0.05:0.20:0.01\n\nlatestReleaseAt:1688483038000:0.52:0.20:0.10\ncreatedAt:-94539615918:0.95:0.10:0.09',
};

const plugin2: Plugin = {
  id: '2',
  pluginId: 'plugin-2',
  name: 'Plugin 2',
  author: 'Author 2',
  description: 'Description 2',
  repo: 'Repo 2',
  createdAt: 1620000000000,
  nextUpdateAt: 1620000000000,
  lastCommitAt: 1620000000000,
  stargazers: 20,
  subscribers: 10,
  forks: 4,
  latestRelease: '2.0.0',
  latestReleaseDesc: 'Major update',
  latestReleaseAt: 1620000000000,
  totalDownloads: 200,
  totalIssues: 20,
  closedIssues: 10,
  openIssues: 10,
  totalPR: 10,
  openPR: 4,
  closedPR: 4,
  mergedPR: 2,
  commitCountInLastYear: 100,
  zScoreTrending: 2.5,
  aiDescription: 'AI Description 2',
  aiCategories: 'Category 2',
  aiTags: 'Tag 2',
  score: 4.8,
  scoreReason:
    'stargazers:21:0.05:0.03:0.00\nforks:3:0.10:0.02:0.00\nclosedIssuesRatio:0.5714285714285714:0.57:0.20:0.11\nresolvedPRRatio:0:0.00:0.15:0.00\ncommitCountInLastYear:0:0.00:0.10:0.00\ntotalDownloads:5373:0.05:0.20:0.01\n\nlatestReleaseAt:1688483038000:0.52:0.20:0.10\ncreatedAt:-94539615918:0.95:0.10:0.09',
};

describe('PluginsTableView', () => {
  const plugins = [plugin1, plugin2];

  it('renders plugin table with all columns', () => {
    render(
      <PluginsTableView
        plugins={plugins}
        showDownloadStat={true}
        showDescription={true}
      />
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('renders plugin table without description column', () => {
    render(
      <PluginsTableView
        plugins={plugins}
        showDownloadStat={true}
        showDescription={false}
      />
    );
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('renders plugin table without downloads column', () => {
    render(
      <PluginsTableView
        plugins={plugins}
        showDownloadStat={false}
        showDescription={true}
      />
    );
    expect(screen.queryByText('Downloads')).not.toBeInTheDocument();
  });

  it('renders plugin data correctly', () => {
    render(
      <PluginsTableView
        plugins={plugins}
        showDownloadStat={true}
        showDescription={true}
      />
    );
    expect(screen.getByText('Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Plugin 2')).toBeInTheDocument();
    expect(screen.getByText(100)).toBeInTheDocument();
    expect(screen.getByText(200)).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    // TODO: Add more tests for downloads column and score column
  });
});
