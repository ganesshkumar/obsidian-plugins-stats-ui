interface StarRatingProps {
  rating?: number;
  setRating?: (newRating: number) => void;
}

export const StarRating = ({ rating = 0, setRating }: StarRatingProps) => {
  const stars = [];

  const handleClick = (index: number) => {
    if (setRating) {
      setRating(index);
    }
  };

  for (let i = 1; i <= 5; i++) {
    const filled = i <= (rating ?? 0);
    stars.push(
      <span
        key={i}
        onClick={() => handleClick(i)}
        className={`cursor-pointer ${filled ? 'text-yellow-500' : 'text-gray-300'} text-4xl hover:text-yellow-600 transition-colors duration-200`}
      >
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};
