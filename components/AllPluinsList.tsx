import Link from 'next/link';
import moment from 'moment';
import Favorites from './Favorites';
import { memo, useState } from 'react';
import { VList } from 'virtua';
import { getDescription } from '../utils/plugins';
import { CategoryIcon } from './Category';
import { Score } from './Score';
import { Button } from 'flowbite-react';
import { List as ListIcon, Table as TableIcon } from 'react-feather';

const highlightMatch = (name, query) => {
  if (!name || !query) return name;

  const parts = name.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: 'yellow' }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

const AllPluginsList = ({
  plugins,
  favorites,
  setFavorites,
  highlight,
  view,
  setView,
}) => {
  return (
    <div className="flex-col grow relative">
      {view === 'list' && plugins && plugins.length ? (
        <VList style={{ height: '100%' }}>
          {plugins.map((plugin, index) => (
            <MemoizedUnindexedPluginListItem
              key={plugin.pluginId}
              plugin={plugins[index]}
              index={index}
              favorites={favorites}
              setFavorites={setFavorites}
              highlight={highlight}
            />
          ))}
        </VList>
      ) : undefined}
      {view === 'table' && plugins && plugins.length ? (
        <div key="header" className="grid grid-cols-12 gap-1">
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
        <VList style={{ height: '100%' }} className="relative">
          {plugins.map((plugin, index) => (
            <MemoizedUnindexedPluginTableItem
              key={plugin.pluginId}
              plugin={plugins[index]}
              index={index}
              favorites={favorites}
              setFavorites={setFavorites}
              highlight={highlight}
              showDescription={true}
              showDownloadStat={false}
            />
          ))}
        </VList>
      ) : undefined}
    </div>
  );
};

const UnindexedPluginListItem = (props) => {
  const { plugin, favorites, setFavorites, index, highlight } = props;
  return (
    <div
      key={plugin.pluginId}
      className={`flex flex-col p-2 border border-x-0 border-t-0 border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
    >
      <Link
        href={`/plugins/${plugin.pluginId}`}
        className="text-xl font-semibold text-violet-800"
      >
        {highlight ? highlightMatch(plugin.name, highlight) : plugin.name}
      </Link>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>
          {moment(plugin.createdAt).fromNow()} by{' '}
          <span className="text-gray-700">{plugin.author}</span>
        </span>
        <Favorites
          plugin={plugin}
          isFavorite={favorites.includes(plugin.pluginId)}
          setFavorites={setFavorites}
        />
      </div>
      <Score plugin={plugin} />
      {(plugin.aiCategories || plugin.aiTags) && (
        <div className="flex mt-4 gap-x-4">
          {plugin.aiCategories && (
            <div>
              <CategoryIcon category={plugin.aiCategories} size={48} />
            </div>
          )}
          <div>
            {plugin.aiCategories && (
              <div className="text-gray-700">
                Category:{' '}
                <span className="font-bold">{plugin.aiCategories}</span>
              </div>
            )}
            {plugin.aiTags && (
              <div className="flex flex-wrap gap-x-2 text-gray-700 cursor-pointer">
                {plugin.aiTags &&
                  plugin.aiTags?.split(',').map((tag) => (
                    <Link
                      href={`/tags/${tag}`}
                      key={tag}
                      className="px-2 bg-gray-200 rounded-md"
                    >
                      <span className="text-gray-400">#</span>
                      {tag}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="my-4">
        {highlight
          ? highlightMatch(getDescription(plugin), highlight)
          : getDescription(plugin)}
      </div>
      <Link
        href={`/plugins/${plugin.pluginId}`}
        className="underline text-gray-600 font-seminbold"
      >
        View Details
      </Link>
    </div>
  );
};

const MemoizedUnindexedPluginListItem = memo(UnindexedPluginListItem);

const getScoreBgClass = (score) => {
  let scoreClass = '';
  if (score > 0.8) {
    scoreClass = 'bg-emerald-500 text-white rounded-full p-1';
  } else if (score > 0.6) {
    scoreClass = 'bg-lime-500 text-white rounded-full p-1';
  } else if (score > 0.4) {
    scoreClass = 'bg-yellow-500 text-white rounded-full p-1';
  } else if (score > 0.2) {
    scoreClass = 'bg-amber-500 text-white rounded-full p-1';
  } else {
    scoreClass = 'bg-red-500 text-white rounded-full p-1';
  }
  return scoreClass;
};

const UnindexedPluginTableItem = (props) => {
  const { plugin, index, highlight } = props;
  return (
    <div
      key={plugin.pluginId}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} dark:border-gray-700 dark:bg-gray-800 grid grid-cols-12 gap-4 py-2`}
    >
      <div key={`${plugin.pluginId}-name`} className="col-span-8 md:col-span-3">
        {highlight ? highlightMatch(plugin.name, highlight) : plugin.name}
      </div>
      <div
        key={`${plugin.pluginId}-score`}
        className="col-span-2 md:col-span-1"
      >
        <span className={getScoreBgClass(plugin.score)}>
          {Math.round(plugin.score.toFixed(4) * 100)}
        </span>
      </div>
      <div
        key={`${plugin.pluginId}-description`}
        className="overflow-hidden whitespace-nowrap text-ellipsis col-span-7 hidden md:block"
      >
        {highlight
          ? highlightMatch(plugin.description, highlight)
          : plugin.description}
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

const MemoizedUnindexedPluginTableItem = memo(UnindexedPluginTableItem);

export default AllPluginsList;
