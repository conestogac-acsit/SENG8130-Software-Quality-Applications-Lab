import React, { useState } from 'react';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
declare global {
  interface Window {
    electronAPI: {
      writeCSV: (options: {
        filePath: string;
        data: { rating: number; feedback: string }[];
        append: boolean;
      }) => Promise<void>;
    };
  }
}


export default function RatingComponent() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetState = () => {
    setRating(0);
    setHover(0);
    setFeedback('');
    setShowModal(false);
  };

  const handleSubmit = async () => {
    if (!rating || !feedback.trim()) {
      alert('Please provide both a rating and feedback.');
      return;
    }

    await window.electronAPI.writeCSV({
      filePath: 'feedback.csv',
      data: [{ rating, feedback }],
      append: true,
    });

    resetState();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Rate Us
      </button>

      {success && (
        <div className="mt-4 text-green-600 font-medium">Feedback submitted successfully!</div>
      )}

      {showModal && (
        <FeedbackModal
          rating={rating}
          hover={hover}
          feedback={feedback}
          onClose={resetState}
          onRatingChange={setRating}
          onHoverChange={setHover}
          onFeedbackChange={setFeedback}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
