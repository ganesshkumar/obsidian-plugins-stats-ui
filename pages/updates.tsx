
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import AppCache from '../cache/appcache';

type Props = { };
type State = { };

const Updates = (props) => {
  return (
    <div>
      <Header />
      <Navbar current='updates'/>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🪴 New Versions {props.newReleases && `(${props.newReleases.length})`} 
          </div>
          <div className='flex-col'>
            {props.newReleases.map((newRelease, idx) => {
              return (
                <div key={newRelease.id} className='group flex py-2 bg-gray-50 hover:bg-white text-gray-700'>
                  <div className='text-3xl font text-gray-400 px-5'>{String(idx+1).padStart(2, '0')} </div>
                  <div className='text-3xl font text-violet-900 px-5 py-2 basis-40 text-center shrink-0'>
                    <span className='bg-violet-900 text-violet-100 px-2 rounded-md'>{newRelease.latestRelease}</span>
                  </div>
                  <div>
                    <a href={`https://github.com/${newRelease.repo}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{newRelease.name}</a>
                    <div className='text-sm'>by <span className='group-hover:text-violet-500'>{newRelease.author}</span></div>
                    <div className='pr-5'>{newRelease.description}</div>
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

  let newReleases = AppCache.get('new_releases') || [];
  if (newReleases.length <= 0) {
    if (!prisma) prisma = new PrismaClient();
    newReleases = await prisma.plugin.findMany({
      where: {
        latestReleaseAt: {
          gt: daysAgo(10),
        }
      }
    });
    AppCache.set('new_releases', newReleases);
  }

  return { props: { newReleases } };
}

export default Updates;
