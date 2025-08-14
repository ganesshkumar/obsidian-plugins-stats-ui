import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';
import Constants from '../constants';

describe('AppFooter', () => {
  test('renders footer brand', () => {
    render(<Footer />);
    const brandLink = screen.getByRole('link', {
      name: Constants.AppName,
    });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders plugin links', () => {
    render(<Footer />);
    const pluginLinks = [
  { name: 'Beta (All)', href: '/beta' },
  { name: 'Beta Plugins', href: '/beta/plugins' },
  { name: 'Beta Themes', href: '/beta/themes' },
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
    render(<Footer />);
    const postLink = screen.getByRole('link', { name: 'All Posts' });
    expect(postLink).toBeInTheDocument();
    expect(postLink).toHaveAttribute('href', '/posts');
  });
});
