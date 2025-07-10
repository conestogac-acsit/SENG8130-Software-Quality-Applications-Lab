import { getAlertSummary } from '././AlertSummaryReport';
import { Evaluation } from '../../Evaluation/EvaluationService';

describe('getAlertSummary', () => {
  it('returns message when no evaluations exceed threshold', () => {
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

  it('identifies overloaded weeks correctly', () => {
    const evaluations: Evaluation[] = [];

    for (let i = 0; i < 12; i++) {
      evaluations.push({
        course: `Course ${i}`,
        title: `Test ${i}`,
        type: 'Assignment',
        weight: 5,
        dueDate: new Date('2025-02-01'),
        instructor: 'Prof',
        campus: 'Main'
      });
    }

    const threshold = 10;
    const summary = getAlertSummary(evaluations, threshold);

    expect(summary).toContain('Overloaded Weeks:');
    expect(summary).toMatch(/Week \d+: 12 evaluations/);
    expect(summary).toContain('(Threshold: 10)');
  });

  it('returns default message for empty evaluation list', () => {
    const summary = getAlertSummary([], 3);
    expect(summary).toContain('No weeks exceed the evaluation threshold.');
  });

  it('throws error for negative threshold', () => {
    const evaluations: Evaluation[] = [
      {
        course: 'Course X',
        title: 'Exam',
        type: 'Final Exam',
        weight: 50,
        dueDate: new Date(),
        instructor: 'Instructor X',
        campus: 'Main'
      }
    ];

    expect(() => getAlertSummary(evaluations, -5)).toThrow('Threshold cannot be negative');
  });

  it('throws error for invalid due date', () => {
    const evaluations: Evaluation[] = [
      {
        course: 'Course Y',
        title: 'Project',
        type: 'Project',
        weight: 20,
        dueDate: new Date('invalid-date'),
        instructor: 'Instructor Y',
        campus: 'Main'
      }
    ];

    expect(() => getAlertSummary(evaluations, 5)).toThrow('Invalid dueDate for evaluation: Project');
  });
});
