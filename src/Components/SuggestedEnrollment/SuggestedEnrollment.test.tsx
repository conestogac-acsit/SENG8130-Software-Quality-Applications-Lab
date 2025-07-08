import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SuggestedEnrollment } from './SuggestedEnrollment';

describe('SuggestedEnrollment Component', () => {
  const mockSuggestions = [
    "Week 3: Feb 5 – Feb 11 (Low load)",
    "Week 7: Mar 4 – Mar 10 (Recommended)",
    "Week 11: Apr 1 – Apr 7"
  ];

  test('renders without crashing', () => {
    render(<SuggestedEnrollment suggestions={mockSuggestions} />);
  });

  test('displays the correct title', () => {
    render(<SuggestedEnrollment suggestions={mockSuggestions} />);
    expect(screen.getByText(/Suggested Enrollment Windows/i)).toBeInTheDocument();
  });

  test('renders the correct number of suggestions', () => {
    render(<SuggestedEnrollment suggestions={mockSuggestions} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockSuggestions.length);
  });

  test('renders each suggestion correctly', () => {
    render(<SuggestedEnrollment suggestions={mockSuggestions} />);
    mockSuggestions.forEach((suggestion) => {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });
  });
});