'use client';

import React from 'react';
import Image from 'next/image';
import { Moon, Sun, Tool } from 'react-feather';
import { PageInfo, Suggestions } from '../domain/suggestions/models';
import { useIsLessThanLarge } from '../hooks/useIsLessThanLarge';
import { getGraidentFrom, getGraidentTo } from '../lib/customThemes';
import { CategoryIcon } from './Category';
import EthicalAd from './EthicalAd';
import { PostIcon } from './post/PostIcon';
import { useRouter } from 'next/router';
import { useAnalytics } from '../lib/analytics/analytics';

interface ISidebarProps {
  pageInfo: PageInfo;
  suggestions: Suggestions;
}

export const Sidebar = ({ pageInfo, suggestions }: ISidebarProps) => {
  const isLessThanLarge = useIsLessThanLarge();
  const router = useRouter();
  const { trackEvent } = useAnalytics();

  const handleSuggestedContentClick = (url: string, eventName: string) => {
    trackEvent(eventName);
    router.push(url);
  };

  let content;
  if (pageInfo.type === 'plugin') {
    content = (
      <>
        {suggestions.similarPlugins.slice(0, 5).map((similarPlugin, index) => (
          <div
            key={index}
            onClick={() =>
              handleSuggestedContentClick(
                `/plugins/${similarPlugin.pluginId}`,
                'Suggestion Click Similar Plugin'
              )
            }
            className="flex border border-gray-200 p-3 rounded w-full h-[130px] min-h-[130px] max-h-[130px] cursor-pointer"
          >
            <div
              className={`w-[36px] min-w-[36px] max-w-[36px] h-[90px] min-h-[90px] max-h-[90px] flex justify-center items-start self-center pt-2`}
            >
              <CategoryIcon category={similarPlugin.osCategory} size={32} />
            </div>
            <div>
              <p className="text-gray-700 px-2 pt-2 font-semibold">
                {similarPlugin.name}
              </p>
              <p className="text-sm text-gray-700 px-2 pt-2 line-clamp-2">
                {similarPlugin.description}
              </p>
            </div>
          </div>
        ))}
        {suggestions.hasMoreSimilarPlugins && (
          <div
            key="all-similar-plugins"
            onClick={() =>
              handleSuggestedContentClick(
                '#similar-plugins',
                'Suggestion Click All Similar Plugins Button'
              )
            }
            className="relative w-80 flex-col justify-center group shrink-0 my-1 px-5 py-2 border rounded-md shadow-lg cursor-pointer
                        hover:shadow-violet-200/50 shadow-slate-200/50 grid content-center"
          >
            View all
          </div>
        )}
      </>
    );
  } else if (pageInfo.type === 'theme') {
    content = (
      <>
        {suggestions.similarThemes.slice(0, 5).map((similarTheme, index) => (
          <div
            key={index}
            onClick={() =>
              handleSuggestedContentClick(
                `/themes/${similarTheme.repo}`,
                'Suggestion Click Similar Theme'
              )
            }
            className="flex border border-gray-200 px-3 py-1 rounded w-full h-[130px] min-h-[130px] max-h-[130px] cursor-pointer"
          >
            <div className="w-full">
              <p className="text-gray-700 px-2 pt-1 font-semibold">
                {similarTheme.name}
              </p>
              <div className="flex items-stretch justify-between gap-x-4 w-full">
                <Image
                  src={`https://raw.githubusercontent.com/${similarTheme.repo}/HEAD/${similarTheme.screenshot}`}
                  alt={similarTheme.name}
                  width={128}
                  height={80}
                  className="w-32 h-20 mt-2 mb-2 object-contain"
                />
                <div className="flex flex-col grow-1 justify-end mb-4">
                  {similarTheme.isLight && (
                    <div>
                      <Sun size={16} className="inline mx-1" /> Light Mode
                    </div>
                  )}
                  {similarTheme.isDark && (
                    <div>
                      <Moon size={16} className="inline mx-1" /> Dark Mode
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    content = (
      <>
        {suggestions.tools.map((tool, index) => (
          <div
            key={`tool-${index}`}
            onClick={() =>
              handleSuggestedContentClick(
                `${tool.link}`,
                'Suggestion Click Tool'
              )
            }
            className="flex border border-gray-200 p-3 rounded w-full h-[130px] min-h-[130px] max-h-[130px] cursor-pointer"
          >
            <div
              className={`w-[120px] min-w-[120px] max-w-[120px] h-[90px] min-h-[90px] max-h-[90px] bg-linear-to-br ${getGraidentFrom(index)} ${getGraidentTo(index)} flex justify-center items-center self-center`}
            >
              <Tool size={48} color="white" />
            </div>
            <div>
              <p className="text-sm text-gray-700 px-2 pt-2 line-clamp-4 font-semibold">
                {tool.name}
              </p>
              <p className="text-sm text-gray-700 px-2 pt-2 line-clamp-4">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
        {suggestions.posts.map((post, index) => (
          <div
            key={`post-${index}`}
            onClick={() =>
              handleSuggestedContentClick(
                `/posts/${post.id}`,
                'Suggestion Click Post'
              )
            }
            className="flex border border-gray-200 p-3 rounded w-full h-[130px] min-h-[130px] max-h-[130px] cursor-pointer"
          >
            <div
              className={`w-[120px] min-w-[120px] max-w-[120px] h-[90px] min-h-[90px] max-h-[90px] bg-linear-to-br ${getGraidentFrom(index)} ${getGraidentTo(index)} flex justify-center items-center self-center`}
            >
              <PostIcon tags={post.tags} size={60} />
            </div>
            <p className="text-sm text-gray-700 p-2 line-clamp-4">
              {post.title}
            </p>
          </div>
        ))}
      </>
    );
  }

  const adId = `${pageInfo.type}-image`;
  let title = '';
  if (pageInfo.type === 'plugin') {
    title = 'Similar Plugins';
  } else if (pageInfo.type === 'theme') {
    title = 'Similar Themes';
  } else {
    title = 'Suggested Content';
  }

  return (
    <div className="w-full mt-10 lg:mt-0 lg:sticky lg:top-10">
      {!isLessThanLarge && (
        <EthicalAd type="image" placementId={adId} className="horizontal" />
      )}
      <h2 className="mt-1 mb-4 text-2xl text-center">{title}</h2>
      <div className="flex flex-wrap justify-center gap-x-26 lg:justify-start lg:flex-col gap-2 items-center">
        {content}
      </div>
    </div>
  );
};
