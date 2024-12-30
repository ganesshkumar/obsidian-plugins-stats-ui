import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LatestPosts } from './LatestPosts';
import moment from 'moment';

const mockPosts = [
  {
    id: '1',
    title: 'First Post',
    publishedDate: '2023-10-01',
    tags: ['tag1', 'tag2'],
  },
  {
    id: '2',
    title: 'Second Post',
    publishedDate: '2023-10-02',
    tags: ['tag3', 'tag4'],
  },
];

describe('LatestPosts Component', () => {
  it('renders the LatestPosts component', () => {
    render(<LatestPosts posts={mockPosts} />);

    // Check if the InfoBar title is rendered
    expect(screen.getByText('Latest Posts')).toBeInTheDocument();

    // Check if the posts are rendered
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(
        screen.getByText(moment(post.publishedDate).format('MMMM DD, YYYY'))
      ).toBeInTheDocument();
    });

    // Check if the "View all posts" link is rendered
    expect(screen.getByText('View all posts ⟶')).toBeInTheDocument();
  });
});
