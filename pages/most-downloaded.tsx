import React, { useEffect, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';

import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { PluginsCache } from '../cache/plugins-cache';
import { PluginsMultiView } from '../components/PluginsMultiView';
import InfoBar from '../components/InfoBar';
import { JsonLdSchema } from '../lib/jsonLdSchema';

interface IMostDownloadedProps extends IHeaderProps {
  mostDownloaded: any[];
}

const MostDownloaded = (props: IMostDownloadedProps) => {
  const [favorites, setFavorites] = useState([]);

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
          <div className="flex-col">
            <PluginsMultiView
              plugins={props.mostDownloaded}
              favorites={favorites}
              setFavorites={setFavorites}
              showDownloads={true}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async (context) => {
  const plugins = await PluginsCache.get();
  const mostDownloaded = plugins
    .sort((a, b) => b.totalDownloads - a.totalDownloads)
    .slice(0, 25);

  const title = "Most Downloaded Obsidian Plugins";
  const description = `Discover the most downloaded Obsidian pluginsin the last week, month, year, and ever since the beginning. ${mostDownloaded.slice(0, 25).map((p) => p.name).join(', ')}`;
  const canonical = "https://obsidian-plugins.com/most-downloaded";
  const image = "https://www.obsidianstats.com/logo-512.png"
  const jsonLdSchema = JsonLdSchema.getMostDownloadedPageSchema(mostDownloaded, title, description, canonical, image);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      mostDownloaded
    }
  };
};

export default MostDownloaded;
