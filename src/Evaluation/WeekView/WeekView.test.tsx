import React from 'react';
import { render, screen } from '@testing-library/react';
import WeekView from './WeekView';
import { Evaluation } from '../../EvaluationService';

describe('WeekView', () => {
  const year = 2025;
  const month = 6;

const createEval = (dateStr: string): Evaluation => ({
    course: 'Test Course',
    title: 'Test Title',
    type: 'Quiz',
    weight: 10,
    dueDate: new Date(dateStr),
    instructor: 'X',
    campus: 'Main',
  });

  const mockEvaluations: Evaluation[] = [
    createEval('2025-06-30'),
    createEval('2025-07-01'),
    createEval('2025-07-03'),
    createEval('2025-07-10'),
    createEval('2025-07-15'),
    createEval('2025-07-24'),
    createEval('2025-07-31'),
    createEval('2025-08-01'),
  ];

  it('renders the correct number of week blocks for July 2025', () => {
    render(<WeekView year={year} month={month} evaluations={[]} />);

    const weekLabels = screen.getAllByText(/ - /); // week label like "7/1/2025 - 7/7/2025"
    expect(weekLabels.length).toBe(5); // July 2025 spans 5 full weeks
  });

  it('displays correct evaluation counts in each week', () => {
    render(<WeekView year={year} month={month} evaluations={mockEvaluations} />);
    const countElements = screen.getAllByText(/evaluations$/);
    const counts = countElements.map(el => el.textContent?.trim());

    expect(counts).toContain('3 evaluations'); // Week 1: 6/30–7/6
    expect(counts).toContain('1 evaluations'); // Week 2: 7/7–7/13
    expect(counts).toContain('1 evaluations'); // Week 3: 7/14–7/20
    expect(counts).toContain('1 evaluations'); // Week 4: 7/21–7/27
    expect(counts).toContain('2 evaluations'); // Week 5: 7/28–8/3
  });

  it('applies correct classes for week cards', () => {
    const { container } = render(<WeekView year={year} month={month} evaluations={mockEvaluations} />);
    const cards = container.querySelectorAll('div.shadow-sm');

    const nonEmpty = Array.from(cards).find(c => c.textContent?.includes('3 evaluations'));
    const empty = Array.from(cards).find(c => c.textContent?.includes('0 evaluations'));

    expect(nonEmpty).toHaveClass('text-white');
    if (empty) {
      expect(empty).toHaveClass('text-gray-500');
    }
  });
});