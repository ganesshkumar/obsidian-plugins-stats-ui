import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PostIcon } from './PostIcon';

describe('PostIcon Component', () => {
  it('renders Calendar icon for weekly-plugin-updates tag', () => {
    render(<PostIcon tags={['weekly-plugin-updates']} />);
    const icon = screen.queryByTestId('calendar-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-violet-700');
  });

  it('renders Star icon for wrapped-yearly-post tag', () => {
    render(<PostIcon tags={['wrapped-yearly-post']} />);
    const icon = screen.queryByTestId('star-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-yellow-400');
  });

  it('renders List icon for workflow tag', () => {
    render(<PostIcon tags={['workflow']} />);
    const icon = screen.queryByTestId('list-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-green-400');
  });

  it('renders Zap icon for feature tag', () => {
    render(<PostIcon tags={['feature']} />);
    const icon = screen.queryByTestId('zap-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-sky-700');
  });

  it('renders nothing for unknown tag', () => {
    render(<PostIcon tags={['unknown-tag']} />);
    const calIcon = screen.queryByTestId('calendar-icon');
    expect(calIcon).not.toBeInTheDocument();
    const starIcon = screen.queryByTestId('star-icon');
    expect(starIcon).not.toBeInTheDocument();
    const listIcon = screen.queryByTestId('list-icon');
    expect(listIcon).not.toBeInTheDocument();
    const zapIcon = screen.queryByTestId('zap-icon');
    expect(zapIcon).not.toBeInTheDocument();
  });
});