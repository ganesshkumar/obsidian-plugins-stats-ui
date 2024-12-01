
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import NewPluginsList from '../components/NewPluginsList';
import { PluginsCache } from '../cache/plugins-cache';

const MostDownloaded = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Navbar current='most-downloaded'/>
      </div>
      {/* New Plugins */}
      <div className='bg-white pt-5'>
        <div className='max-w-6xl mx-auto px-2'>
          <div className='text-3xl py-5 pl-5 text-bold text-violet-900'>
            Most Downloaded {props.mostDownloaded && `(${props.mostDownloaded.length})`} 
          </div>
          <div className='flex-col'>
            <NewPluginsList plugins={props.mostDownloaded} favorites={favorites} setFavorites={setFavorites} showDownloadStat={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async (context) => {
  const plugins = await PluginsCache.get();
  const mostDownloaded = plugins.sort((a, b) => b.totalDownloads - a.totalDownloads).slice(0, 25);

  return { props: { mostDownloaded } };
}

export default MostDownloaded;
