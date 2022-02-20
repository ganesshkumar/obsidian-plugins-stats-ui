
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from "@prisma/client";
import AppCache from '../cache/appcache';
import moment from 'moment';
import showdown from 'showdown';
import { setupFavorites } from '../utils/favorites';

type Props = { };
type State = { };

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
      {/* Header */}
      {/* Navbar */}
      <Navbar current='home' />
      {/* Tags */}
      <div className='flex flex-wrap justify-center py-3 bg-violet-900'>
        <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
          Total Plugins: {props.totalPluginsCount}
        </div>
        <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
          New Plugins: {props.newPlugins.length}
        </div>
        <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
          Recently Updated Plugins: {props.newReleases.length}
        </div>
        <div className="mx-3 my-1 border border-dashed border-violet-50 rounded px-2 py-1 text-violet-50">
          Total tags: {props.tags.length}
        </div>
      </div>
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
            {props.newPlugins.map(newPlugin => {
              const isFavorite = favorites.includes(newPlugin.pluginId);
              return (
                <a key={newPlugin.id} href={`/plugins/${newPlugin.pluginId}`} target="_blank" rel="noreferrer" className='relative mx-auto group basis-64 shrink-0 lg:mx-5 my-5 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110' >
                  <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>{newPlugin.name}</div>
                  <div  className='text-sm'>{moment(newPlugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{newPlugin.author}</span></div>
                  <div className='mt-5 text-sm'>{newPlugin.description}</div>
                  <div className='absolute -top-5 -left-5 text-3xl'>
                    { newPlugin.createdAt > Date.now() - 2 * 24 * 60 * 60 * 1000 &&  <div title='Less than a day old'>🥳</div> }
                    { isFavorite && <div title='Favorite plugin'>🤩</div> }
                  </div>
                </a>
              )
            })}
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
                    { newRelease.createdAt > Date.now() - 2 * 24 * 60 * 60 * 1000 &&  <div title='Less than a day old'>🥳</div> }
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

export const getServerSideProps = async (context) => {
  let prisma: PrismaClient;

  let newPlugins: any[] = AppCache.get('new_plugins') || [];
  if (newPlugins.length <= 0) {
    if (!prisma) prisma = new PrismaClient();
    newPlugins = await prisma.plugin.findMany({
      where: { 
        createdAt: {
          gt: daysAgo(10),
        }
      }
    });
    newPlugins.sort((a, b) => b.createdAt - a.createdAt);
    AppCache.set('new_plugins', newPlugins);
  }

  let totalPluginsCount = AppCache.get('total_plugins') || -1;
  if (totalPluginsCount < 0) {
    if (!prisma) prisma = new PrismaClient();
    totalPluginsCount = await prisma.plugin.count();
    AppCache.set('total_plugins', totalPluginsCount)
  }

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
    newReleases.sort((a, b) => b.latestReleaseAt - a.latestReleaseAt);
    AppCache.set('new_releases', newReleases);
  }

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

  let tags = AppCache.get('tags') || [];
  if (tags.length <= 0) {
    if (!prisma) prisma = new PrismaClient();
    const tagsData = await prisma.pluginTags.findMany();
    
    const tagSet = new Set();
    tagsData.forEach(datum => tagSet.add(datum.tag));
    tags = Array.from(tagSet);

    AppCache.set('tags', tags);
  }

  return { props: { newPlugins, totalPluginsCount, newReleases, mostDownloaded, tags } }
}


export default Home;
