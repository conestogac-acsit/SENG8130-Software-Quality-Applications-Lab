import { setWeeklyThreshold, getWeeklyThreshold, shouldDisplayAlerts } from './alertThresholdService';
import { Evaluation } from '../../Evaluation/EvaluationService';

describe('alertThresholdService', () => {
  const evals: Evaluation[] = [
    { course: 'A', title: 'Eval 1', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-08'), instructor: 'Inst A', campus: 'Main' },
    { course: 'B', title: 'Eval 2', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-08'), instructor: 'Inst B', campus: 'Main' },
    { course: 'C', title: 'Eval 3', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-08'), instructor: 'Inst C', campus: 'Main' }
  ];

  it('should set and get threshold correctly', () => {
    setWeeklyThreshold(5);
    expect(getWeeklyThreshold()).toBe(5);
  });

  it('should throw error if threshold is set below 1', () => {
    expect(() => setWeeklyThreshold(0)).toThrow('Threshold must be ≥ 1');
  });

  it('should return true if evaluations exceed threshold', () => {
    setWeeklyThreshold(2);  
    expect(shouldDisplayAlerts(evals)).toBe(true);
  });

  it('should return false if evaluations are at or below threshold', () => {
    setWeeklyThreshold(2);  
    const belowThresholdEvals: Evaluation[] = evals.slice(0, 2); 
    expect(shouldDisplayAlerts(belowThresholdEvals)).toBe(false);
  });
});
