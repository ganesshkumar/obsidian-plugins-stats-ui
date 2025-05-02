import React, { useEffect, useState } from 'react';
import AppNavbar from '../../components/Navbar';

import Link from 'next/link';
import moment from 'moment';
import showdown from 'showdown';
import { Footer } from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import Favorites from '../../components/Favorites';
import PluginCard from '../../components/PluginCard';
import { getDescription, sanitizeTag, tagDenyList } from '../../utils/plugins';
import { isNotXDaysOld } from '../../utils/datetime';

import {
  Download,
  DownloadCloud,
  Star,
  GitHub,
  GitBranch,
  PlusCircle,
  GitCommit,
  RefreshCcw,
  GitPullRequest,
  Disc,
  Activity,
} from 'react-feather';
import {
  Card,
  CustomFlowbiteTheme,
  Tooltip,
} from 'flowbite-react';
import { PluginsCache } from '../../cache/plugins-cache';
import { CategoryIcon } from '../../components/Category';
import { Score } from '../../components/Score';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import EthicalAd from '../../components/EthicalAd';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import ResponsiveLayout from '../_responsive-layout';
import { getCategoryBgClass } from '../../lib/customThemes';

const customCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: 'flex h-full flex-col justify-center gap-0 py-5 px-5',
  },
};

interface IPluginProps extends IHeaderProps {
  plugin: any;
  tags: string[];
  similarPlugins: any[];
  isTrending: boolean;
}

