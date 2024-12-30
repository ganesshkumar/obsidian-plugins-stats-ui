import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoBar from './InfoBar';

describe('InfoBar', () => {
  const title = 'Test Title';

  const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  headingLevels.forEach((level) => {
    test(`renders ${level} with correct title`, () => {
      render(<InfoBar title={title} as={level} />);
      const heading = screen.getByRole('heading', {
        level: parseInt(level[1]),
      });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(title);
    });
  });

  test('renders h1 by default', () => {
    render(<InfoBar title={title} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(title);
  });
});
