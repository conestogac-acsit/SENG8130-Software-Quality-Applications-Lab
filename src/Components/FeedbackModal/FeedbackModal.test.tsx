import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FeedbackModal from './FeedbackModal';

describe('FeedbackModal', () => {
  const props = {
    rating: 3,
    hover: 0,
    feedback: 'Great app!',
    onClose: jest.fn(),
    onRatingChange: jest.fn(),
    onHoverChange: jest.fn(),
    onFeedbackChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  it('renders modal with title', () => {
    render(<FeedbackModal {...props} />);
    expect(screen.getByText('Rate Us')).toBeInTheDocument();
  });

  it('updates feedback input', () => {
    render(<FeedbackModal {...props} />);
    const textarea = screen.getByPlaceholderText(/leave your feedback/i);
    fireEvent.change(textarea, { target: { value: 'Nice UI!' } });
    expect(props.onFeedbackChange).toHaveBeenCalledWith('Nice UI!');
  });

  it('calls onSubmit when clicking submit', () => {
    render(<FeedbackModal {...props} />);
    const button = screen.getByText(/submit feedback/i);
    fireEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('calls onClose when X is clicked', () => {
    render(<FeedbackModal {...props} />);
    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);
    expect(props.onClose).toHaveBeenCalled();
  });
});
