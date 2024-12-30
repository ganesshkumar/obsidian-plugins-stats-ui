import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';
import Constants from '../constants';

describe('Navbar', () => {
  test('renders navbar brand', () => {
    render(<Navbar current="new" />);
    const brandImage = screen.getByAltText(`${Constants.AppName} logo`);
    expect(brandImage).toBeInTheDocument();
    const src = brandImage.getAttribute('src');
    expect(src.includes('favicon-64.png')).toBe(true);
    const brandText = screen.getByText(Constants.AppName);
    expect(brandText).toBeInTheDocument();
  });

  test('renders navbar links', () => {
    render(<Navbar current="new" />);
    const links = [
      { name: 'New Plugins', href: '/new' },
      { name: 'Posts', href: '/posts' },
      { name: 'Favorites', href: '/favorites' },
      { name: 'All Plugins', href: '/plugins' },
    ];

    links.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  test('renders dropdown links', () => {
    render(<Navbar current="new" />);
    const dropdownLinks = [
      { name: 'Latest Updates', href: '/updates' },
      { name: 'Most Downloaded', href: '/most-downloaded' },
    ];

    // Simulate clicking the dropdown toggle
    const dropdownToggle = screen.getByText('More');
    fireEvent.click(dropdownToggle);

    dropdownLinks.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  test('passes correct props to Navbar component', () => {
    const children = <div>Test Children</div>;
    render(<Navbar current="new">{children}</Navbar>);
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });

  test('highlights the correct current page link', () => {
    render(<Navbar current="new" />);
    const currentPageLink = screen.getByRole('link', { name: 'New Plugins' });
    expect(currentPageLink).toHaveClass('md:text-purple-700');
  });
});
