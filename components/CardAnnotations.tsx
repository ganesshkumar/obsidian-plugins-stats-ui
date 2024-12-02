import React from 'react';

const CardAnnotations = ({
  isFavorite,
  isNotADayOld,
  isTrending,
  category = '',
}) => {
  return (
    // <div className='absolute -top-5 -left-5 text-3xl'>
    //   {isFavorite && <div title='Favorite plugin'>🤩</div>}
    //   {isNotADayOld && <div title='Less than a day old'>🥳</div>}
    //   {isTrending && <div title='Trending plugin'>🔥</div>}
    // </div>
    <div className="flex text-xs gap-x-2 mt-4">
      {isFavorite && (
        <div
          title="Favorite plugin"
          className="bg-red-600 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl"
        >
          Favorite
        </div>
      )}
      {isNotADayOld && (
        <div
          title="Less than a day old"
          className="bg-violet-800 flex justify-center items-center gap-x-1 py-1 px-2 text-white font-bold rounded-xl"
        >
          New {category}
        </div>
      )}
      {isTrending && (
        <div
          title="Trending plugin"
          className="bg-yellow-300 flex justify-center items-center gap-x-1 py-1 px-2 text-gray-700 font-bold rounded-xl"
        >
          Trending
        </div>
      )}
    </div>
  );
};

export default CardAnnotations;
