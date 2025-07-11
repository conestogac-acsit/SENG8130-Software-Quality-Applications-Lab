import React, { useState } from 'react';

const emojiOptions = ['😡', '😕', '😐', '😊', '😍'];

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === null) return;

    const feedback = {
      rating,
      comment,
      timestamp: Date.now(),
    };

    const prev = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    localStorage.setItem('feedbacks', JSON.stringify([...prev, feedback]));

    setSubmitted(true);
    setRating(null);
    setComment('');
  };

  return (
    <div className="p-4 rounded-xl shadow-lg bg-white max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Give Feedback</h2>

      <div className="flex justify-center space-x-3 mb-4">
        {emojiOptions.map((emoji, index) => (
          <button
            key={index}
            className={`text-2xl transition-transform ${
              rating === index + 1 ? 'scale-125' : ''
            }`}
            onClick={() => setRating(index + 1)}
            aria-label={`Rate ${index + 1}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Leave a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={rating === null}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Submit
      </button>

      {submitted && (
        <p className="text-green-600 mt-3">Thank you for your feedback!</p>
      )}
    </div>
  );
};

export default FeedbackForm;
