import { CustomFlowbiteTheme, List, Tabs, Tooltip } from 'flowbite-react';
import Link from 'next/link';
import moment from 'moment';
import Favorites from './Favorites';
import { memo } from 'react';
import { CategoryIcon } from './Category';
import { Download, List as ListIcon, Table as TableIcon } from 'react-feather';
import { getDescription, sanitizeTag, tagDenyList } from '../utils/plugins';
import { LinkButton } from './LinkButton';
import { Score } from './Score';
import { Plugin } from '@prisma/client';

interface IPluginsListViewProps {
  plugins: Plugin[];
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  showDownloadStat?: boolean;
}

export const PluginsListView = ({
  plugins,
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
        {plugins.map((plugin, idx) => (
          <PluginView
            idx={idx + 1}
            pad={pad}
            key={plugin.pluginId}
            plugin={plugin}
            favorites={favorites}
            setFavorites={setFavorites}
            showDownloadStat={showDownloadStat}
          />
        ))}
      </List>
    </div>
  );
};

const PluginView = (props) => {
  const { plugin, idx, pad, favorites, setFavorites, showDownloadStat } = props;
  return (
    <List.Item className="!mt-0 py-3 px-2 w-full hover:bg-slate-50">
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

const UnindexedPlugin = (props) => {
  const { key, plugin, favorites, setFavorites, showDownloadStat } = props;
  return (
    <div key={key} className="flex flex-col">
      <Link
        href={`/plugins/${plugin.pluginId}`}
        className="text-xl font-semibold text-gray-800 hover:underline"
        prefetch={false}
      >
        {plugin.name}
      </Link>
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
      <LinkButton
        href={`/plugins/${plugin.pluginId}`}
        content="View Plugin Details"
      />
    </div>
  );
};

const MemoizedUnindexedPlugin = memo(UnindexedPlugin);
