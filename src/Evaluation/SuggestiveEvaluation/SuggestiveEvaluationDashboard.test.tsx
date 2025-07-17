import React from 'react';
import { render, screen } from '@testing-library/react';
import SuggestiveEvaluationDashboard from './SuggestiveEvaluationDashboard';

describe('SuggestiveEvaluationDashboard', () => {
  test('renders the dashboard heading', () => {
    render(<SuggestiveEvaluationDashboard />);
    expect(screen.getByText('Evaluation Scheduler')).toBeInTheDocument();
  });

  test('renders SuggestedEvaluation title inside dashboard', () => {
    render(<SuggestiveEvaluationDashboard />);
    expect(screen.getByText(/Suggested Evaluation Windows/i)).toBeInTheDocument(); // FIXED
  });

  test('renders all suggested evaluation weeks', () => {
    render(<SuggestiveEvaluationDashboard />);
    const expectedSuggestions = ['Week 2', 'Week 5', 'Week 8'];
    expectedSuggestions.forEach((week) => {
      expect(screen.getByText(week)).toBeInTheDocument();
    });
  });
});