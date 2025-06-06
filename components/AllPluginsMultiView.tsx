import Link from 'next/link';
import moment from 'moment';
import Favorites from './Favorites';
import { memo } from 'react';
import { VList } from 'virtua';
import { getDescription, sanitizeTag, tagDenyList } from '../utils/plugins';
import { CategoryIcon } from './Category';
import { Score } from './Score';
import { getScoreBgClass } from '../lib/customThemes';
import { Plugin } from '@prisma/client';
import { Virtuoso } from 'react-virtuoso';

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

interface IAllPluginsMultiViewProps {
  plugins: Plugin[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  highlight: string;
  view: string;
}

export const AllPluginsMultiView = ({
  plugins,
  favorites,
  setFavorites,
  highlight,
  view,
}: IAllPluginsMultiViewProps) => {
  return (
    <div className="flex-col">
      {view === 'list' && plugins && plugins.length ? (
        <Virtuoso
          useWindowScroll
          totalCount={plugins.length}
          itemContent={(index) => {
            const plugin = plugins[index];
            return (
              <PluginListItem
                key={plugin.pluginId}
                plugin={plugins[index]}
                index={index}
                favorites={favorites}
                setFavorites={setFavorites}
                highlight={highlight}
              />
            );
          }}
        />
      ) : undefined}
      {view === 'table' && plugins && plugins.length ? (
        <div
          key="header"
          className="grid grid-cols-12 gap-1"
          data-testid="plugins-table-header"
        >
          <div
            key="plugin-name"
            className="uppercase font-semibold text-gray-600 col-span-8 md:col-span-3"
          >
            Name
          </div>
          <div
            key="plugin-score"
            className="uppercase font-semibold text-gray-600 col-span-2 md:col-span-1"
          >
            Score
          </div>
          <div
            key="plugin-description"
            className="uppercase font-semibold text-gray-600 col-span-7 hidden md:block"
          >
            Description
          </div>
          <div
            key="plugin-link"
            className="uppercase font-semibold text-gray-600 col-span-2 md:col-span-1"
          >
            Link
          </div>
        </div>
      ) : undefined}
      {view === 'table' && plugins && plugins.length ? (
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
            const plugin = plugins[index];
            return (
              <PluginTableItem
                key={plugin.pluginId}
                plugin={plugins[index]}
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

const UnindexedPluginListItemInternal = (props) => {
  const { plugin, favorites, setFavorites, index, highlight } = props;
  return (
    <div
      key={plugin.pluginId}
      className={`flex flex-col p-2 border border-x-0 border-t-0 border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
    >
      <Link
        href={`/plugins/${plugin.pluginId}`}
        className="text-xl font-semibold text-violet-800"
        prefetch={false}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: highlight
              ? highlightMatchesV2(plugin.name, highlight)
              : plugin.name,
          }}
        />
      </Link>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>
          {moment(plugin.createdAt).fromNow()} by{' '}
          <span className="text-gray-700">
            <span
              dangerouslySetInnerHTML={{
                __html: highlight
                  ? highlightMatchesV2(plugin.author, highlight)
                  : plugin.name,
              }}
            />
          </span>
        </span>
        <Favorites
          plugin={plugin}
          isFavorite={favorites.includes(plugin.pluginId)}
          setFavorites={setFavorites}
        />
      </div>
      <Score plugin={plugin} />
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
      <div className="my-4 text-sm md:text-base">
        {highlight ? (
          <span
            dangerouslySetInnerHTML={{
              __html: highlight
                ? highlightMatchesV2(getDescription(plugin), highlight)
                : plugin.name,
            }}
          />
        ) : (
          getDescription(plugin)
        )}
      </div>
      <Link
        href={`/plugins/${plugin.pluginId}`}
        className="underline text-gray-600 font-seminbold"
        prefetch={false}
      >
        View Details
      </Link>
    </div>
  );
};

const PluginListItem = memo(UnindexedPluginListItemInternal);

const UnindexedPluginTableItemInternal = (props) => {
  const { plugin, index, highlight } = props;
  return (
    <div
      key={plugin.pluginId}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} dark:border-gray-700 dark:bg-gray-800 grid grid-cols-12 gap-4 py-2 px-1`}
    >
      <div key={`${plugin.pluginId}-name`} className="col-span-8 md:col-span-3">
        <span
          dangerouslySetInnerHTML={{
            __html: highlight
              ? highlightMatchesV2(plugin.name, highlight)
              : plugin.name,
          }}
        />
      </div>
      <div
        key={`${plugin.pluginId}-score`}
        className="col-span-2 md:col-span-1"
      >
        {!!plugin.score || plugin.score === 0 ? (
          <span className={getScoreBgClass(plugin.score)}>
            {Math.round(plugin.score.toFixed(4) * 100)}
          </span>
        ) : undefined}
      </div>
      <div
        key={`${plugin.pluginId}-description`}
        className="overflow-hidden whitespace-nowrap text-ellipsis col-span-7 hidden md:block text-sm lg:text-base"
      >
        {highlight ? (
          <span
            dangerouslySetInnerHTML={{
              __html: highlight
                ? highlightMatchesV2(plugin.description, highlight)
                : plugin.name,
            }}
          />
        ) : (
          plugin.description
        )}
      </div>
      <div key={`${plugin.pluginId}-link`} className="col-span-2 md:col-span-1">
        <a
          href={`/plugins/${plugin.pluginId}`}
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

const PluginTableItem = memo(UnindexedPluginTableItemInternal);
