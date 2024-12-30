import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubstackNewsletter } from './SubstackNewsletter';

describe('SubstackNewsletter Component', () => {
  it('renders the SubstackNewsletter component', () => {
    render(<SubstackNewsletter />);
    expect(screen.queryByTestId('substack-newsletter')).toBeInTheDocument();
  });
});
