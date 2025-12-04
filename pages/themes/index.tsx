'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { Footer } from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import { Button, Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { List as ListIcon, Table as TableIcon } from 'react-feather';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import { Theme } from '@prisma/client';
import EthicalAd from '../../components/EthicalAd';
import ResponsiveLayout from '../_responsive-layout';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import { generateSuggestions } from '../../domain/suggestions';
import { Suggestions } from '../../domain/suggestions/models';
import { Sidebar } from '../../components/Sidebar';
import { ThemesCache } from '@/cache/themes-cache';
import { AllThemesMultiView } from '@/components/AllThemesMultiView';

const sortByOptions = {
  alphabet_asc: 'Alphabetical (A-Z)',
  alphabet_desc: 'Alphabetical (Z-A)',
  createdAt_desc: 'Newest Plugins',
  //date_desc: 'Date (Newest)',
  // downloaded_desc: 'Most Downloaded',
  relevance: 'Relevance',
  // score_desc: 'Score (High to Low)',
  // score_asc: 'Score (Low to High)',
};

const filterCategoryOptions = {
  any: 'Any Modes',
  darkMode: 'Dark Mode',
  lightMode: 'Light Mode',
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

const queryThemesV2 = (query: string, themes: Theme[] = []): Theme[] => {
  if (!query) {
    return themes;
  }

  const results: {
    theme: Theme;
    score: number;
  }[] = [];

  query = query.toLowerCase();
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  themes.forEach((theme) => {
    const nameLower = theme.name.toLowerCase();
    const authorLower = (theme.repo.split('/')[0] ?? '').toLowerCase();

    const text = `${nameLower} ${authorLower}`;
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
        score += authorLower.includes(query) ? 30 : 0;
      }

      for (const token of tokens) {
        score += countOccurrences(nameLower, token) * 3;
        score += countOccurrences(authorLower, token) * 1;
      }
    }

    results.push({ theme, score });
  });

  return results.sort((a, b) => b.score - a.score).map((item) => item.theme);
};

interface IPageProps extends IHeaderProps {
  themes: Theme[];
  suggestions: Suggestions;
}

const Themes = (props: IPageProps) => {
  const router = useRouter();
  const { query } = router;

  const [filter, setFilter] = useState<string>('');
  const [favoritesFilter, setFavoritesFilter] = useState(query.fav === 'true');
  const [favorites, setFavorites] = useState([]);
  const [sortby, setSortby] = useState('createdAt_desc');
  const [filterCategory, setFilterCategory] = useState('any');
  const [view, setView] = useState('list');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const themes = props.themes;

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

  const isThemeInFavorites = (theme: Theme) =>
    favoritesFilter ? favorites.includes(theme.repo) : true;

  const isThemeInFilterCategory = (theme: Theme) => {
    if (filterCategory === 'any') {
      return true;
    }
    if (filterCategory === 'darkMode') {
      return theme.isDark === true;
    } else if (filterCategory === 'lightMode') {
      return theme.isLight === true;
    }
  };

  const filteredThemes = useMemo(() => {
    const filterLowerCase = filter.toLowerCase();

    const favAndCategoryFilteredThemes = [...themes]
      .filter(isThemeInFavorites)
      .filter(isThemeInFilterCategory);

    const queriedThemes = queryThemesV2(
      filterLowerCase,
      favAndCategoryFilteredThemes
    );

    queriedThemes.sort((a, b) => {
      switch (sortby) {
        case 'relevance':
          return 0;
        case 'alphabet_asc':
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        case 'alphabet_desc':
          return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
        case 'createdAt_desc':
          return b.createdAt - a.createdAt;
        // case 'downloaded_desc':
        //   return b.totalDownloads - a.totalDownloads;
        // case 'score_desc':
        //   return b.score - a.score;
        // case 'score_asc':
        //   return a.score - b.score;
      }
    });

    return queriedThemes;
  }, [
    filter,
    favoritesFilter,
    sortby,
    favorites,
    filterCategory,
    themes
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
                Showing {filteredThemes.length} / {themes.length} themes
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
              <div className="pl-2 mb-2  bg-white flex flex-col md:flex-row gap-y-2 justify-between">
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
                          onClick={() => handleFilterCategoryChange('any')}
                        >
                          {filterCategoryOptions['any']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('darkMode')
                          }
                        >
                          {filterCategoryOptions['darkMode']}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleFilterCategoryChange('lightMode')
                          }
                        >
                          {filterCategoryOptions['lightMode']}
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
                      onClick={() => handleSorytbyChange('createdAt_desc')}
                    >
                      {sortByOptions['createdAt_desc']}
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      onClick={() => handleSorytbyChange('downloaded_desc')}
                    >
                      {sortByOptions['downloaded_desc']}
                    </Dropdown.Item> */}
                  </Dropdown>
                </div>
              </div>
              {/* <div className="pl-2 mt-2 mb-4 flex gap-x-2 items-center">
                <div className="mr-2 font-semibold">View: </div>
                <Button.Group outline>
                  {' '}
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
              </div> */}
              {isLessThanLarge && (
                <EthicalAd
                  type="text"
                  style="fixed-footer"
                  placementId="plugins-fixed-footer"
                />
              )}
              <AllThemesMultiView
                highlight={Array.isArray(filter) ? filter[0] : filter}
                themes={filteredThemes}
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
  const themes = await ThemesCache.get();
  themes.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );

  const title = `Obsidian Themes - Comprehensive List and Detailed Summaries of ${themes.length} Themes`;
  const description = `Explore all ${themes.length} Obsidian themes with detailed summaries, scores, ratings, and more. Filter by favorites, categories, tags, and sort by score, downloads, and new themes.`;
  const canonical = 'https://www.obsidianstats.com/themes';
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getThemesPageSchema(
    themes,
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
      themes,
      suggestions,
    },
    revalidate: 7200,
  };
};

export default Themes;
