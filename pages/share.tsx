'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import { useSearchParams } from 'next/navigation';
import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { Tabs } from 'flowbite-react';
import { PluginsCache } from '../cache/plugins-cache';
import { PluginsListView } from '../components/PluginsListView';
import InfoBar from '../components/InfoBar';
import { List, Table } from 'react-feather';
import { PluginsComparisionTable } from '../components/PluginsComparisionTable';

import { CustomFlowbiteTheme } from 'flowbite-react';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../components/Header';

const customTheme: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      variant: {
        default: {
          active: {
            on: 'bg-gray-100 text-violet-600 dark:bg-gray-800 dark:text-violet-500',
          },
        },
        underline: {
          active: {
            on: 'active rounded-t-lg border-b-2 border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-500',
          },
        },
      },
    },
  },
};

interface ISharePageProps extends IHeaderProps {
  plugins: any[];
  pluginIds?: string[];
}

const Plugins = (props: ISharePageProps) => {
  const searchParams = useSearchParams();
  const pluginIds: string[] =
    (props?.pluginIds ||
      searchParams
        .get('plugins')
        ?.split(',')
        .map((p) => p.trim())) ??
    [];
  const author = searchParams.get('author');
  const title = searchParams.get('title');

  const filteredPlugins =
    pluginIds
      .map((pluginId) => props.plugins.find((p) => p.pluginId === pluginId))
      .filter((p) => !!p) ?? [];
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header {...props} />
        <Navbar current="all" />

        <div className="bg-white pt-5 grow">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            {title && <InfoBar title={title} />}
            {author && (
              <div className="mt-1">
                {author} has shared {filteredPlugins.length} plugins.
              </div>
            )}
            <PluginsShareView
              pluginIds={pluginIds}
              filteredPlugins={filteredPlugins}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export const PluginsShareView = (props) => {
  const { pluginIds, plugins, favorites, setFavorites } = props;
  return (
    <>
      {pluginIds && pluginIds.length && (
        <div className="mt-4">
          <Tabs aria-label="View" variant="underline" theme={customTheme}>
            <Tabs.Item active title="List" icon={List}>
              <PluginsListView
                plugins={plugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showDownloadStat={true}
              />
            </Tabs.Item>
            <Tabs.Item title="Table" icon={Table}>
              <PluginsComparisionTable
                plugins={plugins}
              />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  plugins.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  const title = 'Obsidian Plugins Share - Compare and Discover Plugins'
  const description = 'Add a list of plugins and compare them. Use this to share a list of plugins with others for quick comparison and discovery.'
  const canonical = "https://obsidianstats.com/share";
  const image = "https://www.obsidianstats.com/logo-512.png"
  const jsonLdSchema = JsonLdSchema.getSharePageSchema(title, description, canonical, image);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugins
    }
  };
};

export default Plugins;
