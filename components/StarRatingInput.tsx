import React from 'react';
import { useState } from 'react';

interface StarRatingInputProps {
  rating?: number;
  setRating?: (rating: number) => void;
  disabled?: boolean;
}

export const StarRatingInput = ({
  rating = 0,
  setRating,
  disabled = false,
}: StarRatingInputProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const stars = [];

  const handleClick = (index: number) => {
    if (setRating && !disabled) {
      setRating(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!disabled) {
      setHoveredRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(null);
    }
  };

  for (let i = 1; i <= 5; i++) {
    const hovered = i <= hoveredRating && !disabled;
    const filled = i <= rating;
    stars.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        className={`${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${hovered ? 'text-yellow-500' : filled ? 'text-yellow-400' : 'text-gray-300'} text-6xl transition-colors duration-200`}
      >
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};
