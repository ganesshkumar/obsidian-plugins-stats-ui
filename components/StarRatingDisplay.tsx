import React from 'react';

interface StarRatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
}

export const StarRatingDisplay = ({
  rating,
  maxRating = 5,
  size = 'small',
  showCount = false,
}: StarRatingDisplayProps) => {
  const stars = [];

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-2xl',
  };

  for (let i = 1; i <= maxRating; i++) {
    const filled = i <= rating;
    stars.push(
      <span
        key={i}
        className={`${filled ? 'text-yellow-400' : 'text-gray-300'} ${sizeClasses[size]}`}
      >
        ★
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showCount && (
        <span className={`text-gray-600 ${sizeClasses[size]}`}>({rating})</span>
      )}
    </div>
  );
};
