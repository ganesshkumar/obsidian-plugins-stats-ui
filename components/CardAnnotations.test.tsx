import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardAnnotations from './CardAnnotations';

describe('CardAnnotations', () => {
  test('renders favorite annotation', () => {
    render(<CardAnnotations isFavorite={true} isNotADayOld={false} isTrending={false} />);
    const favoriteAnnotation = screen.getByText('Favorite');
    expect(favoriteAnnotation).toBeInTheDocument();
    expect(favoriteAnnotation).toHaveAttribute('title', 'Favorite plugin');
  });

  test('renders new annotation', () => {
    render(<CardAnnotations isFavorite={false} isNotADayOld={true} isTrending={false} category="Plugin" />);
    const newAnnotation = screen.getByText('New Plugin');
    expect(newAnnotation).toBeInTheDocument();
    expect(newAnnotation).toHaveAttribute('title', 'Less than a day old');
  });

  test('renders trending annotation', () => {
    render(<CardAnnotations isFavorite={false} isNotADayOld={false} isTrending={true} />);
    const trendingAnnotation = screen.getByText('Trending');
    expect(trendingAnnotation).toBeInTheDocument();
    expect(trendingAnnotation).toHaveAttribute('title', 'Trending plugin');
  });

  test('renders multiple annotations', () => {
    render(<CardAnnotations isFavorite={true} isNotADayOld={true} isTrending={true} category="Plugin" />);
    const favoriteAnnotation = screen.getByText('Favorite');
    const newAnnotation = screen.getByText('New Plugin');
    const trendingAnnotation = screen.getByText('Trending');

    expect(favoriteAnnotation).toBeInTheDocument();
    expect(newAnnotation).toBeInTheDocument();
    expect(trendingAnnotation).toBeInTheDocument();
  });

  test('renders no annotations when all props are false', () => {
    render(<CardAnnotations isFavorite={false} isNotADayOld={false} isTrending={false} />);
    expect(screen.queryByText('Favorite')).not.toBeInTheDocument();
    expect(screen.queryByText('New')).not.toBeInTheDocument();
    expect(screen.queryByText('Trending')).not.toBeInTheDocument();
  });
});
