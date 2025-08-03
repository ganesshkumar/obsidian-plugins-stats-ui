import React from 'react';
import { useState } from 'react';

interface StarRatingInputProps {
  rating?: number;
  setRating?: (rating: number) => void;
}

export const StarRatingInput = ({
  rating = 0,
  setRating,
}: StarRatingInputProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const stars = [];

  const handleClick = (index: number) => {
    if (setRating) {
      setRating(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  for (let i = 1; i <= 5; i++) {
    const hovered = i <= hoveredRating;
    const filled = i <= rating;
    stars.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        className={`cursor-pointer ${hovered ? 'text-yellow-500' : filled ? 'text-yellow-400' : 'text-gray-300'} text-6xl transition-colors duration-200`}
      >
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};
