import { shouldDisplayAlerts } from './autoHideLogic';
import type { Evaluation } from '../../Evaluation/EvaluationService';

const weeklyThreshold = 2; 

describe('shouldDisplayAlerts', () => {
  const evals: Evaluation[] = [
    { course: 'A', title: '1', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-08'), instructor: '', campus: '' },
    { course: 'B', title: '2', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-09'), instructor: '', campus: '' },
    { course: 'C', title: '3', type: 'Quiz', weight: 10, dueDate: new Date('2025-09-10'), instructor: '', campus: '' }
  ];

  it('should return true if alerts should be displayed', () => {
    expect(shouldDisplayAlerts(evals)).toBe(true);
  });

  it('should return false if no alerts are needed', () => {
    const belowThreshold: Evaluation[] = evals.slice(0, weeklyThreshold);
    expect(shouldDisplayAlerts(belowThreshold)).toBe(false);
  });
});
