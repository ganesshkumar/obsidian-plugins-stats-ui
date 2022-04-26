import React from 'react';

const CardAnnotations = ({ isFavorite, isNotADayOld, isTrending }) => {
  return (
    <div className='absolute -top-5 -left-5 text-3xl'>
      {isFavorite && <div title='Favorite plugin'>🤩</div>}
      {isNotADayOld && <div title='Less than a day old'>🥳</div>}
      {isTrending && <div title='Trending plugin'>🔥</div>}
    </div>
  );
}

export default CardAnnotations;