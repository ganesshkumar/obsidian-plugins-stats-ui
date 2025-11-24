import React, { useEffect, useState } from 'react';
import AppNavbar from '../../components/Navbar';

import moment from 'moment';
import showdown from 'showdown';
import { Footer } from '../../components/Footer';
import { setupFavorites } from '../../utils/favorites';
import Favorites from '../../components/Favorites';
import { isNotXDaysOld } from '../../utils/datetime';
import {
  GitHub,
  Moon,
  Sun,
} from 'react-feather';
import {
  Card,
  CustomFlowbiteTheme,
} from 'flowbite-react';
import { JsonLdSchema } from '../../lib/jsonLdSchema';
import Header, { IHeaderProps } from '../../components/Header';
import EthicalAd from '../../components/EthicalAd';
import { useIsLessThanLarge } from '../../hooks/useIsLessThanLarge';
import ResponsiveLayout from '../_responsive-layout';
import { Suggestions } from '../../domain/suggestions/models';
import { generateSuggestions } from '../../domain/suggestions';
import { Sidebar } from '../../components/Sidebar';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { ThemesCache } from '@/cache/themes-cache';
import { Theme } from '@/domain/themes/models/Theme';
import { GiveThemeReview } from '@/components/GiveThemeRating';
import { StarRating } from '@/components/StarRating';
import { useFeatureFlag } from '@/lib/feature-flag/feature-flags';
import { useAuth } from '@/hooks/useAuth';
import { useThemeRatingSummary } from '@/hooks/queries/useThemeRating';

const customCardTheme: CustomFlowbiteTheme['card'] = {
  root: {
    children: 'flex h-full flex-col justify-center gap-0 py-5 px-5',
  },
};

interface IThemeProps extends IHeaderProps {
  theme: Theme;
  tags: string[];
  similarPlugins: any[];
  isTrending: boolean;
  suggestions: Suggestions;
}

