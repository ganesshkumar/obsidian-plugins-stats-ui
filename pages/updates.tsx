
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import showdown from 'showdown';
import { setupFavorites } from '../utils/favorites';
import Favorites from '../components/Favorites';
import { daysAgo } from '../utils/datetime';
import IndexWithAnnotations from '../components/IndexWithAnnotations';

const Updates = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');
  
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);
  
  const pad = props.newReleases.length.toString().length;

  return (
    <div>
      <Header />
      <Navbar current='updates'/>
      {/* New Plugins */}
      <div className='bg-violet-50 pt-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50'>
            🪴 New Versions {props.newReleases && `(${props.newReleases.length})`} 
          </div>
          <div className='flex-col'>
            {props.newReleases.map((newRelease, idx) => {
              const isFavorite = favorites.includes(newRelease.pluginId);
              return (
                <div key={newRelease.id} className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
                  <IndexWithAnnotations isFavorite={isFavorite} idx={idx+1} pad={pad}/>
                  <div className='text-xl lg:text-3xl font text-violet-900 px-5 py-1 lg:py-2 basis:28 lg:basis-40 text-center shrink-0'>
                    <span className='bg-violet-900 text-violet-100 px-2 rounded-md'>{newRelease.latestRelease}</span>
                  </div>
                  <div>
                    <a href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{newRelease.name}</a>
                    <Favorites plugin={newRelease} isFavorite={isFavorite} setFavorites={setFavorites} />
                    <div className='text-sm'>{moment(newRelease.latestReleaseAt).fromNow()} by <span className='group-hover:text-violet-500'>{newRelease.author}</span></div>
                    <details>
                      <summary className='text-sm'>Changelog</summary>
                      <div dangerouslySetInnerHTML={{__html: mdConverter.makeHtml(newRelease.latestReleaseDesc)}} />
                    </details>
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

export const getStaticProps = async () => {
  let prisma: PrismaClient = new PrismaClient();

  let newReleases = await prisma.plugin.findMany({
    where: {
      latestReleaseAt: {
        gt: daysAgo(10),
      }
    }
  });
  newReleases.sort((a, b) => b.latestReleaseAt - a.latestReleaseAt)
  
  return { props: { newReleases } };
}

export default Updates;
