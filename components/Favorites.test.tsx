import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Favorites from './Favorites';
import { setFavorite, unsetFavorite } from '../utils/favorites';

jest.mock('../utils/favorites', () => ({
  setFavorite: jest.fn(),
  unsetFavorite: jest.fn(),
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('Favorites', () => {
  const plugin = { pluginId: 'test-plugin' };
  const setFavorites = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders favorite button when not favorite', () => {
    render(<Favorites isFavorite={false} plugin={plugin} setFavorites={setFavorites} />);
    expect(screen.getByText('favorite')).toBeInTheDocument();
  });

  test('renders unfavorite button when favorite', () => {
    render(<Favorites isFavorite={true} plugin={plugin} setFavorites={setFavorites} />);
    expect(screen.getByText('unfavorite')).toBeInTheDocument();
  });

  test('calls setFavorite when favorite button is clicked', () => {
    render(<Favorites isFavorite={false} plugin={plugin} setFavorites={setFavorites} />);
    fireEvent.click(screen.getByText('favorite'));
    expect(setFavorite).toHaveBeenCalledWith(plugin.pluginId, setFavorites);
  });

  test('calls unsetFavorite when unfavorite button is clicked', () => {
    render(<Favorites isFavorite={true} plugin={plugin} setFavorites={setFavorites} />);
    fireEvent.click(screen.getByText('unfavorite'));
    expect(unsetFavorite).toHaveBeenCalledWith(plugin.pluginId, setFavorites);
  });

  test('copies link to clipboard when share button is clicked', () => {
    render(<Favorites isFavorite={false} plugin={plugin} setFavorites={setFavorites} />);
    fireEvent.click(screen.getByText('share'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'http://localhost:4000/plugins/test-plugin'
    );
  });

  test('displays "copied link to clipboard" after share button is clicked', () => {
    render(<Favorites isFavorite={false} plugin={plugin} setFavorites={setFavorites} />);
    fireEvent.click(screen.getByText('share'));
    expect(screen.getByText('copied link to clipboard')).toBeInTheDocument();
    // expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    //   'http://localhost:4000/plugins/test-plugin'
    // );
  });
});
