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
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <Button onClick={() => setIsOpen(!isOpen)} label="📝" />

      {isOpen && (
        <div
          ref={popupRef}
          style={{
            backgroundColor: 'white',
            width: '320px',
            padding: '16px',
            marginBottom: '10px',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '12px',
              fontSize: '20px',
              color: '#666',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>

          <h2 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '12px' }}>
            Give Feedback
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            {emojiOptions.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setRating(index + 1)}
                style={{
                  fontSize: '20px',
                  transform: rating === index + 1 ? 'scale(1.25)' : 'scale(1)',
                  transition: 'transform 0.2s',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
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
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          />

          <div style={{ textAlign: 'right' }}>
            <button
              onClick={handleSubmit}
              disabled={rating === null}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                cursor: rating !== null ? 'pointer' : 'not-allowed',
                opacity: rating !== null ? 1 : 0.5,
              }}
            >
              Submit
            </button>
          </div>

          {submitted && (
            <p style={{ color: 'green', textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
              Thank you for your feedback!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
