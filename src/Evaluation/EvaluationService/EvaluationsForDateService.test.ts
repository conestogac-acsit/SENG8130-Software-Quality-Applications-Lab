import { getEvaluationsForDate } from './EvaluationsForDateService';
import type { Evaluation } from './EvaluationService';

describe('getEvaluationsForDate', () => {
  it('should return matching evaluations for given date', () => {
    const input: Evaluation[] = [
      {
        course: 'PROG8020',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 10,
        dueDate: new Date('2025-06-18'),
        instructor: 'Prof. A',
        campus: 'Main',
      },
      {
        course: 'PROG8020',
        title: 'Quiz 1',
        type: 'Quiz',
        weight: 5,
        dueDate: new Date('2025-06-19'),
        instructor: 'Prof. A',
        campus: 'Main',
      },
    ];

    const result = getEvaluationsForDate(input, new Date('2025-06-18'));
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Assignment 1');
  });

  it('should return empty array when no dates match', () => {
    const input: Evaluation[] = [
      {
        course: 'PROG8020',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 10,
        dueDate: new Date('2025-06-19'),
        instructor: 'Prof. A',
        campus: 'Main',
      },
    ];

    const result = getEvaluationsForDate(input, new Date('2025-06-18'));
    expect(result).toEqual([]);
  });

  it('should skip entries with undefined dueDate', () => {
    const input: Evaluation[] = [
      ({
        course: 'PROG8020',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 10,
        dueDate: undefined,
        instructor: 'Prof. A',
        campus: 'Main',
      } as unknown) as Evaluation,
      {
        course: 'PROG8020',
        title: 'Quiz 1',
        type: 'Quiz',
        weight: 5,
        dueDate: new Date('2025-06-18'),
        instructor: 'Prof. A',
        campus: 'Main',
      },
    ];

    const result = getEvaluationsForDate(input, new Date('2025-06-18'));
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Quiz 1');
  });

  it('should throw error when an invalid Date object is passed', () => {
    const input: Evaluation[] = [
      {
        course: 'PROG8020',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 10,
        dueDate: new Date('2025-06-18'),
        instructor: 'Prof. A',
        campus: 'Main',
      },
    ];

    const invalidDate = new Date('invalid-date');
    expect(() => getEvaluationsForDate(input, invalidDate)).toThrow('Invalid date object');
  });
});