import { getEvaluationsByDayMap } from './getEvaluationsByDayMap';
import type { Evaluation } from '../../EvaluationService';

describe('getEvaluationsByDayMap', () => {
  const evaluations: Evaluation[] = [
    {
      course: 'SENG8130',
      title: 'Software Quality Applications Lab',
      type: 'Assignment',
      weight: 10,
      dueDate: new Date('2025-06-17'),
      instructor: 'Dr. Lee',
      campus: 'Waterloo',
    },
    {
      course: 'SENG8130',
      title: 'Software Quality Applications Lab',
      type: 'Quiz',
      weight: 5,
      dueDate: new Date('2025-06-18'),
      instructor: 'Dr. Lee',
      campus: 'Doon',
    },
    {
      course: 'SENG8130',
      title: 'Software Quality Applications Lab',
      type: 'Mid Exam',
      weight: 30,
      dueDate: new Date('2025-06-17'),
      instructor: 'Dr. Lee',
      campus: 'Waterloo',
    },
    {
      course: 'SENG8130',
      title: 'Software Quality Applications Lab',
      type: 'Project',
      weight: 40,
      dueDate: new Date('2025-06-20'),
      instructor: 'Dr. Lee',
      campus: 'Cambridge',
    },
    {
      course: 'SENG8071',
      title: 'Database Testing',
      type: 'Assignment',
      weight: 10,
      dueDate: new Date('2025-07-01'),
      instructor: 'Dr. Edwards',
      campus: 'Waterloo',
    },
  ];

  it('groups evaluations correctly by date string', () => {
    const start = new Date('2025-06-17');
    const end = new Date('2025-06-20');

    const result = getEvaluationsByDayMap(evaluations, start, end);

    expect(Object.keys(result)).toEqual([
      '2025-06-17',
      '2025-06-18',
      '2025-06-20',
    ]);

    expect(result['2025-06-17']).toHaveLength(2);
    expect(result['2025-06-18']).toHaveLength(1);
    expect(result['2025-06-20']).toHaveLength(1);
  });

  it('returns empty object if no evaluations are in range', () => {
    const start = new Date('2025-06-01');
    const end = new Date('2025-06-05');

    const result = getEvaluationsByDayMap(evaluations, start, end);

    expect(result).toEqual({});
  });

  it('ignores evaluations before startDate', () => {
    const start = new Date('2025-06-18');
    const end = new Date('2025-06-20');

    const result = getEvaluationsByDayMap(evaluations, start, end);

    expect(result['2025-06-17']).toBeUndefined();
    expect(result['2025-06-18']).toHaveLength(1);
    expect(result['2025-06-20']).toHaveLength(1);
  });

  it('ignores evaluations after endDate', () => {
    const start = new Date('2025-06-17');
    const end = new Date('2025-06-18');

    const result = getEvaluationsByDayMap(evaluations, start, end);

    expect(result['2025-06-20']).toBeUndefined();
    expect(result['2025-07-01']).toBeUndefined();
  });

  it('returns empty object if evaluation list is empty', () => {
    const start = new Date('2025-06-17');
    const end = new Date('2025-06-20');

    const result = getEvaluationsByDayMap([], start, end);
    expect(result).toEqual({});
  });

  it('works for a single day range', () => {
    const start = new Date('2025-06-18');
    const end = new Date('2025-06-18');

    const result = getEvaluationsByDayMap(evaluations, start, end);
    expect(Object.keys(result)).toEqual(['2025-06-18']);
    expect(result['2025-06-18']).toHaveLength(1);
  });

  it('formats dates consistently as YYYY-MM-DD keys', () => {
    const start = new Date('2025-06-17');
    const end = new Date('2025-06-20');

    const result = getEvaluationsByDayMap(evaluations, start, end);
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['2025-06-17', '2025-06-18', '2025-06-20'])
    );
    for (const key of Object.keys(result)) {
      expect(key).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
