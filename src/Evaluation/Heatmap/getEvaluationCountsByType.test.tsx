import { getEvaluationCountsByType } from './getEvaluationCountsByType';
import { Evaluation, EvaluationType } from '../EvaluationService';

describe('getEvaluationCountsByType', () => {
  const baseEvaluation = {
    course: 'CS101',
    title: 'Sample',
    weight: 10,
    dueDate: new Date('2025-01-01'),
    instructor: 'Dr. Smith',
    campus: 'Waterloo',
  };

  it('should return 0 for all types when evaluations is empty', () => {
    const evaluations: Evaluation[] = [];
    const result = getEvaluationCountsByType(evaluations);

    expect(result).toEqual({
      Assignment: 0,
      'Mid Exam': 0,
      Quiz: 0,
      Project: 0,
      'Practical Lab': 0,
      'Final Exam': 0,
    });
  });

  it('should count one of each evaluation type correctly', () => {
    const evaluations: Evaluation[] = [
      { ...baseEvaluation, type: 'Assignment' },
      { ...baseEvaluation, type: 'Mid Exam' },
      { ...baseEvaluation, type: 'Quiz' },
      { ...baseEvaluation, type: 'Project' },
      { ...baseEvaluation, type: 'Practical Lab' },
      { ...baseEvaluation, type: 'Final Exam' },
    ];

    const result = getEvaluationCountsByType(evaluations);

    expect(result).toEqual({
      Assignment: 1,
      'Mid Exam': 1,
      Quiz: 1,
      Project: 1,
      'Practical Lab': 1,
      'Final Exam': 1,
    });
  });

  it('should correctly count repeated types', () => {
    const evaluations: Evaluation[] = [
      { ...baseEvaluation, type: 'Assignment' },
      { ...baseEvaluation, type: 'Assignment' },
      { ...baseEvaluation, type: 'Quiz' },
    ];

    const result = getEvaluationCountsByType(evaluations);

    expect(result).toEqual({
      Assignment: 2,
      'Mid Exam': 0,
      Quiz: 1,
      Project: 0,
      'Practical Lab': 0,
      'Final Exam': 0,
    });
  });
});
