import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Divider from './Divider';

describe('Divider Component', () => {
  it('renders the Divider component', () => {
    render(<Divider />);

    // Check if the HR.Trimmed component is rendered
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
