'use client'

import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/HeaderAll';
import Navbar from '../components/Navbar';

import { useSearchParams } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import AllPluginsList from '../components/AllPluinsList';
import { Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { PluginsCache } from '../cache/plugins-cache';
import NewPluginsList from '../components/NewPluginsList';
import InfoBar from '../components/InfoBar';

const Plugins = (props) => {
  const searchParams = useSearchParams()
  const pluginIds: string[] = searchParams.get('plugins')?.split(',').map(p => p.trim()) ?? []
  const author = searchParams.get('author')
  const title = searchParams.get('title')

  const filteredPlugins = pluginIds.map(pluginId => props.plugins.find(p => p.pluginId === pluginId)).filter(p => !!p) ?? []
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header />
        <div>
          <Navbar current="all" />
        </div>
        
        <div className="bg-white pt-5 grow">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            {title &&
              <InfoBar title={title} />
            }
            {author &&
              <div className='mt-1 mb-4'>{author} has shared {filteredPlugins.length} plugins.</div>
            }
            {pluginIds && pluginIds.length && 
              <NewPluginsList
                plugins={filteredPlugins}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  plugins.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  return { props: { plugins } };
};

export default Plugins;
