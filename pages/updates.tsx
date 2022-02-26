
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from "@prisma/client";
import { setupFavorites } from '../utils/favorites';
import { daysAgo } from '../utils/datetime';
import NewPluginsList from '../components/NewPluginsList';

const Updates = (props) => {  
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
        <div className='pb-5 container w-full lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 bg-gray-50 cursor-context-menu'>
            🪴 New Versions {props.newReleases && `(${props.newReleases.length})`} 
          </div>
          <div className='flex-col'>
            <NewPluginsList 
                plugins={props.newReleases} 
                favorites={favorites} 
                setFavorites={setFavorites} 
                showLatestRelease={true} 
                displayDate={plugin => plugin.latestReleaseAt} 
                showChangelog={true} 
                showDescription={false} />
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
