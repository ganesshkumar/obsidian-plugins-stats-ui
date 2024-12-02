import moment from 'moment';
import React from 'react';
import Favorites from './Favorites';
import showdown from 'showdown';
import { Button, List, Table } from 'flowbite-react';
import Link from 'next/link';

const humanReadableNumbers = (n: number) => {
  const numString = n.toString();

  const formatter = (digits, char) =>
    `${numString
      .split('')
      .splice(0, numString.length - digits)
      .join('')}${char}`;
  const formatMap = {
    '9': 'B',
    '6': 'M',
    '3': 'K',
  };

  for (const key in formatMap) {
    if (numString.length > parseInt(key)) {
      return formatter(parseInt(key), formatMap[key]);
    }
  }
};

const PluginListItem = ({
  plugin,
  isFavorite,
  isNotADayOld,
  idx,
  pad,
  setFavorites,
  showDownloadStat,
  showLatestRelease,
  displayDate,
  showChangelog,
  showDescription,
}) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  return (
    <List.Item className="!mt-0 py-2 px-2 w-full hover:bg-slate-50">
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className="text-xl">{String(idx).padStart(pad, '0')}.</div>
        <div className="flex flex-col">
          <Link
            href={`/plugins/${plugin.pluginId}`}
            className="text-xl font-semibold text-violet-800"
          >
            {plugin.name}
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>
              {moment(displayDate(plugin)).fromNow()} by{' '}
              <span className="text-gray-700">{plugin.author}</span>
            </span>
            <Favorites
              plugin={plugin}
              isFavorite={isFavorite}
              setFavorites={setFavorites}
            />
          </div>
          <div className="my-4">
            {plugin?.aiDescription?.replaceAll('**', '') || plugin.description}
          </div>
          <Link
            href={`/plugins/${plugin.pluginId}`}
            className="underline text-gray-600 font-seminbold"
          >
            View Details
          </Link>
        </div>
      </div>
    </List.Item>
  );
  // return (
  //   <div className={`group border-b flex py-2 ${idx %2 === 0 ? 'bg-violet-50' : 'bg-slate-50'} text-gray-700`}>
  //     <div className='flex text-3xl font text-gray-400 px-5'>
  //       <div>{String(idx).padStart(pad, '0')}.</div>
  //     </div>
  //     {
  //       showLatestRelease &&
  //         <div className='text-xl lg:text-3xl font text-violet-900 px-5 py-1 lg:py-2 basis:28 lg:basis-40 text-center shrink-0'>
  //           <span className='bg-violet-900 text-violet-100 px-2 rounded-md'>{plugin.latestRelease}</span>
  //         </div>
  //     }
  //     {
  //       showDownloadStat &&
  //         <div className='font bg-violet-900 text-violet-900 rounded px-5 mr-5 py-2 basis-24 lg:basis-40 text-center shrink-0'>
  //           <div className='text-3xl  text-violet-100 px-2 rounded-md'>{humanReadableNumbers(plugin.totalDownloads)}</div>
  //           <div className='text-sm text-violet-100 px-2 rounded-md'>downloads</div>
  //         </div>
  //     }
  //     <div>
  //       <a href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
  //       {/* <div className='flex text-xl'>
  //         {isFavorite && <div className='cursor-default' title='Favorite plugin'>🤩</div>}
  //         {isNotADayOld && <div className='cursor-default' title='Less than a day old'>🥳</div>}
  //         {plugin.zScoreTrending > 10 && <div className='cursor-default' title='Trending plugin'>🔥</div>}
  //       </div> */}
  //       {showDescription && <div className='mr-5'>{plugin.description}</div>}
  //       <div className='flex gap-x-2 my-2'>
  //         {isFavorite && <div title='Favorite plugin' className='text-xs bg-red-600 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl'>Favorite</div>}
  //         {isNotADayOld && <div title='Less than a day old' className='text-xs bg-violet-800 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl'>New Plugin</div>}
  //         {plugin.zScoreTrending > 10 && <div title='Trending plugin' className='text-xs bg-yellow-300 flex justify-center items-center gap-x-1 py-1 px-2 text-gray-700 font-bold rounded-xl'>Trending</div>}
  //       </div>
  //       <div className='mt-1 flex gap-x-2'>
  //         <Favorites plugin={plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
  //         <div className='text-xs'>{moment(displayDate(plugin)).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
  //       </div>
  //       {showChangelog &&
  //         <details id='changelog-details-expand' data-details-id='d-changelog-details-expand'>
  //           <summary className='text-sm text-violet-800' id='changelog-expand' data-summary-id='d-changelog-expand'>Changelog</summary>
  //           {!plugin.latestReleaseDesc || !plugin.latestReleaseDesc.trim() ?
  //               <div>No Changelog was added</div> :
  //               <div dangerouslySetInnerHTML={{__html: mdConverter.makeHtml(plugin.latestReleaseDesc)}} />
  //           }
  //         </details>
  //       }
  //     </div>
  //   </div>
  // );
};

export default PluginListItem;
