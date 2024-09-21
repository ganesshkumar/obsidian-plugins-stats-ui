import Link from 'next/link';

const PluginEcosystemStats = ({ totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount }) => {
  return (
    <section className="bg-transparent text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around py-16 gap-y-8">
        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/plugins' passHref>
            <a className='w-full'>
              <div className='py-2 font-bold text-violet-900 text-7xl'>{totalPluginsCount}</div>
              <div className='pb-2 text-lg bg-violet-50 pt-2'>Total Plugins</div>
            </a>
          </Link>
        </div>

        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/new' passHref>
            <a className='w-full'>
              <div className='py-2 font-bold text-violet-900 text-7xl'>{newPluginsCount}</div>
              <div className='pb-2 text-lg bg-violet-50 pt-2'>New Plugins</div>
            </a>
          </Link>
        </div>

        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/updates' passHref>
            <a className='w-full'>
              <div className='py-2 font-bold text-violet-900 text-7xl'>{newReleasesCount}</div>
              <div className='pb-2 text-lg bg-violet-50 pt-2'>Recently Updated Plugins</div>
            </a>
          </Link>
        </div>

        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/tags' passHref>
            <a className='w-full'>
              <div className='py-2 font-bold text-violet-900 text-7xl'>{totalTagsCount}</div>
              <div className='pb-2 text-lg bg-violet-50 pt-2'>Total tags</div>
            </a>
          </Link>
        </div>
      </div>
    </section>
    // <div className='flex flex-wrap justify-center py-16 bg-violet-900'>

    // </div>
  )
}

export default PluginEcosystemStats;
