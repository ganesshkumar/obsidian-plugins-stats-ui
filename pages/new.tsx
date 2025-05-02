import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { daysAgo } from '../utils/datetime';
import InfoBar from '../components/InfoBar';
import { PluginsCache } from '../cache/plugins-cache';
import Image from 'next/image';
import Link from 'next/link';
import { PluginsMultiView } from '../components/PluginsMultiView';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../components/Header';

interface INewPageProps extends IHeaderProps {
  newPlugins: any[];
}

const New = (props: INewPageProps) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div className="flex flex-col">
      <Header {...props} />
      <Navbar current="new" />
      {/* New Plugins */}
      <main className="bg-white pt-5 grow">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar
            title={`New Plugins ${props.newPlugins && `(${props.newPlugins.length})`}`}
          />
          {props.newPlugins.length === 0 ? (
            <div className="grid md:grid-cols-2 grow mt-8 md:mt-24 gap-y-4">
              <div className="w-full flex justify-center items-center">
                <Image
                  src="/images/undraw/empty.svg"
                  alt="empty"
                  width={384}
                  height={384}
                />
              </div>
              <div className="grid content-center px-8">
                <h2 className="text-2xl">No new plugins available.</h2>
                <ul className="list-disc list-inside mt-2">
                  <li>
                    Take a look at{' '}
                    <Link href="/trending" className="underline" prefetch={false}>
                      trending plugins
                    </Link>
                    .
                  </li>
                  <li>
                    View{' '}
                    <Link href="/most-downloaded" className="underline" prefetch={false}>
                      most downloaded plugins
                    </Link>
                    .
                  </li>
                  <li>
                    Read our{' '}
                    <Link href="/posts" className="underline" prefetch={false}>
                      latest post
                    </Link>
                    .
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-col">
              <PluginsMultiView
                plugins={props.newPlugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showDescription={true}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  const newPlugins = plugins.filter((plugin) => plugin.createdAt > daysAgo(10));
  newPlugins.sort((a, b) => b.createdAt - a.createdAt);

  const title = "New Obsidian Plugins - New plugins that got released in Last 7 days, 10 Days, 1 Month, 6 Months, and 1 Year";
  const description = `Explore the newest Obsidian plugins released in the past 7 days, 10 Days, 1 Month, 6 Months, and 1 Year. ${newPlugins.slice(0, 20).map((plugin) => plugin.name).join(', ')}`;
  const canonical = "https://www.obsidianstats.com/new";
  const image = "/images/obsidian-stats-ogImage.png";
  const jsonLdSchema = JsonLdSchema.getNewPageSchema(newPlugins, title, description, canonical, image);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      newPlugins
    }
  };
};

export default New;
