import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PluginsListView } from './PluginsListView';
import { Plugin } from '@prisma/client';

const mockPlugins: Plugin[] = [
  {
    name: 'Dummy Plugin 1',
    score: 0.75,
    scoreReason:
      'stargazers:21:0.05:0.03:0.00\nforks:3:0.10:0.02:0.00\nclosedIssuesRatio:0.5714285714285714:0.57:0.20:0.11\nresolvedPRRatio:0:0.00:0.15:0.00\ncommitCountInLastYear:0:0.00:0.10:0.00\ntotalDownloads:5373:0.05:0.20:0.01\n\nlatestReleaseAt:1688483038000:0.52:0.20:0.10\ncreatedAt:-94539615918:0.95:0.10:0.09',
    id: 'dummy-id-1',
    pluginId: 'dummy-plugin-id-1',
    author: 'Dummy Author 1',
    description: 'This is a dummy plugin for testing purposes.',
    repo: 'https://github.com/dummy/repo1',
    createdAt: Date.now(),
    nextUpdateAt: Date.now() + 100000,
    lastCommitAt: Date.now() - 100000,
    stargazers: 50,
    subscribers: 10,
    forks: 5,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: Date.now() - 50000,
    totalDownloads: 1000,
    totalIssues: 20,
    closedIssues: 15,
    openIssues: 5,
    totalPR: 10,
    openPR: 2,
    closedPR: 5,
    mergedPR: 3,
    commitCountInLastYear: 100,
    zScoreTrending: 1.5,
    aiDescription: 'AI generated description for dummy plugin.',
    aiCategories: 'category1, category2',
    aiTags: 'tag1, tag2',
  },
];

describe('PluginsListView', () => {
  test('renders PluginsListView correctly', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={[]}
        setFavorites={jest.fn()}
        showDownloadStat={false}
      />
    );
    expect(screen.getByText('Dummy Plugin 1')).toBeInTheDocument();
  });

  test('renders Plugin component correctly', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={[]}
        setFavorites={jest.fn()}
        showDownloadStat={false}
      />
    );
    expect(screen.getByText('Dummy Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Dummy Author 1')).toBeInTheDocument();
  });

  test('renders UnindexedPlugin component correctly', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={[]}
        setFavorites={jest.fn()}
        showDownloadStat={false}
      />
    );
    expect(screen.getByText('Dummy Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Dummy Author 1')).toBeInTheDocument();
    expect(
      screen.getByText('AI generated description for dummy plugin.')
    ).toBeInTheDocument();
  });

  test('renders Favorites component correctly', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={['dummy-plugin-id-1']}
        setFavorites={jest.fn()}
        showDownloadStat={false}
      />
    );
    expect(screen.getByText('Dummy Plugin 1')).toBeInTheDocument();
    expect(screen.getByText('Dummy Author 1')).toBeInTheDocument();
    expect(
      screen.getByText('AI generated description for dummy plugin.')
    ).toBeInTheDocument();
    // Add more assertions to check if the Favorites component is rendered correctly
  });

  test('renders Score component correctly', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={[]}
        setFavorites={jest.fn()}
        showDownloadStat={false}
      />
    );
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  test('renders download statistics when showDownloadStat is true', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={[]}
        setFavorites={jest.fn()}
        showDownloadStat={true}
      />
    );
    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  test('renders AI categories and tags correctly', () => {
    render(
      <PluginsListView
        plugins={mockPlugins}
        favorites={[]}
        setFavorites={jest.fn()}
        showDownloadStat={false}
      />
    );
    expect(screen.getByText('category1, category2')).toBeInTheDocument();
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });
});
