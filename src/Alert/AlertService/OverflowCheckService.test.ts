import { getOverflowWeeks } from './OverflowCheckService';
import { Evaluation } from '../../Evaluation/EvaluationService';

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
    const baseDate = new Date('2025-03-10');
    const evaluations: Evaluation[] = Array.from({ length: 6 }, (_, i) =>
      createEvaluation({ dueDate: new Date(baseDate.getTime() + i * 1000) })
    );

    const result = getOverflowWeeks(evaluations);

    expect(result.size).toBe(1);
    const [week] = Array.from(result.keys());
    expect(result.get(week)?.length).toBe(6);
  });
});