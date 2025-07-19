import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackForm from './FeedbackForm';
import { LocalStorage } from '../localStorageService'; 

describe('FeedbackForm', () => {
  const storage = new LocalStorage();

  beforeEach(() => {
    localStorage.removeItem('feedbacks'); // ✅ Clears previous feedbacks
    jest.clearAllMocks();
  });

  test('renders heading and submit button', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByRole('button', { name: '📝' })); // Open popup

    expect(screen.getByText(/give feedback/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('submit is disabled until a rating is selected', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByRole('button', { name: '📝' }));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test('selecting a rating enables submit', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByRole('button', { name: '📝' }));

    const emojiButton = screen.getByRole('button', { name: /rate 3/i });
    fireEvent.click(emojiButton);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('submitting feedback stores it in localStorage service', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByRole('button', { name: '📝' }));

    const emojiButton = screen.getByRole('button', { name: /rate 5/i });
    fireEvent.click(emojiButton);

    const textarea = screen.getByPlaceholderText(/leave a comment/i);
    fireEvent.change(textarea, { target: { value: 'Great app!' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const feedbacks = storage.load<any[]>('feedbacks') || [];
    expect(feedbacks.length).toBe(1);
    expect(feedbacks[0]).toMatchObject({
      rating: 5,
      comment: 'Great app!',
    });
  });

  test('shows thank-you message after submission', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByRole('button', { name: '📝' }));

    fireEvent.click(screen.getByRole('button', { name: /rate 1/i }));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument();
  });
});
