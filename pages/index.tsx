'use client';

import React, { useEffect, useRef, useState } from 'react';
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

import { motion, useAnimationFrame, useInView } from 'framer-motion';
import Image from 'next/image';
import LinkButton from '../components/LinkButton';
import { PluginsCache } from '../cache/plugins-cache';
import { sanitizeTag, tagDenyList } from '../utils/plugins';
import { setupFavorites } from '../utils/favorites';
import CardAnnotations from '../components/CardAnnotations';
import Divider from '../components/Divider';
import { getSortedPostsData } from '../lib/posts';
import { Calendar, Star, List } from 'react-feather';

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
          <div className="text-center text-4xl font-bold">
            Obsidian Plugin - Wrapped 2024
          </div>

          <div className="flex justify-center gap-x-12">
            <div className="w-1/4">
              <Image
                src="/logo-512-removebg-preview.png"
                alt="logo"
                width={96}
                height={96}
              />
            </div>
            <div>
              2024 has been a monumental year for the Obsidian community, with
              over 750+ newly releaased plugins now shaping how we create,
              organize, and think. These incredible tools are a testament to the
              hard work, creativity, and meticulous care of our dedicated
              developers. Let’s take a moment to celebrate their passion and the
              transformative impact they've had on our workflows—this is your
              achievement! 🎉
            </div>
          </div>
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="grid content-center"
            >
              <Link
                className="text-center bg-gray-800 rounded text-white px-4 py-2"
                href="/posts/2024-12-07-wrapped-2024"
              >
                See Wrapped 2024
              </Link>
            </motion.div>
          </div>
        </Card>
      </div>

      <NewPluginsSection newPlugins={props.newPlugins} />
      <Divider />
      <FavPluginUpdates newReleases={props.newReleases} />
      <TrendingPlugins plugins={props.trendingPlugins} />
      <Divider />
      <NewVersionsSection newReleases={props.newReleases} />
      <Divider />
      <NewPosts posts={props.newPosts} />

      <div className="bg-transparent mt-32">
        <div className="max-w-6xl mx-auto px-2 flex flex-col rounded bg-gradient-to-r from-violet-600 to-fuchsia-800">
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
          <InfoBar title="Most Downloaded" as="h2" />
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
          <InfoBar title="FAQ for plugin developers" as="h2" />
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
        <InfoBar title="New Plugins" as="h2" />
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
                  {plugin.aiCategories && (
                    <div className="grid content-center">
                      <CategoryIcon category={plugin.aiCategories} size={32} />
                    </div>
                  )}
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

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setupFavorites(setFavorites);
  }, []);

  const sortedNewReleases = newReleases.sort((a, b) =>
    favorites.includes(a.pluginId) ? -1 : 1
  );

  return (
    <main className="bg-transparent">
      <div className="max-w-6xl mx-auto px-2">
        <InfoBar title="New Versions" as="h2" />
        <div>
          There are {sortedNewReleases?.length || 0} new plugins from the last
          10 days
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {sortedNewReleases.slice(0, 12).map((newRelease, idx) => {
            const isFavorite = favorites.includes(newRelease.pluginId);
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
                <div className="w-full flex-col">
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
                  </div>
                  <CardAnnotations
                    isFavorite={isFavorite}
                    isNotADayOld={false}
                    isTrending={false}
                    // isNotADayOld={isNotXDaysOld(newRelease.latestReleaseAt, 1)} isTrending={isTrending}
                    category="Update"
                  />
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

const TrendingPlugins = ({ plugins }) => {
  const [offsetX, setOffsetX] = React.useState(0);
  const speed = 0.05; // Adjust speed of the scroll
  const containerWidth = 3100; // Width of the scrolling content (calculated to avoid jumps)

  useAnimationFrame((_, delta) => {
    setOffsetX((prev) => prev - delta * speed);
  });

  const scrollContainerStyle: React.CSSProperties = {
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const scrollItemStyle: React.CSSProperties = {
    padding: '0 10px',
    fontWeight: 'bold',
    width: '300px',
    height: '100px',
  };

  const translateX = offsetX % containerWidth;

  return (
    <div className="max-w-6xl mx-auto px-2 w-full text-gray-800">
      <InfoBar title="Trending Plugins" as="h2" />
      <div style={scrollContainerStyle} className="mb-6">
        <motion.div
          style={{
            display: 'flex',
            columnGap: '10px',
            transform: `translateX(${translateX}px)`,
          }}
        >
          {plugins.map((plugin, idx) => (
            <a
              key={plugin.pluginId}
              style={scrollItemStyle}
              href={`/plugins/${plugin.pluginId}`}
              className="border rounded-lg flex flex-col justify-center items-center text-wrap overflow-x-auto bg-gradient-to-br from-violet-100 to-purple-200"
            >
              <div className="text-base">
                {idx + 1}. {plugin.name}
              </div>
              <div className="text-xs text-gray-500 font-normal">
                by {plugin.author}
              </div>
            </a>
          ))}
          {plugins.map((plugin, idx) => (
            <a
              key={`clone-${plugin.pluginId}`}
              style={scrollItemStyle}
              href={`/plugins/${plugin.pluginId}`}
              className="border rounded-lg flex flex-col justify-center items-center text-wrap overflow-x-auto bg-gradient-to-br from-violet-100 to-purple-200"
            >
              <div className="text-base">
                {idx + 1}. {plugin.name}
              </div>
              <div className="text-xs text-gray-500 font-normal">
                by {plugin.author}
              </div>
            </a>
          ))}
        </motion.div>
      </div>
      <LinkButton href="/trending" content={`View all trending plugins ⟶`} />
    </div>
  );
};

const PostIcon = (props) => {
  if (props.tags && props.tags.includes('weekly-plugin-updates')) {
    return (
      <Calendar
        size={48}
        className="text-violet-700 p-1 rounded fill-violet-200"
      />
    );
  } else if (props.tags && props.tags.includes('wrapped-yearly-post')) {
    return (
      <Star size={48} className="text-yellow-400 p-1 rounded fill-yellow-200" />
    );
  } else if (props.tags && props.tags.includes('workflow')) {
    return (
      <List size={48} className="text-green-400 p-1 rounded fill-yellow-200" />
    );
  } else {
    return undefined;
  }
};

const NewPosts = ({ posts }) => {
  return (
    <div className="max-w-6xl mx-auto px-2">
      <InfoBar title="Latest Posts" as="h2" />
      <ul className="flex flex-col divide-y mb-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/posts/${post.id}`}
              className="flex justify-between py-4 px-2"
            >
              <div className="flex gap-x-2">
                <div className="grid place-items-start">
                  <PostIcon tags={post.tags} />
                </div>
                <div className="flex flex-col">
                  <div className="text-xl font-semibold hover:underline text-gray-800">
                    {post.title}
                  </div>
                  <div className="text-medium text-gray-600 flex items-end">
                    {moment(post.publishedDate).format('MMMM DD, YYYY')}
                  </div>
                  {/* <div className="text-medium text-gray-800 mt-4">
                    {post.excerpt}
                  </div> */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <LinkButton href="/posts" content={`View all posts ⟶`} />
    </div>
  );
};

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

  const trendingPlugins = [...plugins]
    .sort((a, b) => b.zScoreTrending - a.zScoreTrending)
    .slice(0, 10);

  const tags = new Set<string>();
  plugins.forEach((plugin) => {
    plugin?.aiTags &&
      plugin?.aiTags
        .split(',')
        .map((tag) => sanitizeTag(tag))
        .forEach((tag) => tags.add(tag));
  });

  const newPosts = getSortedPostsData().slice(0, 5);

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
      trendingPlugins,
      newPosts,
    },
  };
};

export default Home;
