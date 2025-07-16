import { getEvaluationsForCampus } from './EvaluationsForCampusService';
import type { Evaluation } from './EvaluationService';

describe('getEvaluationsForCampus', () => {
  const evaluations: Evaluation[] = [
    { course: 'Math', title: 'Quiz 1', type: 'Quiz', weight: 10, dueDate: new Date(), instructor: 'John', campus: 'Main' },
    { course: 'Science', title: 'Midterm', type: 'Mid Exam', weight: 30, dueDate: new Date(), instructor: 'Jane', campus: 'North' },
    { course: 'History', title: 'Assignment', type: 'Assignment', weight: 20, dueDate: new Date(), instructor: 'John', campus: 'Main' }
  ];

  it('should return evaluations for a valid campus', () => {
    const result = getEvaluationsForCampus(evaluations, 'Main');
    expect(result.length).toBe(2);
    expect(result.every(ev => ev.campus === 'Main')).toBe(true);
  });

  it('should return an empty array if no evaluations match the campus', () => {
    const result = getEvaluationsForCampus(evaluations, 'South');
    expect(result).toEqual([]);
  });

  it('should throw an error if campus is an empty string', () => {
    expect(() => getEvaluationsForCampus(evaluations, '')).toThrow('Invalid campus');
  });

  it('should throw an error if campus is not a string', () => {
    expect(() => getEvaluationsForCampus(evaluations, null)).toThrow('Invalid campus');
  });
});