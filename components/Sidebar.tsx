'use client'

import { Tool } from "react-feather";
import { PageInfo, Suggestions } from "../domain/suggestions/models";
import { useIsLessThanLarge } from "../hooks/useIsLessThanLarge";
import { getCategoryBgClass, getGraidentFrom, getGraidentTo } from "../lib/customThemes";
import { CategoryIcon } from "./Category";
import EthicalAd from "./EthicalAd";
import { PostIcon } from "./post/PostIcon";

interface ISidebarProps {
  pageInfo: PageInfo
  suggestions: Suggestions
}

export const Sidebar = ({pageInfo, suggestions}: ISidebarProps) => {
  const isLessThanLarge = useIsLessThanLarge();

  let content
  if (pageInfo.type === 'plugin') {
    content = (
      <>
        {suggestions.similarPlugins.slice(0, 5).map((similarPlugin, index) => (
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
        {suggestions.hasMoreSimilarPlugins && (
          <a
            key="all-similar-plugins"
            href="#similar-plugins"
            className="relative w-80 flex-col justify-center group shrink-0 my-1 px-5 py-2 border rounded-md shadow-lg cursor-pointer
                        hover:shadow-violet-200/50 shadow-slate-200/50 grid content-center"
          >
            View all
          </a>
        )}
      </>
    )
  } else {
    content = <>
      {suggestions.tools.map((tool, index) => (
        <a key={`tool-${index}`} className="flex border border-gray-200 mx-4 p-3 rounded w-[320px] min-w-[320px] max-w-[320px] h-[130px] min-h-[130px] max-h-[130px]" href={`${tool.link}`}>
          <div className={`w-[120px] min-w-[120px] max-w-[120px] h-[90px] min-h-[90px] max-h-[90px] bg-gradient-to-br ${getGraidentFrom(index)} ${getGraidentTo(index)} flex justify-center items-center self-center`}>
            <Tool size={48} color="white" />
          </div>
          <div>
            <p className="text-sm text-gray-700 px-2 pt-2 line-clamp-4 font-semibold">{tool.name}</p>
            <p className="text-sm text-gray-700 px-2 pt-2 line-clamp-4">{tool.description}</p>
          </div>
        </a>
      ))}
      {suggestions.posts.map((post, index) => (
        <a key={`post-${index}`} className="flex border border-gray-200 mx-4 p-3 rounded w-[320px] min-w-[320px] max-w-[320px] h-[130px] min-h-[130px] max-h-[130px]" href={`/posts/${post.id}`}>
          <div className={`w-[120px] min-w-[120px] max-w-[120px] h-[90px] min-h-[90px] max-h-[90px] bg-gradient-to-br ${getGraidentFrom(index)} ${getGraidentTo(index)} flex justify-center items-center self-center`}>
            <PostIcon tags={post.tags} size={60} />
          </div>
          <p className="text-sm text-gray-700 p-2 line-clamp-4">{post.title}</p>
        </a>
      ))}
    </>
  }

  const adId = `${pageInfo.type}-image"`;

  return (
    <div className='w-full mt-10 lg:mt-0 lg:sticky lg:top-10'>
      {!isLessThanLarge && <EthicalAd type="image" id={adId} />}
      <h2 className="mt-1 mb-4 text-2xl text-center">
        {pageInfo.type === 'plugin' ? 'Similar Plugins' : 'Suggested Content'}
      </h2>
      <div className='flex flex-wrap justify-center gap-x-26 lg:justify-start lg:flex-col gap-2 items-center'>
        {content}
      </div>
    </div>
  );
}
