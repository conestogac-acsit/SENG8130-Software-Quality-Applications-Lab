import React from 'react';
import { render, screen } from '@testing-library/react';
import SuggestedEvaluation from './SuggestedEvaluation';
import { Evaluation } from '../../EvaluationService/EvaluationService';

const mockEvaluations: Evaluation[] = [
  {
    course: 'ENG101',
    title: 'Essay 1',
    type: 'Assignment',
    weight: 15,
    dueDate: new Date('2025-09-01'), 
    instructor: 'Dr. A',
    campus: 'Main',
  },
  {
    course: 'ENG101',
    title: 'Essay 2',
    type: 'Assignment',
    weight: 15,
    dueDate: new Date('2025-09-01'), 
    instructor: 'Dr. A',
    campus: 'Main',
  },
  {
    course: 'ENG101',
    title: 'Essay 3',
    type: 'Assignment',
    weight: 15,
    dueDate: new Date('2025-09-01'), 
    instructor: 'Dr. A',
    campus: 'Main',
  },
  {
    course: 'BIO101',
    title: 'Quiz',
    type: 'Quiz',
    weight: 5,
    dueDate: new Date('2025-09-22'), 
    instructor: 'Dr. B',
    campus: 'South',
  },
];

describe('SuggestedEvaluation', () => {
  test('renders suggestions based on high and low week loads', () => {
    render(<SuggestedEvaluation evaluations={mockEvaluations} />);

    expect(
      screen.getByRole('heading', { name: /suggested evaluation window/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Consider moving one evaluation from/i)
    ).toBeInTheDocument();
  });

  test('shows "No suggestions available" if no evaluations', () => {
    render(<SuggestedEvaluation evaluations={[]} />);
    expect(screen.getByText(/No suggestions available/i)).toBeInTheDocument();
  });
});
