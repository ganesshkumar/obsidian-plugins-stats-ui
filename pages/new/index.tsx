import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

import { Footer } from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import { daysAgo } from '../../utils/datetime';
import InfoBar from '../../components/InfoBar';
import { PluginsCache } from '../../cache/plugins-cache';
import Image from 'next/image';
import Link from 'next/link';
import { PluginsMultiView } from '../../components/PluginsMultiView';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import { ThemesCache } from '@/cache/themes-cache';
import {
  Theme as ThemeRecord,
} from '@prisma/client';
import { Entity, EntityType } from '@/domain/Entity';
import { toPluginItem } from '@/utils/plugins';
import { PluginItem } from '@/domain/plugins/models/PluginItem';

interface INewPageProps extends IHeaderProps {
  newPlugins: PluginItem[];
  newThemes: ThemeRecord[];
  newEntities: Entity[];
}

const New = (props: INewPageProps) => {
  const [favorites, setFavorites] = useState([]);
  const newPluginsCount = props.newEntities.filter(e => e.type === EntityType.Plugin).length;
  const newThemesCount = props.newEntities.filter(e => e.type === EntityType.Theme).length;

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
            title={`New Plugins ${newPluginsCount && `(${newPluginsCount})`} ${newThemesCount ? `& Themes (${newThemesCount})` : ''}`}
          />
          {props.newEntities.length === 0 ? (
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
                    <Link
                      href="/trending"
                      className="underline"
                      prefetch={false}
                    >
                      trending plugins
                    </Link>
                    .
                  </li>
                  <li>
                    View{' '}
                    <Link
                      href="/most-downloaded"
                      className="underline"
                      prefetch={false}
                    >
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
                entities={props.newEntities}
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
  const themes = await ThemesCache.get();

  const newPlugins = plugins.filter((plugin) => plugin.createdAt > daysAgo(10));
  newPlugins.sort((a, b) => b.createdAt - a.createdAt);

  const newThemes = themes.filter((theme) => theme.createdAt > daysAgo(10));
  newThemes.sort((a, b) => b.createdAt - a.createdAt);

  const title =
    'Latest Obsidian Plugins & Themes - Discover the new plugins and themes that got released in Last 7 days, 10 Days, 1 Month, 6 Months, and 1 Year';
  const description = `Discover the newest Obsidian plugins and themes released in the past 7 days, 10 Days, 1 Month, 6 Months, and 1 Year. ${newPlugins
    .slice(0, 20)
    .map((plugin) => plugin.name)
    .join(', ')}`;
  const canonical = 'https://www.obsidianstats.com/new';
  const image = 'https://www.obsidianstats.com/images/new-og.webp';
  const jsonLdSchema = JsonLdSchema.getNewPageSchema(
    newPlugins,
    newThemes,
    title,
    description,
    canonical,
    image
  );

  const newEntities: Entity[] = [];
  newPlugins.forEach((plugin) => {
    newEntities.push({
      id: plugin.pluginId,
      type: EntityType.Plugin,
      data: plugin,
    });
  });
  newThemes.forEach((theme) => {
    newEntities.push({
      id: theme.repo,
      type: EntityType.Theme,
      data: theme,
    });
  });

  newEntities.sort((a, b) => b.data.createdAt - a.data.createdAt);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      newPlugins: newPlugins.map(toPluginItem),
      newThemes,
      newEntities,
    },
  };
};

export default New;