const ThemeView = (props: IThemeProps) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  const [favorites, setFavorites] = useState([]);
  const [readmeContent, setReadmeContent] = useState('');

  const { isAuthenticated } = useAuth();
  const themeId = props.theme.repo.split('/')[1];
  const { 
    data: ratingSummary, 
    isLoading: ratingSummaryLoading, 
    error: ratingSummaryError 
  } = useThemeRatingSummary(themeId, isAuthenticated);

  const now = moment();

  let defaultBranch = '';
  useEffect(() => {
  setupFavorites(setFavorites);
  fetch(`https://api.github.com/repos/${props.theme.repo}`)
    .then((response) => response.json())
    .then((data) => {
      const defaultBranch = data.default_branch;
      return fetch(
        `https://raw.githubusercontent.com/${props.theme.repo}/${defaultBranch}/README.md`
      ).then((response) => response.text())
        .then((data) => {
          const baseUrl = `https://raw.githubusercontent.com/${props.theme.repo}/${defaultBranch}/`;
          // Markdown image links: only match relative paths
          const mdRegex = /!\[([^\]]*)\]\(\s*(?!https?:\/\/|\/\/|\/)(?:\.\.\/|\.\/)?([^)\s]+)\s*\)/g;
          let newData = data.replace(mdRegex, (match, alt, relPath) => {
            return `![${alt}](${baseUrl}${relPath})`;
          });

          // HTML <img> tags: only match relative src attributes
          const htmlImgRegex = /<img\s+([^>]*?)src=(["'])(?!https?:\/\/|\/\/|\/)(?:\.\.\/|\.\/)?([^"'>\s]+)\2([^>]*?)>/gi;
          newData = newData.replace(htmlImgRegex, (match, before, quote, relPath, after) => {
            return `<img ${before}src=${quote}${baseUrl}${relPath}${quote}${after}>`;
          });

          setReadmeContent(newData);
        });
    })
    .catch((err) => {
      console.error("Error fetching README:", err);
    });
  }, []);


  const isFavorite = favorites.includes(props.theme.repo);
  const isNotADayOld = isNotXDaysOld(props.theme.createdAt, 1);

  const isLessThanLarge = useIsLessThanLarge();
  const sidebar = (
    <Sidebar
      pageInfo={{ type: 'theme', slug: 'tasks' }}
      suggestions={props.suggestions}
    />
  );

  const adKeywords = [props.theme.name];

  return (
    <div>
      <Header {...props} />
      <AppNavbar current={`tag:${props.theme.repo.split('/')[1]}`}>
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
            <div className="flex-col">
              <div>
                <h1 className="text-2xl font-bold uppercase cursor-context-menu text-violet-800">
                  {props.theme.name}
                </h1>
                <div className="text-sm mb-1">
                  by <span>{props.theme.repo.split('/')[0]}</span>
                </div>
                <Favorites
                  theme={props.theme}
                  isFavorite={isFavorite}
                  setFavorites={setFavorites}
                />
                <div className="flex flex-col gap-y-2 my-4 mb-8 max-w-sm">
                  {ratingSummaryLoading && (
                    <div className="text-sm text-gray-500">Loading rating data...</div>
                  )}
                  {ratingSummaryError && (
                    <div className="text-sm text-red-500">Error loading ratings</div>
                  )}
                  {ratingSummary && (
                    <StarRating ratingInfo={{
                      avgRating: ratingSummary.stats.averageRating,
                      ratingCount: ratingSummary.stats.totalReviews,
                      star1Count: ratingSummary.stats.ratingCounts[1],
                      star2Count: ratingSummary.stats.ratingCounts[2],
                      star3Count: ratingSummary.stats.ratingCounts[3],
                      star4Count: ratingSummary.stats.ratingCounts[4],
                      star5Count: ratingSummary.stats.ratingCounts[5],
                    }} />
                  )}
                  {!ratingSummaryLoading && !ratingSummary && (
                    <StarRating ratingInfo={props.theme.ratingInfo} />
                  )}
                  <GiveThemeReview 
                    themeId={themeId}
                  />
                </div>
                <div className="flex gap-x-2 mb-2">
                  {isFavorite && (
                    <div
                      title="Favorite Theme"
                      className="text-xs bg-red-600 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl"
                    >
                      Favorite Theme
                    </div>
                  )}
                  {isNotADayOld && (
                    <div
                      title="Less than a day old"
                      className="text-xs bg-violet-800 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl"
                    >
                      New Theme
                    </div>
                  )}
                  {props.isTrending && (
                    <div
                      title="Trending theme"
                      className="text-xs bg-yellow-300 flex justify-center items-center gap-x-1 py-1 px-2 text-gray-700 font-bold rounded-xl"
                    >
                      Trending Theme
                    </div>
                  )}
                </div>
                {/* <div className='my-2'>{props.plugin.description}</div> */}
                <div className="flex flex-wrap space-x-4 mt-6"> 
                  <a
                    href={`https://github.com/${props.theme.repo}`}
                    target="_blank"
                    className="text-gray-800 flex justify-center items-center space-x-2s my-2 py-1 border border-gray-800 px-2 rounded-md transition hover:scale-110"
                  >
                    <GitHub className="text-gray-800 inline mr-2" size={18} />{' '}
                    Code
                  </a>
                </div>
              </div>
            </div>
          </Card>
          {isLessThanLarge && (
            <div className="sticky top-0 z-20 bg-white">
              <EthicalAd
                type="text"
                style="fixed-footer"
                placementId="theme-fixed-footer"
                // data-ea-keywords={adKeywords.join('|')}
              />
            </div>
          )}
          {/* <Card theme={customCardTheme} className="relative mt-4">
            <div>
              <div className="text-2xl">Languages</div>
              <div className="flex gap-x-2 mt-1 text-gray-600">
                {props.plugin.languages.split(',').map((lang) => (
                  <div key={lang} className="text-md">
                    {ISO6391.getName(lang)}
                  </div>
                ))}
              </div>
            </div>
          </Card> */}
          {/* <Card theme={customCardTheme} className="relative mt-4">
            <div className="text-2xl">Description</div>
            <div className="flex mt-4 gap-x-2">
              {props.plugin.osCategory && (
                <div className="flex items-end">
                  <CategoryIcon category={props.plugin.osCategory} size={36} />
                </div>
              )}
              <div>
                {props.plugin.osCategory && (
                  <div className="text-gray-700">
                    Category:{' '}
                    <span className="font-bold">{props.plugin.osCategory}</span>
                  </div>
                )}
                {props.plugin.osTags && (
                  <div className="flex flex-wrap gap-x-2 text-gray-700 cursor-pointer">
                    {props.plugin.osTags &&
                      props.plugin.osTags
                        ?.split(',')
                        .map((tag) => sanitizeTag(tag))
                        .filter(
                          (sanitizedTag) => !tagDenyList.includes(sanitizedTag)
                        )
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
                        ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className="prose mt-4 max-w-none!"
              dangerouslySetInnerHTML={{
                __html: mdConverter.makeHtml(getDescription(props.plugin)),
              }}
            />
          </Card> */}
          {/* <PluginSection plugin={props.plugin} /> */}
          {/* <Card theme={customCardTheme} className="relative mt-4">
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
          </Card> */}
          {/* <Card
            theme={customCardTheme}
            className="relative mt-4"
            id="latest-version"
          >
            <div className="text-2xl">Latest Version</div>
            <div className="prose mt-4 max-w-none!">
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
          </Card> */}
          <Card theme={customCardTheme} className="relative mt-4" id="modes">
            <div className="text-2xl">Description</div>
            <div className="flex flex-col mt-4 gap-y-2">
              {props.theme.isDark && (
                <div className="flex gap-x-2 items-center text-lg">
                  <Moon data-testid="sun-icon" />
                  This theme supports <b>Dark Mode</b>
                </div>
              )}
              {props.theme.isLight && (
                <div className="flex gap-x-2 items-center text-lg">
                  <Sun data-testid="moon-icon" />
                  This theme supports <b>Light Mode</b>
                </div>
              )}
            </div>
          </Card>
          <Card theme={customCardTheme} className="relative mt-4" id="readme">
            <div className="flex-col my-2 p-2">
              <div className="flex items-center gap-x-1 text-lg">
                <div className="text-2xl">README file from</div>
                <div>
                  <a
                    className="hover:underline text-violet-700"
                    href={`https://github.com/${props.theme.repo}#readme`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Github
                  </a>
                </div>
              </div>
              <div
                className="prose mt-4 max-w-none!"
                dangerouslySetInnerHTML={{
                  __html: mdConverter.makeHtml(readmeContent),
                }}
              />
            </div>
          </Card>
          {/* {props.similarPlugins?.length > 3 && (
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
          )} */}
        </ResponsiveLayout>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticPaths = async () => {
  const themes = await ThemesCache.get();

  return {
    paths: Array.from(themes).map((theme: Theme) => ({
      params: { slug: theme.repo.split('/')[1] },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const themes = await ThemesCache.get();
  const theme = themes.find((theme) => theme.repo.split('/')[1] === params.slug);
  const title = `${theme.name} - Obsidian Theme by ${theme.repo.split('/')[0]}`;
  const description = `Obsidian Theme: ${theme.name} - by ${theme.repo.split('/')[0]} ${ theme.isDark || theme.isLight ? 'supports ' + (theme.isDark && theme.isLight ? 'both dark and light modes.' : theme.isDark ? 'dark mode.' : 'light mode.') : '' }`;
  const canonical = `https://www.obsidianstats.com/themes/${theme.repo.split('/')[1]}`;
  const image = '/images/obsidian-stats-ogImage.png';
  const jsonLdSchema = JsonLdSchema.getThemePageSchema(
    theme,
    title,
    description,
    canonical,
    image
  );
  const suggestions = await generateSuggestions({
    type: 'theme',
    slug: theme.repo.split('/')[1],
  });

  return {
    props: {
      title,
      description,
      canonical,
      image,
      jsonLdSchema,
      theme,
      suggestions,
    },
  };
};

const processMarkdown = async (markdown: string) => {
  const processedContent = await unified()
    .use(remarkParse)
    //.use(remarkPostAd)
    //.use(remarkPluginHandler)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    //.use(rehypeToc, { headings: ['h1', 'h2', 'h3'], cssClasses:  { listItem: 'list-none [&>li>a]:no-underline'  } })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  const contentHtml = processedContent.toString();

  return contentHtml;
};

export default ThemeView;
