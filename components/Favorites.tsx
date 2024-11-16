import React, { useEffect } from 'react';
import { setFavorite, unsetFavorite } from '../utils/favorites';

import { Plus, Minus, Share2 } from 'react-feather';

const Favorites = ({isFavorite, plugin, setFavorites}) => {
  const [shareText, setShareText] = React.useState('share');

  const hostname = process.env.hostname || process.env.VERCEL_URL || 
    process.env.NODE_ENV === 'production' ? 'https://obsidian-plugin-stats.ganesshkumar.app' : 'http://localhost:4000';

  const shareClicked = () => {
    if (navigator) {
      navigator.clipboard.writeText(`${hostname}/plugins/${plugin.pluginId}`);
      setShareText('copied link to clipboard');
    }
  }

  useEffect(() => {
    if (shareText === 'copied link to clipboard') {
      setTimeout(() => setShareText('share'), 5000);
    }
  }, [shareText])

  return (
    <div className='flex flex-wrap space-x-2'>
      {isFavorite ? 
        <div className='flex items-center text-violet-700 space-x-1'>
          <Minus size={8}/>
          <div className='text-xs cursor-pointer hover:underline' onClick={_ => unsetFavorite(plugin.pluginId, setFavorites)} id={`favorite-${plugin.pluginId}`}>
            unfavorite
          </div>
        </div> :
        <div className='flex items-center text-violet-700 space-x-1'>
          <Plus size={8} />
          <div className='text-xs cursor-pointer hover:underline' onClick={_ => setFavorite(plugin.pluginId, setFavorites)} id={`unfavorite-${plugin.pluginId}`}>
            favorite
          </div>
        </div>
      }
      <div className='flex items-center text-violet-700 space-x-1'>
        <Share2 size={8} />
        <div className='text-xs cursor-pointer hover:underline' onClick={shareClicked} id={`share-${plugin.pluginId}`}>
          {shareText}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
