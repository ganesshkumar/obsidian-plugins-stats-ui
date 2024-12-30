import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubstackNewsletter } from './SubstackNewsletter';

describe('SubstackNewsletter Component', () => {
  it('renders the SubstackNewsletter component', () => {
    render(<SubstackNewsletter />);
    
    // Check if the component is rendered
    expect(screen.getByTestId('substack-newsletter')).toBeInTheDocument();
    
    // Check if the heading is rendered
    expect(screen.getByText('Subscribe to our Newsletter')).toBeInTheDocument();
    
    // Check if the input field is rendered
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    
    // Check if the subscribe button is rendered
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
});
