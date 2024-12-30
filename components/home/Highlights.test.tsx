import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Highlights } from './Highlights';
import { Highlight } from '../../lib/abstractions';

const mockHighlights: Highlight[] = [
  {
    title: 'Highlight One',
    image: '/images/highlight-one.png',
    description: 'Description for highlight one.',
    link: '/posts/highlight-one',
    ctaText: 'Read More',
    bgClasses: 'bg-gradient-to-tr from-fuchsia-400 to-purple-400 text-black',
  },
  {
    title: 'Highlight Two',
    image: '/images/highlight-two.png',
    description: 'Description for highlight two.',
    link: '/posts/highlight-two',
    ctaText: 'Read More',
    bgClasses: 'bg-gradient-to-tr from-fuchsia-400 to-purple-400 text-black',
  },
];

describe('Highlights Component', () => {
  it('renders without carousel when there is only one highlight', () => {
    render(<Highlights highlights={[mockHighlights[0]]} />);
    expect(screen.queryByTestId('carousel')).not.toBeInTheDocument();
    expect(screen.getByText('Highlight One')).toBeInTheDocument();
    expect(screen.getByText('Description for highlight one.')).toBeInTheDocument();
    expect(screen.getByText('Read More')).toBeInTheDocument();
  });

  it('renders with carousel when there are multiple highlights', () => {
    render(<Highlights highlights={mockHighlights} />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getByText('Highlight One')).toBeInTheDocument();
    expect(screen.getByText('Description for highlight one.')).toBeInTheDocument();
    expect(screen.getByText('Highlight Two')).toBeInTheDocument();
    expect(screen.getByText('Description for highlight two.')).toBeInTheDocument();
  });
});
