
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import Footer from '../components/Footer';
import { setFavorite, setupFavorites, unsetFavorite } from '../utils/favorites';
import Favorites from '../components/Favorites';
import NewPluginsList from '../components/NewPluginsList';
import { daysAgo } from '../utils/datetime';


const New = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <Navbar current='new'/>
      {/* New Plugins */}
      <div className='bg-white pt-5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl py-5 pl-5 text-bold text-violet-900'>
            New Plugins {props.newPlugins && `(${props.newPlugins.length})`} 
          </h1>
          <div className='flex-col'>
            <NewPluginsList plugins={props.newPlugins} favorites={favorites} setFavorites={setFavorites} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  let prisma: PrismaClient = new PrismaClient();

  let newPlugins: any[] = await prisma.plugin.findMany({
    where: { 
      createdAt: {
        gt: daysAgo(10),
      }
    }
  });
  newPlugins.sort((a, b) => b.createdAt - a.createdAt);
  
  return { props: { newPlugins } };
}

export default New;
