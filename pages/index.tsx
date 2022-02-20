
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import showdown from 'showdown';
import { setupFavorites } from '../utils/favorites';
import NewPluginCard from '../components/NewPluginCard';
import PluginEcosystemStats from '../components/PluginEcosystemStats';

const Home = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');
  
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div className='w-screen'>
      <Header />
      <Navbar current='home' />
      <PluginEcosystemStats
        totalPluginsCount={props.totalPluginsCount}
        newPluginsCount={props.newPlugins.length}
        newReleasesCount={props.newReleases.length}
        totalTagsCount={props.totalTagsCount} />

      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className=' py-5 pl-5'>
            <div className='text-2xl uppercase'>🌱 New Plugins {props.newPlugins && `(${props.newPlugins.length})`}</div>
            <details className='ml-2 text-gray-700 text-sm'>
              <summary>info</summary>
              <div className='ml-3'>• Plugins that are released in the last 10 days appear in this list. <br/>• Plugins that are released in the last 24 hours are tagged with 🥳 emoji. <br/> • Your favorite plugins are tagged with 🤩 emoji.</div>
            </details> 
          </div>
          <div className='flex flex-wrap'>
            {
              props.newPlugins.map(newPlugin => 
                <NewPluginCard key={newPlugin.pluginId} plugin={newPlugin} isFavorite={favorites.includes(newPlugin.pluginId)} />)
            }
          </div>
        </div>
      </div>
      {/* New Version */}
      <div className='bg-violet-900 py-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='py-5 pl-5 text-gray-50'>
            <div className='text-2xl uppercase'>🪴 New Versions {props.newReleases && `(${props.newReleases.length})`}</div>
            <details className='ml-2 text-violet-200 text-sm'>
              <summary>info</summary>
              <div className='ml-3'>• New versions that are released in the last 10 days appear in this list. <br/>• New versions that are released in the last 24 hours are tagged with 🥳 emoji. <br/> • Your favorite plugins are tagged with 🤩 emoji.</div>
            </details> 
          </div>
          <div className='flex flex-wrap'>
            {props.newReleases.map(newRelease => {
              const isFavorite = favorites.includes(newRelease.pluginId);
              return (
                <a key={newRelease.id} href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer" 
                    className='relative flex-col group basis-64 shrink-0 m-5 px-5 border rounded-md hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'>
                  <div className='flex flex-none justify-between'>
                    <div className='py-2'>
                      <div className='text-lg uppercase tracking-wide text-violet-900'>{newRelease.name}</div>
                      <div className='text-sm'>{moment(newRelease.latestReleaseAt).fromNow()} by <span className=''>{newRelease.author}</span></div>
                    </div>
                    <div className='text-3xl font-medium flex flex-col justify-center text-violet-900'>
                      <div>{newRelease.latestRelease}</div>
                    </div>
                  </div>
                  <div className='absolute -top-5 -left-5 text-3xl'>
                    { newRelease.latestReleaseAt > Date.now() - 24 * 60 * 60 * 1000 &&  <div title='Less than a day old'>🥳</div> }
                    { isFavorite && <div title='Favorite plugin'>🤩</div> }
                  </div>
                  {/* <div className='basis-48'>
                    <div className='truncate' dangerouslySetInnerHTML={{ __html: newRelease.latestReleaseDesc.length > 40 ? newRelease.latestReleaseDesc.substring(0, 40): newRelease.latestReleaseDesc}} />
                  </div> */}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      {/* Most Downloaded */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='py-5 pl-5'>
            <div className='text-2xl uppercase'>🚀 Most Downloaded {props.mostDownloaded && `(${props.mostDownloaded.length})`}</div>
            <details className='ml-2 text-gray-700 text-sm'>
              <summary>info</summary>
              <div className='ml-3'>• 25 most downloaded plugins in overall time appears in this list.  <br/> • Your favorite plugins are tagged with 🤩 emoji.</div>
            </details> 
          </div>
          <div className='flex flex-wrap'>
            {props.mostDownloaded.map(plugin => {
              const isFavorite = favorites.includes(plugin.pluginId);
              return (
                <a key={plugin.id} href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" 
                    className='relative flex-col justify-between group basis-64 shrink-0 mx-auto lg:mx-5 my-5 pb-5 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'>
                  <div className='flex flex-col justify-start text-violet-900 items-center bg-violet-900 py-2 rounded-t-md'>
                    <div className='text-3xl text-gray-100'>{plugin.totalDownloads.toLocaleString("en-US")}</div>
                    <div className='text-sm text-gray-100'>downloads</div>
                  </div>
                  <div className='py-2 flex-col justify-center items-center'>
                    <div className='text-lg uppercase tracking-wide text-violet-900 text-center'>{plugin.name}</div>
                    <div className='text-sm text-center'>by <span className=''>{plugin.author}</span></div>
                  </div>
                  <div className='absolute -top-5 -left-5 text-3xl'>
                    { plugin.createdAt > Date.now() - 2 * 24 * 60 * 60 * 1000 &&  <div title='Less than a day old'>🥳</div> }
                    { isFavorite && <div title='Favorite plugin'>🤩</div> }
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const daysAgo = (days: number) => Date.now() - (days * 24 * 60 * 60 * 1000)

export const getStaticProps = async () => {
  const prisma: PrismaClient = new PrismaClient();

  const newPlugins: any[] = await prisma.plugin.findMany({
    where: { 
      createdAt: {
        gt: daysAgo(10),
      }
    }
  });
  newPlugins.sort((a, b) => b.createdAt - a.createdAt);

  const totalPluginsCount = await prisma.plugin.count();

  const newReleases = await prisma.plugin.findMany({
    where: {
      latestReleaseAt: {
        gt: daysAgo(10),
      }
    }
  });
  newReleases.sort((a, b) => b.latestReleaseAt - a.latestReleaseAt);

  let mostDownloaded = await prisma.plugin.findMany({
    orderBy: {
      totalDownloads: 'desc',
    },
    take: 25
  });

  const tagSet = new Set();
  const tagsData = await prisma.pluginTags.findMany();
  tagsData.forEach(datum => tagSet.add(datum.tag));
  const tags = Array.from(tagSet);
  
  return { props: { newPlugins, totalPluginsCount, newReleases, mostDownloaded, tags } }
}


export default Home;
