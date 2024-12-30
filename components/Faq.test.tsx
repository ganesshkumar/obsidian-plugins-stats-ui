import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Faqs from './Faq';

const mockFaqs = [
  {
    question: 'What is your return policy?',
    answer: 'You can return any item within 30 days of purchase.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'You can track your order using the tracking number provided in your order confirmation email.',
  },
];

describe('Faqs Component', () => {
  it('renders the Faqs component', () => {
    render(<Faqs faqs={mockFaqs} />);

    // Check if the FAQ questions and answers are rendered
    mockFaqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
      expect(screen.getByText(faq.answer)).toBeInTheDocument();
    });
  });
});
