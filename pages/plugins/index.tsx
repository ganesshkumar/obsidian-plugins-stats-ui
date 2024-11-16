
import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/HeaderAll';
import Navbar from '../../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Footer from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import AllPluginsList from '../../components/AllPluinsList';
import { Checkbox, Label, TextInput } from 'flowbite-react';

const Plugins = (props) => {
  const [filter, setFilter] = useState('');
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritedPlugins, setFavoritedPlugins] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  useEffect(() => {
      setFavoritedPlugins(props.plugins.filter(plugin => favorites.includes(plugin.pluginId)));
  }, [props.plugins, favorites]);

  const filteredPlugins = useMemo(() => {
    return props.plugins
      .filter(plugin => favoritesFilter ? favorites.includes(plugin.pluginId) : true)
      .filter(plugin => {
        return (plugin.name.toLowerCase().includes(filter.toLowerCase()) || plugin.description.toLowerCase().includes(filter.toLowerCase()));
      });
  }, [props.plugins, filter, favoritesFilter]);
  
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div>
        <Navbar current='all' />
      </div>
      {/* New Plugins */}
      <div className='bg-white pt-5 grow'>
        <div className='max-w-6xl mx-auto px-2 flex flex-col h-full'>
          <div className='text-2xl py-2 px-2 text-bold text-violet-900'>
            All Plugins 
          </div>
          <div className='text-xl py-2 px-2 text-semibold text-gray-800'>
            There are {props.plugins.length} plugins available from the community.
          </div>
          <div className='px-2 py-2 bg-white relative'>
            <div className="absolute pointer-events-auto">
              <svg className="absolute text-slate-400 top-2 left-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <TextInput id="search" type="text" placeholder="Search for plugins" color="purple" shadow onChange={e => setFilter(e.target.value)} />
          </div>
          <div className='pl-5 mb-4 bg-white flex'>
            <label className="cursor-pointer label">
              <div className='mr-5 label-text'>Filters: </div>
            </label>
            <div>
              <Checkbox id="filter-favorites" className='mr-2 cursor-pointer' onClick={() => setFavoritesFilter(!favoritesFilter)} color="purple" />
              <Label htmlFor="filter-favorites" className='cursor-pointer'>Favorites</Label>
            </div>
          </div>
          <AllPluginsList plugins={filteredPlugins} favorites={favorites} setFavorites={setFavorites} />
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
