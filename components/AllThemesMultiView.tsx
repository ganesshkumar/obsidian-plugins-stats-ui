import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import Favorites from './Favorites';
import { memo } from 'react';
import { VList } from 'virtua';
import { getDescription, sanitizeTag, tagDenyList } from '../utils/plugins';
import { CategoryIcon } from './Category';
import { Score } from './Score';
import { getScoreBgClass } from '../lib/customThemes';
import { Plugin, Theme } from '@prisma/client';
import { Virtuoso } from 'react-virtuoso';
import plugins from '@/pages/beta/plugins';
import { Moon, Sun } from 'react-feather';
import { EntityType } from '@/domain/Entity';

const highlightMatch = (text: string, query: string) => {
  if (!text || !query) return text;

  query = query.toLowerCase();
  text = text.toLowerCase();

  const tokens = query.toLowerCase().trim().split(/\s+/);

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) => {
    if (part === query) {
      return (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {part}
        </span>
      );
    }
  });
};

function highlightMatchesV2(text: string, query: string): string {
  if (!query || !query.length || !text || !text.length) {
    return text;
  }

  query = query.toLowerCase().trim();
  const tokens = query
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  const regex = new RegExp(
    `(${tokens.map((t) => escapeRegex(t)).join('|')})`,
    'gi'
  );

  return text.replace(regex, (match) => `<mark>${match}</mark>`);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

interface IAllThemesMultiViewProps {
  themes: Theme[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  highlight: string;
  view: string;
}

export const AllThemesMultiView = ({
  themes,
  favorites,
  setFavorites,
  highlight,
  view,
}: IAllThemesMultiViewProps) => {
  return (
    <div className="flex-col">
      {view === 'list' && themes && themes.length ? (
        <Virtuoso
          useWindowScroll
          totalCount={themes.length}
          itemContent={(index) => {
            const theme = themes[index];
            return (
              <ThemeListItem
                key={theme.repo}
                theme={themes[index]}
                index={index}
                favorites={favorites}
                setFavorites={setFavorites}
                highlight={highlight}
              />
            );
          }}
        />
      ) : undefined}
      {view === 'table' && themes && themes.length ? (
        <div
          key="header"
          className="grid grid-cols-12 gap-1"
          data-testid="themes-table-header"
        >
          <div
            key="theme-name"
            className="uppercase font-semibold text-gray-600 col-span-8 md:col-span-3"
          >
            Name
          </div>
          <div
            key="dark-mode"
            className="uppercase font-semibold text-gray-600 col-span-2 md:col-span-3"
          >
            Dark Mode
          </div>
          <div
            key="light-mode"
            className="uppercase font-semibold text-gray-600 col-span-2 md:col-span-3"
          >
            Light Mode
          </div>
          <div
            key="theme-link"
            className="uppercase font-semibold text-gray-600 col-span-2 md:col-span-3"
          >
            Link
          </div>
        </div>
      ) : undefined}
      {view === 'table' && themes && themes.length ? (
        // <div data-testid="plugins-table" className='relative'>
        // <VList style={{ height: '100%' }} data-testid="plugins-table">
        //   {plugins.map((plugin, index) => (
        //     <PluginTableItem
        //       key={plugin.pluginId}
        //       plugin={plugins[index]}
        //       index={index}
        //       favorites={favorites}
        //       setFavorites={setFavorites}
        //       highlight={highlight}
        //       showDescription={true}
        //       showDownloadStat={false}
        //     />
        //   ))}
        // </VList>
        <Virtuoso
          useWindowScroll
          totalCount={plugins.length}
          itemContent={(index) => {
            const theme = themes[index];
            return (
              <ThemeTableItem
                key={theme.repo}
                theme={themes[index]}
                index={index}
                favorites={favorites}
                setFavorites={setFavorites}
                highlight={highlight}
                showDescription={true}
                showDownloadStat={false}
              />
            );
          }}
        />
      ) : // </div>
      undefined}
    </div>
  );
};

const UnindexedThemeListItemInternal = (props) => {
  const { theme, favorites, setFavorites, index, highlight } = props;
  return (
    <div
      key={theme.repo}
      className={`flex flex-col p-2 border border-x-0 border-t-0 border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
    >
      <Link
        href={`/themes/${theme.repo.split('/')[1]}`}
        className="text-xl font-semibold text-violet-800"
        prefetch={false}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: highlight
              ? highlightMatchesV2(theme.name, highlight)
              : theme.name,
          }}
        />
      </Link>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>
          {moment(theme.createdAt).fromNow()} by{' '}
          <span className="text-gray-700">
            <span
              dangerouslySetInnerHTML={{
                __html: highlight
                  ? highlightMatchesV2(theme.repo.split('/')[1], highlight)
                  : theme.repo.split('/')[1],
              }}
            />
          </span>
        </span>
        <Favorites
          entityType={EntityType.Theme}
          entityId={theme.repo}
          isFavorite={favorites.includes(theme.repo)}
          setFavorites={setFavorites}
        />
      </div>
      {/* {(plugin.osCategory || plugin.osTags) && (
        <div className="flex mt-4 gap-x-4">
          {plugin.osCategory && (
            <div>
              <CategoryIcon category={plugin.osCategory} size={48} />
            </div>
          )}
          <div>
            {plugin.osCategory && (
              <div className="text-gray-700">
                Category:{' '}
                <span className="font-bold">{plugin.osCategory}</span>
              </div>
            )}
            {plugin.osTags && (
              <div className="flex flex-wrap gap-x-2 text-gray-700 cursor-pointer">
                {plugin.osTags &&
                  plugin.osTags
                    ?.split(',')
                    .map((tag) => sanitizeTag(tag))
                    .filter((sanitizedTag) => !tagDenyList.includes(sanitizedTag)).map((tag) => (
                      <Link
                        href={`/tags/${tag}`}
                        key={tag}
                        className="px-2 bg-gray-200 rounded-md"
                        prefetch={false}
                      >
                        <span className="text-gray-400">#</span>
                        {tag}
                      </Link>
                    )
                  )
                }
              </div>
            )}
          </div>
        </div>
      )} */}
      <div className='my-4'>
        <div>
          {theme.isDark ?  <div className='flex gap-x-2 items-center'><Moon size={16} /> <span>Supports dark mode</span></div> : ''}
        </div>
        <div>
          {theme.isLight ?  <div className='flex gap-x-2 items-center'><Sun size={16} /> <span>Supports light mode</span></div> : ''}
        </div>
      </div>
      <Link
        href={`/themes/${theme.repo.split('/')[1]}`}
        className="underline text-gray-600 font-seminbold"
        prefetch={false}
      >
        View Details
      </Link>
    </div>
  );
};

const ThemeListItem = memo(UnindexedThemeListItemInternal);

const UnindexedThemeTableItemInternal = (props) => {
  const { theme, index, highlight } = props;
  return (
    <div
      key={theme.repo}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} dark:border-gray-700 dark:bg-gray-800 grid grid-cols-12 gap-4 py-2 px-1`}
    >
      <div key={`${theme.repo}-name`} className="col-span-8 md:col-span-3">
        <span
          dangerouslySetInnerHTML={{
            __html: highlight
              ? highlightMatchesV2(theme.name, highlight)
              : theme.name,
          }}
        />
      </div>
      <div key={`${theme.repo}-dark-mode`} className="col-span-8 md:col-span-3">
        {theme.isDark ?  '✅' : ''}
      </div>
      <div key={`${theme.repo}-light-mode`} className="col-span-8 md:col-span-3">
        {theme.isLight ?  '✅' : ''}
      </div>
      <div key={`${theme.repo}-link`} className="col-span-2 md:col-span-3">
        <a
          href={`/themes/${theme.repo.split('/')[1]}`}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
      </div>
    </div>
  );
};

const ThemeTableItem = memo(UnindexedThemeTableItemInternal);
