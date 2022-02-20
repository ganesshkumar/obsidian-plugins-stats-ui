
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import Favorites from '../components/Favorites';

type Props = { };
type State = { };

const humanReadableNumbers = (n: number) => {
  const numString = n.toString();
  if (numString.length > 9) {
    return `${numString.split('').splice(0, numString.length - 6).join('')}B`
  } if (numString.length > 6) {
    return `${numString.split('').splice(0, numString.length - 6).join('')}M`
  } else if (numString.length > 3) {
    return `${numString.split('').splice(0, numString.length - 3).join('')}K`
  }
}

const MostDownloaded = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
  return (
    <div>
      <Header />
      <Navbar current='most-downloaded'/>
      {/* New Plugins */}
      <div className='bg-violet-50 pt-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            ⬇️ Most Downloaded {props.mostDownloaded && `(${props.mostDownloaded.length})`} 
          </div>
          <div className='flex-col'>
            {props.mostDownloaded.map((plugin, idx) => {
              const isFavorite = favorites.includes(plugin.pluginId)
              return (
                <div key={plugin.id} className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
                  <div className='text-3xl font text-gray-400 px-5'>
                    <div>{String(idx+1).padStart(2, '0')}.</div>
                    {isFavorite && <div>🤩</div>}
                  </div>
                  <div className='font bg-violet-900 text-violet-900 rounded px-5 mr-5 py-2 basis-24 lg:basis-40 text-center shrink-0'>
                    <div className='text-3xl  text-violet-100 px-2 rounded-md'>{humanReadableNumbers(plugin.totalDownloads)}</div>
                    <div className='text-sm text-violet-100 px-2 rounded-md'>downloads</div>
                  </div>
                  <div className=''>
                    <a href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
                    <Favorites plugin={plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
                    <div className='text-sm'>by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                    <div className='pr-5'>{plugin.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps = async (context) => {
  let prisma: PrismaClient = new PrismaClient();

  let mostDownloaded = await prisma.plugin.findMany({
    orderBy: {
      totalDownloads: 'desc',
    },
    take: 25
  });

  return { props: { mostDownloaded } };
}

export default MostDownloaded;
