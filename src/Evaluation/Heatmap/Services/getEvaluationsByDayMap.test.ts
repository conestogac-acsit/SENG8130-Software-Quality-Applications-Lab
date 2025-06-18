
import { getEvaluationsByDayMap } from './getEvaluationsByDayMap';
import type { EvaluationRow } from './evaluation';

describe('getEvaluationsByDayMap', () => {
  const sampleData: EvaluationRow[] = [
    { evaluationId: '1', courseCode: 'CS101', evaluationType: 'Quiz', dueDay: '2024-04-10' },
    { evaluationId: '2', courseCode: 'CS102', evaluationType: 'Midterm', dueDay: '2024-04-10' },
    { evaluationId: '3', courseCode: 'CS103', evaluationType: 'Final', dueDay: '2024-04-11' },
    { evaluationId: '4', courseCode: 'CS104', evaluationType: 'Assignment', dueDay: '2024-04-12' },
    { evaluationId: '5', courseCode: 'CS105', evaluationType: 'Lab', dueDay: '2024-04-15' },
    { evaluationId: '6', courseCode: 'CS106', evaluationType: 'Test', dueDay: '2024-03-31' },
  ];

  const startDate = new Date('2024-04-10');
  const endDate = new Date('2024-04-15');

  it('should group evaluations by dueDay date string', () => {
    const map = getEvaluationsByDayMap(sampleData, startDate, endDate);
    expect(Object.keys(map)).toEqual(['2024-04-10', '2024-04-11', '2024-04-12', '2024-04-15']);
    expect(map['2024-04-10'].length).toBe(2);
    expect(map['2024-04-11'][0].evaluationId).toBe('3');
  });

  it('should not include evaluations outside date range', () => {
    const map = getEvaluationsByDayMap(sampleData, startDate, endDate);
    expect(map['2024-03-31']).toBeUndefined();
    expect(map['2024-04-16']).toBeUndefined();
  });

  it('should return empty object if no evaluations in range', () => {
    const result = getEvaluationsByDayMap(sampleData, new Date('2024-01-01'), new Date('2024-01-31'));
    expect(result).toEqual({});
  });

});
