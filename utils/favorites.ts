export const setupFavorites = (setFavorites => {
  console.log('window', !!window)
  if (window && window.localStorage) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favorites);
  }
});

export const setFavorite = ((pluginId, setFavorites) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(pluginId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  setFavorites(favorites);
});

export const unsetFavorite = ((pluginId, setFavorites) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.splice(favorites.indexOf(pluginId), 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  setFavorites(favorites);
});
