import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SuggestedEvaluation } from './SuggestedEvaluation';

describe('SuggestedEvaluation Component', () => {
  const sampleSuggestions = ['Week 2', 'Week 5', 'Week 8'];

  test('renders the title correctly', () => {
    render(<SuggestedEvaluation suggestions={sampleSuggestions} />);
    expect(screen.getByText('📝 Suggested Evaluation Windows')).toBeInTheDocument();
  });

  test('renders all suggestion items', () => {
    render(<SuggestedEvaluation suggestions={sampleSuggestions} />);
    sampleSuggestions.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('renders the correct number of list items', () => {
    render(<SuggestedEvaluation suggestions={sampleSuggestions} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(sampleSuggestions.length);
  });
});