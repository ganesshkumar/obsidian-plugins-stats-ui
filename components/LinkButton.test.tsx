import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  test('renders LinkButton with default size', () => {
    render(<LinkButton href="/test" content="Test Button" />);
    const linkButton = screen.getByRole('link', { name: 'Test Button' });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('href', '/test');
    expect(linkButton).toHaveClass(
      'font-medium w-fit border bg-gray-600 hover:bg-gray-700 text-slate-100 px-2 py-1 rounded text-center'
    );
  });

  test('renders LinkButton with small size', () => {
    render(<LinkButton href="/test" content="Test Button" size="small" />);
    const linkButton = screen.getByRole('link', { name: 'Test Button' });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('href', '/test');
    expect(linkButton).toHaveClass(
      'font-medium w-fit border bg-gray-600 hover:bg-gray-700 text-slate-100 px-2 py-1 rounded text-center text-sm'
    );
  });

  test('passes additional props to LinkButton', () => {
    render(<LinkButton href="/test" content="Test Button" target="_blank" />);
    const linkButton = screen.getByRole('link', { name: 'Test Button' });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('href', '/test');
    expect(linkButton).toHaveAttribute('target', '_blank');
  });
});
