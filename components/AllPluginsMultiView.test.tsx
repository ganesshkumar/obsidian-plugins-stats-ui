import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AllPluginsMultiView } from './AllPluginsMultiView';
import { Plugin } from '@prisma/client';

jest.mock('virtua', () => {
  const originalModule = jest.requireActual('virtua');
  return {
    ...originalModule,
    VList: jest.fn(({ children, 'data-testid': dataTestId }) => (
      <div data-testid={dataTestId}>{children}</div>
    )),
  };
});

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
  osDescription: 'AI Description 1',
  osCategory: 'Category 1',
  osTags: 'Tag 1',
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
  osDescription: 'AI Description 2',
  osCategory: 'Category 2',
  osTags: 'Tag 2',
  score: 4.8,
  scoreReason:
    'stargazers:21:0.05:0.03:0.00\nforks:3:0.10:0.02:0.00\nclosedIssuesRatio:0.5714285714285714:0.57:0.20:0.11\nresolvedPRRatio:0:0.00:0.15:0.00\ncommitCountInLastYear:0:0.00:0.10:0.00\ntotalDownloads:5373:0.05:0.20:0.01\n\nlatestReleaseAt:1688483038000:0.52:0.20:0.10\ncreatedAt:-94539615918:0.95:0.10:0.09',
};

describe('AllPluginsMultiView', () => {
  const plugins = [plugin1, plugin2];
  const favorites = ['1'];
  const setFavorites = jest.fn();

  it('renders plugin list view', () => {
    render(
      <AllPluginsMultiView
        plugins={plugins}
        favorites={favorites}
        setFavorites={setFavorites}
        highlight=""
        view="list"
      />
    );

    expect(screen.getByTestId('plugins-list')).toBeInTheDocument();
    expect(screen.getByText('Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Plugin 2')).toBeInTheDocument();
  });

  it('renders plugin table view', () => {
    render(
      <AllPluginsMultiView
        plugins={plugins}
        favorites={favorites}
        setFavorites={setFavorites}
        highlight=""
        view="table"
      />
    );

    expect(screen.getByTestId('plugins-table-header')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
    expect(screen.getByTestId('plugins-table')).toBeInTheDocument();
    expect(screen.getByText('Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Plugin 2')).toBeInTheDocument();
  });

  it('highlights matched text in plugin name', () => {
    render(
      <AllPluginsMultiView
        plugins={plugins}
        favorites={favorites}
        setFavorites={setFavorites}
        highlight="Plugin 1"
        view="list"
      />
    );
    expect(screen.getByText('Plugin 1')).toHaveStyle(
      'background-color: yellow'
    );
  });
});
