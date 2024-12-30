import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { setupFavorites } from '../utils/favorites';
import { PluginsCache } from '../cache/plugins-cache';
import InfoBar from '../components/InfoBar';
import { Info } from 'react-feather';
import { Tooltip } from 'flowbite-react';
import Image from 'next/image';
import { PluginsMultiView } from '../components/PluginsMultiView';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import { Plugin } from '@prisma/client';

interface ITrendingPageProps extends IHeaderProps {
  plugins: Plugin[];
}

const Trending = (props: ITrendingPageProps) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header {...props} />
      <div>
        <Navbar current="trending" />
      </div>
      <div className="bg-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-3xl py-5 text-bold">
            <div className="flex items-baseline">
              <InfoBar title="Trending" />
              <Tooltip
                content="Trending is calculated using the z-score based on the download count for the past 90 days."
                placement="right"
              >
                <Info size={16} className="text-gray-700" />
              </Tooltip>
            </div>
            <Image
              src="/images/trending-plugins.webp"
              alt="Trending Plugins"
              width={1200}
              height={200}
            />
          </div>
          <PluginsMultiView
            plugins={props.plugins}
            favorites={favorites}
            setFavorites={setFavorites}
            showDescription={true}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  const trendingPlugins = [...plugins]
    .sort((a, b) => b.zScoreTrending - a.zScoreTrending)
    .slice(0, 10);

  const title = 'Trending Obsidian Plugins - Top 10 Plugins of from the last 90 days or 3 months based on downloads and z-score'
  const description = `Discover the top 10 trending Obsidian plugins of the month. ${trendingPlugins.map((plugin) => plugin.name).join(', ')}`
  const canonical = 'https://obsidian-plugin-stats.ganesshkumar.com/trending'
  const image = 'https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png'
  const jsonLdSchema = JsonLdSchema.getTrendingPageSchema(trendingPlugins, title, description, canonical, image)

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugins: trendingPlugins,
    },
  };
};

export default Trending;
