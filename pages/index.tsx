
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
import InfoBar from '../components/InfoBar';
import { daysAgo, isNotXDaysOld } from '../utils/datetime';
import CardAnnotations from '../components/CardAnnotations';
import Link from 'next/link';
import Faq from '../components/Faq';

const Home = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const newPluginsInfoLines = [
    'Plugins that are released in the last 10 days appear in this list.',
    'Plugins that are released in the last 24 hours are tagged with 🥳 emoji.',
    'Your favorite plugins are tagged with 🤩 emoji.',
  ];

  const newReleasesInfoLines = [
    'New versions that are released in the last 10 days appear in this list.',
    'New versions that are released in the last 24 hours are tagged with 🥳 emoji.',
    'Your favorite plugins are tagged with 🤩 emoji.',
  ];

  const mostDownloadedInfoLines = [
    '25 most downloaded plugins in overall time appears in this list.',
    'Your favorite plugins are tagged with 🤩 emoji.',
  ];

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
      <div className='bg-violet-50 py-20'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='py-5 pl-5'>
            <InfoBar title='🌱 New Plugins' itemsCount={props.newPlugins?.length || 0} infoLines={newPluginsInfoLines} />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 pt-5'>
            {
              props.newPlugins.slice(0, 5).map(plugin => {
                const isFavorite = favorites.includes(plugin.pluginId);
                return <a key={plugin.id}
                  href={`/plugins/${plugin.pluginId}`}
                  target="_blank" rel="noreferrer"
                  className='relative flex-col mx-auto group rounded-md shrink-0 my-3 mx-10 px-5 py-2 hover:shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110' >
                  <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>{plugin.name}</div>
                  <div className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                  <div className='mt-5 text-sm'>{plugin.description}</div>
                  <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(plugin.createdAt, 1)} isTrending={plugin.zScoreTrending > 10} />
                </a>
              })
            }
            <Link href='/new' passHref>
              <div className='flex flex-col rounded-md justify-center mx-auto group shrink-0 my-3 mx-10 px-5 py-2 hover:shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110 cursor-pointer' >
                <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>View all {props.newPlugins?.length || 0} new plugins ⟶</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* New Version */}
      <div className='bg-violet-900 py-20'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='py-5 pl-5 text-gray-50'>
            <InfoBar title='🪴 New Versions' itemsCount={props.newReleases?.length || 0} infoLines={newReleasesInfoLines} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 pt-5'>
            {props.newReleases.slice(0, 5).map(newRelease => {
              const isFavorite = favorites.includes(newRelease.pluginId);
              const isTrending = newRelease.zScoreTrending > 10;
              return (
                <a key={newRelease.id} href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer"
                  className='relative flex-col group shrink-0 mx-auto my-3 mx-10 px-5 rounded-md hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'>
                  <div className='flex flex-none justify-between'>
                    <div className='py-2'>
                      <div className='text-lg uppercase tracking-wide text-violet-900'>{newRelease.name}</div>
                      <div className='text-sm text-gray-400 text-gray-700'>{moment(newRelease.latestReleaseAt).fromNow()} by <span className=''>{newRelease.author}</span></div>
                    </div>
                    <div className='text-3xl font-medium flex flex-col justify-center'>
                      <div className='text-violet-900'>{newRelease.latestRelease}</div>
                    </div>
                  </div>
                  <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending} />
                </a>
              )
            })}
            <Link href='/updates' passHref>
              <div className='flex flex-col rounded-md justify-center mx-auto group shrink-0 my-3 mx-10 px-5 py-2 hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110 cursor-pointer' >
                <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>View all {props.newReleases?.length || 0} updated plugins ⟶</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Most Downloaded */}
      <div className='bg-violet-50 py-20'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='py-5 pl-5 text-gray-700'>
            <InfoBar title='🏆 Most Downloaded' itemsCount={-1} infoLines={mostDownloadedInfoLines} />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 pt-5'>
            {props.mostDownloaded.slice(0, 5).map(plugin => {
              const isFavorite = favorites.includes(plugin.pluginId);
              return (
                <a key={plugin.id} href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer"
                  className='relative flex-col group shrink-0 mx-auto mx-10 my-3 pb-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110'>
                  <div className='flex flex-col justify-start text-violet-900 items-center bg-violet-900 py-1 rounded-t-md'>
                    <div className='text-3xl text-gray-100'>{plugin.totalDownloads.toLocaleString("en-US")}</div>
                    <div className='text-sm text-gray-100'>downloads</div>
                  </div>
                  <div className='py-1 flex-col justify-center items-center'>
                    <div className='text-lg uppercase tracking-wide text-violet-900 text-center'>{plugin.name}</div>
                    <div className='text-sm text-center'>by <span className=''>{plugin.author}</span></div>
                  </div>
                  <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(plugin.createdAt, 1)} isTrending={plugin.zScoreTrending > 10} />
                </a>
              )
            })}
            <Link href='/updates' passHref>
              <div className='flex flex-col rounded-md rounded-md justify-center mx-auto group shrink-0 my-3 mx-10 px-5 py-2 hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110 cursor-pointer' >
                <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>View top 25 downloaded plugins ⟶</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-violet-900 py-20'>
        <div className='container w-full lg:w-1/2 mx-auto'>
          <div className='py-5 pl-5 text-gray-50'>
            <InfoBar title='🤔 FAQ for plugin developers' itemsCount={-1} infoLines={[]} />
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
