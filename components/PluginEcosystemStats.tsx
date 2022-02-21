const PluginEcosystemStats = ({totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount}) => {
  return (
    <div className='flex flex-wrap justify-center py-3 bg-violet-900'>
      <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
        Total Plugins: {totalPluginsCount}
      </div>
      <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
        New Plugins: {newPluginsCount}
      </div>
      <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
        Recently Updated Plugins: {newReleasesCount}
      </div>
      <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
        Total tags: {totalTagsCount}
      </div>
    </div>
  )
}

export default PluginEcosystemStats;
