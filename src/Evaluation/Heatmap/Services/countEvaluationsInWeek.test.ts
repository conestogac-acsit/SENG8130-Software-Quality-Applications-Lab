
import { countEvaluationsInWeek, shouldHighlightWeek } from './countEvaluationsInWeek';
import type { EvaluationRow } from './evaluation';

describe('countEvaluationsInWeek', () => {
  const data: EvaluationRow[] = [
    { evaluationId: '1', courseCode: 'ENG101', evaluationType: 'Quiz', dueDay: '2024-04-01' },
    { evaluationId: '2', courseCode: 'MATH202', evaluationType: 'Test', dueDay: '2024-04-02' },
    { evaluationId: '3', courseCode: 'SCI303', evaluationType: 'Assignment', dueDay: '2024-04-03' },
    { evaluationId: '4', courseCode: 'HIST404', evaluationType: 'Essay', dueDay: '2024-04-10' },
    { evaluationId: '5', courseCode: 'BIO505', evaluationType: 'Lab', dueDay: 'invalid-date' }
  ];

  const week = [
    new Date('2024-04-01'),
    new Date('2024-04-02'),
    new Date('2024-04-03'),
    new Date('2024-04-04'),
    new Date('2024-04-05'),
    new Date('2024-04-06'),
    new Date('2024-04-07'),
  ];

  it('should count evaluations with due dates in the week', () => {
    const result = countEvaluationsInWeek(data, week);
    expect(result).toBe(3);
  });

  it('should return 0 when no evaluations match the week', () => {
    const result = countEvaluationsInWeek(data, [new Date('2024-05-01')]);
    expect(result).toBe(0);
  });

  it('should ignore invalid dueDay values', () => {
    const result = countEvaluationsInWeek(data, week);
    expect(result).toBe(3);
  });

  it('should handle empty week array', () => {
    const result = countEvaluationsInWeek(data, []);
    expect(result).toBe(0);
  });

  it('should handle empty data array', () => {
    const result = countEvaluationsInWeek([], week);
    expect(result).toBe(0);
  });
});

describe('shouldHighlightWeek', () => {
  it('should return true if count is above threshold', () => {
    expect(shouldHighlightWeek(3)).toBe(true);
  });

  it('should return false if count is equal to threshold', () => {
    expect(shouldHighlightWeek(2)).toBe(false);
  });

  it('should return false if count is below threshold', () => {
    expect(shouldHighlightWeek(1)).toBe(false);
  });

  it('should support custom threshold', () => {
    expect(shouldHighlightWeek(5, 4)).toBe(true);
    expect(shouldHighlightWeek(4, 4)).toBe(false);
  });
});
