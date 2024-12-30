import React, { useEffect, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

import { setupFavorites } from '../utils/favorites';
import { NoFavPlugins } from '../components/FavPluginUpdates';
import { daysAgo, isNotXDaysOld } from '../utils/datetime';
import CardAnnotations from '../components/CardAnnotations';
import InfoBar from '../components/InfoBar';
import moment from 'moment';
import { PluginsCache } from '../cache/plugins-cache';
import { PluginsMultiView } from '../components/PluginsMultiView';
import { Plugin } from '@prisma/client';
import { JsonLdSchema } from '../lib/jsonLdSchema';

interface IFavoritePageProps extends IHeaderProps {
  plugins: Plugin[];
  newReleases: Plugin[];
}

const Favorites = (props: IFavoritePageProps) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const favoritedPlugins = props.plugins.filter((plugin) =>
    favorites.includes(plugin.pluginId)
  );
  const updatesForFavPlugins = props.newReleases.filter((newRelease) =>
    favorites.includes(newRelease.pluginId)
  );

  return (
    <div>
      <Header {...props} />
      <div>
        <Navbar current="favorites" />
      </div>
      {/* Favorite Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          {updatesForFavPlugins && updatesForFavPlugins.length > 0 && (
            <div className="bg-transparent mt-8">
              <div className="max-w-6xl mx-auto px-2">
                <InfoBar title="New Versions of your favorite plugins" />
                <div>
                  There are {updatesForFavPlugins?.length || 0} new updates from
                  the last 10 days
                </div>
                <div className="flex flex-wrap gap-4 pt-5 mx-4">
                  {updatesForFavPlugins.slice(0, 6).map((newRelease, idx) => {
                    const isFavorite = favorites.includes(newRelease.pluginId);
                    const isTrending = newRelease.zScoreTrending > 10;
                    return (
                      <a
                        key={newRelease.id}
                        href={`/plugins/${newRelease.pluginId}`}
                        target="_blank"
                        rel="noreferrer"
                        id={`fav-plugin-update-${idx}`}
                        className="flex-col group rounded-md shrink-0 w-48 px-5 py-2 text-gray-700 transition hover:-translate-y-1 hover:scale-105 border shadow-lg"
                      >
                        <div className="flex flex-none justify-between">
                          <div className="py-2">
                            <div className="text-lg font-semibold tracking-wide text-violet-900">
                              {newRelease.name}
                            </div>
                            <div className="text-sm text-gray-700">
                              v
                              <span className="text-violet-900 text-base font-semibold">
                                {newRelease.latestRelease}
                              </span>
                            </div>
                            <div className="text-sm">
                              released{' '}
                              {moment(newRelease.latestReleaseAt).fromNow()}
                            </div>
                            <div className="text-sm">
                              by {newRelease.author}
                            </div>
                          </div>
                        </div>
                        <CardAnnotations
                          isFavorite={false}
                          isNotADayOld={isNotXDaysOld(
                            newRelease.latestReleaseAt,
                            1
                          )}
                          isTrending={isTrending}
                          category="Update"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {favoritedPlugins && favoritedPlugins.length === 0 && (
            <NoFavPlugins />
          )}
          {favoritedPlugins && favoritedPlugins.length > 0 && (
            <div className="flex-col">
              <div className="text-3xl pt-8 pb-2 text-bold text-violet-900">
                <InfoBar
                  title={`Favorite Plugins ${favoritedPlugins && `(${favoritedPlugins.length})`}`}
                />
              </div>
              <PluginsMultiView
                plugins={favoritedPlugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showDescription={true}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  plugins.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  const newReleases = plugins.filter(
    (plugin) => plugin.latestReleaseAt > daysAgo(10)
  );
  newReleases.sort((a, b) => b.latestReleaseAt - a.latestReleaseAt);

  const title = "Mark your favorite Obsidian plugins and stay updated on their latest releases"
  const description = "Discover and track your favorite Obsidian plugins with our comprehensive stats and updates. Stay informed about the latest releases, trending plugins, and more. Perfect for Obsidian enthusiasts looking to enhance their productivity and plugin management."
  const canonical = "https://obsidian-plugin-stats.ganesshkumar.com/favorites"
  const image = "https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png"
  const jsonLdSchema = JsonLdSchema.getFavoritesPageSchema()

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugins,
      newReleases
    }
  };
};

export default Favorites;
