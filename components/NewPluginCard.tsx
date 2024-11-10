import React from 'react';
import moment from "moment";

const NewPluginCard = ({plugin, isFavorite, isTrending}) => {
  return (
    <a key={plugin.id} 
        href={`/plugins/${plugin.pluginId}`} 
        target="_blank" rel="noreferrer" 
        className='relative flex-col justify-between mx-auto group basis-64 shrink-0 lg:mx-5 my-5 px-5 py-2 border rounded-md shadow-lg hover:shadow-violet-200/50 shadow-slate-200/50 hover:bg-gray-50 bg-white text-gray-700' >
      <div className='text-xl font-medium uppercase tracking-wide text-violet-900'>{plugin.name}</div>
      <div  className='text-sm'>{moment(plugin.createdAt).fromNow()} by <span className='group-hover:text-violet-500'>{plugin.author}</span></div>
      <div className='mt-5 text-sm'>{plugin.description}</div>
    </a>
  )
}

export default NewPluginCard;
