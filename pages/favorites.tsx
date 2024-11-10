
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from "@prisma/client";
import { setupFavorites } from '../utils/favorites';
import NewPluginsList from '../components/NewPluginsList';

const Favorites = (props) => {  
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
  const favoritedPlugins = props.plugins.filter(plugin => favorites.includes(plugin.pluginId));

  return (
    <div>
      <Header />
      <Navbar current='favorites'/>
      {/* New Plugins */}
      <div className='bg-white pt-5'>
        <div className='max-w-6xl mx-auto px-2'>
          <div className='text-3xl py-5 pl-5 text-bold text-violet-900'>
            Favorite Plugins{favoritedPlugins && `(${favoritedPlugins.length})`} 
          </div>
          <div className='flex-col'>
            <NewPluginsList 
                plugins={favoritedPlugins} 
                favorites={favorites} 
                setFavorites={setFavorites} 
                showLatestRelease={true} 
                displayDate={plugin => plugin.latestReleaseAt} 
                showChangelog={true} 
                showDescription={false} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  let prisma: PrismaClient = new PrismaClient();

  let plugins = await prisma.plugin.findMany({});
  plugins.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  
  return { props: { plugins } };
}

export default Favorites;
