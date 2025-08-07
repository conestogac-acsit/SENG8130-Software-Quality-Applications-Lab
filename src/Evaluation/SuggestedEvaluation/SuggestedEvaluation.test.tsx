import React from 'react';
import SuggestedEvaluation from './SuggestedEvaluation';
import { Evaluation } from '../EvaluationService';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('SuggestedEvaluation Component', () => {
  const createEval = (title: string, dateStr: string): Evaluation => {
    return {
      title,
      dueDate: new Date(dateStr),
      type: 'Assignment',
      course: 'Test Course',
      weight: 20,
      instructor: 'John Doe',
      campus: 'Main',
    };
  };

  test('renders suggestions between high and low load weeks', () => {
    const mockEvaluations: Evaluation[] = [
      createEval('Eval 1', '2024-01-15'),
      createEval('Eval 2', '2024-01-15'),
      createEval('Eval 3', '2024-01-15'),
      createEval('Eval 4', '2024-03-04'),
    ];

    render(<SuggestedEvaluation evaluations={mockEvaluations} />);
    expect(screen.getByText(/Suggested Evaluation Window/i)).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent('Consider moving one evaluation');
  });

  test('renders fallback when no suggestions are available', () => {
    const evenEvaluations: Evaluation[] = [
      createEval('Eval 1', '2024-01-08'),
      createEval('Eval 2', '2024-01-15'),
      createEval('Eval 3', '2024-01-22'),
    ];

    render(<SuggestedEvaluation evaluations={evenEvaluations} />);
    expect(screen.getByText(/No suggestions available/i)).toBeInTheDocument();
  });

  test('handles multiple high load weeks', () => {
    const mockEvaluations: Evaluation[] = [
      createEval('Eval 1', '2024-01-15'),
      createEval('Eval 2', '2024-01-15'),
      createEval('Eval 3', '2024-01-15'),
      createEval('Eval 4', '2024-01-15'),
      createEval('Eval 5', '2024-02-12'),
    ];

    render(<SuggestedEvaluation evaluations={mockEvaluations} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThanOrEqual(1);
  });

  test('handles multiple low load weeks', () => {
    const mockEvaluations: Evaluation[] = [
      createEval('Eval 1', '2024-01-15'),
      createEval('Eval 2', '2024-01-15'),
      createEval('Eval 3', '2024-01-15'),
      createEval('Eval 4', '2024-03-11'),
      createEval('Eval 5', '2024-03-18'),
    ];

    render(<SuggestedEvaluation evaluations={mockEvaluations} />);
    expect(screen.getByText(/Consider moving one evaluation/i)).toBeInTheDocument();
  });

  test('handles multiple high and low weeks', () => {
    const mockEvaluations: Evaluation[] = [
      createEval('Eval 1', '2024-01-15'),
      createEval('Eval 2', '2024-01-15'),
      createEval('Eval 3', '2024-01-15'),
      createEval('Eval 4', '2024-01-15'),
      createEval('Eval 5', '2024-02-05'),
      createEval('Eval 6', '2024-02-05'),
      createEval('Eval 7', '2024-02-05'),
      createEval('Eval 8', '2024-02-05'),
      createEval('Eval 9', '2024-03-18'),
      createEval('Eval 10', '2024-04-01'),
    ];

    render(<SuggestedEvaluation evaluations={mockEvaluations} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  test('renders TimeSavedStats component', () => {
  const mockEvaluations: Evaluation[] = [
    createEval('Eval 1', '2024-01-15'),
    createEval('Eval 2', '2024-01-15'),
    createEval('Eval 3', '2024-01-15'),
    createEval('Eval 4', '2024-02-26'),
  ];

  render(<SuggestedEvaluation evaluations={mockEvaluations} />);
  expect(
    screen.getByText((content) => content.includes('Estimated Time Saved'))
  ).toBeInTheDocument();
});
});
