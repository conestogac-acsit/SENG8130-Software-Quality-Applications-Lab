import React from 'react';
import { render, screen } from '@testing-library/react';
import EvaluationTypeBreakdown from './EvaluationTypeBreakdown';
import { EvaluationType, Evaluation } from '../EvaluationService';

const createEval = (type: EvaluationType): Evaluation => ({
  course: 'Test Course',
  title: 'Test Title',
  type: type,
  weight: 10,
  dueDate: new Date(),
  instructor: 'X',
  campus: 'Main',
});

describe('EvaluationTypeBreakdown component', () => {
  const typeCounts: Record<EvaluationType, number> = {
    Assignment: 1,
    'Mid Exam': 0,
    Quiz: 2,
    Project: 0,
    'Practical Lab': 0,
    'Final Exam': 1,
  };

  it('should render only types with count > 0', () => {
    render(<EvaluationTypeBreakdown typeCounts={typeCounts} />);

    expect(screen.getByText('Assignment: 1')).toBeInTheDocument();
    expect(screen.getByText('Quiz: 2')).toBeInTheDocument();
    expect(screen.getByText('Final Exam: 1')).toBeInTheDocument();

    expect(screen.queryByText(/Mid Exam/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Project/)).not.toBeInTheDocument();
  });

  it('should render correct color class for each type', () => {
    const { container } = render(<EvaluationTypeBreakdown typeCounts={typeCounts} />);

    expect(container.querySelector('.bg-blue-500')).toBeTruthy(); // Assignment
    expect(container.querySelector('.bg-green-500')).toBeTruthy(); // Quiz
    expect(container.querySelector('.bg-red-500')).toBeTruthy(); // Final Exam
  });
});
