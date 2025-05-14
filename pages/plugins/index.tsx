'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { Footer } from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import { AllPluginsMultiView } from '../../components/AllPluginsMultiView';
import { Button, Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { PluginsCache } from '../../cache/plugins-cache';
import { List as ListIcon, Table as TableIcon, Tool } from 'react-feather';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import { useScoreListStore, useScorerStore } from '../../store/scorer-store';
import { useCustomScoreWithScoreUpdater } from '../../hooks/useCustomScoreWithScoreUpdater';
import { Plugin } from '@prisma/client';
import EthicalAd from '../../components/EthicalAd';
import ResponsiveLayout from '../_responsive-layout';
import { getGraidentFrom, getGraidentTo } from '../../lib/customThemes';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import { generateSuggestions } from '../../domain/suggestions';
import { Suggestions } from '../../domain/suggestions/models';
import { Sidebar } from '../../components/Sidebar';

const sortByOptions = {
  alphabet_asc: 'Alphabetical (A-Z)',
  alphabet_desc: 'Alphabetical (Z-A)',
  createdAt_desc: 'Newest Plugins',
  //date_desc: 'Date (Newest)',
  downloaded_desc: 'Most Downloaded',
  relevance: 'Relevance',
  score_desc: 'Score (High to Low)',
  score_asc: 'Score (Low to High)',
};

const filterCategoryOptions = {
  all: 'All Categories',
  taskManagement: 'Task Management',
  fileManagement: 'File Management',
  noteEnhancements: 'Note Enhancements',
  dataVisualization: 'Data Visualization',
  thirdPartyIntegrations: '3rd Party Integrations',
  productivityTools: 'Productivity Tools',
  codingAndTechnicalTools: 'Coding & Technical Tools',
  creativeAndWritingTools: 'Creative & Writing Tools',
  privacyAndSecurity: 'Privacy & Security',
  customizationAndUI: 'Customization & UI',
  collaborationAndSharing: 'Collaboration & Sharing',
  learningAndknowledgeManagement: 'Learning & Knowledge Management',
  miscellaneous: 'Miscellaneous',
  uncategorized: 'Uncategorized',
};

const exactMatch = (query: string, text: string) => {
  if (!query || !text) {
    return false;
  }
  const regex = new RegExp(`\\b${query}\\b`, 'i');
  return regex.test(text);
};

const queryPlugins = (query: string, plugins: any[] = []): any[] => {
  if (!query) {
    return plugins;
  }

  const result = [];
  const helperSet = new Set();

  const addToResult = (plugins) => {
    plugins.forEach((plugin) => {
      if (!helperSet.has(plugin.pluginId)) {
        helperSet.add(plugin.pluginId);
        result.push(plugin);
      }
    });
  };

  addToResult(
    plugins.filter((plugin) => {
      return exactMatch(query, plugin.name);
    })
  );
  // addToResult(
  //   plugins.filter((plugin) => {
  //     return exactMatch(query, plugin.description);
  //   })
  // );
  addToResult(
    plugins.filter((plugin) => {
      return exactMatch(query, plugin.author);
    })
  );

  const queryParts = query.split(' ').filter((part) => !!part);
  addToResult(
    queryParts
      .map((part) => plugins.filter((plugin) => exactMatch(part, plugin.name)))
      .flat()
  );
  addToResult(
    queryParts
      .map((part) =>
        plugins.filter((plugin) => exactMatch(part, plugin.description))
      )
      .flat()
  );
  addToResult(
    queryParts
      .map((part) =>
        plugins.filter((plugin) => exactMatch(part, plugin.author))
      )
      .flat()
  );

  addToResult(
    plugins.filter((plugin) =>
      plugin.name
        ?.toLowerCase()
        .split(' ')
        .some((part) => part.startsWith(query.toLowerCase()))
    )
  );
  addToResult(
    plugins.filter((plugin) =>
      plugin.description
        ?.toLowerCase()
        .split(' ')
        .some((part) => part.startsWith(query.toLowerCase()))
    )
  );
  addToResult(
    plugins.filter((plugin) =>
      plugin.author
        ?.toLowerCase()
        .split(' ')
        .some((part) => part.startsWith(query.toLowerCase()))
    )
  );

  return result;
};

function countOccurrences(text: string, token: string): number {
  const regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'); // escape token
  return (text.match(regex) || []).length;
}

const queryPluginsV2 = (query: string, plugins: Plugin[] = []): Plugin[] => {
  if (!query) {
    return plugins;
  }

  const results: {
    plugin: Plugin;
    score: number;
  }[] = [];

  query = query.toLowerCase();
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  plugins.forEach((plugin) => {
    const nameLower = plugin.name.toLowerCase();
    const descriptionLower = (plugin.description ?? '').toLowerCase();
    const authorLower = (plugin.author ?? '').toLowerCase();

    const text = `${nameLower} ${descriptionLower} ${authorLower}`;
    const isMatch = tokens.every((token) => text.includes(token));

    if (!isMatch) {
      return;
    }

    let score = 0;
    if (nameLower === query) {
      score = 1000;
    } else if (authorLower == query) {
      score = 500;
    } else {
      if (tokens.length > 1) {
        score += nameLower.includes(query) ? 90 : 0;
        score += descriptionLower.includes(query) ? 60 : 0;
        score += authorLower.includes(query) ? 30 : 0;
      }

      for (const token of tokens) {
        score += countOccurrences(nameLower, token) * 3;
        score += countOccurrences(descriptionLower, token) * 2;
        score += countOccurrences(authorLower, token) * 1;
      }
    }

    results.push({ plugin, score });
  });

  return results.sort((a, b) => b.score - a.score).map((item) => item.plugin);
};

interface IPageProps extends IHeaderProps {
  plugins: Plugin[];
  suggestions: Suggestions;
}

const Plugins = (props: IPageProps) => {
  const router = useRouter();
  const { query } = router;

  const getActiveScorer = useScorerStore((state) => state.getActiveScorer);
  const pluginsScoreMap = useScoreListStore((state) => state.scores);

  const [filter, setFilter] = useState<string>('');
  const [favoritesFilter, setFavoritesFilter] = useState(query.fav === 'true');
  const [favorites, setFavorites] = useState([]);
  const [sortby, setSortby] = useState('createdAt_desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [view, setView] = useState('list');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const plugins = useCustomScoreWithScoreUpdater(props.plugins);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const updateQuery = (newQuery) => {
    const updatedQuery = { ...query, ...newQuery };
    router.replace(
      { pathname: router.pathname, query: updatedQuery },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (query.q !== undefined) {
      const q = Array.isArray(query.q) ? query.q[0] : query.q;
      setFilter(q);
    }
    if (query.fav !== undefined) {
      setFavoritesFilter(query.fav === 'true');
    }
    if (query.category !== undefined) {
      const c = Array.isArray(query.category)
        ? query.category[0]
        : query.category;
      setFilterCategory(c);
    }
    if (query.sortby !== undefined) {
      const s = Array.isArray(query.sortby) ? query.sortby[0] : query.sortby;
      setSortby(s);
    }
    if (query.view !== undefined) {
      const v = Array.isArray(query.view) ? query.view[0] : query.view;
      setView(v);
    }
  }, [query]);

  const handleFilterChange = (e) => {
    if (filter.length === 0 && e.target.value.length === 1) {
      setSortby('relevance');
    }

    const value = e.target.value;
    setFilter(value);
    updateQuery({ q: value });
  };

  const handleFavoritesFilterChange = (e) => {
    const value = e.target.checked;
    setFavoritesFilter(value);
    updateQuery({ fav: value });
  };

  const handleFilterCategoryChange = (value) => {
    setFilterCategory(value);
    updateQuery({ category: value });
  };

  const handleSorytbyChange = (value) => {
    setSortby(value);
    updateQuery({ sortby: value });
  };

  const handleViewChange = (value) => {
    setView(value);
    updateQuery({ view: value });
  };

  const isPluginInFavorites = (plugin: Plugin) =>
    favoritesFilter ? favorites.includes(plugin.pluginId) : true;

  const isPluginInFilterCategory = (plugin: Plugin) => {
    if (filterCategory === 'all') {
      return true;
    }
    return plugin.osCategory === filterCategoryOptions[filterCategory];
  };

  const filteredPlugins = useMemo(() => {
    const filterLowerCase = filter.toLowerCase();

    const favAndCategoryFilteredPlugins = [...plugins]
      .filter(isPluginInFavorites)
      .filter(isPluginInFilterCategory);

    const queriedPlugins = queryPluginsV2(
      filterLowerCase,
      favAndCategoryFilteredPlugins
    );

    queriedPlugins.sort((a, b) => {
      switch (sortby) {
        case 'relevance':
          return 0;
        case 'alphabet_asc':
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        case 'alphabet_desc':
          return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
        case 'createdAt_desc':
          return b.createdAt - a.createdAt;
        case 'downloaded_desc':
          return b.totalDownloads - a.totalDownloads;
        case 'score_desc':
          return b.score - a.score;
        case 'score_asc':
          return a.score - b.score;
      }
    });

    return queriedPlugins;
  }, [
    filter,
    favoritesFilter,
    sortby,
    favorites,
    filterCategory,
    plugins,
    pluginsScoreMap,
  ]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const isLessThanLarge = useIsLessThanLarge();

  const sidebar = (
    <Sidebar
      pageInfo={{ type: 'plugins', slug: '' }}
      suggestions={props.suggestions}
    />
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col min-h-screen">
        <Header {...props} />
        <Navbar current="all" />
        <div className="bg-white pt-5 grow">
          <ResponsiveLayout sidebar={sidebar}>
            <div className="flex flex-col">
              <div className="text-xl py-2 px-2 text-semibold text-gray-800">
                Showing {filteredPlugins.length} / {plugins.length} plugins
                available from the community.
              </div>
              <div className="px-2 py-2 bg-white relative">
                <div className="absolute pointer-events-auto">
                  <svg
                    className="absolute text-slate-400 top-2 left-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <TextInput
                  ref={inputRef}
                  id="search"
                  type="text"
                  placeholder="Search for plugins"
                  color="purple"
                  shadow
                  value={filter}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="pl-2 bg-white flex flex-col md:flex-row gap-y-2 justify-between">
                <div className="flex flex-col md:flex-row gap-x-4">
                  <div className="flex flex-col md:flex-row gap-x-2 justify-center">
                    <label className="cursor-pointer label">
                      <div className="label-text font-semibold">Filters: </div>
                    </label>
                    <div className="flex">
                      {' '}
                      {/* Favorites Filter */}
                      <Checkbox
                        checked={favoritesFilter}
                        id="filter-favorites"
                        className="mr-2 cursor-pointer"
                        onChange={handleFavoritesFilterChange}
                        color="purple"
                      />
                      <Label
                        htmlFor="filter-favorites"
                        className="cursor-pointer"
                      >
                        Favorites
                      </Label>
                    </div>
                    <div className="flex gap-x-2 items-center">
                      {' '}
                      {/* Category Filter */}
                      <Label
                        htmlFor="filter-category"
                        className="cursor-pointer"
                      >
                        Categories:{' '}
                      </Label>
                      <Dropdown
                        id="filter-category"
                        label={filterCategoryOptions[filterCategory]}
                        inline
                        size="sm"
                      >
                        <Dropdown.Item
                          onClick={() => handleFilterCategoryChange('all')}
                        >
                          {filterCategoryOptions['all']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('taskManagement')
                          }
                        >
                          {filterCategoryOptions['taskManagement']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('fileManagement')
                          }
                        >
                          {filterCategoryOptions['fileManagement']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('noteEnhancements')
                          }
                        >
                          {filterCategoryOptions['noteEnhancements']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('dataVisualization')
                          }
                        >
                          {filterCategoryOptions['dataVisualization']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('thirdPartyIntegrations')
                          }
                        >
                          {filterCategoryOptions['thirdPartyIntegrations']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('productivityTools')
                          }
                        >
                          {filterCategoryOptions['productivityTools']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange(
                              'codingAndTechnicalTools'
                            )
                          }
                        >
                          {filterCategoryOptions['codingAndTechnicalTools']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange(
                              'creativeAndWritingTools'
                            )
                          }
                        >
                          {filterCategoryOptions['creativeAndWritingTools']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('privacyAndSecurity')
                          }
                        >
                          {filterCategoryOptions['privacyAndSecurity']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('customizationAndUI')
                          }
                        >
                          {filterCategoryOptions['customizationAndUI']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange(
                              'collaborationAndSharing'
                            )
                          }
                        >
                          {filterCategoryOptions['collaborationAndSharing']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange(
                              'learningAndknowledgeManagement'
                            )
                          }
                        >
                          {
                            filterCategoryOptions[
                              'learningAndknowledgeManagement'
                            ]
                          }
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('miscellaneous')
                          }
                        >
                          {filterCategoryOptions['miscellaneous']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('uncategorized')
                          }
                        >
                          {filterCategoryOptions['uncategorized']}
                        </Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-2 items-center">
                  {' '}
                  {/* Sort Options */}
                  <Label
                    htmlFor="sort-favorites"
                    className="cursor-pointer font-semibold"
                  >
                    Sort:{' '}
                  </Label>
                  <Dropdown
                    id="sort-favorites"
                    label={sortByOptions[sortby]}
                    inline
                    size="sm"
                    value={sortby}
                  >
                    {(sortby === 'relevance' || !!query) && (
                      <Dropdown.Item
                        onClick={() => handleSorytbyChange('relevance')}
                      >
                        {sortByOptions['relevance']}
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      onClick={() => handleSorytbyChange('alphabet_asc')}
                    >
                      {sortByOptions['alphabet_asc']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSorytbyChange('alphabet_desc')}
                    >
                      {sortByOptions['alphabet_desc']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSorytbyChange('score_desc')}
                    >
                      {sortByOptions['score_desc']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSorytbyChange('score_asc')}
                    >
                      {sortByOptions['score_asc']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSorytbyChange('createdAt_desc')}
                    >
                      {sortByOptions['createdAt_desc']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleSorytbyChange('downloaded_desc')}
                    >
                      {sortByOptions['downloaded_desc']}
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
              <div className="pl-2 mt-2 mb-4 flex gap-x-2 items-center">
                <div className="mr-2 font-semibold">View: </div>
                <Button.Group outline>
                  {' '}
                  {/* View Options */}
                  <Button
                    color="gray"
                    onClick={() => handleViewChange('list')}
                    size="xs"
                    className="border-l rounded-l-lg"
                  >
                    <ListIcon className="mr-3 h-4 w-4" />
                    List
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => handleViewChange('table')}
                    size="xs"
                  >
                    <TableIcon className="mr-3 h-4 w-4" />
                    Table
                  </Button>
                </Button.Group>
              </div>
              {isLessThanLarge && (
                <EthicalAd type="text" data-ea-style="fixed-footer" placementId="plugins-fixed-footer" />
              )}
              <AllPluginsMultiView
                highlight={Array.isArray(filter) ? filter[0] : filter}
                plugins={filteredPlugins}
                favorites={favorites}
                setFavorites={setFavorites}
                view={view}
              />
            </div>
          </ResponsiveLayout>
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

  const title = `Obsidian Plugins - Comprehensive List and Detailed Summaries of ${plugins.length} Plugins`;
  const description = `Explore all ${plugins.length} Obsidian plugins with detailed summaries, scores, ratings, and more. Filter by favorites, categories, tags, and sort by score, downloads, and new plugins.`;
  const canonical = 'https://www.obsidianstats.com/plugins';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getPluginsPageSchema(
    plugins,
    title,
    description,
    canonical,
    image
  );
  const suggestions = await generateSuggestions({ type: 'plugins', slug: '' });

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugins,
      suggestions,
    },
  };
};

export default Plugins;
