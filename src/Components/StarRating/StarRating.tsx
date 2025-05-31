import React from 'react';

interface StarRatingProps {
  rating: number;
  hover: number;
  onClick: (value: number) => void;
  onHover: (value: number) => void;
  onLeave: () => void;
}

export default function StarRating({
  rating,
  hover,
  onClick,
  onHover,
  onLeave,
}: StarRatingProps) {
  return (
    <div className="flex space-x-1 justify-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onClick(star)}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={onLeave}
          data-testid={`star-${star}`}
        >
          <span className="text-teal-400 text-3xl font-thin">
            {star <= (hover || rating) ? '★' : '☆'}
          </span>
        </button>
      ))}
    </div>
  );
}
