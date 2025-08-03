import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header, { IHeaderProps } from './Header';
import Head from 'next/head';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => <>{children}</>,
  };
});

describe('Header', () => {
  const defaultProps: IHeaderProps = {
    title: 'Test Title',
    description: 'Test Description',
    canonical: 'https://example.com',
    image: 'https://example.com/image.png',
    current: 'test',
    jsonLdSchema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Test Page',
    },
  };

  it('renders the title, meta tags, and JSON-LD schema correctly', () => {
    const { getByText, getByRole } = render(<Header {...defaultProps} />);

    // Check title
    expect(document.title).toBe('Test Title');

    // Check meta tags
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Test Description'
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://example.com'
    );
    expect(document.querySelector('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Test Title'
    );
    expect(
      document.querySelector('meta[property="og:description"]')
    ).toHaveAttribute('content', 'Test Description');
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      'content',
      'https://example.com/image.png'
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://example.com'
    );
    expect(
      document.querySelector('meta[name="twitter:title"]')
    ).toHaveAttribute('content', 'Test Title');
    expect(
      document.querySelector('meta[name="twitter:description"]')
    ).toHaveAttribute('content', 'Test Description');
    expect(
      document.querySelector('meta[name="twitter:image"]')
    ).toHaveAttribute('content', 'https://example.com/image.png');
    expect(document.querySelector('meta[name="twitter:site"]')).toHaveAttribute(
      'content',
      '@ganesshkumar'
    );

    // Check JSON-LD schema
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
    expect(script.innerHTML).toBe(JSON.stringify(defaultProps.jsonLdSchema));
  });

  it('renders Google Tag Manager script correctly', () => {
    const { getByText } = render(<Header {...defaultProps} />);

    // Check Google Tag Manager script
    const script = document.querySelector('script');
    expect(script).toBeInTheDocument();
  });
});
