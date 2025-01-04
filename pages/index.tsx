'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

import { Plugin } from '@prisma/client';
import moment from 'moment';
import showdown from 'showdown';
import PluginEcosystemStats from '../components/PluginEcosystemStats';
import InfoBar from '../components/InfoBar';
import { daysAgo } from '../utils/datetime';
import Faqs from '../components/Faq';
import { Card } from 'flowbite-react';
import FavPluginUpdates from '../components/FavPluginUpdates';
import { CategoryIcon } from '../components/Category';

import { motion, useAnimationFrame, useInView } from 'framer-motion';
import { LinkButton } from '../components/LinkButton';
import { PluginsCache } from '../cache/plugins-cache';
import { sanitizeTag } from '../utils/plugins';
import { setupFavorites } from '../utils/favorites';
import CardAnnotations from '../components/CardAnnotations';
import Divider from '../components/Divider';
import { getSortedPostsData } from '../lib/posts';
import { Post } from '../lib/abstractions';
import { LatestPosts } from '../components/post/LatestPosts';
import { CustomTheme } from '../lib/customThemes';
import { Highlights } from '../components/home/Highlights';
import { SubstackNewsletter } from '../components/home/SubstackNewsletter';
import { MostDownloadedPlugins } from '../components/home/MostDownloaded';
import { SiteData } from '../data/siteData';
import { JsonLdSchema } from '../lib/jsonLdSchema';

interface IHomeProps extends IHeaderProps {
  newPlugins: Plugin[];
  newPluginsCount: number;
  totalPluginsCount: number;
  newReleases: Plugin[];
  newReleasesCount: number;
  mostDownloaded: Plugin[];
  totalTagsCount: number;
  trendingPlugins: Plugin[];
  newPosts: Post[];
}

const Home = (props: IHomeProps) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  return (
    <div className="relative">
      <Header {...props} />
      <Navbar current="home" />

      <div className="bg-gray-50 lg:py-10 bg-[url('/images/confetti-doodles.svg')]">
        <PluginEcosystemStats {...props} />
      </div>

      <Highlights highlights={SiteData.highlights} />
      <NewPluginsSection newPlugins={props.newPlugins} />
      <Divider />
      <FavPluginUpdates newReleases={props.newReleases} />
      <TrendingPlugins plugins={props.trendingPlugins} />
      <Divider />
      <NewVersionsSection newReleases={props.newReleases} />
      <Divider />
      <LatestPosts posts={props.newPosts} />
      <SubstackNewsletter />
      <MostDownloadedPlugins plugins={props.mostDownloaded} />
      <Divider />

      {/* FAQ */}
      <div className="bg-transparent">
        <div className="max-w-6xl mx-auto px-2">
          <InfoBar title="FAQ for plugin developers" as="h2" />
          <div className="mt-4">
            <Faqs faqs={SiteData.faqs} />
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
                theme={CustomTheme.card}
                key={plugin.id}
                href={`/plugins/${plugin.pluginId}`}
                id={`new-plugin-${idx}`}
                style={{
                  transform: isInView ? 'none' : 'translateY(200px)',
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
              transform: isInView ? 'none' : 'translateY(200px)',
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
                theme={CustomTheme.card}
                key={newRelease.id}
                href={`/plugins/${newRelease.pluginId}`}
                id={`plugin-update-${idx}`}
                style={{
                  transform: isInView ? 'none' : 'translateY(200px)',
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
              transform: isInView ? 'none' : 'translateY(200px)',
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

  const title = "Explore New, Updated, Trending, Most Downloaded, and Top Rated Obsidian Plugins"
  const description = "Discover all Obsidian plugins with the latest updates, trending plugins, and the most downloaded ones. Stay informed about the best plugins to enhance your Obsidian experience."
  const canonical = "https://obsidian-plugin-stats.ganesshkumar.com"
  const image = "https://obsidian-plugin-stats.ganesshkumar.com/logo-512.png"
  const jsonLdSchema = JsonLdSchema.getHomePageSchema()

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
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
