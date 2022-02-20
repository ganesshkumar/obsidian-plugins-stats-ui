
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import Footer from '../components/Footer';
import { setFavorite, setupFavorites, unsetFavorite } from '../utils/favorites';
import Favorites from '../components/Favorites';

type Props = { };
type State = { };

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
      <div className='bg-violet-50 pt-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🌱 New Plugins {props.newPlugins && `(${props.newPlugins.length})`} 
          </div>
          <div className='flex-col'>
            {props.newPlugins.map((newPlugin, idx) => {
              const isFavorite = favorites.includes(newPlugin.pluginId);
              return (
                <div key={newPlugin.id} className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
                  <div className='text-3xl font text-gray-400 px-5'>
                    <div>{String(idx+1).padStart(2, '0')}.</div>
                    {isFavorite && <div>🤩</div>}
                  </div>
                  <div>
                    <a href={`https://github.com/${newPlugin.repo}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{newPlugin.name}</a>
                    <Favorites plugin={newPlugin} isFavorite={isFavorite} setFavorites={setFavorites} />
                    <div className='text-sm'>{moment(newPlugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{newPlugin.author}</span></div>
                    <div className='mr-5'>{newPlugin.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const daysAgo = (days: number) => Date.now() - (days * 24 * 60 * 60 * 1000)

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
