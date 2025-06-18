import { getEvaluationsForDate, EvaluationRow } from './EvaluationsForDateService';

describe('getEvaluationsForDate', () => {
  it('should return matching evaluations for given date', () => {
    const input: EvaluationRow[] = [
      {
        evaluationId: '1',
        courseCode: 'PROG8020',
        evaluationType: 'Assignment',
        dueDay: new Date('2025-06-18')
      },
      {
        evaluationId: '2',
        courseCode: 'PROG8020',
        evaluationType: 'Quiz',
        dueDay: new Date('2025-06-19')
      }
    ];

    const result = getEvaluationsForDate(input, new Date('2025-06-18'));
    expect(result.length).toBe(1);
    expect(result[0].evaluationId).toBe('1');
  });

  it('should return empty array when no dates match', () => {
    const input: EvaluationRow[] = [
      {
        evaluationId: '1',
        courseCode: 'PROG8020',
        evaluationType: 'Assignment',
        dueDay: new Date('2025-06-19')
      }
    ];

    const result = getEvaluationsForDate(input, new Date('2025-06-18'));
    expect(result).toEqual([]);
  });

  it('should skip entries with undefined dueDay', () => {
    const input: EvaluationRow[] = [
      {
        evaluationId: '1',
        courseCode: 'PROG8020',
        evaluationType: 'Assignment',
        dueDay: undefined
      },
      {
        evaluationId: '2',
        courseCode: 'PROG8020',
        evaluationType: 'Quiz',
        dueDay: new Date('2025-06-18')
      }
    ];

    const result = getEvaluationsForDate(input, new Date('2025-06-18'));
    expect(result.length).toBe(1);
    expect(result[0].evaluationId).toBe('2');
  });

  it('should throw error when an invalid Date object is passed', () => {
    const input: EvaluationRow[] = [
      {
        evaluationId: '1',
        courseCode: 'PROG8020',
        evaluationType: 'Assignment',
        dueDay: new Date('2025-06-18')
      }
    ];

    const invalidDate = new Date('invalid-date'); 
    expect(() => getEvaluationsForDate(input, invalidDate)).toThrow('Invalid date object');
  });
});