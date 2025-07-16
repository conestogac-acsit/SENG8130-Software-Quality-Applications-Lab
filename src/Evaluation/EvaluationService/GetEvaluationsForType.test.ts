import { getEvaluationsForType } from './GetEvaluationsForType';
import type { Evaluation } from './EvaluationService';

describe('GetEvaluationsForType', () => {
  const sampleData: Evaluation[] = [
    { course: 'Math', title: 'Quiz 1', type: 'Quiz', weight: 10, dueDate: new Date(), instructor: 'Alice', campus: 'Main' },
    { course: 'History', title: 'Assignment 1', type: 'Assignment', weight: 20, dueDate: new Date(), instructor: 'Bob', campus: 'West' },
    { course: 'Science', title: 'Quiz 2', type: 'Quiz', weight: 15, dueDate: new Date(), instructor: 'Charlie', campus: 'Main' },
  ];

  it('should return evaluations matching the specified type', () => {
    const result = GetEvaluationsForType(sampleData, 'Quiz');
    expect(result.length).toBe(2);
    expect(result.every(ev => ev.type === 'Quiz')).toBe(true);
  });

  it('should return an empty array if no evaluations match', () => {
    const result = GetEvaluationsForType(sampleData, 'Project');
    expect(result).toEqual([]);
  });

  it('should throw an error if type is invalid', () => {
    expect(() => GetEvaluationsForType(sampleData, '')).toThrow('Invalid type value');
    expect(() => GetEvaluationsForType(sampleData, null as any)).toThrow('Invalid type value');
    expect(() => GetEvaluationsForType(sampleData, undefined as any)).toThrow('Invalid type value');
  });
});