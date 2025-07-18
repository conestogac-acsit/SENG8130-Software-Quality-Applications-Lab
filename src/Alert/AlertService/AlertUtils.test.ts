import {shouldDisplayAlerts} from './AlertUtils';
import type { Evaluation } from '../../Evaluation/EvaluationService';

const makeEval = (dueDate: Date, instructor = 'Instructor A'): Evaluation => ({
  course: 'Course 1',
  title: 'Test Eval',
  type: 'Quiz',
  dueDate,
  instructor,
});
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
  dueDate,
  instructor,
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