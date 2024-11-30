import { List } from "flowbite-react";
import Link from "next/link";
import moment from "moment";
import Favorites from "./Favorites";
import { memo } from "react";
import { CategoryIcon } from "./Category";
import { Download } from "react-feather";

const NewPluginsList = ({plugins, favorites, setFavorites, showDownloadStat=false, showLatestRelease=false, displayDate=(plugin => plugin.createdAt), showChangelog=false, showDescription=true}) => {
  const pad = plugins.length.toString().length;

  return (
    <div className='flex-col stripped'>
      <List unstyled className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {plugins.map((plugin, idx) => 
          <Plugin idx={idx + 1} pad={pad}  key={plugin.pluginId} plugin={plugin} favorites={favorites} setFavorites={setFavorites} />
        )}
      </List>
    </div>
  )
}

const Plugin = (props) => {
  const { plugin, idx, pad, favorites, setFavorites } = props;
  return (
    <List.Item className="!mt-0 py-8 px-2 w-full hover:bg-slate-50">
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className='text-xl'>{String(idx).padStart(pad, '0')}.</div>
        <MemoizedUnindexedPlugin plugin={plugin} favorites={favorites} setFavorites={setFavorites} />
      </div>
    </List.Item>
  )
}

const UnindexedPlugin = (props) => {
  const { key, plugin, favorites, setFavorites } = props;
  return (
    <div key={key} className="flex flex-col">
      <Link href={`/plugins/${plugin.pluginId}`} className='text-xl font-semibold text-gray-800'>
        {plugin.name}
      </Link>
      <div className="flex items-center space-x-2 text-sm text-gray-700">
        <span>{moment(plugin.createdAt).fromNow()} by <span className="text-gray-700">{plugin.author}</span></span>
        <Favorites plugin={plugin} isFavorite={favorites.includes(plugin.pluginId)} setFavorites={setFavorites} />
      </div>
      <div className="pt-4 text-gray-700 flex items-center gap-x-2">
        <Download /> <span className="font-bold text-xl">{plugin.totalDownloads.toLocaleString()}</span>
      </div>
      <div className="flex mt-4 gap-x-4">
        <div>
          <CategoryIcon category={plugin.aiCategories} className="w-100" />
        </div>
        <div>
          <div className="text-gray-700">
            Category: <span className="font-bold">{plugin.aiCategories}</span>
          </div>
          <div className="flex gap-x-2 text-gray-700 cursor-pointer">
            {plugin.aiTags?.split(',').map(tag => <span key={tag} className='px-2 bg-gray-200 rounded-md'><span className="text-gray-400">#</span>{tag}</span>)}
          </div>
        </div>
      </div>
      <div className='my-4 text-gray-700'>
        {plugin?.aiDescription?.replaceAll('**', '') || plugin.description}
      </div>
      <Link href={`/plugins/${plugin.pluginId}`}
        className=' font-medium w-48 border bg-gray-600 text-slate-100 px-2 py-1 rounded text-center'>
          View Plugin Details
      </Link> 
    </div>
  )
}

const MemoizedUnindexedPlugin = memo(UnindexedPlugin);

export default NewPluginsList;
