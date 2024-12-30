import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavPluginUpdates, { NoFavPlugins } from './FavPluginUpdates';
import { setupFavorites } from '../utils/favorites';

jest.mock('../utils/favorites', () => ({
  setupFavorites: jest.fn(),
}));

describe('FavPluginUpdates', () => {
  it('renders NoFavPlugins component when there are no favorites', () => {
    setupFavorites.mockImplementation((setFavorites) => setFavorites([]));
    render(<FavPluginUpdates />);
    expect(
      screen.getByText('Updates from your favorite plugins')
    ).toBeInTheDocument();
  });

  it('does not render NoFavPlugins component when there are favorites', () => {
    setupFavorites.mockImplementation((setFavorites) =>
      setFavorites(['plugin1'])
    );
    render(<FavPluginUpdates />);
    expect(
      screen.queryByText('Updates from your favorite plugins')
    ).not.toBeInTheDocument();
  });
});

describe('NoFavPlugins', () => {
  it('renders step instructions correctly', () => {
    render(<NoFavPlugins />);
    expect(
      screen.getByText("Find and open your favorite plugin's page.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Click the favorite button to mark the plugin as your favorite.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Any plugin updates for your favorite plugins will appear here.'
      )
    ).toBeInTheDocument();
  });

  it('changes step on click', () => {
    render(<NoFavPlugins />);
    const stepElement = screen.getByText(
      "Find and open your favorite plugin's page."
    );
    stepElement.click();
    expect(
      screen.getByText(
        'Click the favorite button to mark the plugin as your favorite.'
      )
    ).toBeInTheDocument();
  });
});
