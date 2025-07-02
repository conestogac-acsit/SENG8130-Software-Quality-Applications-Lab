import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthView from './MonthView';
import { EvaluationService, Evaluation } from '../EvaluationService';


describe('MonthView', () => {
  const CURRENT_YEAR = new Date().getFullYear();

  const mockEvaluations: Evaluation[] = [
    {
      course: 'Math',
      title: 'Assignment',
      type: 'Assignment',
      weight: 10,
      dueDate: new Date(`${CURRENT_YEAR}-01-10`),
      instructor: 'A',
      campus: 'Main',
    },
    {
      course: 'Science',
      title: 'Quiz',
      type: 'Quiz',
      weight: 20,
      dueDate: new Date(`${CURRENT_YEAR}-03-15`),
      instructor: 'B',
      campus: 'North',
    },
    {
      course: 'History',
      title: 'Final',
      type: 'Final Exam',
      weight: 30,
      dueDate: new Date(`${CURRENT_YEAR}-01-20`),
      instructor: 'C',
      campus: 'South',
    },
  ];

  const fakeService: EvaluationService = {
    loadEvaluations: () => mockEvaluations,
  } as EvaluationService;

  it('renders 12 month blocks', () => {
    render(<MonthView service={fakeService} />);
    const monthBlocks = screen.getAllByText(/evaluations/);
    expect(monthBlocks).toHaveLength(12);
  });

  it('correctly displays counts for each month', () => {
    render(<MonthView service={fakeService} />);

    expect(screen.getByText('2 evaluations')).toBeInTheDocument();
    expect(screen.getByText('1 evaluations')).toBeInTheDocument();
    expect(screen.getAllByText('0 evaluations').length).toBe(10);
  });
});
