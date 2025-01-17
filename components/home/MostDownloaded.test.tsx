import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MostDownloadedPlugins } from './MostDownloaded';
import { Plugin } from '@prisma/client';

const mockPlugins: Plugin[] = [
  {
    id: '1',
    pluginId: 'plugin-1',
    name: 'Plugin One',
    author: 'Author One',
    totalDownloads: 1000,
    description: 'Description for Plugin One',
    repo: 'https://github.com/authorone/plugin-one',
    createdAt: Date.now(),
    nextUpdateAt: Date.now() + 100000,
    lastCommitAt: Date.now() - 100000,
    stargazers: 10,
    subscribers: 5,
    forks: 2,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: Date.now() - 50000,
    totalIssues: 10,
    closedIssues: 8,
    openIssues: 2,
    totalPR: 5,
    openPR: 1,
    closedPR: 3,
    mergedPR: 1,
    commitCountInLastYear: 50,
    zScoreTrending: 1.5,
    osDescription: 'AI generated description for Plugin One',
    osCategory: 'Category One',
    osTags: 'Tag1, Tag2',
    score: 4.5,
    scoreReason: 'High quality and popular plugin',
  },
  {
    id: '2',
    pluginId: 'plugin-2',
    name: 'Plugin Two',
    author: 'Author Two',
    totalDownloads: 2000,
    description: 'Description for Plugin Two',
    repo: 'https://github.com/authortwo/plugin-two',
    createdAt: Date.now(),
    nextUpdateAt: Date.now() + 100000,
    lastCommitAt: Date.now() - 100000,
    stargazers: 20,
    subscribers: 10,
    forks: 4,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: Date.now() - 50000,
    totalIssues: 20,
    closedIssues: 15,
    openIssues: 5,
    totalPR: 10,
    openPR: 2,
    closedPR: 6,
    mergedPR: 2,
    commitCountInLastYear: 100,
    zScoreTrending: 2.5,
    osDescription: 'AI generated description for Plugin Two',
    osCategory: 'Category Two',
    osTags: 'Tag3, Tag4',
    score: 4.0,
    scoreReason: 'Popular and well-maintained plugin',
  },
  {
    id: '3',
    pluginId: 'plugin-3',
    name: 'Plugin Three',
    author: 'Author Three',
    totalDownloads: 3000,
    description: 'Description for Plugin Three',
    repo: 'https://github.com/authorthree/plugin-three',
    createdAt: Date.now(),
    nextUpdateAt: Date.now() + 100000,
    lastCommitAt: Date.now() - 100000,
    stargazers: 30,
    subscribers: 15,
    forks: 6,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: Date.now() - 50000,
    totalIssues: 30,
    closedIssues: 25,
    openIssues: 5,
    totalPR: 15,
    openPR: 3,
    closedPR: 9,
    mergedPR: 3,
    commitCountInLastYear: 150,
    zScoreTrending: 3.5,
    osDescription: 'AI generated description for Plugin Three',
    osCategory: 'Category Three',
    osTags: 'Tag5, Tag6',
    score: 3.5,
    scoreReason: 'Good plugin with active development',
  },
  {
    id: '4',
    pluginId: 'plugin-4',
    name: 'Plugin Four',
    author: 'Author Four',
    totalDownloads: 4000,
    description: 'Description for Plugin Four',
    repo: 'https://github.com/authorfour/plugin-four',
    createdAt: Date.now(),
    nextUpdateAt: Date.now() + 100000,
    lastCommitAt: Date.now() - 100000,
    stargazers: 40,
    subscribers: 20,
    forks: 8,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: Date.now() - 50000,
    totalIssues: 40,
    closedIssues: 35,
    openIssues: 5,
    totalPR: 20,
    openPR: 4,
    closedPR: 12,
    mergedPR: 4,
    commitCountInLastYear: 200,
    zScoreTrending: 4.5,
    osDescription: 'AI generated description for Plugin Four',
    osCategory: 'Category Four',
    osTags: 'Tag7, Tag8',
    score: 3.0,
    scoreReason: 'Stable plugin with consistent updates',
  },
  {
    id: '5',
    pluginId: 'plugin-5',
    name: 'Plugin Five',
    author: 'Author Five',
    totalDownloads: 5000,
    description: 'Description for Plugin Five',
    repo: 'https://github.com/authorfive/plugin-five',
    createdAt: Date.now(),
    nextUpdateAt: Date.now() + 100000,
    lastCommitAt: Date.now() - 100000,
    stargazers: 50,
    subscribers: 25,
    forks: 10,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: Date.now() - 50000,
    totalIssues: 50,
    closedIssues: 45,
    openIssues: 5,
    totalPR: 25,
    openPR: 5,
    closedPR: 15,
    mergedPR: 5,
    commitCountInLastYear: 250,
    zScoreTrending: 5.5,
    osDescription: 'AI generated description for Plugin Five',
    osCategory: 'Category Five',
    osTags: 'Tag9, Tag10',
    score: 2.5,
    scoreReason: 'New plugin with potential',
  },
];

describe('MostDownloadedPlugins Component', () => {
  it('renders the MostDownloadedPlugins component', () => {
    render(<MostDownloadedPlugins plugins={mockPlugins} />);

    // Check if the InfoBar title is rendered
    expect(screen.getByText('Most Downloaded')).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(
        'Here are the 25 most downloaded plugins ever since the beginning of Obsidian Editor.'
      )
    ).toBeInTheDocument();

    // Check if the plugins are rendered
    mockPlugins.slice(0, 5).forEach((plugin, index) => {
      expect(screen.getByText(plugin.name)).toBeInTheDocument();
      expect(screen.getByText(`${plugin.author}`)).toBeInTheDocument();
      expect(
        screen.getByText(plugin.totalDownloads.toLocaleString('en-US'))
      ).toBeInTheDocument();
    });

    // Check if the "View 25 most downloaded plugins" link is rendered
    expect(
      screen.getByText('View 25 most downloaded plugins ⟶')
    ).toBeInTheDocument();
  });
});
