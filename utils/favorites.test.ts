import { setupFavorites, setFavorite, unsetFavorite } from './favorites';

describe('favorites utils', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('setupFavorites', () => {
    it('should set favorites from localStorage', () => {
      const setFavorites = jest.fn();
      localStorage.setItem('favorites', JSON.stringify(['plugin1', 'plugin2']));
      setupFavorites(setFavorites);
      expect(setFavorites).toHaveBeenCalledWith(['plugin1', 'plugin2']);
    });

    it('should set an empty array if no favorites in localStorage', () => {
      const setFavorites = jest.fn();
      setupFavorites(setFavorites);
      expect(setFavorites).toHaveBeenCalledWith([]);
    });
  });

  describe('setFavorite', () => {
    it('should add a plugin to favorites and update localStorage', () => {
      const setFavorites = jest.fn();
      setFavorite('plugin1', setFavorites);
      expect(localStorage.getItem('favorites')).toBe(
        JSON.stringify(['plugin1'])
      );
      expect(setFavorites).toHaveBeenCalledWith(['plugin1']);
    });

    it('should add a plugin to existing favorites and update localStorage', () => {
      const setFavorites = jest.fn();
      localStorage.setItem('favorites', JSON.stringify(['plugin1']));
      setFavorite('plugin2', setFavorites);
      expect(localStorage.getItem('favorites')).toBe(
        JSON.stringify(['plugin1', 'plugin2'])
      );
      expect(setFavorites).toHaveBeenCalledWith(['plugin1', 'plugin2']);
    });
  });

  describe('unsetFavorite', () => {
    it('should remove a plugin from favorites and update localStorage', () => {
      const setFavorites = jest.fn();
      localStorage.setItem('favorites', JSON.stringify(['plugin1', 'plugin2']));
      unsetFavorite('plugin1', setFavorites);
      expect(localStorage.getItem('favorites')).toBe(
        JSON.stringify(['plugin2'])
      );
      expect(setFavorites).toHaveBeenCalledWith(['plugin2']);
    });

    it('should do nothing if the plugin is not in favorites', () => {
      const setFavorites = jest.fn();
      localStorage.setItem('favorites', JSON.stringify(['plugin1']));
      unsetFavorite('plugin2', setFavorites);
      expect(localStorage.getItem('favorites')).toBe(
        JSON.stringify(['plugin1'])
      );
      expect(setFavorites).not.toHaveBeenCalled();
    });
  });
});
