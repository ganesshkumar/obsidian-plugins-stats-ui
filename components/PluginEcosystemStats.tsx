const PluginEcosystemStats = ({ totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount }) => {
  return (
    <div className='flex flex-wrap justify-center pt-16 bg-violet-50'>
      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <div className='py-2 font-bold text-violet-900 text-4xl'>{totalPluginsCount}</div>
        <div className='pb-2 text-xl'>Total Plugins</div>
      </div>
      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <div className='py-2 font-bold text-violet-900 text-4xl'>{newPluginsCount}</div>
        <div className='pb-2 text-xl'>New Plugins</div>
      </div>
      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <div className='py-2 font-bold text-violet-900 text-4xl'>{newReleasesCount}</div>
        <div className='pb-2 text-xl'>Recently Updated Plugins</div>
      </div>
      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <div className='py-2 font-bold text-violet-900 text-4xl'>{totalTagsCount}</div>
        <div className='pb-2 text-xl'>Total tags</div>
      </div>
    </div>
  )
}

export default PluginEcosystemStats;
