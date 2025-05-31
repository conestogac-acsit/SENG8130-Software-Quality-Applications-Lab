import React from 'react';
import StarRating from '../StarRating/StarRating';

interface FeedbackModalProps {
  rating: number;
  hover: number;
  feedback: string;
  onClose: () => void;
  onRatingChange: (val: number) => void;
  onHoverChange: (val: number) => void;
  onFeedbackChange: (val: string) => void;
  onSubmit: () => void;
}

export default function FeedbackModal({
  rating,
  hover,
  feedback,
  onClose,
  onRatingChange,
  onHoverChange,
  onFeedbackChange,
  onSubmit,
}: FeedbackModalProps) {
  return (
    <div className="fixed inset-0 bg-slate-50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={onClose}
        >
          <span className="text-xl">&#10005;</span>
        </button>

        <h2 className="text-xl font-semibold mb-4">Rate Us</h2>

        <StarRating
          rating={rating}
          hover={hover}
          onClick={onRatingChange}
          onHover={onHoverChange}
          onLeave={() => onHoverChange(0)}
        />

        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={4}
          placeholder="Leave your feedback..."
          value={feedback}
          onChange={(e) => onFeedbackChange(e.target.value)}
        />

        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
