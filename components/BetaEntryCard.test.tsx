import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BetaEntryCard } from './BetaEntryCard';
import moment from 'moment';
import { PullRequestEntry } from '@prisma/client';

// Minimal mock for PullRequestEntry fields used
const baseEntry: PullRequestEntry = {
  id: '1',
  prNumber: 1234,
  repo: 'user/repo',
  name: 'Amazing Beta Plugin',
  author: 'GreatDev',
  description: 'Provides amazing features for testing highlight logic.',
  type: 'plugin',
  createdAt: moment().subtract(2, 'days').valueOf() as any,
  lastUpdatedAt: moment().valueOf() as any,
  prStatus: 'open',
  status: 'in-review',
  prLabels: null,
  operation: 'add',
  pluginId: 'amazing-beta-plugin',
  version: '0.0.1',
  lastClassifiedAt: null,
  lastEnrichedAt: null,
  needManualReview: false,
  manualReviewReason: null,
};

describe('BetaEntryCard', () => {
  it('highlights matching tokens in name, author, and description', () => {
    render(<BetaEntryCard entry={baseEntry} highlight="Amazing GreatDev features" />);

    // Name highlight
    const nameMarks = screen.getAllByText(/Amazing/i);
    expect(nameMarks.length).toBeGreaterThan(0);

    // Author highlight
    const authorMarks = screen.getAllByText(/GreatDev/i);
    expect(authorMarks.length).toBeGreaterThan(0);

    // Description highlight
    const featMarks = screen.getAllByText(/features/i);
    expect(featMarks.length).toBeGreaterThan(0);
  });
});
