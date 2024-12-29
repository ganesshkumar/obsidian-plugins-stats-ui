import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { setupFavorites } from '../utils/favorites';
import { PluginsCache } from '../cache/plugins-cache';
import InfoBar from '../components/InfoBar';
import { Info } from 'react-feather';
import { Tooltip } from 'flowbite-react';
import Image from 'next/image';
import { PluginsMultiView } from '../components/PluginsMultiView';

const Trending = ({ plugins }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
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
            plugins={plugins}
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

  return {
    props: {
      plugins: trendingPlugins,
    },
  };
};

export default Trending;
