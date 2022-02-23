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

  console.group('zScore');
  console.log(plugins.map(p => ({name: p.name, pluginId: p.pluginId, zScore: p.zScoreTrending})));
  console.groupEnd();

  return (
    <div>
      <Header />
      <Navbar current='trending'/>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-full lg:w-1/2 mx-auto  bg-gray-50'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🔥 Trending {plugins && `(${plugins.length})`}  
          </div>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50 text-center'>⚠️ 👨🏽‍💻 in progress ⚠️ </div>
          <div className='text-xl pl-5 bg-gray-50 text-center'>The following results are experimental and might be far from accurate. </div>
          <div className='text-center text-2xl mt-8 '> I am working on this page, </div>
          <div className='text-center flex mb-10 justify-center text-2xl' >
            <a href="https://www.buymeacoffee.com/ganesshkumar" target="_blank" rel="noreferrer">
              <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className='w-40 mr-2' />
            </a>
            <div>and motivate me to finish this trending page sooner.</div>
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
