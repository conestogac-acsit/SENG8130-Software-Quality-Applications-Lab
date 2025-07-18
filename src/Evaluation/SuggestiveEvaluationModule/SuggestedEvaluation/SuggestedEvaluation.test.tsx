import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuggestedEvaluation, { formatWeekRange } from './SuggestedEvaluation';
import { Evaluation } from '../../EvaluationService/EvaluationService';

describe('SuggestedEvaluation', () => {
  const mockEvaluations: Evaluation[] = [
    {
      course: 'Math',
      title: 'Quiz 1',
      type: 'Quiz',
      weight: 10,
      dueDate: new Date('2025-09-02'), // Week 36
      instructor: 'Prof A',
      campus: 'Main',
    },
    {
      course: 'Science',
      title: 'Assignment 1',
      type: 'Assignment',
      weight: 20,
      dueDate: new Date('2025-09-03'), // Week 36
      instructor: 'Prof B',
      campus: 'Main',
    },
    {
      course: 'History',
      title: 'Midterm',
      type: 'Mid Exam',
      weight: 30,
      dueDate: new Date('2025-09-04'), // Week 36
      instructor: 'Prof C',
      campus: 'Main',
    },
    {
      course: 'English',
      title: 'Project',
      type: 'Project',
      weight: 25,
      dueDate: new Date('2025-09-23'), // Week 39
      instructor: 'Prof D',
      campus: 'Main',
    },
  ];

  test('renders suggestions for high and low load weeks', () => {
    render(<SuggestedEvaluation evaluations={mockEvaluations} />);
    expect(screen.getByText(/📅 Suggested Evaluation Window/)).toBeInTheDocument();
    expect(screen.getByText(/Consider moving one evaluation/)).toBeInTheDocument();
  });

  test('shows fallback when no evaluations', () => {
    render(<SuggestedEvaluation evaluations={[]} />);
    expect(screen.getByText(/No suggestions available/)).toBeInTheDocument();
  });
});

describe('formatWeekRange', () => {
  test('formats correct range', () => {
    const input = new Date('2025-07-18'); // Friday
    const formatted = formatWeekRange(input);
    expect(formatted).toBe('Jul 14 – Jul 20');
  });
});
