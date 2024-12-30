import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthorAndDescription from './AuthorAndDescription';

describe('AuthorAndDescription', () => {
  test('renders author and description', () => {
    const author = 'John Doe';
    const description = 'This is a test description.';
    render(<AuthorAndDescription author={author} description={description} />);

    const authorElement = screen.getByText(`${author}`);
    const descriptionElement = screen.getByText(description);

    expect(authorElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders author with correct class', () => {
    const author = 'Jane Doe';
    render(<AuthorAndDescription author={author} description="" />);

    const authorElement = screen.getByText(`${author}`);
    expect(authorElement).toBeInTheDocument();
    expect(authorElement).toHaveClass('group-hover:text-violet-500');
  });

  test('renders description with correct class', () => {
    const description = 'Another test description.';
    render(<AuthorAndDescription author="" description={description} />);

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveClass('mr-5');
  });
});
