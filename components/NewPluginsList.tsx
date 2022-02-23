import { isNotXDaysOld } from "../utils/datetime";
import PluginListItem from "./PluginListItem";

const NewPluginsList = ({plugins, favorites, setFavorites, showDownloadStat=false, showLatestRelease=false, displayDate=(plugin => plugin.createdAt) }) => {
  const pad = plugins.length.toString().length;

  return (
    <div className='flex-col'>
      {plugins.map((plugin, idx) => 
          <PluginListItem 
            key={plugin.id}
            idx={idx + 1}
            pad={pad}
            plugin={plugin}
            isFavorite={favorites.includes(plugin.pluginId)} 
            isNotADayOld={isNotXDaysOld(plugin.createdAt, 1)}
            setFavorites={setFavorites} 
            showDownloadStat={showDownloadStat}
            showLatestRelease={showLatestRelease} 
            displayDate={displayDate} />)}
    </div>
  )
}

export default NewPluginsList;
