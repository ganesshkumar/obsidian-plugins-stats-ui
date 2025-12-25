import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Header, { IHeaderProps } from '../../components/Header';
import Navbar from '../../components/Navbar';

import Link from 'next/link';
import { Footer } from '../../components/Footer';
import InfoBar from '../../components/InfoBar';
import { CategoryIcon } from '../../components/Category';
import { LinkButton } from '../../components/LinkButton';
import { Card } from 'flowbite-react';
import { PluginsCache } from '../../cache/plugins-cache';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import { GET_CATEGORIES_LITE_QUERY, type ICategoriesLiteQueryResult } from '@/lib/graphql/queries';

interface ITopPluginLite {
  pluginId: string;
  name: string;
}

interface ICategoriesPayload {
  categories: string[];
  pluginCountByCategories: Record<string, number>;
  topPluginsByCategories: Record<string, ITopPluginLite[]>;
}

interface ICategoriesPageProps extends IHeaderProps {
  categoriesCount: number;
}

const Categories = (props: ICategoriesPageProps) => {
  const {
    data: categoriesResponse,
    loading,
    error,
  } = useQuery<ICategoriesLiteQueryResult>(GET_CATEGORIES_LITE_QUERY, {
    ssr: false,
  });

  const categoriesPayload = useMemo<ICategoriesPayload | null>(() => {
    const payload = categoriesResponse?.categoriesLite;
    if (!payload || !Array.isArray(payload)) return null;

    const categories = payload.map((item) => item.name);
    const pluginCountByCategories: Record<string, number> = {};
    const topPluginsByCategories: Record<string, ITopPluginLite[]> = {};

    payload.forEach((item) => {
      pluginCountByCategories[item.name] = item.pluginCount;
      topPluginsByCategories[item.name] = item.topPlugins ?? [];
    });

    return { categories, pluginCountByCategories, topPluginsByCategories };
  }, [categoriesResponse]);

  const isLoading = loading;

  useEffect(() => {
    if (error) {
      console.error('Failed to load categories data', error);
    }
  }, [error]);

  const renderSkeleton = () => (
    <div className="flex flex-col gap-y-4" aria-busy="true" aria-label="Loading categories">
      {Array.from({ length: 6 }).map((_, idx) => (
        <Card key={`cat-skel-${idx}`} className="animate-pulse px-4 py-3">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((__, jdx) => (
              <div key={`cat-skel-row-${idx}-${jdx}`} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const categories = categoriesPayload?.categories ?? [];
  const pluginCountByCategories = categoriesPayload?.pluginCountByCategories ?? {};
  const topPluginsByCategories = categoriesPayload?.topPluginsByCategories ?? {};

  return (
    <div>
      <Header {...props} />
      <div>
        <Navbar current="categories" />
      </div>
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title="Categories" />
          <div className="flex flex-col flex-wrap bg-white py-5 gap-y-4">
            {isLoading
              ? renderSkeleton()
              : categories.sort().map((category) => {
                  return (
                    <Card
                      key={category}
                      className="group px-4 py-2 hover:bg-gray-100 h-full"
                      id={`category-${category}`}
                    >
                      <div className="flex items-start">
                        <div className="basis-1/2 flex flex-col justify-center">
                          <div className="flex gap-x-2 items-center">
                            <CategoryIcon category={category} size={24} />
                            <Link
                              key={category}
                              href={`/categories/${category}`}
                              id={`category-${category}`}
                              className="text-xl font-bold underline text-gray-800"
                              prefetch={false}
                            >
                              {category}
                            </Link>
                          </div>
                          <div className="ml-8">
                            has {pluginCountByCategories[category] ?? 0} plugins
                          </div>
                        </div>
                        <div className="basis-1/2">
                          <div className="text-gray-700 font-semibold">
                            Top plugins:{' '}
                          </div>
                          <div className="grid grid-cols-2 mt-4 mb-8">
                            {topPluginsByCategories[category]?.map(
                              (plugin, idx) => {
                                return (
                                  <Link
                                    href={`/plugins/${plugin.pluginId}`}
                                    key={plugin.pluginId}
                                    className="flex items-center space-x-2 px-1 cursor-pointer text-sm text-gray-700 hover:bg-gray-700 hover:text-slate-100"
                                    prefetch={false}
                                  >
                                    <span>
                                      {idx + 1}. {plugin.name}
                                    </span>
                                  </Link>
                                );
                              }
                            )}
                          </div>
                          {topPluginsByCategories[category]?.length === 10 && (
                            <div className="self-end">
                              <LinkButton
                                href={`/categories/${category}`}
                                content="View all plugins"
                                size="small"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();
  const categoriesData: Record<string, number> = {};

  plugins.forEach((plugin) => {
    if (!plugin || !plugin.osCategory) {
      return;
    }
    if (categoriesData[plugin.osCategory] === undefined) {
      categoriesData[plugin.osCategory] = 0;
    }
    categoriesData[plugin.osCategory]++;
  });

  const topPluginsByCategories: Record<string, any[]> = {};
  plugins.forEach((plugin) => {
    if (!plugin || !plugin.osCategory) {
      return;
    }
    if (topPluginsByCategories[plugin.osCategory] === undefined) {
      topPluginsByCategories[plugin.osCategory] = [];
    }
    topPluginsByCategories[plugin.osCategory].push(plugin);
  });

  Object.keys(topPluginsByCategories).forEach((category) => {
    topPluginsByCategories[category] = topPluginsByCategories[category]
      .sort((a, b) => b.totalDownloads - a.totalDownloads)
      .slice(0, 10);
  });

  const title = 'Categories of Obsidian Plugins';
  const description = `Explore the categories of Obsidian plugins. Find the best plugins for your needs. ${Object.keys(categoriesData).join(', ')}`;
  const canonical = 'https://obsidianstats.com/categories';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getCategoriesPageSchema(
    Object.keys(categoriesData),
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
      categoriesCount: Object.keys(categoriesData).length,
    },
    revalidate: 7200,
  };
};

export default Categories;
