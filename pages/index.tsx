'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header, { IHeaderProps } from '../components/Header';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';

import { Plugin } from '@prisma/client';
import moment from 'moment';
import showdown from 'showdown';
import InfoBar from '../components/InfoBar';
import { daysAgo } from '../utils/datetime';
import Faqs from '../components/Faq';
import { Button, Card, TextInput } from 'flowbite-react';
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
import { getMostDownloadedPlugins } from '../lib/plugins';
import { HiDownload, HiOutlineCalendar, HiOutlineCode, HiOutlinePencil, HiOutlineRefresh, HiOutlineSearch, HiOutlineStar, HiOutlineSwitchVertical, HiOutlineTag, HiOutlineTrendingUp } from "react-icons/hi";
import { useRouter } from 'next/router';
import EthicalAd from '../components/EthicalAd';
import { usePlausible } from 'next-plausible';

interface IHomeProps extends IHeaderProps {
  newPlugins: Plugin[];
  newPluginsCount: number;
  totalPluginsCount: number;
  newReleases: Plugin[];
  newReleasesCount: number;
  mostDownloaded: Plugin[];
  mostDownloadedIn7Days: Plugin[];
  mostDownloadedIn30Days: Plugin[];
  totalTagsCount: number;
  trendingPlugins: Plugin[];
  newPosts: Post[];
}

