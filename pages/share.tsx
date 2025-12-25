"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Navbar from '../components/Navbar';

import { useSearchParams } from 'next/navigation';
import { Footer } from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import { Tabs } from 'flowbite-react';
import { PluginsListView } from '../components/PluginsListView';
import InfoBar from '../components/InfoBar';
import { List, Table } from 'react-feather';
import { PluginsComparisionTable } from '../components/PluginsComparisionTable';

import { CustomFlowbiteTheme } from 'flowbite-react';
import { JsonLdSchema } from '../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../components/Header';
import EthicalAd from '../components/EthicalAd';
import { IPluginsListItem } from '@/domain/plugins/models/PluginsListItem';
import { PluginItem } from '@/domain/plugins/models/PluginItem';
import { Card } from '@/components/ui/card';
import { GET_PLUGINS_QUERY, type IPluginsQueryResult } from '@/lib/graphql/queries';

const customTheme: CustomFlowbiteTheme['tabs'] = {
  tablist: {
    tabitem: {
      variant: {
        default: {
          active: {
            on: 'bg-gray-100 text-violet-600 dark:bg-gray-800 dark:text-violet-500',
          },
        },
        underline: {
          active: {
            on: 'active rounded-t-lg border-b-2 border-violet-600 text-violet-600 dark:border-violet-500 dark:text-violet-500',
          },
        },
      },
    },
  },
};

interface ISharePageProps extends IHeaderProps {
  pluginIds?: string[];
}

const Plugins = (props: ISharePageProps) => {
  const searchParams = useSearchParams();
  const pluginIds: string[] = useMemo(() => {
    if (props?.pluginIds?.length) return props.pluginIds;
    const param = searchParams.get('plugins');
    return param
      ? param
          .split(',')
          .map((p) => p.trim())
          .filter(Boolean)
      : [];
  }, [props?.pluginIds, searchParams]);
  const author = searchParams.get('author');
  const title = searchParams.get('title');

  const [favorites, setFavorites] = useState<string[]>([]);
  const { data, loading, error } = useQuery<IPluginsQueryResult>(GET_PLUGINS_QUERY, {
    ssr: false,
  });
  const plugins = data?.plugins ?? [];
  const isLoading = loading;

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  useEffect(() => {
    if (error) {
      console.error('Failed to load plugins for share view', error);
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

  const filteredPlugins: PluginItem[] = useMemo(() => {
    if (!pluginIds?.length) return [];
    const matches = pluginIds
      .map((pluginId) => plugins.find((p) => p.pluginId === pluginId))
      .filter((p): p is IPluginsListItem => !!p);
    return toPluginItems(matches);
  }, [pluginIds, plugins]);

  const renderSkeleton = () => (
    <div
      className="flex flex-col gap-y-4"
      aria-busy="true"
      aria-label="Loading shared plugins"
    >
      {Array.from({ length: 5 }).map((_, idx) => (
        <Card key={`share-skel-${idx}`} className="animate-pulse px-4 py-3">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header {...props} />
        <Navbar current="all" />

        <div className="bg-white pt-5 grow">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            {title && <InfoBar title={title} />}
            {author && (
              <div className="mt-1">
                {author} has shared {filteredPlugins.length} plugins.
              </div>
            )}
            <EthicalAd
              type="text"
              style="fixed-footer"
              placementId="share-text"
            />
            {pluginIds && pluginIds.length ? (
              isLoading ? (
                renderSkeleton()
              ) : (
                <PluginsShareView
                  pluginIds={pluginIds}
                  plugins={filteredPlugins}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              )
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

interface IPluginsShareViewProps {
  pluginIds: string[];
  plugins: PluginItem[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
}

export const PluginsShareView = (props: IPluginsShareViewProps) => {
  const { pluginIds, plugins, favorites, setFavorites } = props;
  return (
    <>
      {pluginIds && pluginIds.length > 0 && (
        <div className="mt-4">
          <Tabs aria-label="View" variant="underline" theme={customTheme}>
            <Tabs.Item active title="List" icon={List}>
              <PluginsListView
                plugins={plugins}
                favorites={favorites}
                setFavorites={setFavorites}
                showDownloadStat={true}
              />
            </Tabs.Item>
            <Tabs.Item title="Table" icon={Table}>
              <PluginsComparisionTable plugins={plugins} />
            </Tabs.Item>
          </Tabs>
        </div>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const title = 'Obsidian Plugins Share - Compare and Discover Plugins';
  const description =
    'Add a list of plugins and compare them. Use this to share a list of plugins with others for quick comparison and discovery.';
  const canonical = 'https://obsidianstats.com/share';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getSharePageSchema(
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

export default Plugins;
