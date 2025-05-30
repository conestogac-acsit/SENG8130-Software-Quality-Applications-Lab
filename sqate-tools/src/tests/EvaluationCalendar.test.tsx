import React from 'react';
import { render } from '@testing-library/react';
import EvaluationCalendar from '../components/EvaluationCalendar';

describe('EvaluationCalendar Component', () => {
  const mockEvents = [
    {
      title: 'Midterm Evaluation',
      start: new Date(2024, 4, 29, 10, 0),
      end: new Date(2024, 4, 29, 11, 0),
    }
  ];

  const mockDate = new Date(2024, 4, 29);
  const mockOnNavigate = jest.fn();
  const mockOnView = jest.fn();

  it('renders without crashing', () => {
    const { getByText } = render(
      <EvaluationCalendar
        events={mockEvents}
        date={mockDate}
        onNavigate={mockOnNavigate}
        view={'month'}
        onView={mockOnView}
      />
    );

    expect(getByText('Midterm Evaluation')).toBeInTheDocument();
  });

  it('renders at least one event if passed', () => {
    const { container } = render(
      <EvaluationCalendar
        events={mockEvents}
        date={mockDate}
        onNavigate={mockOnNavigate}
        view={'month'}
        onView={mockOnView}
      />
    );

    const eventCells = container.querySelectorAll('.rbc-event');
    expect(eventCells.length).toBeGreaterThan(0);
  });
});
