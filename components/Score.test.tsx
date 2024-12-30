import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Score } from './Score';
import { Plugin } from '@prisma/client';

const plugin: Plugin = {
  name: 'Dummy Plugin',
  score: 0.75,
  scoreReason: 'stargazers:21:0.05:0.03:0.00\nforks:3:0.10:0.02:0.00\nclosedIssuesRatio:0.5714285714285714:0.57:0.20:0.11\nresolvedPRRatio:0:0.00:0.15:0.00\ncommitCountInLastYear:0:0.00:0.10:0.00\ntotalDownloads:5373:0.05:0.20:0.01\n\nlatestReleaseAt:1688483038000:0.52:0.20:0.10\ncreatedAt:-94539615918:0.95:0.10:0.09',
  id: 'dummy-id',
  pluginId: 'dummy-plugin-id',
  author: 'Dummy Author',
  description: 'This is a dummy plugin for testing purposes.',
  repo: 'https://github.com/dummy/repo',
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
  aiTags: 'tag1, tag2'
};

describe('Score', () => {
  test('renders score correctly', () => {
    render(<Score plugin={plugin} />);
    const scoreElement = screen.getByText('75');
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement).toHaveClass('text-4xl font-sans font-bold text-lime-500');
  });

  test('renders tooltip and modal', () => {
    render(<Score plugin={plugin} />);
    const infoIcon = screen.queryByTestId('score-info');
    expect(infoIcon).toBeInTheDocument();

    act(() => {
      fireEvent.click(infoIcon);
    });

    const modalHeader = screen.getByText(`Score explanation for`);
    expect(modalHeader).toBeInTheDocument();

    const metricCell = screen.getByText('Stars');
    expect(metricCell).toBeInTheDocument();
  });

  test('renders correct score class based on score', () => {
    const scores = [
      { score: 0.85, className: 'text-emerald-500' },
      { score: 0.65, className: 'text-lime-500' },
      { score: 0.45, className: 'text-yellow-500' },
      { score: 0.25, className: 'text-amber-500' },
      { score: 0.15, className: 'text-red-500' },
    ];

    scores.forEach(({ score, className }) => {
      render(<Score plugin={{ ...plugin, score }} />);
      const scoreElement = screen.getByText(Math.round(score * 100).toString());
      expect(scoreElement).toBeInTheDocument();
      expect(scoreElement).toHaveClass(`text-4xl font-sans font-bold ${className}`);
    });
  });
});
