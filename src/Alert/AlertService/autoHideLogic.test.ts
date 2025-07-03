import { shouldDisplayAlerts } from './autoHideLogic';
import { setWeeklyThreshold } from '../alertThresholdService';
import { Evaluation } from '../../Evaluation/EvaluationService';

describe('shouldDisplayAlerts', () => {
  beforeEach(() => {
    setWeeklyThreshold(2);
  });

  const evals: Evaluation[] = [
    { course: 'A', title: '1', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-08'), instructor: '', campus: '' },
    { course: 'B', title: '2', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-09'), instructor: '', campus: '' },
    { course: 'C', title: '3', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-10'), instructor: '', campus: '' }
  ];

  it('should return true if alerts should be displayed', () => {
    expect(shouldDisplayAlerts(evals)).toBe(true);
  });

  it('should return false if no alerts are needed', () => {
    const belowThreshold: Evaluation[] = evals.slice(0, 2);
    expect(shouldDisplayAlerts(belowThreshold)).toBe(false);
  });
});
