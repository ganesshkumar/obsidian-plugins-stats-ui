
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Navbar, { itemClasses } from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import Footer from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import NewPluginsList from '../../components/NewPluginsList';

const Plugins = (props) => {
  const [filter, setFilter] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [filteredPlugins, setFilteredPlugins] = useState(props.plugins || [])

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  useEffect(() => {
    const filtered = props.plugins
      .filter(plugin => plugin.name.split(' ')
                        .map((word: string) => word.trim())
                        .map((word: string) => word.toLowerCase().startsWith(filter.toLowerCase()))
                        .some(startWithFilter => startWithFilter));
    setFilteredPlugins(filtered);
  }, [props.plugins, filter])
  
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
          <NewPluginsList plugins={filteredPlugins} favorites={favorites} setFavorites={setFavorites} />
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
