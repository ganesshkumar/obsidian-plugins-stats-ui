import React, { useEffect, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';

import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { PluginsCache } from '../cache/plugins-cache';
import { PluginsMultiView } from '../components/PluginsMultiView';
import InfoBar from '../components/InfoBar';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import { getMostDownloadedPlugins } from '../lib/plugins';
import { Dropdown, Tabs } from 'flowbite-react';
import { CustomTheme } from '../lib/customThemes';

interface IMostDownloadedProps extends IHeaderProps {
  mostDownloaded: any[];
  mostDownloadedIn7Days: any[];
  mostDownloadedIn30Days: any[];
}

const MostDownloaded = (props: IMostDownloadedProps) => {
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState<'list' | 'table'>('list');

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header {...props} />
      <Navbar current="most-downloaded" />
      {/* New Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar
            title={`Most Downloaded ${props.mostDownloaded && `(${props.mostDownloaded.length})`}`}
          />
          <Tabs theme={CustomTheme.tabs}>
            <Tabs.Item title="All Time" active>
              <PluginsMultiView
                plugins={props.mostDownloaded}
                favorites={favorites}
                setFavorites={setFavorites}
                showDescription={true}
                showDownloads={true}
                showCreatedAt={false}
                showAuthor={false}
                view={view}
                setView={setView}
              />
            </Tabs.Item>
            <Tabs.Item title="Last 30 Days">
              <PluginsMultiView
                plugins={props.mostDownloadedIn30Days}
                favorites={favorites}
                setFavorites={setFavorites}
                showDescription={true}
                showDownloads={true}
                showCreatedAt={false}
                showAuthor={false}
                view={view}
                setView={setView}
              />
            </Tabs.Item>
            <Tabs.Item title="Last 7 Days">
              <PluginsMultiView
                plugins={props.mostDownloadedIn7Days}
                favorites={favorites}
                setFavorites={setFavorites}
                showDescription={true}
                showDownloads={true}
                showCreatedAt={false}
                showAuthor={false}
                view={view}
                setView={setView}
              />
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();

  const limit = 25;
  const mostDownloadedIn7Days = await getMostDownloadedPlugins(7, limit);
  const mostDownloadedIn30Days = await getMostDownloadedPlugins(30, limit);
  const mostDownloaded = plugins
    .sort((a, b) => b.totalDownloads - a.totalDownloads)
    .slice(0, limit);

  const title = 'Most Downloaded Obsidian Plugins';
  const description = `Discover the most downloaded Obsidian pluginsin the last week, month, year, and ever since the beginning. ${mostDownloaded
    .slice(0, 25)
    .map((p) => p.name)
    .join(', ')}`;
  const canonical = 'https://obsidianstats.com/most-downloaded';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getMostDownloadedPageSchema(
    mostDownloaded,
    title,
    description,
    canonical,
    image
  );

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      mostDownloaded,
      mostDownloadedIn7Days,
      mostDownloadedIn30Days,
    },
  };
};

export default MostDownloaded;
