import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeedbackForm from './FeedbackForm';

describe('FeedbackForm (No JSX)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders heading and textarea', () => {
    render(React.createElement(FeedbackForm));
    expect(screen.getByText(/Give Feedback/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Leave a comment/i)).toBeInTheDocument();
  });

  it('disables submit button when no emoji is selected', () => {
    render(React.createElement(FeedbackForm));
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeDisabled();
  });

  it('enables submit button when emoji is selected', () => {
    render(React.createElement(FeedbackForm));
    fireEvent.click(screen.getByLabelText('Rate 2'));
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).not.toBeDisabled();
  });

  it('saves feedback in localStorage after submission', () => {
    render(React.createElement(FeedbackForm));
    fireEvent.click(screen.getByLabelText('Rate 5'));
    fireEvent.change(screen.getByPlaceholderText(/Leave a comment/i), {
      target: { value: 'Awesome feature!' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    expect(feedbacks.length).toBe(1);
    expect(feedbacks[0].rating).toBe(5);
    expect(feedbacks[0].comment).toBe('Awesome feature!');
  });

  it('shows thank you message after submission', () => {
    render(React.createElement(FeedbackForm));
    fireEvent.click(screen.getByLabelText('Rate 1'));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument();
  });
});
