import React, { useEffect, useMemo, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';

import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { PluginsMultiView } from '../components/PluginsMultiView';
import InfoBar from '../components/InfoBar';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import { Tabs } from 'flowbite-react';
import { CustomTheme } from '../lib/customThemes';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';
import { PluginItem } from '@/domain/plugins/models/PluginItem';
import { Card } from '@/components/ui/card';

interface IMostDownloadedProps extends IHeaderProps {
  pluginsDataUrl: string;
}

const MostDownloaded = (props: IMostDownloadedProps) => {
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState<'list' | 'table'>('list');
  const [allTime, setAllTime] = useState<IPluginsListItem[]>([]);
  const [last30, setLast30] = useState<IPluginsListItem[]>([]);
  const [last7, setLast7] = useState<IPluginsListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const response = await fetch(props.pluginsDataUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `{
              mostDownloaded(limit: 25) {
                pluginId
                name
                author
                description
                osDescription
                osCategory
                osTags
                repo
                createdAt
                totalDownloads
                score
              }
              last30: mostDownloadedInDays(days: 30, limit: 25) {
                pluginId
                name
                author
                description
                osDescription
                osCategory
                osTags
                repo
                createdAt
                totalDownloads
                score
              }
              last7: mostDownloadedInDays(days: 7, limit: 25) {
                pluginId
                name
                author
                description
                osDescription
                osCategory
                osTags
                repo
                createdAt
                totalDownloads
                score
              }
            }`,
          }),
        });
        const data = await response.json();
        if (!cancelled) {
          setAllTime(data?.data?.mostDownloaded ?? []);
          setLast30(data?.data?.last30 ?? []);
          setLast7(data?.data?.last7 ?? []);
        }
      } catch (err) {
        console.error('Failed to load most downloaded data', err);
        if (!cancelled) {
          setAllTime([]);
          setLast30([]);
          setLast7([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [props.pluginsDataUrl]);

  const toPluginItems = (items: IPluginsListItem[]): PluginItem[] =>
    items.map((p) => ({
      pluginId: p.pluginId,
      name: p.name ?? '',
      author: p.author ?? '',
      createdAt: p.createdAt ?? 0,
      totalDownloads: p.totalDownloads ?? 0,
      repo: p.repo,
      osCategory: p.osCategory,
      osTags: p.osTags,
      osDescription: p.osDescription,
      description: p.description,
      score: p.score ?? undefined,
    }));

  const allTimeItems = useMemo(() => toPluginItems(allTime), [allTime]);
  const last30Items = useMemo(() => toPluginItems(last30), [last30]);
  const last7Items = useMemo(() => toPluginItems(last7), [last7]);

  const renderSkeleton = () => (
    <div className="flex flex-col gap-y-4" aria-busy="true" aria-label="Loading most downloaded">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={`md-skel-${idx}`} className="animate-pulse px-4 py-3">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <Header {...props} />
      <Navbar current="most-downloaded" />
      {/* New Plugins */}
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar
            title={`Most Downloaded ${allTime?.length ? `(${allTime.length})` : ''}`}
          />
          <Tabs theme={CustomTheme.tabs}>
            <Tabs.Item title="All Time" active>
              {isLoading ? (
                renderSkeleton()
              ) : (
                <PluginsMultiView
                  plugins={allTimeItems}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  showDescription={true}
                  showDownloads={true}
                  showCreatedAt={false}
                  showAuthor={false}
                  view={view}
                  setView={setView}
                />
              )}
            </Tabs.Item>
            <Tabs.Item title="Last 30 Days">
              {isLoading ? (
                renderSkeleton()
              ) : (
                <PluginsMultiView
                  plugins={last30Items}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  showDescription={true}
                  showDownloads={true}
                  showCreatedAt={false}
                  showAuthor={false}
                  view={view}
                  setView={setView}
                />
              )}
            </Tabs.Item>
            <Tabs.Item title="Last 7 Days">
              {isLoading ? (
                renderSkeleton()
              ) : (
                <PluginsMultiView
                  plugins={last7Items}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  showDescription={true}
                  showDownloads={true}
                  showCreatedAt={false}
                  showAuthor={false}
                  view={view}
                  setView={setView}
                />
              )}
            </Tabs.Item>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const title = 'Most Downloaded Obsidian Plugins';
  const description = `Discover the most downloaded Obsidian plugins in the last week, month, and all time.`;
  const canonical = 'https://obsidianstats.com/most-downloaded';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getMostDownloadedPageSchema(
    [],
    title,
    description,
    canonical,
    image
  );

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      pluginsDataUrl: '/api/graphql',
    },
    revalidate: 7200,
  };
};

export default MostDownloaded;
