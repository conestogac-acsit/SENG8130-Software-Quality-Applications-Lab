// src/Evaluation/SuggestedEvaluation/TimeSavedStats.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeSavedStats from './TimeSavedStats';
import { Evaluation } from '../EvaluationService';

describe('TimeSavedStats Component', () => {
  const createEval = (dateStr: string): Evaluation => ({
    title: 'Test Eval',
    dueDate: new Date(dateStr),
    type: 'Assignment',
    course: 'Course A',
    weight: 20,
    instructor: 'Prof X',
    campus: 'Main',
  });

  test('renders 0 hours saved when all weeks have ≤ 3 evaluations', () => {
    const evaluations: Evaluation[] = [
      createEval('2024-01-08'),
      createEval('2024-01-08'),
      createEval('2024-01-08'), // Week with 3 evaluations → 0 hours saved
      createEval('2024-01-15'), // New week
    ];

    render(<TimeSavedStats evaluations={evaluations} />);
    expect(screen.getByText(/Estimated Time Saved: 0 hours/i)).toBeInTheDocument();
  });

  test('renders correct hours when evaluations exceed threshold in a week', () => {
    const evaluations: Evaluation[] = [
      createEval('2024-01-08'),
      createEval('2024-01-08'),
      createEval('2024-01-08'),
      createEval('2024-01-08'), // 4 evals in a week = 1 over → 2 hours
    ];

    render(<TimeSavedStats evaluations={evaluations} />);
    expect(screen.getByText(/Estimated Time Saved: 2 hours/i)).toBeInTheDocument();
  });

  test('calculates time saved across multiple weeks correctly', () => {
    const evaluations: Evaluation[] = [
      // Week 1 (4 evals) → 2 hours
      createEval('2024-01-08'),
      createEval('2024-01-08'),
      createEval('2024-01-08'),
      createEval('2024-01-08'),

      // Week 2 (5 evals) → 4 hours
      createEval('2024-01-15'),
      createEval('2024-01-15'),
      createEval('2024-01-15'),
      createEval('2024-01-15'),
      createEval('2024-01-15'),

      // Week 3 (1 eval) → 0 hours
      createEval('2024-01-22'),
    ];

    render(<TimeSavedStats evaluations={evaluations} />);
    expect(screen.getByText(/Estimated Time Saved: 6 hours/i)).toBeInTheDocument();
  });

  test('renders correctly with no evaluations', () => {
    render(<TimeSavedStats evaluations={[]} />);
    expect(screen.getByText(/Estimated Time Saved: 0 hours/i)).toBeInTheDocument();
  });
});
