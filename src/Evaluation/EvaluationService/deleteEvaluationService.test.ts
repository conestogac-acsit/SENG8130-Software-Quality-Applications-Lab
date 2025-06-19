import { deleteEvaluation } from './deleteEvaluationService';
import type { Evaluation, IEvaluationService } from './EvaluationService';

describe('deleteEvaluation', () => {
  let mockService: IEvaluationService;
  let sampleEvaluations: Evaluation[];

  const targetEvaluation: Evaluation = {
    course: 'PROG101',
    title: 'Midterm Exam',
    type: 'Mid Exam',
    weight: 30,
    dueDate: new Date('2025-07-01'),
    instructor: 'Dr. Smith',
    campus: 'Main Campus'
  };

  beforeEach(() => {
    sampleEvaluations = [
      { ...targetEvaluation },
      {
        course: 'MATH201',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 10,
        dueDate: new Date('2025-06-15'),
        instructor: 'Prof. Jane',
        campus: 'City Campus'
      }
    ];

    mockService = {
      saveEvaluations: jest.fn(),
      loadEvaluations: jest.fn(() => sampleEvaluations)
    };
  });

  it('should delete the matching evaluation', () => {
    const updated = deleteEvaluation(sampleEvaluations, targetEvaluation, mockService);

    expect(updated.length).toBe(1);
    expect(updated[0].course).toBe('MATH201');
    expect(mockService.saveEvaluations).toHaveBeenCalledWith(updated);
  });

  it('should not delete any evaluation if none match', () => {
    const nonMatchingEvaluation: Evaluation = {
      ...targetEvaluation,
      course: 'DIFF999'
    };

    const updated = deleteEvaluation(sampleEvaluations, nonMatchingEvaluation, mockService);

    expect(updated.length).toBe(2);
    expect(mockService.saveEvaluations).toHaveBeenCalledWith(updated);
  });

  it('should compare dueDate correctly as Date objects', () => {
    const inputWithStringDate: Evaluation = {
      ...targetEvaluation,
      dueDate: '2025-07-01' as any
    };

    const updated = deleteEvaluation(sampleEvaluations, inputWithStringDate, mockService);

    expect(updated.length).toBe(1);
    expect(updated.find(ev => ev.course === 'PROG101')).toBeUndefined();
    expect(mockService.saveEvaluations).toHaveBeenCalledWith(updated);
  });
});