const Plugin = (props: IPluginProps) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  const [favorites, setFavorites] = useState([]);
  const [readmeContent, setReadmeContent] = useState('');

  const now = moment();

  let defaultBranch = '';
  useEffect(() => {
    setupFavorites(setFavorites);
    fetch(`https://api.github.com/repos/${props.plugin.repo}`)
      .then((response) => response.json())
      .then((data) => {
        defaultBranch = data.default_branch;
        return fetch(
          `https://raw.githubusercontent.com/${props.plugin.repo}/${defaultBranch}/README.md`
        );
      })
      .then((response) => response.text())
      .then((data) => {
        // replace any relative image urls of the markdown cotnent with absolute urls
        const regex = /!\[.*?\]\((?!http)(.*?)\)/g;
        const newData = data.replace(
          regex,
          `![$1](https://raw.githubusercontent.com/${props.plugin.repo}/${defaultBranch}/$1)`
        );

        setReadmeContent(newData);
      });
  }, []);

  const isFavorite = favorites.includes(props.plugin.pluginId);
  const isNotADayOld = isNotXDaysOld(props.plugin.createdAt, 1);

  const isLessThanLarge = useIsLessThanLarge();

  const sidebar = (
    <div className='w-full mt-10 lg:mt-0 lg:sticky lg:top-10'>
      {!isLessThanLarge && <EthicalAd type="image" id="plugins-image" />}
      <h2 className="mt-1 mb-4 text-2xl text-center">Similar Plugins</h2>
      <div className='flex flex-wrap justify-center gap-x-26 lg:justify-start lg:flex-col gap-2 items-center'>
        {props.similarPlugins.slice(0, 5).map((similarPlugin, index) => (
          <a key={index} className="flex border border-gray-200 mx-4 p-3 rounded w-[320px] min-w-[320px] max-w-[320px] h-[130px] min-h-[130px] max-h-[130px]" href={`/plugins/${similarPlugin.pluginId}`}>
            <div className={`w-[120px] min-w-[120px] max-w-[120px] h-[90px] min-h-[90px] max-h-[90px] ${getCategoryBgClass(similarPlugin.osCategory)} flex justify-center items-center self-center`}>
              <CategoryIcon
                category={similarPlugin.osCategory}
                size={44}
              />
            </div>
            <div>
              <p className="text-gray-700 px-2 pt-2 font-semibold">{similarPlugin.name}</p>
              <p className="text-sm text-gray-700 px-2 pt-2 line-clamp-2">{similarPlugin.description}</p>
            </div>
          </a>
        ))}
        {props.similarPlugins.length > 5 && (
          <a
            key="all-similar-plugins"
            href="#similar-plugins"
            className="relative w-80 flex-col justify-center group shrink-0 my-1 px-5 py-2 border rounded-md shadow-lg cursor-pointer
                        hover:shadow-violet-200/50 shadow-slate-200/50 grid content-center"
          >
            View all
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Header {...props} />
      <AppNavbar current={`tag:${props.plugin.pluginId}`}>
        {/* <Navbar.Link
          href={`/tags/${props.plugin.pluginId}`}
          active={true}
          className="text-lg"
        >
          {`plugin: ${props.plugin.pluginId}`}
        </Navbar.Link> */}
      </AppNavbar>
      <div className="bg-white pt-5">
        <ResponsiveLayout sidebar={sidebar}>
          <Card theme={customCardTheme}>
            <div className="flex flex-wrap md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold uppercase cursor-context-menu text-violet-900">
                  {props.plugin.name}
                </h1>
                <div className="text-sm mb-4">
                  by <span>{props.plugin.author}</span>
                </div>
                {props.plugin.score && props.plugin.scoreReason && <Score plugin={props.plugin} />}
                <div className="flex gap-x-2 mb-2 mt-4">
                  {isFavorite && (
                    <div
                      title="Favorite plugin"
                      className="text-xs bg-red-600 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl"
                    >
                      Favorite Plugin
                    </div>
                  )}
                  {isNotADayOld && (
                    <div
                      title="Less than a day old"
                      className="text-xs bg-violet-800 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl"
                    >
                      New Plugin
                    </div>
                  )}
                  {props.isTrending && (
                    <div
                      title="Trending plugin"
                      className="text-xs bg-yellow-300 flex justify-center items-center gap-x-1 py-1 px-2 text-gray-700 font-bold rounded-xl"
                    >
                      Trending Plugin
                    </div>
                  )}
                </div>
                <Favorites
                  plugin={props.plugin}
                  isFavorite={isFavorite}
                  setFavorites={setFavorites}
                />
                {/* <div className='my-2'>{props.plugin.description}</div> */}
                <div className="flex flex-wrap space-x-4 mt-6">
                  <a
                    href={`obsidian://show-plugin?id=${props.plugin.pluginId}`}
                    className="text-violet-50 flex justify-center items-center space-x-2s my-2 py-1 border border-violet-800 px-2 rounded-md bg-violet-800 transition hover:scale-110"
                  >
                    <Download className="text-violet-50 inline mr-2" size={18} />{' '}
                    Install
                  </a>
                  <a
                    href={`https://github.com/${props.plugin.repo}`}
                    target="_blank"
                    className="text-gray-800 flex justify-center items-center space-x-2s my-2 py-1 border border-gray-800 px-2 rounded-md transition hover:scale-110"
                  >
                    <GitHub className="text-gray-800 inline mr-2" size={18} /> Code
                  </a>
                </div>
              </div>
            </div>
          </Card>
          {isLessThanLarge && (
            <div className='sticky top-0 z-20 bg-white'>
              <EthicalAd type="fixed-footer" id="plugins-text" />
            </div>
          )}
          <Card theme={customCardTheme} className="relative mt-4">
            <div className="text-2xl">Description</div>
            <div className="flex mt-4 gap-x-2">
              {props.plugin.osCategory && (
                <div className="flex items-end">
                  <CategoryIcon
                    category={props.plugin.osCategory}
                    size={36}
                  />
                </div>
              )}
              <div>
                {props.plugin.osCategory && (
                  <div className="text-gray-700">
                    Category:{' '}
                    <span className="font-bold">
                      {props.plugin.osCategory}
                    </span>
                  </div>
                )}
                {props.plugin.osTags && (
                  <div className="flex flex-wrap gap-x-2 text-gray-700 cursor-pointer">
                    {props.plugin.osTags &&
                      props.plugin.osTags
                        ?.split(',')
                        .map((tag) => sanitizeTag(tag))
                        .filter((sanitizedTag) => !tagDenyList.includes(sanitizedTag))
                        .map((tag) => (
                          <Link
                            href={`/tags/${tag}`}
                            key={tag}
                            className="px-2 bg-gray-200 rounded-md"
                            prefetch={false}
                          >
                            <span className="text-gray-400">#</span>
                            {tag}
                          </Link>
                        )
                      )
                    }
                  </div>
                )}
              </div>
            </div>

            <div
              className="prose mt-4 !max-w-none"
              dangerouslySetInnerHTML={{
                __html: mdConverter.makeHtml(getDescription(props.plugin)),
              }}
            />
          </Card>
          <Card theme={customCardTheme} className="relative mt-4">
            <div className="text-2xl">Stats</div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Tooltip content={`${props.plugin.stargazers} stargazers`}>
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <Star className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.stargazers}
                  </div>
                  <div className="text-gray-500">stars</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.totalDownloads?.toLocaleString()} downloads`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <DownloadCloud className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.totalDownloads?.toLocaleString()}
                  </div>
                  <div className="text-gray-500"> downloads</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.forks?.toLocaleString() || '0'} forks`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <GitBranch className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.forks?.toLocaleString() || '0'}
                  </div>
                  <div className="text-gray-500"> forks</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${now.diff(moment(props.plugin.createdAt), 'days').toLocaleString()} days since creation`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <PlusCircle className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {now
                      .diff(moment(props.plugin.createdAt), 'days')
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-500"> days</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${now.diff(moment(props.plugin.lastCommitAt), 'days').toLocaleString()} days since last commit`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <GitCommit className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {now
                      .diff(moment(props.plugin.lastCommitAt), 'days')
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-500"> days</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${now.diff(moment(props.plugin.latestReleaseAt), 'days').toLocaleString()} days since last release`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <RefreshCcw className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {now
                      .diff(moment(props.plugin.latestReleaseAt), 'days')
                      .toLocaleString()}
                  </div>
                  <div className="text-gray-500"> days</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.totalPR?.toLocaleString() ?? '0'} total pull requests`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <GitPullRequest
                    className="text-violet-700 inline"
                    size={18}
                  />
                  <div className="font-bold text-gray-900">
                    {props.plugin.totalPR?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> total PRs</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.openPR?.toLocaleString() ?? '0'} open pull requests`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <GitPullRequest
                    className="text-violet-700 inline"
                    size={18}
                  />
                  <div className="font-bold text-gray-900">
                    {props.plugin.openPR?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> open PRs</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.closedPR?.toLocaleString() ?? '0'} closed pull requests`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <GitPullRequest
                    className="text-violet-700 inline"
                    size={18}
                  />
                  <div className="font-bold text-gray-900">
                    {props.plugin.closedPR?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> closed PRs</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.mergedPR?.toLocaleString() ?? '0'} merged pull requests`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <GitPullRequest
                    className="text-violet-700 inline"
                    size={18}
                  />
                  <div className="font-bold text-gray-900">
                    {props.plugin.mergedPR?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> merged PRs</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.totalIssues?.toLocaleString() ?? '0'} total issues`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <Disc className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.totalIssues?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> total issues</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.openIssues?.toLocaleString() ?? '0'} open issues`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <Disc className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.openIssues?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> open issues</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.closedIssues?.toLocaleString() ?? '0'} closed issues`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <Disc className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.closedIssues?.toLocaleString() ?? '0'}
                  </div>
                  <div className="text-gray-500"> closed issues</div>
                </div>
              </Tooltip>
              <Tooltip
                content={`${props.plugin.commitCountInLastYear?.toLocaleString() ?? '0'} total commits in last one year`}
              >
                <div className="flex justify-start items-center gap-x-1 cursor-pointer w-44">
                  <Activity className="text-violet-700 inline" size={18} />
                  <div className="font-bold text-gray-900">
                    {props.plugin.commitCountInLastYear?.toLocaleString() ??
                      '0'}
                  </div>
                  <div className="text-gray-500"> commits</div>
                </div>
              </Tooltip>
            </div>
          </Card>
          <Card theme={customCardTheme} className="relative mt-4" id="latest-version">
            <div className="text-2xl">Latest Version</div>
            <div className="prose mt-4 !max-w-none">
              <div className="flex">
                <div className="mr-2 text-violet-700">
                  <a
                    className="hover:underline"
                    href={`https://github.com/${props.plugin.repo}/releases/tag/${props.plugin.latestRelease}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {props.plugin.latestRelease}
                  </a>
                </div>
                <div className="font-bold text-gray-900">
                  {moment(props.plugin.latestReleaseAt).fromNow()}
                </div>
              </div>
              <div className="mt-2">Changelog</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: mdConverter.makeHtml(props.plugin.latestReleaseDesc),
                }}
              />
              <div className="mt-5">
                <a
                  className="hover:underline text-violet-700"
                  href={`https://github.com/${props.plugin.repo}/releases`}
                  target="_blank"
                  rel="noreferrer"
                >
                  See all version on GitHub
                </a>
              </div>
            </div>
          </Card>
          <Card theme={customCardTheme} className="relative mt-4" id="readme">
            <div className="flex-col my-2 p-2">
              <div className="flex items-center gap-x-1 text-lg">
                <div className="text-2xl">README file from</div>
                <div>
                  <a
                    className="hover:underline text-violet-700"
                    href={`https://github.com/${props.plugin.repo}#readme`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </div>
              </div>
              <div
                className="prose mt-4 !max-w-none"
                dangerouslySetInnerHTML={{
                  __html: mdConverter.makeHtml(readmeContent),
                }}
              />
            </div>
          </Card>
          {props.similarPlugins?.length > 3 && (
            <div className="relative mt-4">
              <div id="similar-plugins" className="mt-5 text-xl uppercase">
                {' '}
                Similar Plugins
              </div>
              <details className="ml-2 text-sm">
                <summary>info</summary>
                <div className="ml-3">
                  • Similar plugins are suggested based on the common tags
                  between the plugins.
                </div>
              </details>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {props.similarPlugins.map((plugin) => (
                  <PluginCard
                    key={plugin.pluginId}
                    plugin={plugin}
                    showDescription={true}
                  />
                ))}
              </div>
            </div>
          )}
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const plugins = await PluginsCache.get();

  return {
    paths: Array.from(plugins).map((plugin: any) => ({
      params: { slug: plugin.pluginId },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const plugins = await PluginsCache.get();

  const plugin = plugins.find((plugin) => plugin.pluginId === params.slug);
  const tags = plugin.osTags
    ? plugin.osTags.split(',').map((tag) => sanitizeTag(tag))
    : [];

  const similarPlugins = plugins.filter(
    (p) =>
      p.pluginId !== plugin.pluginId &&
      p.osTags &&
      p.osTags
        .split(',')
        .map((tag) => sanitizeTag(tag))
        .some((tag) => tags.includes(tag))
  );

  const reducedSimilarPlugins = similarPlugins.map((p) => ({
    pluginId: p.pluginId,
    name: p.name,
    description: p.description,
    author: p.author,
    createdAt: p.createdAt,
    osCategory: p.osCategory,
  }));

  const title = `${plugin.name} ${!!plugin.description ? `- ${plugin.description}` : ''}`;
  const description = `Obsidian Plugin: ${plugin.name} - ${plugin.description} by ${plugin.author}. Latest version: ${plugin.latestRelease} released on ${moment(plugin.latestReleaseAt).fromNow()}`;
  const canonical = `https://www.obsidianstats.com/plugins/${plugin.pluginId}`;
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getPluginPageSchema(plugin, title, description, canonical, image);

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      plugin,
      tags,
      similarPlugins: reducedSimilarPlugins,
      isTrending:
        [...plugins]
          .sort((a, b) => b.zScoreTrending - a.zScoreTrending)
          .findIndex((p) => p.pluginId === plugin.pluginId) < 10,
    },
  };
};

export default Plugin;
