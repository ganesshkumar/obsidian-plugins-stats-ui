import Link from "next/link";
import moment from "moment";
import Favorites from "./Favorites";
import { memo } from "react";
import { VList } from "virtua";

const AllPluginsList = ({plugins, favorites, setFavorites}) => {  
  return (
    <div className='flex-col stripped grow'>
      <VList style={{height: "100%"}}>
        {plugins.map((plugin, index) => (
          <MemoizedUnindexedPlugin key={plugin.pluginId} plugin={plugins[index]}  favorites={favorites} setFavorites={setFavorites} />
        ))}
      </VList>
    </div>
  )
}

const UnindexedPlugin = (props) => {
  const { plugin, favorites, setFavorites } = props;
  return (
    <div key={plugin.pluginId} className="flex flex-col">
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

const MemoizedUnindexedPlugin = memo(UnindexedPlugin);

export default AllPluginsList;
