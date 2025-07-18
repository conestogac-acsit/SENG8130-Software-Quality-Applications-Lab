import {
  setWeeklyThreshold,
  getWeeklyThreshold,
  shouldDisplayAlerts,
  getAlertSummary
} from './AlertUtils';

import type { Evaluation } from '../../Evaluation/EvaluationService';

const makeEval = (dueDate: Date, instructor = 'Instructor A'): Evaluation => ({
  course: 'Course 1',
  title: 'Test Eval',
  type: 'Quiz',
  weight: 10,
  dueDate,
  instructor,
  campus: 'Main'
});

describe('AlertUtils', () => {
  beforeEach(() => {
    setWeeklyThreshold(2);
  });

  describe('setWeeklyThreshold and getWeeklyThreshold', () => {
    it('sets and gets threshold correctly', () => {
      setWeeklyThreshold(5);
      expect(getWeeklyThreshold()).toBe(5);
    });

    it('throws if threshold < 1', () => {
      expect(() => setWeeklyThreshold(0)).toThrow("Threshold must be ≥ 1");
    });
  });

  describe('shouldDisplayAlerts', () => {
    it('returns false when no evaluations', () => {
      expect(shouldDisplayAlerts([])).toBe(false);
    });

    it('returns false when evaluations do not exceed threshold', () => {
      const evals = [
        makeEval(new Date('2025-07-01')),
        makeEval(new Date('2025-07-02'))
      ];
      expect(shouldDisplayAlerts(evals)).toBe(false);
    });

    it('returns true when evaluations exceed threshold for a week', () => {
      const evals = [
        makeEval(new Date('2025-07-01')),
        makeEval(new Date('2025-07-02')),
        makeEval(new Date('2025-07-03')),
      ];
      expect(shouldDisplayAlerts(evals)).toBe(true);
    });
  });

  describe('getAlertSummary', () => {
    it('returns no-overflow message if none exceed threshold', () => {
      const evals = [
        makeEval(new Date('2025-07-01')),
        makeEval(new Date('2025-07-02')),
      ];
      expect(getAlertSummary(evals, 3)).toContain('No weeks exceed');
    });

    it('returns summary for weeks that exceed threshold', () => {
      const evals = [
        makeEval(new Date('2025-07-01')),
        makeEval(new Date('2025-07-02')),
        makeEval(new Date('2025-07-03')),
      ];
      const summary = getAlertSummary(evals, 2);
      expect(summary).toContain('Overloaded Weeks:');
      expect(summary).toMatch(/Week \d+: 3 evaluations/);
    });

    it('throws on negative threshold', () => {
      const evals = [makeEval(new Date('2025-07-01'))];
      expect(() => getAlertSummary(evals, -1)).toThrow('Threshold cannot be negative');
    });

    it('throws on invalid dueDate', () => {
      const badEval = {
        course: 'X',
        title: 'Bad Eval',
        type: 'Quiz',
        weight: 10,
        dueDate: new Date('invalid'),
        instructor: 'I',
        campus: 'Main'
      };
      expect(() => getAlertSummary([badEval as Evaluation], 2)).toThrow('Invalid dueDate');
    });
  });
});