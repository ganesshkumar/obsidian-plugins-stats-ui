
import React, { useEffect, useState } from 'react';
import Header from '../components/HeaderNew';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import Footer from '../components/Footer';
import { setupFavorites } from '../utils/favorites';
import NewPluginsList from '../components/NewPluginsList';
import { daysAgo } from '../utils/datetime';
import InfoBar from '../components/InfoBar';


const New = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div>
      <Header />
      <div>
        <Navbar current='new'/>
      </div>
      {/* New Plugins */}
      <main className='bg-white pt-5'>
        <div className='max-w-6xl mx-auto px-2'>
          <InfoBar title={`New Plugins ${props.newPlugins && `(${props.newPlugins.length})`}` } />
          <div className='flex-col'>
            <NewPluginsList plugins={props.newPlugins} favorites={favorites} setFavorites={setFavorites} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  let prisma: PrismaClient = new PrismaClient();

  let newPlugins: any[] = await prisma.plugin.findMany({
    where: { 
      createdAt: {
        gt: daysAgo(10),
      }
    }
  });
  newPlugins.sort((a, b) => b.createdAt - a.createdAt);
  
  return { props: { newPlugins } };
}

export default New;
