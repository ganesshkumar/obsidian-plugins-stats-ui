import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PluginCard from './PluginCard';
import moment from 'moment';
import { Plugin } from '@prisma/client';

describe('PluginCard', () => {
  const plugin: Plugin = {
    id: '1',
    pluginId: 'plugin-1',
    name: 'Test Plugin',
    author: 'Author Name',
    description: 'This is a test plugin description.',
    repo: 'https://github.com/test/plugin-repo',
    createdAt: moment().subtract(1, 'days').valueOf(),
    nextUpdateAt: moment().add(1, 'days').valueOf(),
    lastCommitAt: moment().subtract(1, 'hours').valueOf(),
    stargazers: 100,
    subscribers: 50,
    forks: 10,
    latestRelease: 'v1.0.0',
    latestReleaseDesc: 'Initial release',
    latestReleaseAt: moment().subtract(2, 'days').valueOf(),
    totalDownloads: 1000,
    totalIssues: 20,
    closedIssues: 15,
    openIssues: 5,
    totalPR: 10,
    openPR: 2,
    closedPR: 5,
    mergedPR: 3,
    commitCountInLastYear: 200,
    zScoreTrending: 1.5,
    aiDescription: 'AI generated description',
    aiCategories: 'Category1, Category2',
    aiTags: 'Tag1, Tag2',
    score: 4.5,
    scoreReason: 'High quality and popular plugin',
  };

  it('renders plugin name, author, and creation time', () => {
    render(<PluginCard plugin={plugin} showDescription={false} />);
    expect(screen.getByText('Test Plugin')).toBeInTheDocument();
    expect(screen.getByText(`Author Name`)).toBeInTheDocument();
    expect(
      screen.getByText(moment(plugin.createdAt).fromNow())
    ).toBeInTheDocument();
  });

  it('renders plugin description when showDescription is true', () => {
    render(<PluginCard plugin={plugin} showDescription={true} />);
    expect(
      screen.getByText('This is a test plugin description.')
    ).toBeInTheDocument();
  });

  it('does not render plugin description when showDescription is false', () => {
    render(<PluginCard plugin={plugin} showDescription={false} />);
    expect(
      screen.queryByText('This is a test plugin description.')
    ).not.toBeInTheDocument();
  });

  it('has correct link to plugin page', () => {
    render(<PluginCard plugin={plugin} showDescription={false} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/plugins/${plugin.pluginId}`);
  });
});
