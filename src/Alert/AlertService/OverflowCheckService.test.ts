import { getOverflowWeeks } from './OverflowCheckService';
import { Evaluation } from '../../Evaluation/EvaluationService';
import { setWeeklyThreshold } from './alertThresholdService';

function createEvaluation(overrides: Partial<Evaluation>): Evaluation {
  return {
    course: 'CS101',
    title: 'Assignment 1',
    type: 'Assignment',
    weight: 10,
    dueDate: new Date(),
    instructor: 'John Doe',
    campus: 'Main',
    ...overrides,
  };
}

describe('getOverflowWeeks - Pure Tests', () => {
  it('returns correct overflow week when threshold is exceeded', () => {
    setWeeklyThreshold(5);
    const baseDate = new Date('2025-03-10');
    const evaluations: Evaluation[] = Array.from({ length: 6 }, (_, i) =>
      createEvaluation({ dueDate: new Date(baseDate.getTime() + i * 1000) })
    );

    const result = getOverflowWeeks(evaluations);

    expect(result.size).toBe(1);
    const [week] = Array.from(result.keys());
    expect(result.get(week)?.length).toBe(6);
  });

  it('returns empty map when all weeks are under the threshold', () => {
    setWeeklyThreshold(5);
    const evaluations: Evaluation[] = [
      createEvaluation({ dueDate: new Date('2025-09-08') }),
      createEvaluation({ dueDate: new Date('2025-09-08') }),
      createEvaluation({ dueDate: new Date('2025-09-08') }),
    ];

    const result = getOverflowWeeks(evaluations);
    expect(result.size).toBe(0);
  });

  it('returns empty map when given an empty evaluation list', () => {
    setWeeklyThreshold(5);
    const evaluations: Evaluation[] = [];
    const result = getOverflowWeeks(evaluations);

    expect(result).toEqual(new Map());
  });

  it('throws error when evaluation has invalid dueDate', () => {
    setWeeklyThreshold(5);
    const evaluations: Evaluation[] = [
      {
        course: 'Test Course',
        title: 'Project X',
        type: 'Project',
        weight: 20,
        dueDate: new Date('invalid-date'),
        instructor: 'Prof Y',
        campus: 'Main',
      }
    ];

    expect(() => getOverflowWeeks(evaluations)).toThrow('Invalid date in evaluation: Project X');
  });
});