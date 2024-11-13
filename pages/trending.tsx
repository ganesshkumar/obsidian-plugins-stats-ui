/* eslint-disable @next/next/no-img-element */

import { PrismaClient } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import NewPluginsList from '../components/NewPluginsList';
import { setupFavorites } from '../utils/favorites';

const Trending = ({plugins}) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
  return (
    <div>
      <Header />
      <div className='bg-gray-800'>
        <Navbar current='trending'/>
      </div>
      {/* New Plugins */}
      <div className='bg-white py-5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-3xl py-5 pl-5 text-bold text-violet-900'>
            <div>🔥 Trending {plugins && `(${plugins.length})`}  </div>
            <details className='ml-2 text-sm'>
              <summary>info</summary>
              <div className='ml-3'>
                • Trending is calculated using the z-score based on the download count for the past N days.
              </div>
            </details> 
          </div>
          <NewPluginsList plugins={plugins} favorites={favorites} setFavorites={setFavorites} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  
  let plugins = await prisma.plugin.findMany({
    where: {
      zScoreTrending: {
        not: null
      },
    },
    orderBy: {
      zScoreTrending: 'desc'
    },
    take: 10
  });

  return {
    props: {
      plugins
    }
  }
}

export default Trending;
