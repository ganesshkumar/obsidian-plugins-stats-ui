
import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

import { PrismaClient } from "@prisma/client";
import AppCache from '../cache/appcache';

type Props = { };
type State = { };

const Home = (props) => {
  return (
    <div>
      <Header />
      {/* Header */}
      {/* <div className='uppercase py-5 text-3xl text-purple-700 font-semibold flex justify-center tracking-wide'>
        <div>Obsidian Plugin Stats</div>
      </div> */}
      {/* Navbar */}
      <Navbar current='home' />
      {/* Tags */}
      <div className='flex justify-center my-3'>
        <div className="mx-3 border border-dashed border-violet-700 rounded px-2 py-1 text-violet-700">
          Total Plugins: {props.totalPluginsCount}
        </div>
        <div className="mx-3 border border-dashed border-violet-700 rounded px-2 py-1 text-violet-700">
          New Plugins: {props.newPlugins.length}
        </div>
      </div>
      {/* New Plugins */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5'>
            🌱 New Plugins {props.newPlugins && `(${props.newPlugins.length})`} 
          </div>
          <div className='flex flex-wrap'>
            {props.newPlugins.map(newPlugin => {
              return (
                <a key={newPlugin.id} href={`https://github.com/${newPlugin.repo}`} target="_blank" rel="noreferrer" className='group basis-64 shrink-0 m-5 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110' >
                  <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>{newPlugin.name}</div>
                  <div  className='text-sm'>by <span className='group-hover:text-violet-500'>{newPlugin.author}</span></div>
                  <div className='mt-5 text-sm'>{newPlugin.description}</div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
      {/* New Version */}
      <div className='bg-violet-900 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5 text-gray-50'>
            🪴 New Versions {props.newReleases && `(${props.newReleases.length})`} 
          </div>
          <div className='flex flex-wrap'>
            {props.newReleases.map(newRelease => {
              return (
                <a key={newRelease.id} href={`https://github.com/${newRelease.repo}/releases/tag/${newRelease.latestRelease}`} target="_blank" rel="noreferrer" 
                    className='flex justify-between group basis-64 shrink-0 m-5 px-5 border rounded-md hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'>
                  <div className='py-2'>
                    <div className='text-lg uppercase tracking-wide text-violet-900'>{newRelease.name}</div>
                    <div className='text-sm'>by <span className=''>{newRelease.author}</span></div>
                    <div className='mt-5 cursor-pointer underline text-violet-900 group-hover:text-violet-500'>Changelog</div>
                  </div>
                  <div className='text-3xl font-medium flex flex-col justify-center text-violet-900'>
                    <div>{newRelease.latestRelease}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
      {/* Most Downloaded */}
      <div className='bg-violet-50 py-5'>
        <div className='container w-0 lg:w-1/2 mx-auto'>
          <div className='text-2xl py-5 uppercase pl-5'>
            🚀 Most Downloaded {props.mostDownloaded && `(${props.mostDownloaded.length})`} 
          </div>
          <div className='flex flex-wrap'>
            {props.mostDownloaded.map(newRelease => {
              return (
                <a key={newRelease.id} href={`https://github.com/${newRelease.repo}/releases/tag/${newRelease.latestRelease}`} target="_blank" rel="noreferrer" 
                    className='flex-col justify-between group basis-64 shrink-0 m-5 pb-5 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'>
                  <div className='flex flex-col justify-start text-violet-900 items-center bg-violet-900 py-2 rounded-t-md'>
                    <div className='text-3xl text-gray-100'>{newRelease.totalDownloads.toLocaleString("en-US")}</div>
                    <div className='text-sm text-gray-100'>downloads</div>
                  </div>
                  <div className='py-2 flex-col justify-center items-center'>
                    <div className='text-lg uppercase tracking-wide text-violet-900 text-center'>{newRelease.name}</div>
                    <div className='text-sm text-center'>by <span className=''>{newRelease.author}</span></div>
                  </div>
                </a>
              )
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

  return { props: { newPlugins, totalPluginsCount, newReleases, mostDownloaded } }
}


export default Home;
