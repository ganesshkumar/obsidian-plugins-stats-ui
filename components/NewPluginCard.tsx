import React from 'react';
import moment from "moment";
import CardAnnotations from './CardAnnotations';
import { isNotXDaysOld } from '../utils/datetime';

const NewPluginCard = ({plugin, isFavorite, isTrending}) => {
  return (
    <a key={plugin.id} 
        href={`/plugins/${plugin.pluginId}`} 
        target="_blank" rel="noreferrer" 
        className='relative flex-col justify-between mx-auto group basis-64 shrink-0 lg:mx-5 my-5 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 bg-gray-50 hover:bg-white text-gray-700 transition hover:-translate-y-1 hover:scale-110' >
      <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>{plugin.name}</div>
      <div  className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
      <div className='mt-5 text-sm'>{plugin.description}</div>
      <CardAnnotations isFavorite={isFavorite} isNotADayOld={isNotXDaysOld(plugin.createdAt, 1)} isTrending={isTrending}/>
      <div className='absolute -top-5 -left-5 text-3xl'>
        { plugin.createdAt > Date.now() - 24 * 60 * 60 * 1000 &&  <div title='Less than a day old'>🥳</div> }
        { isFavorite && <div title='Favorite plugin'>🤩</div> }
      </div>
    </a>
  )
}

export default NewPluginCard;
