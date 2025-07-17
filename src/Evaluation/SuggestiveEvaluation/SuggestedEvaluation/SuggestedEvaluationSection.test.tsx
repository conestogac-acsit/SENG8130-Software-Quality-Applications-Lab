import React from 'react';
import { render, screen } from '@testing-library/react';
import SuggestedEvaluationSection from './SuggestedEvaluationSection';

describe('SuggestedEvaluationSection', () => {
  const mockSuggestions = ['Week 3: Feb 5 – Feb 11', 'Week 5: Mar 1 – Mar 7', 'Week 8: Apr 1 – Apr 7'];

  test('renders the SuggestedEvaluation component with title', () => {
    render(<SuggestedEvaluationSection suggestions={mockSuggestions} />);
    expect(screen.getByText(/Suggested Evaluation Windows/i)).toBeInTheDocument();
  });

  test('renders all suggested evaluation windows', () => {
    render(<SuggestedEvaluationSection suggestions={mockSuggestions} />);
    mockSuggestions.forEach((week) => {
      expect(screen.getByText(week)).toBeInTheDocument();
    });
  });
});
