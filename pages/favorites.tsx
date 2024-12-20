import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from '@prisma/client';
import { setupFavorites } from '../utils/favorites';
import NewPluginsList from '../components/NewPluginsList';
import { NoFavPlugins } from '../components/FavPluginUpdates';
import { daysAgo, isNotXDaysOld } from '../utils/datetime';
import CardAnnotations from '../components/CardAnnotations';
import InfoBar from '../components/InfoBar';
import moment from 'moment';
import { PluginsCache } from '../cache/plugins-cache';

const Favorites = (props) => {
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
      <Header />
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
              <NewPluginsList
                plugins={favoritedPlugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showLatestRelease={true}
                displayDate={(plugin) => plugin.latestReleaseAt}
                showChangelog={true}
                showDescription={false}
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

  return { props: { plugins, newReleases } };
};

export default Favorites;
