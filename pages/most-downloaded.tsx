import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { PluginsCache } from '../cache/plugins-cache';
import { PluginsMultiView } from '../components/PluginsMultiView';
import InfoBar from '../components/InfoBar';

interface IMostDownloadedProps {
  mostDownloaded: any[];
}

const MostDownloaded = (props: IMostDownloadedProps) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Navbar current="most-downloaded" />
      </div>
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

  return { props: { mostDownloaded } };
};

export default MostDownloaded;
