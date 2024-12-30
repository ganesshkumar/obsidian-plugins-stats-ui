import React from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { Footer } from '../../components/Footer';
import InfoBar from '../../components/InfoBar';
import { CategoryIcon } from '../../components/Category';
import { LinkButton } from '../../components/LinkButton';
import { Card } from 'flowbite-react';
import { PluginsCache } from '../../cache/plugins-cache';

const Categories = (props) => {
  return (
    <div>
      <Header />
      <div>
        <Navbar current="categories" />
      </div>
      <div className="bg-white pt-5">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title="Categories" />
          <div className="flex flex-col flex-wrap bg-white py-5 gap-y-4">
            {props.categories.sort().map((category) => {
              return (
                <Card
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
                        >
                          {category}
                        </Link>
                      </div>
                      <div className="ml-8">
                        has {props.pluginCountByCategories[category]} plugins
                      </div>
                    </div>
                    <div className="basis-1/2">
                      <div className="text-gray-700 font-semibold">
                        Top plugins:{' '}
                      </div>
                      <div className="grid grid-cols-2 mt-4 mb-8">
                        {props.topPluginsByCategories[category].map(
                          (plugin, idx) => {
                            return (
                              <Link
                                href={`/plugins/${plugin.pluginId}`}
                                key={plugin.pluginId}
                                className="flex items-center space-x-2 px-1 cursor-pointer text-sm text-gray-700 hover:bg-gray-700 hover:text-slate-100"
                              >
                                <span>
                                  {idx + 1}. {plugin.name}
                                </span>
                              </Link>
                            );
                          }
                        )}
                      </div>
                      {props.topPluginsByCategories[category].length === 10 && (
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
    if (!plugin || !plugin.aiCategories) {
      return;
    }
    if (categoriesData[plugin.aiCategories] === undefined) {
      categoriesData[plugin.aiCategories] = 0;
    }
    categoriesData[plugin.aiCategories]++;
  });

  const topPluginsByCategories: Record<string, any[]> = {};
  plugins.forEach((plugin) => {
    if (!plugin || !plugin.aiCategories) {
      return;
    }
    if (topPluginsByCategories[plugin.aiCategories] === undefined) {
      topPluginsByCategories[plugin.aiCategories] = [];
    }
    topPluginsByCategories[plugin.aiCategories].push(plugin);
  });

  Object.keys(topPluginsByCategories).forEach((category) => {
    topPluginsByCategories[category] = topPluginsByCategories[category]
      .sort((a, b) => b.totalDownloads - a.totalDownloads)
      .slice(0, 10);
  });

  return {
    props: {
      categories: Object.keys(categoriesData),
      pluginCountByCategories: categoriesData,
      topPluginsByCategories: topPluginsByCategories,
    },
  };
};

export default Categories;
