import { getEvaluationsForDate } from './EvaluationsForDateService';

interface Moo {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay?: string;
}

describe('getEvaluationsForDate', () => {
  const data: Moo[] = [
    {
      evaluationId: 'eval-001',
      courseCode: 'MATH101',
      evaluationType: 'Midterm',
      dueDay: '2025-06-17T10:30:00Z',
    },
    {
      evaluationId: 'eval-002',
      courseCode: 'ENG102',
      evaluationType: 'Essay',
      dueDay: '2025-06-18T00:00:00Z',
    },
    {
      evaluationId: 'eval-003',
      courseCode: 'SCI103',
      evaluationType: 'Lab',
      dueDay: '2025-06-17T23:59:59Z',
    },
    {
      evaluationId: 'eval-004',
      courseCode: 'HIS104',
      evaluationType: 'Presentation',
      dueDay: undefined, 
    },
  ];

  it('should return evaluations matching the given date (YYYY-MM-DD)', () => {
    const result = getEvaluationsForDate(data, '2025-06-17');
    expect(result.length).toBe(2);
    expect(result.map(e => e.evaluationId)).toEqual(['eval-001', 'eval-003']);
  });

  it('should return an empty array when no evaluations match the date', () => {
    const result = getEvaluationsForDate(data, '2025-06-19');
    expect(result).toEqual([]);
  });

  it('should skip evaluations with undefined dueDay', () => {
    const result = getEvaluationsForDate(data, '2025-06-18');
    expect(result.length).toBe(1);
    expect(result[0].evaluationId).toBe('eval-002');
  });
});