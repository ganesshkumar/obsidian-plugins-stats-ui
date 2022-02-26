import moment from 'moment';
import React from 'react';
import Favorites from './Favorites';
import showdown from 'showdown';

const humanReadableNumbers = (n: number) => {
  const numString = n.toString();

  const formatter = (digits, char) => `${numString.split('').splice(0, numString.length - digits).join('')}${char}`
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
}

const PluginListItem = ({ plugin, isFavorite, isNotADayOld, idx, pad, setFavorites, showDownloadStat, showLatestRelease, displayDate, showChangelog, showDescription }) => {
  const mdConverter = new showdown.Converter();
  mdConverter.setFlavor('github');

  return (
    <div className={`group flex py-2 ${isFavorite ? 'bg-violet-100' : 'bg-gray-50'} hover:bg-white text-gray-700`}>
      <div className='flex text-3xl font text-gray-400 px-5'>
        <div>{String(idx).padStart(pad, '0')}.</div>
      </div>
      {
        showLatestRelease &&
          <div className='text-xl lg:text-3xl font text-violet-900 px-5 py-1 lg:py-2 basis:28 lg:basis-40 text-center shrink-0'>
            <span className='bg-violet-900 text-violet-100 px-2 rounded-md'>{plugin.latestRelease}</span>
          </div>
      }
      {
        showDownloadStat &&
          <div className='font bg-violet-900 text-violet-900 rounded px-5 mr-5 py-2 basis-24 lg:basis-40 text-center shrink-0'>
            <div className='text-3xl  text-violet-100 px-2 rounded-md'>{humanReadableNumbers(plugin.totalDownloads)}</div>
            <div className='text-sm text-violet-100 px-2 rounded-md'>downloads</div>
          </div>
      }
      <div>
        <a href={`/plugins/${plugin.pluginId}`} target="_blank" rel="noreferrer" className='text-xl font-medium text-violet-900'>{plugin.name}</a>
        <div className='flex text-xl'>  
          {isFavorite && <div className='cursor-default' title='Favorite plugin'>🤩</div>}
          {isNotADayOld && <div className='cursor-default' title='Less than a day old'>🥳</div>}
          {plugin.zScoreTrending > 10 && <div className='cursor-default' title='Trending plugin'>🔥</div>}
        </div>
        <Favorites plugin={plugin} isFavorite={isFavorite} setFavorites={setFavorites} />
        <div className='text-sm'>{moment(displayDate(plugin)).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
        {showDescription && <div className='mr-5'>{plugin.description}</div>}
        {showChangelog &&
          <details>
            <summary className='text-sm text-violet-800'>Changelog</summary>
            {!plugin.latestReleaseDesc || !plugin.latestReleaseDesc.trim() ?
                <div>No Changelog was added</div> :
                <div dangerouslySetInnerHTML={{__html: mdConverter.makeHtml(plugin.latestReleaseDesc)}} />
            }
            
          </details>
        }
      </div>
    </div>
  );
}

export default PluginListItem;
