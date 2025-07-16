import React from 'react';
import { render, screen } from '@testing-library/react';
import WeekView from './WeekView';
import { Evaluation } from '../EvaluationService';

describe('WeekView', () => {
  const year = 2025;
  const month = 6;

  const createEval = (year: number, month: number, day: number): Evaluation => ({
    course: 'Test Course',
    title: 'Test Title',
    type: 'Quiz',
    weight: 10,
    dueDate: new Date(year, month, day, 0, 0, 0),
    instructor: 'X',
    campus: 'Main',
  });

  const mockEvaluations: Evaluation[] = [
    createEval(2025, 5 ,30),
    createEval(2025, 6 ,1),
    createEval(2025, 6 ,3),
    createEval(2025, 6 ,10),
    createEval(2025, 6 ,15),
    createEval(2025, 6 ,24),
    createEval(2025, 6 ,31),
    createEval(2025, 7 ,1),
  ];

  it('renders the correct number of week blocks for July 2025', () => {
    render(<WeekView year={year} month={month} evaluations={[]} />);

    const weekLabels = screen.getAllByText(/ - /);
    expect(weekLabels.length).toBe(5);
  });

  it('displays correct evaluation counts in each week', () => {
    render(<WeekView year={year} month={month} evaluations={mockEvaluations} />);
    const countElements = screen.getAllByText(/evaluations$/);
 
    const counts = countElements.map(el => el.textContent?.trim());
    expect(counts).toContain('3 evaluations');
    expect(counts).toContain('1 evaluations');
    expect(counts).toContain('1 evaluations');
    expect(counts).toContain('1 evaluations');
    expect(counts).toContain('2 evaluations');
  });
});
