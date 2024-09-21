import { isNotXDaysOld } from "../utils/datetime";
import PluginListItem from "./PluginListItem";

const NewPluginsList = ({plugins, favorites, setFavorites, showDownloadStat=false, showLatestRelease=false, displayDate=(plugin => plugin.createdAt), showChangelog=false, showDescription=true}) => {
  const pad = plugins.length.toString().length;

  return (
    <div className='flex-col stripped'>
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
          displayDate={displayDate} 
          showChangelog={showChangelog}
          showDescription={showDescription}
        />)}
    </div>
  )
}

export default NewPluginsList;
