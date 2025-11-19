import React from 'react';
import { List, Tooltip } from 'flowbite-react';
import Link from 'next/link';
import moment from 'moment';
import Favorites from './Favorites';
import { memo } from 'react';
import { CategoryIcon } from './Category';
import { Download } from 'react-feather';
import { getDescription, sanitizeTag, tagDenyList } from '../utils/plugins';
import { LinkButton } from './LinkButton';
import { Score } from './Score';
import { Plugin, Theme } from '@prisma/client';
import { Entity, EntityType } from '@/domain/Entity';
import { RepoButton } from './RepoButton';

interface IPluginsListViewProps {
  plugins: Plugin[];
  entities?: Entity[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  showDownloadStat?: boolean;
}

export const PluginsListView = ({
  plugins,
  entities,
  favorites,
  setFavorites,
  showDownloadStat = false,
}: IPluginsListViewProps) => {
  const pad = plugins.length.toString().length;
  return (
    <div className="flex-col stripped">
      <List
        unstyled
        className="w-full divide-y divide-gray-200 dark:divide-gray-700"
      >
        {entities && entities.length ? 
          entities.map((entity, idx) => (
            <EntityView
              idx={idx + 1}
              pad={pad}
              key={entity.id}
              entity={entity}
              favorites={favorites}
              setFavorites={setFavorites}
              showDownloadStat={showDownloadStat}
            />
          )) :
          plugins.map((plugin, idx) => (
            <PluginView
              idx={idx + 1}
              pad={pad}
              key={plugin.pluginId}
              plugin={plugin}
              favorites={favorites}
              setFavorites={setFavorites}
              showDownloadStat={showDownloadStat}
            />
          ))
        }
      </List>
    </div>
  );
};

const PluginView = (props) => {
  const { plugin, idx, pad, favorites, setFavorites, showDownloadStat } = props;
  return (
    <List.Item className="mt-0! py-3 px-2 w-full hover:bg-slate-50">
      <div className="flex flex-col md:flex-row items-start space-x-4 rtl:space-x-reverse">
        <div className="text-xl ml-4 md:ml-0">
          {String(idx).padStart(pad, '0')}.
        </div>
        <MemoizedUnindexedPlugin
          plugin={plugin}
          favorites={favorites}
          setFavorites={setFavorites}
          showDownloadStat={showDownloadStat}
        />
      </div>
    </List.Item>
  );
};

const EntityView = (props) => {
  const { entity, idx, pad, favorites, setFavorites, showDownloadStat } = props;

  if (entity.type === EntityType.Plugin) {
    return (
      <List.Item className="mt-0! py-3 px-2 w-full hover:bg-slate-50">
        <div className="flex flex-col md:flex-row items-start space-x-4 rtl:space-x-reverse">
          <div className="text-xl ml-4 md:ml-0">
            {String(idx).padStart(pad, '0')}.
          </div>
          <MemoizedUnindexedPlugin
            key={entity.id}
            plugin={entity.data as Plugin}
            favorites={favorites}
            setFavorites={setFavorites}
            showDownloadStat={showDownloadStat}
          />
        </div>
      </List.Item>
    );
  }

  return (
    <List.Item className="mt-0! py-3 px-2 w-full hover:bg-slate-50">
      <div className="flex flex-col md:flex-row items-start space-x-4 rtl:space-x-reverse">
        <div className="text-xl ml-4 md:ml-0">
          {String(idx).padStart(pad, '0')}.
        </div>
        <MemoizedUnindexedTheme
          key={entity.id}
          theme={entity.data as Theme}
          favorites={favorites}
          setFavorites={setFavorites}
          showDownloadStat={showDownloadStat}
        />
      </div>
    </List.Item>
  );
};

const UnindexedPlugin = (props) => {
  const { key, plugin, favorites, setFavorites, showDownloadStat } = props;
  return (
    <div key={key} className="flex flex-col w-full">
      <div className='border-0 border-l-6 border-violet-600 pl-2'>
      <div className='flex items-center'>
        <Link
          href={`/plugins/${plugin.pluginId}`}
          className="text-xl font-semibold text-gray-800 hover:underline"
          prefetch={false}
        >
          {plugin.name}
        </Link>
        <div className='ml-4 px-2 py-0.5 uppercase rounded-full text-[10px] font-semibold bg-violet-600 text-violet-100'>Plugin</div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-700">
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
      </div>
      <Score plugin={plugin} />
      {showDownloadStat && (
        <div className="pt-4 text-gray-700 flex items-center gap-x-2">
          <Tooltip content="Downloads">
            <Download />
          </Tooltip>{' '}
          <span className="font-bold text-xl">
            {plugin.totalDownloads.toLocaleString()}
          </span>
        </div>
      )}
      {(plugin.osCategory || plugin.osTags) && (
        <div className="flex mt-4 gap-x-4">
          {plugin.osCategory && (
            <div>
              <CategoryIcon category={plugin.osCategory} size={48} />
            </div>
          )}
          <div>
            {plugin.osCategory && (
              <div className="text-gray-700">
                Category: <span className="font-bold">{plugin.osCategory}</span>
              </div>
            )}
            {plugin.osTags && (
              <div className="flex flex-wrap gap-x-2 text-gray-700 cursor-pointer">
                {plugin.osTags &&
                  plugin.osTags
                    ?.split(',')
                    .map((tag) => sanitizeTag(tag))
                    .filter(
                      (sanitizedTag) => !tagDenyList.includes(sanitizedTag)
                    )
                    .map((tag) => (
                      <Link
                        href={`/tags/${tag}`}
                        key={tag}
                        className="px-2 bg-gray-200 rounded-md"
                        prefetch={false}
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
      <div className="my-4 text-gray-700">{getDescription(plugin)}</div>
      <div className='flex gap-x-2'>
        <LinkButton
          className='hover:cursor-pointer'
          href={`/plugins/${plugin.pluginId}`}
          content="View Plugin Details"
        />
        <RepoButton
          className='hover:cursor-pointer'
          href={`https://github.com/${plugin.repo}`}
        />
      </div>
    </div>
  );
};

const UnindexedTheme = (props) => {
  const { key, theme, favorites, setFavorites, showDownloadStat } = props;
  const [author, repo] = theme.repo.split('/');
  return (
    <div key={key} className="flex flex-col w-full">
      <div className='border-0 border-l-6 border-emerald-600 pl-2'>
        <div className='flex items-center'>
          <Link
            href={`/themes/${repo}`}
            className="text-xl font-semibold text-gray-800 hover:underline"
            prefetch={false}
          >
            {theme.name}
          </Link>
          <div className='ml-4 flex justify-center items-center px-2 py-0.5 uppercase rounded-full text-[10px] font-semibold bg-emerald-600 text-emerald-100'>Theme</div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <span>
            {moment(theme.createdAt).fromNow()} by{' '}
            <span className="text-gray-700">{author}</span>
          </span>
          <Favorites
            theme={theme}
            isFavorite={favorites.includes(theme.repo)}
            setFavorites={setFavorites}
          />
        </div>
      </div>
      <div className='my-4'>
        <img
          src={`https://raw.githubusercontent.com/${author}/${repo}/HEAD/${theme.screenshot}`}
          alt={repo}
          className='w-100 aspect-video rounded-lg'
        />
      </div>
      {/* <Score plugin={plugin} /> */}
      {/* {showDownloadStat && (
        <div className="pt-4 text-gray-700 flex items-center gap-x-2">
          <Tooltip content="Downloads">
            <Download />
          </Tooltip>{' '}
          <span className="font-bold text-xl">
            {plugin.totalDownloads.toLocaleString()}
          </span>
        </div>
      )} */}
      <LinkButton
        href={`/themes/${repo}`}
        content="View Theme Details"
      />
    </div>
  );
};

const MemoizedUnindexedPlugin = memo(UnindexedPlugin);

const MemoizedUnindexedTheme = memo(UnindexedTheme);