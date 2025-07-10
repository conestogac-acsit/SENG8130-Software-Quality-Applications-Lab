import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthView from './MonthView';
import { Evaluation } from '../EvaluationService';

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

  it('renders 12 month blocks', () => {
    render(<MonthView year={CURRENT_YEAR} evaluations={[]} />);
    const monthBlocks = screen.getAllByText(/evaluations/);
    expect(monthBlocks).toHaveLength(12);
  });

  it('correctly displays counts for each month', () => {
    render(<MonthView year={CURRENT_YEAR} evaluations={mockEvaluations} />);
    const countElements = screen.getAllByText(/evaluations$/);
    const texts = countElements.map(el => el.textContent?.trim());

    expect(texts).toContain('2 evaluations'); // January
    expect(texts).toContain('1 evaluations'); // March
    expect(texts).toContain('0 evaluations'); // Other months
  });
});
