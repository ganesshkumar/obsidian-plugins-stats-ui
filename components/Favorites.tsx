'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { setFavorite, unsetFavorite } from '../utils/favorites';

import { Plus, Minus, Share2 } from 'react-feather';
import { useAnalytics } from '../lib/analytics/analytics';
import { EntityType } from '@prisma/client';

const Favorites = ({ isFavorite, entityType, entityId, setFavorites }: {
  isFavorite: boolean;
  entityType: EntityType;
  entityId: string;
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
      if (entityType === EntityType.PLUGIN) {
        navigator.clipboard.writeText(`${hostname}/plugins/${entityId}`);
      } else if (entityType === EntityType.THEME) {
        navigator.clipboard.writeText(`${hostname}/themes/${entityId}`);
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
    setFavorite(entityId, setFavorites);
  }, [entityId, setFavorites]);

  const handleUnsetFavoriteClicked = useCallback(() => {
    trackEvent('Unfavorite Button Click');
    unsetFavorite(entityId, setFavorites);
  }, [entityId, setFavorites]);

  return (
    <div className="flex flex-wrap space-x-2">
      {isFavorite ? (
        <div className="flex items-center text-gray-700 underline space-x-1">
          <Minus size={8} />
          <div
            className="text-xs cursor-pointer hover:underline plausible-event-name=Unfavorite+Button+Click"
            onClick={handleUnsetFavoriteClicked}
            id={`unfavorite-${entityId}`}
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
            id={`favorite-${entityId}`}
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
          id={`share-${entityId}`}
        >
          {shareText}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
