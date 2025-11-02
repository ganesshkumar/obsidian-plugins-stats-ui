'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { setFavorite, unsetFavorite } from '../utils/favorites';

import { Plus, Minus, Share2 } from 'react-feather';
import { useAnalytics } from '../lib/analytics/analytics';
import { Theme, Plugin } from '@prisma/client';

const Favorites = ({ isFavorite, plugin, theme, setFavorites }: {
  isFavorite: boolean;
  plugin?: Plugin;
  theme?: Theme;
  setFavorites: (favorites: string[]) => void;
}) => {
  const [shareText, setShareText] = useState('share');
  const { trackEvent } = useAnalytics();

  const hostname =
    process.env.hostname ||
    process.env.VERCEL_URL ||
    process.env.NODE_ENV === 'production'
      ? 'https://www.obsidianstats.com'
      : 'http://localhost:5000';

  const shareClicked = () => {
    if (navigator) {
      if (plugin) {
        navigator.clipboard.writeText(`${hostname}/plugins/${plugin.pluginId}`);
      } else if (theme) {
        navigator.clipboard.writeText(`${hostname}/themes/${theme.repo}`);
      }
      setShareText('copied link to clipboard');
    }
  };

  useEffect(() => {
    if (shareText === 'copied link to clipboard') {
      setTimeout(() => setShareText('share'), 5000);
    }
  }, [shareText]);

  const handleSetFavoriteClicked = useCallback(() => {
    trackEvent('Favorite Button Click');
    setFavorite(plugin ? plugin.pluginId : theme.repo, setFavorites);
  }, [plugin?.pluginId, theme?.repo, setFavorites]);

  const handleUnsetFavoriteClicked = useCallback(() => {
    trackEvent('Unfavorite Button Click');
    unsetFavorite(plugin ? plugin.pluginId : theme.repo, setFavorites);
  }, [plugin?.pluginId, theme?.repo, setFavorites]);

  return (
    <div className="flex flex-wrap space-x-2">
      {isFavorite ? (
        <div className="flex items-center text-gray-700 underline space-x-1">
          <Minus size={8} />
          <div
            className="text-xs cursor-pointer hover:underline plausible-event-name=Unfavorite+Button+Click"
            onClick={handleUnsetFavoriteClicked}
            id={`unfavorite-${plugin ? plugin.pluginId : theme.repo}`}
          >
            unfavorite
          </div>
        </div>
      ) : (
        <div className="flex items-center text-gray-700 underline space-x-1">
          <Plus size={8} />
          <div
            className="text-xs cursor-pointer hover:underline plausible-event-name=Favorite+Button+Click"
            onClick={handleSetFavoriteClicked}
            id={`favorite-${plugin ? plugin.pluginId : theme.repo}`}
          >
            favorite
          </div>
        </div>
      )}
      <div className="flex items-center text-gray-700 underline space-x-1">
        <Share2 size={8} />
        <div
          className="text-xs cursor-pointer hover:underline"
          onClick={shareClicked}
          id={`share-${plugin ? plugin.pluginId : theme.repo}`}
        >
          {shareText}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
