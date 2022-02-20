
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import Footer from '../../components/Footer';
import Favorites from '../../components/Favorites';
import { setupFavorites } from '../../utils/favorites';

type Props = { };
type State = { };

const Plugins = (props) => {

  const [filter, setFilter] = useState('');
  const filteredPlugins = props.plugins
                            .filter(plugin => plugin.name.split(' ')
                                                .map((word: string) => word.trim())
                                                .map((word: string) => word.toLowerCase().startsWith(filter.toLowerCase()))
                                                .some(startWithFilter => startWithFilter))
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
  return (
    <div>
      <Header />
      <Navbar current='plugins' />
      {/* New Plugins */}
      <div className='bg-violet-50 pt-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🌳 ALL Plugins {props.plugins && `(${props.plugins.length})`} 
          </div>
          <div className='px-5 pb-5 bg-gray-50 relative'>
            <div className="absolute pointer-events-auto">
              <svg className="absolute text-slate-400 top-2 left-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input type='text' className='text-xl pl-8 w-full border border-violet-200 outline-violet-200 rounded h-9' placeholder='Search for plugins' onChange={e => setFilter(e.target.value)}/>
          </div>
          <div className='flex-col'>
            {filteredPlugins.map((plugin, idx) => {
              const isFavorite = favorites.includes(plugin.pluginId);
              return (
                <div key={plugin.id} className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
                  <div className='text-3xl font text-gray-400 px-5'>
                    <div>{String(idx+1).padStart(3, '0')}.</div>
                    {isFavorite && <div>🤩</div>}
                  </div>
                  <div>
                    <a href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
                    <Favorites plugin={plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
                    <div className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                    <div className='mr-5'>{plugin.description}</div>
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

export const getStaticProps = async () => {
  let prisma: PrismaClient = new PrismaClient();

  const plugins = await prisma.plugin.findMany({});
  plugins.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);

  return { props: { plugins } };
}

export default Plugins;
