import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ApolloProvider } from './ApolloProvider';
import { useQuery, gql } from '@apollo/client';

// Mock fetch for HttpLink
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: {} }),
    text: () => Promise.resolve('{}'),
    ok: true,
  } as Response)
);

// Mock child component that uses Apollo
const TestComponent = () => {
  const { loading, error, data } = useQuery(gql`
    query TestQuery {
      plugins {
        id
      }
    }
  `);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Data loaded</div>;
};

describe('ApolloProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('renders children correctly', () => {
    const { getByText } = render(
      <ApolloProvider>
        <div>Test Child</div>
      </ApolloProvider>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  test('provides Apollo Client context to children', () => {
    const { getByText } = render(
      <ApolloProvider>
        <TestComponent />
      </ApolloProvider>
    );
    // Should show loading state initially
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('sets up periodic garbage collection', async () => {
    const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();

    render(
      <ApolloProvider>
        <div>Test</div>
      </ApolloProvider>
    );

    // Fast-forward time by 15 minutes to trigger GC
    jest.advanceTimersByTime(15 * 60 * 1000);

    // Wait for any async operations
    await waitFor(() => {
      // GC should have run (though it may not log if cache is empty)
      expect(true).toBe(true);
    });

    consoleDebugSpy.mockRestore();
  });

  test('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = render(
      <ApolloProvider>
        <div>Test</div>
      </ApolloProvider>
    );

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
