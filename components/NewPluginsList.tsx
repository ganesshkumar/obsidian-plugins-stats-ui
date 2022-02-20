import moment from "moment";
import Favorites from "./Favorites";

const NewPluginsList = ({plugins, favorites, setFavorites}) => {
  return (
    <div className='flex-col'>
      {plugins.map((plugin, idx) => {
        const isFavorite = favorites.includes(plugin.pluginId);
        return (
          <div key={plugin.id} className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
            <div className='text-3xl font text-gray-400 px-5'>
              <div>{String(idx+1).padStart(3, '0')}.</div>
              {isFavorite && <div>🤩</div>}
            </div>
            <div>
              <a href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
              <Favorites plugin={plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
              <div className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
              <div className='mr-5'>{plugin.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default NewPluginsList;
