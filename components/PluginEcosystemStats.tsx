const PluginEcosystemStats = ({totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount}) => {
  return (
    <div className='flex flex-wrap justify-center py-3 bg-violet-900'>
      <div className="mx-3 my-1 px-2 py-1 text-violet-50 cursor-context-menu">
        Total Plugins: {totalPluginsCount}
      </div>
      <div className="mx-3 my-1 px-2 py-1 text-violet-50 cursor-context-menu">
        New Plugins: {newPluginsCount}
      </div>
      <div className="mx-3 my-1 px-2 py-1 text-violet-50 cursor-context-menu">
        Recently Updated Plugins: {newReleasesCount}
      </div>
      <div className="mx-3 my-1 px-2 py-1 text-violet-50 cursor-context-menu">
        Total tags: {totalTagsCount}
      </div>
    </div>
  )
}

export default PluginEcosystemStats;