const Home = (props: IHomeProps) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');
  const router = useRouter();
  const plausible = usePlausible();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToPage = (page: string, inNewTab = false) => {
    if (inNewTab) {
      window.open(page, '_blank');
    } else {
      router.push(page);
    }
  }

  const handleCTAButtonClicked = (page: string) => {
    plausible(`Primary CTA Button Clicked: ${page}`);
    router.push(`/${page}`);
  }

  return (
    <div className="relative scroll-smooth">
      <Header {...props} />
      <Navbar current="home" />

      {/* Debug: Current Screen Size */}
      {/* <div className="text-sm text-gray-500 font-mono mb-4">
        <div className="block sm:hidden">screen: base (mobile)</div>
        <div className="hidden sm:block md:hidden">screen: sm</div>
        <div className="hidden md:block lg:hidden">screen: md</div>
        <div className="hidden lg:block xl:hidden">screen: lg</div>
        <div className="hidden xl:block 2xl:hidden">screen: xl</div>
        <div className="hidden 2xl:block">screen: 2xl</div>
      </div> */}
      
      <div className="bg-gray-50 px-8"> 
        {/* bg-[url('/images/confetti-doodles.svg')] */}
        <div className='w-full'>
          <section className="max-w-6xl mx-auto text-gray-800 flex flex-col justify-center items-center text-center py-4 lg:py-20">
            <h1 className='text-4xl 2xl:text-5xl font-bold tracking-tight mb-8 text-gray-800'>Personalize Obsidian with the <span className='text-violet-800'>Right Plugins</span></h1>
            <p className='text-xl max-w-lg lg:max-w-3xl text-gray-600'>Discover the latest Obsidian plugins. Stay ahead with updates, downloads, and ratings that help you build your perfect setup.</p>
            <TextInput className='mt-8 w-full max-w-3xl rounded-xl' icon={HiOutlineSearch} placeholder='Search Plugins' onFocus={() => router.push('/plugins')} color="violet" />
            <div className="flex gap-4 mt-8">
              <Button className='bg-violet-900' onClick={() => handleCTAButtonClicked('new')} id="stat-card-new">{props.newPluginsCount} New Plugins</Button>
              <Button className='bg-violet-900' onClick={() => handleCTAButtonClicked('plugins')} id="stat-card-all">All {props.totalPluginsCount} Plugins</Button>
              <Button className='bg-violet-900 hidden md:block' onClick={() => handleCTAButtonClicked('updates')} id="stat-card-updates">{props.newReleasesCount} Plugin Updates</Button>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-gray-50 pt-8">
        <div className="max-w-6xl mx-auto px-2">
          <div className='grid grid-cols-1 gap-4 text-gray-700'>
            <div className='flex flex-col-reverse md:flex-row md:justify-around items-start flex-wrap gap-4 ml-8 lg:ml-0'>
              <div className='hidden md:block'>
                <div className='font-semibold'>Plugins</div>
                <ul className='list-disc'>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => scrollToSection('new')}> <HiOutlineStar /> New Plugins</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => scrollToSection('trending')}> <HiOutlineTrendingUp /> Trending Plugins</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => scrollToSection('most-downloaded')}> <HiDownload /> Most Downloaded</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => scrollToSection('updates')}> <HiOutlineRefresh /> Plugin Updates</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => goToPage('tags')}> <HiOutlineTag /> Tags</li>
                </ul>
              </div>
              <div className='hidden md:block'>
                <div className='font-semibold'>Posts</div>
                <ul className='list-disc'>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => scrollToSection('posts')}> <HiOutlinePencil /> Posts</li>
                </ul>
              </div>
              <div className='hidden md:block'>
                <div className='font-semibold'>Tools</div>
                <ul className='list-disc'>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => goToPage('tools/dataview-query-wizard', true)}> <HiOutlineSearch /> Dataview Query Wizard (GPT)</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => goToPage('scorer')}> <HiOutlineCode /> Scorer</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => goToPage('migrate')}> <HiOutlineSwitchVertical />Migrate</li>
                  <li className='underline cursor-pointer flex items-center gap-x-1' onClick={() => goToPage('timeline')}> <HiOutlineCalendar /> Timeline</li>
                </ul>
              </div>
              <div className='grid content-center'>
                <EthicalAd type="image" id="home-image" />
              </div>
            </div>
          </div>
        </div>
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
      <MostDownloadedPlugins overall={props.mostDownloaded} last30Days={props.mostDownloadedIn30Days} last7Days={props.mostDownloadedIn7Days}/>

      <div className="mt-20 max-w-md mx-auto text-center p-4 border rounded-2xl bg-white/60 backdrop-blur-md shadow-md">
        <a href="https://obsidian.md/blog/2024-goty-winners/" target="_blank">
        <div className="text-2xl">🏆</div>
        <p className="font-semibold text-gray-800">Runner-Up — Tool Category</p>
        <p className="text-sm text-gray-600 italic">Obsidian Gems of the Year 2024</p>
        </a>
      </div>

      <SubstackNewsletter />

      {/* FAQ */}
      <div className="bg-transparent mt-32">
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
    <div className="bg-transparent mt-16" id="new">
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
                  opacity: isInView ? 1 : 0,
                  transition: 'opacity 0.5s ease-in',
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
                  {plugin.osCategory && (
                    <div className="grid content-center">
                      <CategoryIcon category={plugin.osCategory} size={32} />
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
              opacity: isInView ? 1 : 0,
              transition: 'opacity 0.5s ease-in',
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
    <section className="bg-transparent" id="updates">
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
                  opacity: isInView ? 1 : 0,
                  transition: 'opacity 0.5s ease-in',
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
              opacity: isInView ? 1 : 0,
              transition: 'opacity 0.5s ease-in',
            }}
          />
        </div>
      </div>
    </section>
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
    <div className="max-w-6xl mx-auto px-2 w-full text-gray-800" id="trending">
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

  const limit = 10;
  const mostDownloaded = [...plugins]
    .sort((a, b) => b.totalDownloads - a.totalDownloads)
    .slice(0, limit);
  const mostDownloadedIn7Days = await getMostDownloadedPlugins(7, limit);
  const mostDownloadedIn30Days = await getMostDownloadedPlugins(30, limit);

  const trendingPlugins = [...plugins]
    .sort((a, b) => b.zScoreTrending - a.zScoreTrending)
    .slice(0, 10);

  const tags = new Set<string>();
  plugins.forEach((plugin) => {
    plugin?.osTags &&
      plugin?.osTags
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
  const canonical = "https://www.obsidianstats.com"
  const image = "/images/obsidian-stats-ogImage.png"
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
      mostDownloadedIn7Days,
      mostDownloadedIn30Days,
      totalTagsCount: tags.size,
      trendingPlugins,
      newPosts,
    },
  };
};

export default Home;
