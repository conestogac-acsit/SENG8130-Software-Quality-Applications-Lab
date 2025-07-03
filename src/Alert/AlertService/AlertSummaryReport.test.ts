import { getAlertSummary } from './AlertSummaryReport';
import { Evaluation } from '../../Evaluation/EvaluationService';

describe('getAlertSummary - Pure Tests', () => {
  it('returns correct message when no evaluations exceed threshold', () => {
    const evaluations: Evaluation[] = [
      {
        course: 'Math',
        title: 'Quiz 1',
        type: 'Quiz',
        weight: 10,
        dueDate: new Date('2025-01-10'),
        instructor: 'Alice',
        campus: 'Main'
      },
      {
        course: 'Science',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 15,
        dueDate: new Date('2025-01-12'),
        instructor: 'Bob',
        campus: 'Main'
      }
    ];

    const threshold = 5;
    const summary = getAlertSummary(evaluations, threshold);

    expect(summary).toContain('No weeks exceed the evaluation threshold.');
  });
});