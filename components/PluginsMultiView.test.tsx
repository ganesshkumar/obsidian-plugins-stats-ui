import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tabs } from 'flowbite-react';
import { PluginsMultiView } from './PluginsMultiView';
import { PluginsListView } from './PluginsListView';
import { PluginsTableView } from './PluginsTableView';
import { Plugin } from '@prisma/client';

jest.mock('./PluginsListView', () => ({
  PluginsListView: jest.fn(() => <div data-testid="plugins-list-view" />),
}));
jest.mock('./PluginsTableView', () => ({
  PluginsTableView: jest.fn(() => <div data-testid="plugins-table-view" />),
}));

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
  scoreReason: 'High quality',
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
  scoreReason: 'Excellent performance',
};

describe('PluginsMultiView', () => {
  const plugins: Plugin[] = [plugin1, plugin2];
  const favorites = ['1'];
  const setFavorites = jest.fn();

  it('renders PluginsListView by default', () => {
    render(
      <PluginsMultiView
        plugins={plugins}
        favorites={favorites}
        setFavorites={setFavorites}
        showDownloads={true}
        showDescription={true}
      />
    );
    expect(screen.queryByTestId('plugins-list-view')).toBeInTheDocument();
  });

  it('renders PluginsTableView when the Table tab is clicked', () => {
    render(
      <PluginsMultiView
        plugins={plugins}
        favorites={favorites}
        setFavorites={setFavorites}
        showDownloads={true}
        showDescription={true}
      />
    );

    const tableTab = screen.getByText('Table');
    act(() => {
      fireEvent.click(tableTab);
    });

    expect(screen.queryByTestId('plugins-table-view')).toBeInTheDocument();
  });
});
