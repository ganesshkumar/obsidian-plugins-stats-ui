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
      <Navbar current='trending'/>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='pb-5 container w-full lg:w-1/2 mx-auto  bg-gray-50'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50 cursor-context-menu'>
            🔥 Trending {plugins && `(${plugins.length})`}  
          </div>
          <div className='flex justify-center'>
            <div className="alert shadow-lg alert-warning w-4/5 z-10">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>Warning: ⚠️ 👨🏽‍💻 in progress ⚠️</div>
                <div>The following results are experimental and might be far from accurate.</div>
              </div>
            </div>
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
