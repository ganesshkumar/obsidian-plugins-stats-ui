import React, { use, useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { Footer } from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import { AllPluginsMultiView } from '../../components/AllPluginsMultiView';
import { Button, Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { PluginsCache } from '../../cache/plugins-cache';
import { List as ListIcon, Table as TableIcon } from 'react-feather';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';

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
  addToResult(
    plugins.filter((plugin) => {
      return exactMatch(query, plugin.description);
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

  return result;
};

interface IPageProps extends IHeaderProps {
  plugins: any[];
}

const Plugins = (props: IPageProps) => {
  const router = useRouter();
  const { query } = router;

  const [filter, setFilter] = useState<string>('');
  const [favoritesFilter, setFavoritesFilter] = useState(query.fav === 'true');
  const [favorites, setFavorites] = useState([]);
  const [sortby, setSortby] = useState('createdAt_desc');
  const [filterCategory, setFilterCategory] = useState('all');
  const [view, setView] = useState('list');

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const updateQuery = (newQuery) => {
    const updatedQuery = { ...query, ...newQuery };
    router.replace({ pathname: router.pathname, query: updatedQuery }, undefined, { shallow: true });
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
      const c = Array.isArray(query.category) ? query.category[0] : query.category;
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
  }

  const handleFavoritesFilterChange = (e) => {
    const value = e.target.checked;
    setFavoritesFilter(value);
    updateQuery({ fav: value });
  }

  const handleFilterCategoryChange = (value) => {
    setFilterCategory(value);
    updateQuery({ category: value });
  }

  const handleSorytbyChange = (value) => {
    setSortby(value);
    updateQuery({ sortby: value });
  }

  const handleViewChange = (value) => {
    setView(value);
    updateQuery({ view: value });
  }

  const filteredPlugins = useMemo(() => {
    const filterLowerCase = filter.toLowerCase();
    const favAndCategoryFilteredPlugins = [...props.plugins]
      .filter((plugin) =>
        favoritesFilter ? favorites.includes(plugin.pluginId) : true
      )
      .filter((plugin) => {
        if (filterCategory === 'all') {
          return true;
        }
        return plugin.aiCategories === filterCategoryOptions[filterCategory];
      });

    const plugins = queryPlugins(
      filterLowerCase,
      favAndCategoryFilteredPlugins
    );

    plugins.sort((a, b) => {
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

    return plugins;
  }, [filter, favoritesFilter, sortby, favorites, filterCategory]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header {...props} />
        <Navbar current="all" />
        {/* New Plugins */}
        <div className="bg-white pt-5 grow">
          <div className="max-w-6xl mx-auto px-2 flex flex-col h-full">
            {/* <div className='text-2xl py-2 px-2 text-bold text-violet-900'>
              All Plugins 
            </div> */}
            <div className="text-xl py-2 px-2 text-semibold text-gray-800">
              There are {props.plugins.length} plugins available from the
              community.
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
                    <Label htmlFor="filter-category" className="cursor-pointer">
                      Categories:{' '}
                    </Label>
                    <Dropdown
                      id="filter-category"
                      label={filterCategoryOptions[filterCategory]}
                      inline
                      size="sm"
                    >
                      <Dropdown.Item onClick={() => handleFilterCategoryChange('all')}>
                        {filterCategoryOptions['all']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('taskManagement')}
                      >
                        {filterCategoryOptions['taskManagement']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('fileManagement')}
                      >
                        {filterCategoryOptions['fileManagement']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('noteEnhancements')}
                      >
                        {filterCategoryOptions['noteEnhancements']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('dataVisualization')}
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
                        onClick={() => handleFilterCategoryChange('productivityTools')}
                      >
                        {filterCategoryOptions['productivityTools']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterCategoryChange('codingAndTechnicalTools')
                        }
                      >
                        {filterCategoryOptions['codingAndTechnicalTools']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterCategoryChange('creativeAndWritingTools')
                        }
                      >
                        {filterCategoryOptions['creativeAndWritingTools']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('privacyAndSecurity')}
                      >
                        {filterCategoryOptions['privacyAndSecurity']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('customizationAndUI')}
                      >
                        {filterCategoryOptions['customizationAndUI']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterCategoryChange('collaborationAndSharing')
                        }
                      >
                        {filterCategoryOptions['collaborationAndSharing']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          handleFilterCategoryChange('learningAndknowledgeManagement')
                        }
                      >
                        {
                          filterCategoryOptions[
                            'learningAndknowledgeManagement'
                          ]
                        }
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('miscellaneous')}
                      >
                        {filterCategoryOptions['miscellaneous']}
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleFilterCategoryChange('uncategorized')}
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
                  {sortby === 'relevance' && (
                    <Dropdown.Item onClick={() => handleSorytbyChange('relevance')}>
                      {sortByOptions['relevance']}
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={() => handleSorytbyChange('alphabet_asc')}>
                    {sortByOptions['alphabet_asc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSorytbyChange('alphabet_desc')}>
                    {sortByOptions['alphabet_desc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSorytbyChange('score_desc')}>
                    {sortByOptions['score_desc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSorytbyChange('score_asc')}>
                    {sortByOptions['score_asc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSorytbyChange('createdAt_desc')}>
                    {sortByOptions['createdAt_desc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSorytbyChange('downloaded_desc')}>
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
                <Button color="gray" onClick={() => handleViewChange('table')} size="xs">
                  <TableIcon className="mr-3 h-4 w-4" />
                  Table
                </Button>
              </Button.Group>
            </div>
            <AllPluginsMultiView
              highlight={Array.isArray(filter) ? filter[0]: filter}
              plugins={filteredPlugins}
              favorites={favorites}
              setFavorites={setFavorites}
              view={view}
            />
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
  
  const title = `Obsidian Plugins - Comprehensive List and Detailed Summaries of ${plugins.length} Plugins`;
  const description = `Explore all ${plugins.length} Obsidian plugins with detailed summaries, scores, ratings, and more. Filter by favorites, categories, tags, and sort by score, downloads, and new plugins.`;
  const canonical = 'https://obsidian-plugin-stats.ganesshkumar.com/plugins';
  const image = 'https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png';
  const jsonLdSchema = JsonLdSchema.getPluginsPageSchema(plugins, title, description, canonical, image);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugins
    }
  };
};

export default Plugins;
