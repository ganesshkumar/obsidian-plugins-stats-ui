import Link from 'next/link';

const PluginEcosystemStats = ({ totalPluginsCount, newPluginsCount, newReleasesCount, totalTagsCount }) => {
  return (
    <section className="text-gray-800">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around gap-y-8">
        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/new' passHref className='w-full'>
            <div className='py-2 font-bold text-violet-900 text-7xl'>{newPluginsCount}</div>
            <div className='pb-2 text-lg bg-gray-100 pt-2'>New Plugins</div>
          </Link>
        </div>

        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/updates' passHref className='w-full'>
            <div className='py-2 font-bold text-violet-900 text-7xl'>{newReleasesCount}</div>
            <div className='pb-2 text-lg bg-gray-100 pt-2'>Recently Updated Plugins</div>
          </Link>
        </div>

        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/tags' passHref className='w-full'>
            <div className='py-2 font-bold text-violet-900 text-7xl'>{totalTagsCount}</div>
            <div className='pb-2 text-lg bg-gray-100 pt-2'>Total tags</div>
          </Link>
        </div>

        <div className="mx-3 my-1 border rounded-md cursor-pointer basis-96 md:basis-80 lg:basis-64 text-center bg-white shadow hover:scale-110 transition transform flex flex-col items-center justify-center">
          <Link href='/plugins' passHref className='w-full'>
            <div className='py-2 font-bold text-violet-900 text-7xl'>{totalPluginsCount}</div>
            <div className='pb-2 text-lg bg-gray-100 pt-2'>Total Plugins</div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PluginEcosystemStats;
