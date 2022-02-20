import React from 'react';
import { setFavorite, unsetFavorite } from '../utils/favorites';

const Favorites = ({isFavorite, plugin, setFavorites}) => {
  return (
    <>
      {isFavorite ? 
        <div className='text-xs cursor-pointer'>
          <span className='hover:text-violet-500' onClick={_ => unsetFavorite(plugin.pluginId, setFavorites)}>unfavorite</span>
        </div> :
        <div className='text-xs cursor-pointer'>
          <span className='hover:text-violet-500' onClick={_ => setFavorite(plugin.pluginId, setFavorites)}>favorite</span>
        </div>
      }
    </>
  );
}

export default Favorites;
