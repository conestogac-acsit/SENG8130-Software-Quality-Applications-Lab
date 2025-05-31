import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RatingComponent from './RatingComponent';

beforeEach(() => {
    // Type assertion to avoid TS conflict
    (window.electronAPI as any) = {
      writeCSV: jest.fn().mockResolvedValue(undefined),
    };
  });
  

describe('RatingComponent', () => {
  it('renders Rate Us button', () => {
    render(<RatingComponent />);
    expect(screen.getByText('Rate Us')).toBeInTheDocument();
  });

  it('shows modal on clicking "Rate Us"', () => {
    render(<RatingComponent />);
    fireEvent.click(screen.getByText('Rate Us'));
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument();
  });

  it('does not submit if rating and feedback are missing', () => {
    window.alert = jest.fn();
    render(<RatingComponent />);
    fireEvent.click(screen.getByText('Rate Us'));
    fireEvent.click(screen.getByText('Submit Feedback'));
    expect(window.alert).toHaveBeenCalledWith('Please provide both a rating and feedback.');
  });

  it('submits feedback and resets state', async () => {
    render(<RatingComponent />);
    fireEvent.click(screen.getByText('Rate Us'));

    // Select 4 stars
    const star4 = screen.getByTestId('star-4');
    fireEvent.click(star4);

    // Add feedback
    fireEvent.change(screen.getByPlaceholderText('Leave your feedback...'), {
      target: { value: 'Great app!' },
    });

    fireEvent.click(screen.getByText('Submit Feedback'));

    await waitFor(() =>
      expect(screen.getByText('Feedback submitted successfully!')).toBeInTheDocument()
    );

    expect(window.electronAPI.writeCSV).toHaveBeenCalledWith({
      filePath: 'feedback.csv',
      data: [{ rating: 4, feedback: 'Great app!' }],
      append: true,
    });
  });

  it('closes modal on close button', () => {
    render(<RatingComponent />);
    fireEvent.click(screen.getByText('Rate Us'));
    fireEvent.click(screen.getByText('✕')); // Close button
    expect(screen.queryByText('Submit Feedback')).not.toBeInTheDocument();
  });
});