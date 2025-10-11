import React, { useEffect, useRef, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { RiCloseLargeFill } from "react-icons/ri";
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
import EthicalAd from '../components/EthicalAd';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { setFavorite } from '../utils/favorites';
import { useAnalytics } from '../lib/analytics/analytics';

interface IFavoritePageProps extends IHeaderProps {
  plugins: Plugin[];
  newReleases: Plugin[];
}

const Favorites = (props: IFavoritePageProps) => {
  const [favorites, setFavorites] = useState([]);
  const [importMode, setImportMode] = useState(false);
  const [importTextError, setImportTextError] = useState<string | null>(null);

  const pluginsListText = useRef<HTMLTextAreaElement>(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const favoritedPlugins = props.plugins.filter((plugin) =>
    favorites.includes(plugin.pluginId)
  );
  
  const updatesForFavPlugins = props.newReleases.filter((newRelease) =>
    favorites.includes(newRelease.pluginId)
  );

  const handleImportPlugins = () => {
    const pluginListText = pluginsListText.current?.value;
    trackEvent('Import plugins from Obsidian as favorites: text input');
    try {
      const parsed = JSON.parse(pluginListText);
      if (Array.isArray(parsed) && parsed.every(item => typeof item === 'string')) {
        parsed.forEach((pluginId: string) => {
          const isFavorite = favorites.includes(pluginId);
          const pluginExists = props.plugins.some(plugin => plugin.pluginId === pluginId);
          if (!isFavorite && pluginExists) {
            setFavorite(pluginId, setFavorites);
          }
        });
        setImportMode(false);
        setupFavorites(setFavorites);
        setImportTextError(null);
      } else {
        setImportTextError('Invalid format: Please paste a JSON array of plugin IDs (strings).');
        trackEvent('Import plugins from Obsidian as favorites: invalid json entered');
      }
    } catch (e) {
      setImportTextError('Invalid JSON: Please check your pasted content.');
      trackEvent('Import plugins from Obsidian as favorites: entered content is not JSON');
    }
  }

  return (
    <div>
      <Header {...props} />
      <div>
        <Navbar current="favorites" />
      </div>
      {/* Favorite Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <EthicalAd type="text" style="fixed-footer" placementId="favorites-text" />
          <div className='relative'> {/* to make the import button stick to the top left */}
            {!importMode &&
              <>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant="default"
                    className='bg-gray-900 hover:bg-gray-800 text-white cursor-pointer z-30'
                    onClick={() => setImportMode(true)}
                    id='import-favorites-trigger'
                    aria-expanded={importMode}
                  >
                    Import from Obsidian
                  </Button>
                </div>
              </>
            }
            {importMode && (
              <Card id='import-card' className='mt-4 shadow-lg border border-gray-200'>
                <CardHeader className='flex flex-row items-start justify-between space-y-0 pb-4'>
                  <CardTitle className='text-2xl font-bold text-gray-800'>Import Plugins from Obsidian</CardTitle>
                  <Button
                    variant='ghost'
                    size='icon'
                    aria-label='Close import panel'
                    onClick={() => setImportMode(false)}
                  >
                    <RiCloseLargeFill size={18} />
                  </Button>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='plugin-list-text' className='text-base font-medium'>
                      Paste the contents of <code>.obsidian/community-plugins.json</code>
                    </Label>
                    <Textarea
                      ref={pluginsListText}
                      id='plugin-list-text'
                      placeholder='["plugin-id-a", "plugin-id-b", ...]'
                      className='h-60 resize-none'
                    />
                  </div>
                  {importTextError && (
                    <div className='text-sm text-red-600'>{importTextError}</div>
                  )}
                  <div className='flex justify-end gap-2'>
                    <Button
                      variant='secondary'
                      onClick={() => setImportMode(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant='default'
                      className='bg-gray-900 hover:bg-gray-800 text-white'
                      onClick={handleImportPlugins}
                    >
                      Import
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Show plugin updates for the favorite plugins */}
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
            {/* Show no updates for favorite plugins if there favorites exist but no updates */}
            {(favoritedPlugins && favoritedPlugins.length > 0) && (!updatesForFavPlugins || updatesForFavPlugins.length === 0) && (
              <div className="bg-transparent mt-8">
                <div className="max-w-6xl mx-auto px-2">
                  <InfoBar title="New Versions of your favorite plugins" />
                  <div className="flex flex-col items-center justify-center text-gray-700">
                    <img src="/images/undraw/undraw_with-love.svg" alt="No updates" className="w-48 mx-auto mt-16 mb-8 opacity-50" />
                    <span className='text-center'>There are no new updates from your favorite plugins in the last 10 days</span>
                  </div>
                </div>
              </div>
            )}
            {/* Show how to favorite plugins when there are no favorites */}
            {favoritedPlugins && favoritedPlugins.length === 0 && (
              <div className='pt-4'>
                <NoFavPlugins />
              </div>
            )}
            {/* Show favorite plugins list */}
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

  const title =
    'Mark your favorite Obsidian plugins and stay updated on their latest releases';
  const description =
    'Discover and track your favorite Obsidian plugins with our comprehensive stats and updates. Stay informed about the latest releases, trending plugins, and more. Perfect for Obsidian enthusiasts looking to enhance their productivity and plugin management.';
  const canonical = 'https://www.obsidianstats.com/favorites';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getFavoritesPageSchema();

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugins,
      newReleases,
    },
  };
};

export default Favorites;
