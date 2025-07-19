import React from 'react';
import { render, screen } from '@testing-library/react';
import EvaluationPage from './EvaluationPage';

const testEvaluations = [
  {
    course: 'SQA 101',
    title: 'Midterm Exam',
    type: 'Mid Exam',
    weight: 30,
    dueDate: new Date().toISOString(),
    instructor: 'Prof. Smith',
    campus: 'Main Campus',
  }
];

describe('EvaluationPage', () => {
  beforeEach(() => {
    localStorage.setItem('evaluations', JSON.stringify(testEvaluations));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders ThresholdAlertUI and CalendarView when evaluations exist', () => {
    render(<EvaluationPage />);

    expect(screen.getByText(/Instructors with Submissions/i)).toBeInTheDocument();
    expect(screen.getByText(/Evaluation List/i)).toBeInTheDocument();
  });

  it('renders no evaluations message when no evaluations in storage', () => {
    localStorage.clear();
    render(<EvaluationPage />);

    expect(screen.getByText(/No evaluations scheduled/i)).toBeInTheDocument();
  });
});
