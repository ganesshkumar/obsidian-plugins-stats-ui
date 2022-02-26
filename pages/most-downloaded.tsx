
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import Favorites from '../components/Favorites';
import PluginListItem from '../components/PluginListItem';
import { isNotXDaysOld } from '../utils/datetime';
import NewPluginsList from '../components/NewPluginsList';

const humanReadableNumbers = (n: number) => {
  const numString = n.toString();

  const formatter = (digits, char) => `${numString.split('').splice(0, numString.length - digits).join('')}${char}`
  const formatMap = {
    '9': 'B',
    '6': 'M',
    '3': 'K',
  };

  for (const key in formatMap) { 
    if (numString.length > parseInt(key)) {
      return formatter(parseInt(key), formatMap[key]);
    }
  }
}

const MostDownloaded = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
  const pad = props.mostDownloaded.length.toString().length;

  return (
    <div>
      <Header />
      <Navbar current='most-downloaded'/>
      {/* New Plugins */}
      <div className='bg-violet-50 pt-5'>
        <div className='pb-5 container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50 cursor-context-menu'>
            🏆 Most Downloaded {props.mostDownloaded && `(${props.mostDownloaded.length})`} 
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
