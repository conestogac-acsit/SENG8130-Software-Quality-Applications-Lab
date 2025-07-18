import React, { useState, useEffect, useRef } from 'react';
import Button from '../Components/Button/Button'; 

const emojiOptions = ['😡', '😕', '😐', '😊', '😍'];

const FeedbackForm: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
    }, 1500);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        label="📝"
      />

      {isOpen && (
        <div
          ref={popupRef}
          className="bg-white w-80 p-4 mb-3 rounded-xl shadow-lg relative"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>

          <h2 className="text-lg font-semibold mb-3 text-center">Give Feedback</h2>

          <div className="flex justify-center space-x-2 mb-3">
            {emojiOptions.map((emoji, index) => (
              <button
                key={index}
                className={`text-xl transition-transform ${
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
            className="w-full p-2 border rounded mb-3 text-sm"
            placeholder="Leave a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={rating === null}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              Submit
            </button>
          </div>

          {submitted && (
            <p className="text-green-600 text-sm mt-2 text-center">
              Thank you for your feedback!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
