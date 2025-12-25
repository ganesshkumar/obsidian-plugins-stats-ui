import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
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
import { GET_MOST_DOWNLOADED_QUERY, type IMostDownloadedQueryResult } from '@/lib/graphql/queries';

interface IMostDownloadedProps extends IHeaderProps {}

const MostDownloaded = (props: IMostDownloadedProps) => {
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState<'list' | 'table'>('list');
  const { data, loading, error } = useQuery<IMostDownloadedQueryResult>(GET_MOST_DOWNLOADED_QUERY, {
    ssr: false,
  });
  const allTime = data?.mostDownloaded ?? [];
  const last30 = data?.last30 ?? [];
  const last7 = data?.last7 ?? [];
  const isLoading = loading;

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  useEffect(() => {
    if (error) {
      console.error('Failed to load most downloaded data', error);
    }
  }, [error]);

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
    },
    revalidate: 7200,
  };
};

export default MostDownloaded;
