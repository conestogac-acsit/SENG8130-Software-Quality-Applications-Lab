import React, { useState, useEffect } from 'react';

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
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!rating || !feedback.trim()) {
      alert('Please provide both a rating and feedback.');
      return;
    }

    const row = { rating, feedback };
    await window.electronAPI.writeCSV({
      filePath: 'feedback.csv',
      data: [row],
      append: true,
    });

    setRating(0);
    setHover(0);
    setFeedback('');
    setShowModal(false);
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
        <div className="fixed inset-0 bg-slate-50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => {
                setRating(0);
                setHover(0);
                setFeedback('');
                setShowModal(false);
              }}
            >
              <span className="text-xl">&#10005;</span>
            </button>

            <h2 className="text-xl font-semibold mb-4">Rate Us</h2>

            <div className="flex space-x-1 mb-4 justify-center">
              {[1, 2, 3, 4, 5].map((star: number) => (
                <button
                  key={star}
                  data-testid={`star-${star}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <span className="text-teal-400 text-3xl font-thin ">
                    {star <= (hover || rating) ? (
                      <span>&#9733;</span> // ★
                    ) : (
                      <span>&#9734;</span> // ☆
                    )}
                  </span>
                </button>
              ))}
            </div>

            <textarea
              className="w-full border p-2 rounded mb-4"
              rows={4}
              placeholder="Leave your feedback..."
              value={feedback}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}