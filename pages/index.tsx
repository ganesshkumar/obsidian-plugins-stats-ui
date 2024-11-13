
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
import { Button, Card, CustomFlowbiteTheme, HR } from "flowbite-react";

const customCardTheme: CustomFlowbiteTheme["card"] = {
  root: {
    children: "flex h-full flex-col justify-center gap-0 p-4"
  },
};

const mostDownloadedCardTheme: CustomFlowbiteTheme["card"] = {
  root: {
    children: "flex h-full justify-center gap-0"
  },
};

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
      <div className='bg-gray-800'>
        <Navbar current='home' />
      </div>
      <div className='bg-gray-50'>
        <PluginEcosystemStats
          totalPluginsCount={props.totalPluginsCount}
          newPluginsCount={props.newPluginsCount}
          newReleasesCount={props.newReleasesCount}
          totalTagsCount={props.totalTagsCount} />
      </div>

      {/* Updates for your favorite plugins */}
      { updatesForFavPlugins && (updatesForFavPlugins.length > 0) && 
        <div className='bg-transparent mt-16'>
          <div className='max-w-6xl mx-auto px-2'>
            <InfoBar title='New Versions for your favorite plugins' />
            <div>There are {updatesForFavPlugins?.length || 0} new updates from the last 10 days</div>
            <div className='flex flex-wrap gap-4 pt-5 mx-4'>
              {updatesForFavPlugins.slice(0, 6).map((newRelease, idx) => {
                const isFavorite = favorites.includes(newRelease.pluginId);
                const isTrending = newRelease.zScoreTrending > 10;
                return (
                  <a key={newRelease.id} href={`/plugins/${newRelease.pluginId}`} target="_blank" rel="noreferrer" id={`fav-plugin-update-${idx}`}
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
          <div className='max-w-6xl mx-auto px-2'>
            <InfoBar title='New Versions for your favorite plugins' />
            { favorites.length == 0 ?
              <div className='flex pt-5 mx-10 flex-wrap'>
                <div className='w-full lg:w-1/2 flex justify-center'>
                  <img src='/images/empty.svg' alt='No favorites' className='w-72 h-72' />
                </div>
                <div className='m-4 lg:m-0 flex-grow flex flex-col justify-center items-center text-gray-800'>
                  <div className='text-2xl text-center'>You don't have any favorite plugins yet.</div>
                  <div className='text-lg mt-2 text-center'>Mark plugins as favorite to get updates here.</div>
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

      <div className='max-w-6xl mx-auto'>
        <HR.Trimmed />
      </div>

      {/* New Plugins */}
      <div className='bg-transparent mt-8'>
        <div className='max-w-6xl mx-auto px-2'>
          <InfoBar title='New Plugins' />
          <div>There are {props.newPlugins?.length || 0} new plugins from the last 10 days</div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-5'>
            {
              props.newPlugins.slice(0, 6).map((plugin, idx) => {
                const isFavorite = favorites.includes(plugin.pluginId);
                return (
                  <Card
                    theme={customCardTheme}
                    key={plugin.id}
                    href={`/plugins/${plugin.pluginId}`}
                    id={`new-plugin-${idx}`}
                  >
                    <div className='text-xl font-semibold tracking-wide text-violet-900'>{plugin.name}</div>
                    <div className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
                    <div className='mt-5 text-sm'>{plugin.description}</div>
                    {/* <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(plugin.createdAt, 1)} isTrending={plugin.zScoreTrending > 10} category='Plugin' /> */}
                  </Card>
                );
              })
            }
            <Link href='/new' passHref className='text-xl font-medium mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer' id='new-plugin-all'>
              View all {props.newPlugins?.length || 0} new plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto my-4'>
        <HR.Trimmed />
      </div>

      {/* New Version */}
      <div className='bg-transparent'>
        <div className='max-w-6xl mx-auto px-2'>
          <InfoBar title='New Versions' />
          <div>There are {props.newReleases?.length || 0} new plugins from the last 10 days</div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-5'>
            {props.newReleases.slice(0, 12).map((newRelease, idx) => {
              // const isFavorite = favorites.includes(newRelease.pluginId);
              // const isTrending = newRelease.zScoreTrending > 10;
              return (
                <Card
                  theme={customCardTheme}
                  key={newRelease.id}
                  href={`/plugins/${newRelease.pluginId}`}
                  id={`plugin-update-${idx}`}
                >
                  <div className='flex flex-none justify-between'>
                   <div className='py-2'>
                     <div className='text-lg font-semibold tracking-wide text-violet-900'>{newRelease.name}</div>
                     <div className='text-sm text-gray-700'>{moment(newRelease.latestReleaseAt).fromNow()} by <span className=''>{newRelease.author}</span></div>
                   </div>
                   <div className='text-2xl font-medium flex flex-col justify-center'>
                     <div className='text-violet-900'>{newRelease.latestRelease}</div>
                   </div>
                   {/* <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending} category='Update' /> */}
                 </div>
                </Card>
              )
            })}
            <Link href='/updates' passHref className='text-xl font-medium mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer' id='plugin-update-all'>
              View all {props.newReleases?.length || 0} updated plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      <div className='bg-transparent mt-32'>
        <div className='max-w-6xl mx-auto px-2 flex flex-col rounded rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-800'>
          <div className='flex flex-col justify-center items-center my-12 '>
            <div className='text-center px-8 text-2xl font-bold text-white'>Subscribe to our newsletter<br/>to get weekly updates about new plugins and plugin updates</div>
          </div>
          <div className='flex justify-center mb-12'>
            <iframe src="https://obsidianpluginstats.substack.com/embed" width="480" height="320" style={{background: "#FF0000"}} frameBorder="0" scrolling="no"></iframe>
          </div>
        </div>
      </div>

      {/* Most Downloaded */}
      <div className='bg-transparent mt-32'>
        <div className='max-w-6xl mx-auto px-2'>
          <InfoBar title='Most Downloaded' />
          <div>Here are the 25 most downloaded plugins ever since the beginning of Obsidian Editor.</div>
          <div className='grid grid-cols-1 pt-5 gap-y-2'>
            {props.mostDownloaded.slice(0, 5).map((plugin, index) => {
              return (
                <Card key={plugin.id} href={`/plugins/${plugin.pluginId}`} id={`most-downloaded-${index}`} theme={mostDownloadedCardTheme}>
                  <div className='flex flex-col w-full md:w-24 justify-center items-center text-5xl bg-violet-50'>{index + 1}</div>
                  <div className='flex flex-col md:flex-row items-center gap-x-2 my-4 rounded-tr-md grow pl-8'>
                    <div className='text-xl uppercase tracking-wide text-violet-900 text-left'>{plugin.name}</div>
                    <div className='text-lg text-center'>by <span className=''>{plugin.author}</span></div>
                  </div>
                  <div className='flex flex-col w-full md:w-48 justify-start text-violet-900 items-center bg-violet-900 py-1 px-12'>
                    <div className='text-3xl text-gray-100'>{plugin.totalDownloads.toLocaleString("en-US")}</div>
                    <div className='text-lg text-gray-100'>downloads</div>
                  </div>
                </Card>
              )
            })}
            <Link href='/updates' passHref className='text-xl font-medium mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer' id='most-downloaded-all'>
              View top 25 downloaded plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto my-4'>
        <HR.Trimmed />
      </div>

      {/* FAQ */}
      <div className='bg-transparent'>
      <div className='max-w-6xl mx-auto px-2'>
        <InfoBar title='FAQ for plugin developers' />
        <div className='mt-4'>
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
