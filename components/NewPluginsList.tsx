import { List, Table } from "flowbite-react";
import { isNotXDaysOld } from "../utils/datetime";
import PluginListItem from "./PluginListItem";
import Link from "next/link";
import moment from "moment";
import Favorites from "./Favorites";
import { memo } from "react";
import { areEqual } from "react-window";

const NewPluginsList = ({plugins, favorites, setFavorites, showDownloadStat=false, showLatestRelease=false, displayDate=(plugin => plugin.createdAt), showChangelog=false, showDescription=true}) => {
  const pad = plugins.length.toString().length;

  return (
    <div className='flex-col stripped'>
      <List unstyled className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {plugins.map((plugin, idx) => 
          <MemoizedUnindexedPlugin key={plugin.pluginId} plugin={plugin} favorites={favorites} setFavorites={setFavorites} />
        )}
      </List>
    </div>
  )
}

const Plugin = (props) => {
  const { plugin, idx, pad, favorites, setFavorites } = props;
  return (
    <List.Item className="!mt-0 py-2 px-2 w-full hover:bg-slate-50">
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className='text-xl'>{String(idx).padStart(pad, '0')}.</div>
        <MemoizedUnindexedPlugin plugin={plugin} favorites={favorites} setFavorites={setFavorites} />
      </div>
    </List.Item>
  )
}

const UnindexedPlugin = (props) => {
  console.log('UnindexedPlugin');
  const { key, plugin, favorites, setFavorites } = props;
  return (
    <div key={key} className="flex flex-col">
      <Link href={`/plugins/${plugin.pluginId}`} className='text-xl font-semibold text-violet-800'>
        {plugin.name}
      </Link>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>{moment(plugin.createdAt).fromNow()} by <span className="text-gray-700">{plugin.author}</span></span>
        <Favorites plugin={plugin} isFavorite={favorites.includes(plugin.pluginId)} setFavorites={setFavorites} />
      </div>
      <div className='my-4'>
        {plugin?.aiDescription?.replaceAll('**', '') || plugin.description}
      </div>
      <Link href={`/plugins/${plugin.pluginId}`}
        className='underline text-gray-600 font-seminbold'>
          View Details
      </Link>
    </div>
  )
}

const MemoizedUnindexedPlugin = memo(UnindexedPlugin, areEqual);

export default NewPluginsList;
