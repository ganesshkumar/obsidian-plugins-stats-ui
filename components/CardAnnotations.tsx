import React from 'react';

const CardAnnotations = ({isFavorite, isNotADayOld}) => {
  return (
    <div className='absolute -top-5 -left-5 text-3xl'>
      { isNotADayOld &&  <div title='Less than a day old'>🥳</div> }
      { isFavorite && <div title='Favorite plugin'>🤩</div> }
    </div>
  );
}

export default CardAnnotations;