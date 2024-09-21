
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from "@prisma/client";
import moment from 'moment';
import showdown from 'showdown';
import { setupFavorites } from '../utils/favorites';
import PluginEcosystemStats from '../components/PluginEcosystemStats';
import InfoBar from '../components/InfoBar';
import { daysAgo, isNotXDaysOld } from '../utils/datetime';
import CardAnnotations from '../components/CardAnnotations';
import Link from 'next/link';
import Faq from '../components/Faq';
import Marquee from 'react-fast-marquee';

const Home = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  return (
    <div className='relative'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 top-0 bg-yellow-200 pt-2'>
        <Marquee>There was an issue with the DB. We lost few of the plugin data. The count of new plugins and updates plugins will be incorrect(higher than the actual number) until 30 September.&nbsp; </Marquee>
      </div>
      <Header />
      <Navbar current='home' />
      <PluginEcosystemStats
        totalPluginsCount={props.totalPluginsCount}
        newPluginsCount={props.newPlugins.length}
        newReleasesCount={props.newReleases.length}
        totalTagsCount={props.totalTagsCount} />

      {/* New Plugins */}
      <div className='bg-transparent py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-5 pl-5 flex justify-center'>
            <InfoBar title='New Plugins' />
          </div>
          <div className='pl-8'>There are {props.newPlugins?.length || 0} new plugins from the last 10 days</div>
          <div className='grid grid-cols-1 md:grid-cols-2 pt-5'>
            {
              props.newPlugins.slice(0, 6).map(plugin => {
                const isFavorite = favorites.includes(plugin.pluginId);
                return (
                  <a key={plugin.id}
                    href={`/plugins/${plugin.pluginId}`}
                    target="_blank" rel="noreferrer"
                    className='flex-col group rounded-md shrink-0 my-3 mx-10 px-5 py-2 text-gray-700 transition hover:-translate-y-1 hover:scale-105 border shadow-lg'
                  >
                    <div className='text-xl font-semibold tracking-wide text-violet-900'>{plugin.name}</div>
                    <div className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                    <div className='mt-5 text-sm'>{plugin.description}</div>
                    <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(plugin.createdAt, 1)} isTrending={plugin.zScoreTrending > 10} category='Plugin' />
                  </a>
                );
              })
            }
            <Link href='/new' passHref className='text-xl font-medium mx-10 mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer'>
              View all {props.newPlugins?.length || 0} new plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      {/* New Version */}
      <div className='bg-transparent'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-5 pl-5 flex justify-center'>
            <InfoBar title='New Versions' />
          </div>
          <div className='pl-8'>There are {props.newReleases?.length || 0} new plugins from the last 10 days</div>
          <div className='grid grid-cols-1 md:grid-cols-2 pt-5'>
            {props.newReleases.slice(0, 6).map(newRelease => {
              const isFavorite = favorites.includes(newRelease.pluginId);
              const isTrending = newRelease.zScoreTrending > 10;
              return (
                <a key={newRelease.id} href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer"
                  className='flex-col group rounded-md shrink-0 my-3 mx-10 px-5 py-2 text-gray-700 transition hover:-translate-y-1 hover:scale-105 border shadow-lg'
                >
                  <div className='flex flex-none justify-between'>
                    <div className='py-2'>
                      <div className='text-lg font-semibold tracking-wide text-violet-900'>{newRelease.name}</div>
                      <div className='text-sm text-gray-700'>{moment(newRelease.latestReleaseAt).fromNow()} by <span className=''>{newRelease.author}</span></div>
                    </div>
                    <div className='text-3xl font-medium flex flex-col justify-center'>
                      <div className='text-violet-900'>{newRelease.latestRelease}</div>
                    </div>
                  </div>
                  <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending} category='Update' />
                </a>
              )
            })}
            <Link href='/updates' passHref className='text-xl font-medium mx-10 mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer'>
              View all {props.newReleases?.length || 0} updated plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      {/* Most Downloaded */}
      <div className='bg-transparent py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-5 pl-5 flex justify-center'>
            <InfoBar title='Most Downloaded' />
          </div>
          <div className='pl-8'>Here are the 25 most downloaded plugins ever since the beginning of Obsidian Editor.</div>
          <div className='grid grid-cols-1 pt-5'>
            {props.mostDownloaded.slice(0, 5).map((plugin, index) => {
              return (
                <a key={plugin.id} href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer"
                  className='relative flex flex-col md:flex-row group shrink-0 mx-10 my-3 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'
                >
                  <div className='flex flex-col w-full md:w-24 justify-center items-center text-5xl bg-violet-50'>{index + 1}</div>
                  <div className='flex flex-col md:flex-row items-center gap-x-2 my-4 rounded-tr-md grow pl-8'>
                    <div className='text-xl uppercase tracking-wide text-violet-900 text-left'>{plugin.name}</div>
                    <div className='text-lg text-center'>by <span className=''>{plugin.author}</span></div>
                  </div>
                  <div className='flex flex-col w-full md:w-48 justify-start text-violet-900 items-center bg-violet-900 py-1 px-12'>
                    <div className='text-3xl text-gray-100'>{plugin.totalDownloads.toLocaleString("en-US")}</div>
                    <div className='text-lg text-gray-100'>downloads</div>
                  </div>

                </a>
              )
            })}
            <Link href='/updates' passHref className='text-xl font-medium mx-10 mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer'>
              View top 25 downloaded plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      <div className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-5 pl-5 flex justify-center'>
            <InfoBar title='FAQ for plugin developers' />
          </div>
          <div className='ml-5'>
            <Faq />
          </div>
        </div>
      </div>
      <Footer />
    </div >
  )
}

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

  const tags = await prisma.pluginTags.findMany({
    select: { tag: true },
    distinct: ['tag']
  });

  return { props: { newPlugins, totalPluginsCount, newReleases, mostDownloaded, totalTagsCount: tags.length } }
}

export default Home;
