import React from 'react';
import { render, screen } from '@testing-library/react';
import SuggestiveEvaluationModule from './SuggestiveEvaluationModule';
import { Evaluation } from '../EvaluationService/EvaluationService';

jest.mock('./SuggestedEvaluation/SuggestedEvaluation', () => ({
  __esModule: true,
  default: ({ evaluations }: { evaluations: Evaluation[] }) => (
    <div data-testid="mock-suggested-eval">
      Rendered with {evaluations.length} evaluations
    </div>
  )
}));

const dummyEvals: Evaluation[] = [
  {
    course: 'HIS201',
    title: 'Paper',
    type: 'Project',
    weight: 20,
    dueDate: new Date('2025-09-15'),
    instructor: 'Dr. Green',
    campus: 'West',
  }
];

describe('SuggestiveEvaluationModule', () => {
  test('renders wrapper and passes evaluations to child', () => {
    render(<SuggestiveEvaluationModule evaluations={dummyEvals} />);

    expect(screen.getByText(/Suggestive Evaluation Insights/i)).toBeInTheDocument();
    expect(screen.getByTestId('mock-suggested-eval')).toBeInTheDocument();
    expect(screen.getByText(/Rendered with 1 evaluations/i)).toBeInTheDocument();
  });
});
