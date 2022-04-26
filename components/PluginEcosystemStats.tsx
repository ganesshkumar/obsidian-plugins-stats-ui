import Link from 'next/link';

const PluginEcosystemStats = ({ totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount }) => {
  return (
    <div className='flex flex-wrap justify-center py-16 bg-violet-900'>

      <div className="mx-3 my-1 border rounded-md cursor-pointer basis-64 text-center bg-white">
        <Link href='/all' passHref>
          <a>
            <div className='py-2 font-bold text-violet-900 text-4xl'>{totalPluginsCount}</div>
            <div className='pb-2 text-xl'>Total Plugins</div>
          </a>
        </Link>
      </div>


      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <Link href='/new' passHref>
          <a>
            <div className='py-2 font-bold text-violet-900 text-4xl'>{newPluginsCount}</div>
            <div className='pb-2 text-xl'>New Plugins</div>
          </a>
        </Link>
      </div>

      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <Link href='/updates' passHref>
          <a>
            <div className='py-2 font-bold text-violet-900 text-4xl'>{newReleasesCount}</div>
            <div className='pb-2 text-xl'>Recently Updated Plugins</div>
          </a>
        </Link>
      </div>

      <div className="mx-3 my-1 border rounded-md cursor-context-menu basis-64 text-center bg-white">
        <Link href='/tags' passHref>
          <a>
            <div className='py-2 font-bold text-violet-900 text-4xl'>{totalTagsCount}</div>
            <div className='pb-2 text-xl'>Total tags</div>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default PluginEcosystemStats;
