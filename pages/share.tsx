'use client'

import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderAll';
import Navbar from '../components/Navbar';

import { useSearchParams } from 'next/navigation'
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { Tabs } from 'flowbite-react';
import { PluginsCache } from '../cache/plugins-cache';
import NewPluginsList from '../components/NewPluginsList';
import InfoBar from '../components/InfoBar';
import { List, Table } from 'react-feather';
import PluginsTable from '../components/PluginTable';

import { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      variant: {
        default: {
          active: {
            "on": "bg-gray-100 text-violet-600 dark:bg-gray-800 dark:text-violet-500"
          }
        },
        underline: {
          active: {
            "on": "active rounded-t-lg border-b-2 border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-500"
          }
        }
      }
    }
  },
};

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
              <div className='mt-1'>{author} has shared {filteredPlugins.length} plugins.</div>
            }
            
            {pluginIds && pluginIds.length && 
              <div className='mt-4'>
                <Tabs aria-label="View" variant="underline" theme={customTheme}>
                  <Tabs.Item active title="List" icon={List}>
                    <NewPluginsList
                      plugins={filteredPlugins}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      showDownloadStat={true}
                    />
                  </Tabs.Item>
                  <Tabs.Item title="Table" icon={Table}>
                    <PluginsTable
                      plugins={filteredPlugins}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      showDownloadStat={true}
                    />
                  </Tabs.Item>
                </Tabs>
              </div>
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
