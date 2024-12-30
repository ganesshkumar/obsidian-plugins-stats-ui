import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderUpdates';
import Navbar from '../components/Navbar';
import { Footer }from '../components/Footer';

import { PrismaClient } from '@prisma/client';
import { setupFavorites } from '../utils/favorites';
import { daysAgo } from '../utils/datetime';
import { List } from 'flowbite-react';
import Link from 'next/link';
import moment from 'moment';
import Favorites from '../components/Favorites';
import showdown from 'showdown';
import { PluginsCache } from '../cache/plugins-cache';
import InfoBar from '../components/InfoBar';

const mdConverter = new showdown.Converter();
mdConverter.setFlavor('github');

const Updates = (props) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const pad = props.newReleases.length.toString().length;

  return (
    <div>
      <Header />
      <div>
        <Navbar current="updates" />
      </div>
      {/* New Releases */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <InfoBar
            title={`New Releases ${props.newReleases && `(${props.newReleases.length})`}`}
          />
          <List
            unstyled
            className="w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            {props.newReleases.map((plugin, idx) => (
              <List.Item
                key={idx + 1}
                className="!mt-0 py-2 px-2 w-full hover:bg-slate-50"
              >
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="text-xl">
                    {String(idx + 1).padStart(pad, '0')}.
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href={`/plugins/${plugin.pluginId}`}
                      className="text-xl font-semibold text-violet-800"
                    >
                      {plugin.name}
                    </Link>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <div className="flex gap-x-1">
                        <div>Version</div>
                        <span className="font-semibold">
                          {plugin.latestRelease}
                        </span>
                        <div>
                          released {moment(plugin.latestReleaseAt).fromNow()} by
                        </div>
                        <span className="text-gray-700">{plugin.author}</span>
                      </div>
                      <Favorites
                        plugin={plugin}
                        isFavorite={favorites.includes(plugin.pluginId)}
                        setFavorites={setFavorites}
                      />
                    </div>
                    <div className="my-2">
                      <details
                        id="changelog-details-expand"
                        data-details-id="d-changelog-details-expand"
                      >
                        <summary
                          className="text-sm text-violet-800"
                          id="changelog-expand"
                          data-summary-id="d-changelog-expand"
                        >
                          Changelog
                        </summary>
                        {!plugin.latestReleaseDesc ||
                        !plugin.latestReleaseDesc.trim() ? (
                          <div>No Changelog was added</div>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: mdConverter.makeHtml(
                                plugin.latestReleaseDesc
                              ),
                            }}
                          />
                        )}
                      </details>
                    </div>
                    <Link
                      href={`/plugins/${plugin.pluginId}`}
                      className="underline text-gray-600 font-seminbold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  const newReleases = plugins.filter(
    (plugin) => plugin.latestReleaseAt > daysAgo(10)
  );
  newReleases.sort((a, b) => b.latestReleaseAt - a.latestReleaseAt);

  return { props: { newReleases } };
};

export default Updates;
