
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

  const updatesForFavPlugins = props.newReleases.filter(newRelease => favorites.includes(newRelease.pluginId));

  return (
    <div className='relative'>
      <Header current='home' />
      <Navbar current='home' />
      <PluginEcosystemStats
        totalPluginsCount={props.totalPluginsCount}
        newPluginsCount={props.newPluginsCount}
        newReleasesCount={props.newReleasesCount}
        totalTagsCount={props.totalTagsCount} />

      {/* Updates for your favorite plugins */}
      { updatesForFavPlugins && (updatesForFavPlugins.length > 0) && 
        <div className='bg-transparent mt-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='pt-5 pl-5 ml-5'>
              <InfoBar title='New Versions for your favorite plugins' />
            </div>
            <div className='px-10'>There are {updatesForFavPlugins?.length || 0} new updates from the last 10 days</div>
            <div className='flex flex-wrap gap-4 pt-5 mx-10'>
              {updatesForFavPlugins.slice(0, 6).map(newRelease => {
                const isFavorite = favorites.includes(newRelease.pluginId);
                const isTrending = newRelease.zScoreTrending > 10;
                return (
                  <a key={newRelease.id} href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer"
                    className='flex-col group rounded-md shrink-0 w-48 px-5 py-2 text-gray-700 transition hover:-translate-y-1 hover:scale-105 border shadow-lg'
                  >
                    <div className='flex flex-none justify-between'>
                      <div className='py-2'>
                        <div className='text-lg font-semibold tracking-wide text-violet-900'>{newRelease.name}</div>
                        <div className='text-sm text-gray-700'>
                          v<span className='text-violet-900 text-base font-semibold'>{newRelease.latestRelease}</span>
                        </div>
                        <div className='text-sm'>released {moment(newRelease.latestReleaseAt).fromNow()}</div>
                        <div className='text-sm'>by {newRelease.author}</div>
                      </div>
                    </div>
                    <CardAnnotations isFavorite={false} isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending} category='Update' />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      }

      {
        updatesForFavPlugins && (updatesForFavPlugins.length == 0) &&
        <div className='bg-transparent mt-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='py-5 pl-5 ml-5'>
              <InfoBar title='New Versions for your favorite plugins' />
            </div>
            { favorites.length == 0 ?
              <div className='flex pt-5 mx-10 flex-wrap'>
                <div className='w-full lg:w-1/2 flex justify-center'>
                  <img src='/images/empty.svg' alt='No favorites' className='w-72 h-72' />
                </div>
                <div className='m-4 lg:m-0 flex-grow flex flex-col justify-center items-center text-gray-800'>
                  <div className='text-2xl'>You don't have any favorite plugins yet.</div>
                  <div className='text-lg mt-2'>Mark plugins as favorite to get updates here.</div>
                </div>
              </div> : 
              <div className='flex pt-5 mx-10 flex-wrap'>
                <div className='w-full lg:w-1/2 flex justify-center'>
                  <img src='/images/empty.svg' alt='No favorites' className='w-72 h-72' />
                </div>
                <div className='m-4 lg:m-0 flex-grow flex flex-col justify-center items-center text-gray-800'>
                  <div className='text-2xl'>All your favorite plugins are up-to-date.</div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      {/* New Plugins */}
      <div className='bg-transparent mt-32'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='pt-5 pl-5 ml-5'>
            <InfoBar title='New Plugins' />
          </div>
          <div className='px-10'>There are {props.newPlugins?.length || 0} new plugins from the last 10 days</div>
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
      <div className='bg-transparent mt-32'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='pt-5 pl-5 ml-5'>
            <InfoBar title='New Versions' />
          </div>
          <div className='px-10'>There are {props.newReleases?.length || 0} new plugins from the last 10 days</div>
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
      <div className='bg-transparent mt-32'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='pt-5 pl-5 ml-5'>
            <InfoBar title='Most Downloaded' />
          </div>
          <div className='pl-10'>Here are the 25 most downloaded plugins ever since the beginning of Obsidian Editor.</div>
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

      {/* FAQ */}
      <div className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-5 pl-5 ml-5'>
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

  const newPluginsCount = newPlugins.length;
  const newReleasesCount = newReleases.length;

  return { props: { newPlugins, newPluginsCount, totalPluginsCount, newReleases, newReleasesCount, mostDownloaded, totalTagsCount: tags.length } }
}

export default Home;
