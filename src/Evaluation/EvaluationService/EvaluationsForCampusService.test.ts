import type { Evaluation } from './EvaluationService';
import { getEvaluationsForCampus, Campus } from './EvaluationsForCampusService';

describe('getEvaluationsForCampus', () => {
  const evaluations: Evaluation[] = [
    {
      course: 'Math',
      title: 'Quiz 1',
      type: 'Quiz',
      weight: 10,
      dueDate: new Date(),
      instructor: 'John',
      campus: Campus.Milton,
    },
    {
      course: 'Science',
      title: 'Midterm',
      type: 'Mid Exam',
      weight: 30,
      dueDate: new Date(),
      instructor: 'Jane',
      campus: Campus.Waterloo,
    },
    {
      course: 'History',
      title: 'Assignment',
      type: 'Assignment',
      weight: 20,
      dueDate: new Date(),
      instructor: 'John',
      campus: Campus.Milton,
    },
  ];

  it('should return evaluations for a valid campus', () => {
    const result = getEvaluationsForCampus(evaluations, Campus.Milton);
    expect(result.length).toBe(2);
    expect(result.every(ev => ev.campus === Campus.Milton)).toBe(true);
  });

  it('should return an empty array if no evaluations match the campus', () => {
    const result = getEvaluationsForCampus(evaluations, Campus.Waterloo);
    expect(result.length).toBe(1);
    expect(result[0].campus).toBe(Campus.Waterloo);
  });
});
