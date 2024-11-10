
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import NewPluginsList from '../components/NewPluginsList';

const MostDownloaded = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <Navbar current='most-downloaded'/>
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
  let prisma: PrismaClient = new PrismaClient();

  let mostDownloaded = await prisma.plugin.findMany({
    orderBy: {
      totalDownloads: 'desc',
    },
    take: 25
  });

  return { props: { mostDownloaded } };
}

export default MostDownloaded;
