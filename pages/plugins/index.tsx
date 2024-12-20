import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../components/HeaderAll';
import Navbar from '../../components/Navbar';

import { PrismaClient } from '@prisma/client';
import Footer from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import AllPluginsList from '../../components/AllPluinsList';
import { Checkbox, Dropdown, Label, TextInput } from 'flowbite-react';
import { PluginsCache } from '../../cache/plugins-cache';

const sortByOptions = {
  alphabet_asc: 'Alphabetical (A-Z)',
  alphabet_desc: 'Alphabetical (Z-A)',
  createdAt_desc: 'Newest Plugins',
  //date_desc: 'Date (Newest)',
  downloaded_desc: 'Most Downloaded',
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

const Plugins = (props) => {
  const [filter, setFilter] = useState('');
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortby, setSortby] = useState('createdAt_desc');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const filteredPlugins = useMemo(() => {
    const filterLowerCase = filter.toLowerCase();
    const plugins = [...props.plugins]
      .filter((plugin) =>
        favoritesFilter ? favorites.includes(plugin.pluginId) : true
      )
      .filter((plugin) => {
        if (filterCategory === 'all') {
          return true;
        }
        return plugin.aiCategories === filterCategoryOptions[filterCategory];
      })
      .filter((plugin) => {
        return (
          plugin.name.toLowerCase().includes(filterLowerCase) ||
          plugin.description.toLowerCase().includes(filterLowerCase)
        );
      });

    plugins.sort((a, b) => {
      switch (sortby) {
        case 'alphabet_asc':
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        case 'alphabet_desc':
          return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
        case 'createdAt_desc':
          return b.createdAt - a.createdAt;
        case 'downloaded_desc':
          return b.totalDownloads - a.totalDownloads;
      }
    });

    return plugins;
  }, [filter, favoritesFilter, sortby, favorites, filterCategory]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col h-screen">
        <Header />
        <div>
          <Navbar current="all" />
        </div>
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
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="pl-2 mb-4 bg-white flex justify-between">
              <div className="flex gap-x-4">
                <div className="flex gap-x-2 items-center">
                  <label className="cursor-pointer label">
                    <div className="label-text">Filters: </div>
                  </label>
                  <div>
                    <Checkbox
                      id="filter-favorites"
                      className="mr-2 cursor-pointer"
                      onClick={() => setFavoritesFilter(!favoritesFilter)}
                      color="purple"
                    />
                    <Label
                      htmlFor="filter-favorites"
                      className="cursor-pointer"
                    >
                      Favorites
                    </Label>
                  </div>
                </div>
                <div className="flex gap-x-2 items-center">
                  <Label htmlFor="filter-category" className="cursor-pointer">
                    Categories:{' '}
                  </Label>
                  <Dropdown
                    id="filter-category"
                    label={filterCategoryOptions[filterCategory]}
                    inline
                    size="sm"
                  >
                    <Dropdown.Item onClick={() => setFilterCategory('all')}>
                      {filterCategoryOptions['all']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('taskManagement')}
                    >
                      {filterCategoryOptions['taskManagement']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('fileManagement')}
                    >
                      {filterCategoryOptions['fileManagement']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('noteEnhancements')}
                    >
                      {filterCategoryOptions['noteEnhancements']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('dataVisualization')}
                    >
                      {filterCategoryOptions['dataVisualization']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setFilterCategory('thirdPartyIntegrations')
                      }
                    >
                      {filterCategoryOptions['thirdPartyIntegrations']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('productivityTools')}
                    >
                      {filterCategoryOptions['productivityTools']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setFilterCategory('codingAndTechnicalTools')
                      }
                    >
                      {filterCategoryOptions['codingAndTechnicalTools']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setFilterCategory('creativeAndWritingTools')
                      }
                    >
                      {filterCategoryOptions['creativeAndWritingTools']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('privacyAndSecurity')}
                    >
                      {filterCategoryOptions['privacyAndSecurity']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('customizationAndUI')}
                    >
                      {filterCategoryOptions['customizationAndUI']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setFilterCategory('collaborationAndSharing')
                      }
                    >
                      {filterCategoryOptions['collaborationAndSharing']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setFilterCategory('learningAndknowledgeManagement')
                      }
                    >
                      {filterCategoryOptions['learningAndknowledgeManagement']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('miscellaneous')}
                    >
                      {filterCategoryOptions['miscellaneous']}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setFilterCategory('uncategorized')}
                    >
                      {filterCategoryOptions['uncategorized']}
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
              <div className="flex gap-x-2 items-center">
                <Label htmlFor="sort-favorites" className="cursor-pointer">
                  Sort:{' '}
                </Label>
                <Dropdown
                  id="sort-favorites"
                  label={sortByOptions[sortby]}
                  inline
                  size="sm"
                >
                  <Dropdown.Item onClick={() => setSortby('alphabet_asc')}>
                    {sortByOptions['alphabet_asc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortby('alphabet_desc')}>
                    {sortByOptions['alphabet_desc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortby('createdAt_desc')}>
                    {sortByOptions['createdAt_desc']}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortby('downloaded_desc')}>
                    {sortByOptions['downloaded_desc']}
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <AllPluginsList
              plugins={filteredPlugins}
              favorites={favorites}
              setFavorites={setFavorites}
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

  return { props: { plugins } };
};

export default Plugins;
