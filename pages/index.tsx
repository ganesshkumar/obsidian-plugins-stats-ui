'use client';

import React, { useRef } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import showdown from 'showdown';
import PluginEcosystemStats from '../components/PluginEcosystemStats';
import InfoBar from '../components/InfoBar';
import { daysAgo } from '../utils/datetime';
import Link from 'next/link';
import Faq from '../components/Faq';
import { Card, CustomFlowbiteTheme, HR } from 'flowbite-react';
import FavPluginUpdates from '../components/FavPluginUpdates';
import { CategoryIcon } from '../components/Category';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import LinkButton from '../components/LinkButton';
import { PluginsCache } from '../cache/plugins-cache';
import { sanitizeTag, tagDenyList } from '../utils/plugins';

const customCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: 'flex h-full flex-col justify-center gap-0 p-4',
  },
};

const mostDownloadedCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: 'flex h-full justify-center gap-0',
  },
};

const Home = (props) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  return (
    <div className="relative">
      <Header current="home" />
      <div>
        <Navbar current="home" />
      </div>

      <div className="bg-gray-50 lg:py-10 bg-[url('/images/confetti-doodles.svg')]">
        <PluginEcosystemStats {...props} />
      </div>

      <div className="bg-transparent mt-16">
        <Card className="max-w-6xl mx-auto px-4 bg-gradient-to-br from-violet-200 via-purple-300 to-rose-200">
          <div className="text-center text-4xl font-bold">Obsidian Plugin - Wrapped 2024</div>
          
          <div className='flex justify-center gap-x-12'>
            <div className='w-1/4'>
              <Image src='/logo-512-removebg-preview.png' alt='logo' width={96} height={96} />
            </div>
            <div>2024 has been a monumental year for the Obsidian community, with over 750+ newly releaased plugins now shaping how we create, organize, and think. These incredible tools are a testament to the hard work, creativity, and meticulous care of our dedicated developers. Let’s take a moment to celebrate their passion and the transformative impact they've had on our workflows—this is your achievement! 🎉</div>
          </div>
          <div className='flex justify-center'>
            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="grid content-center">
              <Link className="text-center bg-gray-800 rounded text-white px-2 py-1" href="/posts/2024-12-07-wrapped-2024">See Wrapped 2024</Link>
            </motion.div>
          </div>
        </Card>
      </div>

      <NewPluginsSection newPlugins={props.newPlugins} />
      <Divider />
      <FavPluginUpdates newReleases={props.newReleases} />
      <Divider />
      <NewVersionsSection newReleases={props.newReleases} />

      <div className="bg-transparent mt-32">
        <div className="max-w-6xl mx-auto px-2 flex flex-col rounded rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-800">
          <div className="flex flex-col justify-center items-center my-12 ">
            <div className="text-center px-8 text-2xl font-bold text-white">
              Subscribe to our newsletter
              <br />
              to get weekly updates about new plugins and plugin updates
            </div>
          </div>
          <div className="flex justify-center mb-12">
            <iframe
              title="substack-subscribe-form"
              src="https://obsidianpluginstats.substack.com/embed"
              width="480"
              height="320"
              style={{ background: '#FF0000' }}
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Most Downloaded */}
      <div className="bg-transparent mt-32">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title="Most Downloaded" />
          <div>
            Here are the 25 most downloaded plugins ever since the beginning of
            Obsidian Editor.
          </div>
          <div className="grid grid-cols-1 pt-5 gap-y-2">
            {props.mostDownloaded.slice(0, 5).map((plugin, index) => {
              return (
                <Card
                  key={plugin.id}
                  href={`/plugins/${plugin.pluginId}`}
                  id={`most-downloaded-${index}`}
                  theme={mostDownloadedCardTheme}
                >
                  <div className="flex flex-col w-full md:w-24 justify-center items-center text-5xl bg-violet-50">
                    {index + 1}
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-x-2 my-4 rounded-tr-md grow pl-8">
                    <div className="text-xl uppercase tracking-wide text-violet-900 text-left">
                      {plugin.name}
                    </div>
                    <div className="text-lg text-center">
                      by <span className="">{plugin.author}</span>
                    </div>
                  </div>
                  <div className="flex flex-col w-full md:w-48 justify-start text-violet-900 items-center bg-violet-900 py-1 px-12">
                    <div className="text-3xl text-gray-100">
                      {plugin.totalDownloads.toLocaleString('en-US')}
                    </div>
                    <div className="text-lg text-gray-100">downloads</div>
                  </div>
                </Card>
              );
            })}
            <Link
              href="/most-downloaded"
              passHref
              className="text-xl font-medium mt-5 text-left tracking-wide text-violet-900 underline underline-offset-2 cursor-pointer"
              id="most-downloaded-all"
            >
              View top 25 downloaded plugins ⟶
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto my-4">
        <HR.Trimmed />
      </div>

      {/* FAQ */}
      <div className="bg-transparent">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title="FAQ for plugin developers" />
          <div className="mt-4">
            <Faq />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const NewPluginsSection = ({ newPlugins }) => {
  const linkRef = useRef(null);
  const isInView = useInView(linkRef, { once: true });
  return (
    <div className="bg-transparent mt-16">
      <div className="max-w-6xl mx-auto px-2">
        <InfoBar title="New Plugins" />
        <div>
          There are {newPlugins?.length || 0} new plugins from the last 10 days
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {newPlugins.slice(0, 6).map((plugin, idx) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });
            return (
              <Card
                ref={ref}
                theme={customCardTheme}
                key={plugin.id}
                href={`/plugins/${plugin.pluginId}`}
                id={`new-plugin-${idx}`}
                style={{
                  transform: isInView
                    ? 'none'
                    : idx % 2 === 0
                      ? 'translateX(-200px)'
                      : 'translateX(200px)',
                  opacity: isInView ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="text-xl font-semibold text-gray-800">
                  {plugin.name}
                </div>
                <div className="text-sm">
                  {moment(plugin.createdAt).fromNow()} by{' '}
                  <span className="group-hover:text-violet-500">
                    {plugin.author}
                  </span>
                </div>
                <div className="mt-5 flex gap-x-2">
                  {plugin.aiCategories &&
                    <div className="grid content-center">
                      <CategoryIcon category={plugin.aiCategories} size={32} />
                    </div>
                  }
                  <div className="text-sm ">{plugin.description}</div>
                </div>
              </Card>
            );
          })}
          <LinkButton
            ref={linkRef}
            href="/new"
            content={`View all ${newPlugins?.length || 0} new plugins ⟶`}
            style={{
              transform: isInView ? 'none' : 'translateX(-200px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const NewVersionsSection = ({ newReleases }) => {
  const linkRef = useRef(null);
  const isInView = useInView(linkRef, { once: true });
  return (
    <main className="bg-transparent">
      <div className="max-w-6xl mx-auto px-2">
        <InfoBar title="New Versions" />
        <div>
          There are {newReleases?.length || 0} new plugins from the last 10 days
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {newReleases.slice(0, 12).map((newRelease, idx) => {
            // const isFavorite = favorites.includes(newRelease.pluginId);
            // const isTrending = newRelease.zScoreTrending > 10;
            const ref = useRef(null);
            const isInView = useInView(ref, { once: true });
            return (
              <Card
                ref={ref}
                theme={customCardTheme}
                key={newRelease.id}
                href={`/plugins/${newRelease.pluginId}`}
                id={`plugin-update-${idx}`}
                style={{
                  transform: isInView
                    ? 'none'
                    : idx % 2 === 0
                      ? 'translateX(-200px)'
                      : 'translateX(200px)',
                  opacity: isInView ? 1 : 0,
                  transition:
                    'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
                }}
              >
                <div className="flex flex-none justify-between">
                  <div className="py-2">
                    <div className="text-lg font-semibold text-gray-800">
                      {newRelease.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      {moment(newRelease.latestReleaseAt).fromNow()} by{' '}
                      <span className="">{newRelease.author}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-medium flex flex-col justify-center">
                    <div className="text-violet-900">
                      {newRelease.latestRelease}
                    </div>
                  </div>
                  {/* <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending} category='Update' /> */}
                </div>
              </Card>
            );
          })}
          <LinkButton
            ref={linkRef}
            href="/updates"
            content={`View all ${newReleases?.length || 0} updated plugins ⟶`}
            style={{
              transform: isInView ? 'none' : 'translateX(-200px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.25s cubic-bezier(0.17, 0.55, 0.55, 1) 0.25s',
            }}
          />
        </div>
      </div>
    </main>
  );
};

const Divider = () => (
  <div className="max-w-6xl mx-auto my-4">
    <HR.Trimmed />
  </div>
);

export const getStaticProps = async () => {
  const plugins = await PluginsCache.get();

  const newPlugins = plugins.filter((plugin) => plugin.createdAt > daysAgo(10));
  newPlugins.sort((a, b) => b.createdAt - a.createdAt);

  const newReleases = plugins.filter(
    (plugin) => plugin.latestReleaseAt > daysAgo(10)
  );
  newReleases.sort((a, b) => b.latestReleaseAt - a.latestReleaseAt);

  const mostDownloaded = [...plugins]
    .sort((a, b) => b.totalDownloads - a.totalDownloads)
    .slice(0, 25);

  const tags = new Set<string>();
  plugins.forEach((plugin) => {
    plugin?.aiTags && plugin?.aiTags
      .split(',')
      .map((tag) => sanitizeTag(tag))
      .forEach((tag) => tags.add(tag));
  });

  const totalPluginsCount = plugins.length;
  const newPluginsCount = newPlugins.length;
  const newReleasesCount = newReleases.length;

  return {
    props: {
      newPlugins,
      newPluginsCount,
      totalPluginsCount,
      newReleases,
      newReleasesCount,
      mostDownloaded,
      totalTagsCount: tags.size,
    },
  };
};

export default Home;
