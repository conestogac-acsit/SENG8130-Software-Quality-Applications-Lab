import React, { useState, useEffect, useRef } from 'react';
import Button from '../Components/Button/Button';

const emojiOptions = ['😡', '😕', '😐', '😊', '😍'];

// Replace this with your actual Google Apps Script URL
const FEEDBACK_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzjFpUdhIAqfJQ3WYXNcTtwCEg0LKk0aPd2KwAnDV9vQ-HHeNbEW7UVK7YUOxWfSr7R/exec';

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (rating === null) return;

    const feedback = {
      rating,
      comment: comment.trim(),
      timestamp: Date.now(),
    };

    try {
      await fetch(FEEDBACK_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(feedback),
      });

      setSubmitted(true);
      setRating(null);
      setComment('');

      setTimeout(() => {
        setSubmitted(false);
        setIsOpen(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to send feedback:', error);
      alert('There was an issue sending feedback. Please try again later.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <Button onClick={() => setIsOpen(!isOpen)} label="📝" />

      {isOpen && (
        <div
          ref={popupRef}
          className="bg-white w-80 p-4 mb-2 rounded-lg shadow-lg relative text-black"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-3 text-gray-500 text-xl hover:text-gray-700"
          >
            &times;
          </button>

          <h2 className="text-center text-lg font-semibold mb-3">Give Feedback</h2>

          <div className="flex justify-center gap-2 mb-3">
            {emojiOptions.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                className={`text-xl transition-transform transform ${
                  rating === index + 1 ? 'scale-125' : ''
                }`}
                aria-label={`Rate ${index + 1}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment (optional)"
            className="w-full p-2 text-sm border border-gray-300 rounded mb-3"
          />

          <div className="text-right">
            <button
              onClick={handleSubmit}
              disabled={rating === null}
              className={`bg-blue-600 text-white py-1 px-3 rounded ${
                rating === null ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              Submit
            </button>
          </div>

          {submitted && (
            <p className="text-green-600 text-center mt-2 text-sm">
              Thank you for your feedback!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
