import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppFooter } from './Footer';

describe('AppFooter', () => {
  test('renders footer brand', () => {
    render(<AppFooter />);
    const brandLink = screen.getByRole('link', { name: "Obsidian Plugin Stats" });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders plugin links', () => {
    render(<AppFooter />);
    const pluginLinks = [
      { name: 'All Plugins', href: '/plugins' },
      { name: 'New Plugins', href: '/new' },
      { name: 'Latest Updates', href: '/updates' },
      { name: 'Favorite Plugins', href: '/favorites' },
      { name: 'Most Downloaded', href: '/most-downloaded' },
      { name: 'Trending Plugins', href: '/trending' },
      { name: 'Plugin Tags', href: '/tags' },
    ];

    pluginLinks.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  test('renders post links', () => {
    render(<AppFooter />);
    const postLink = screen.getByRole('link', { name: 'All Posts' });
    expect(postLink).toBeInTheDocument();
    expect(postLink).toHaveAttribute('href', '/posts');
  });
  
});
