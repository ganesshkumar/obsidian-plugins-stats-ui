
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import AppCache from '../cache/appcache';

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
  return (
    <div>
      <Header />
      <Navbar current='most-downloaded'/>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🚀 Most Downloaded {props.mostDownloaded && `(${props.mostDownloaded.length})`} 
          </div>
          <div className='flex-col'>
            {props.mostDownloaded.map((plugin, idx) => {
              return (
                <div key={plugin.id} className='group flex py-2 bg-gray-50 hover:bg-white text-gray-700'>
                  <div className='text-3xl font text-gray-400 px-5'>{String(idx+1).padStart(2, '0')} </div>
                  <div className='font bg-violet-900 text-violet-900 rounded px-5 mr-5 py-2 basis-40 text-center shrink-0'>
                    <div className='text-3xl  text-violet-100 px-2 rounded-md'>{humanReadableNumbers(plugin.totalDownloads)}</div>
                    <div className='text-sm text-violet-100 px-2 rounded-md'>downloads</div>
                  </div>
                  <div className=''>
                    <a href={`https://github.com/${plugin.repo}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
                    <div className='text-sm'>by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                    <div className='pr-5'>{plugin.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

const daysAgo = (days: number) => Date.now() - (days * 24 * 60 * 60 * 1000)

export const getServerSideProps = async (context) => {
  let prisma: PrismaClient;

  let mostDownloaded = AppCache.get('most_downloaded') || [];
  if (mostDownloaded.length <= 0) {
    if (!prisma) prisma = new PrismaClient();
    mostDownloaded = await prisma.plugin.findMany({
      orderBy: {
        totalDownloads: 'desc',
      },
      take: 25
    });
    AppCache.set('most_downloaded', mostDownloaded);
  }

  return { props: { mostDownloaded } };
}

export default MostDownloaded;
