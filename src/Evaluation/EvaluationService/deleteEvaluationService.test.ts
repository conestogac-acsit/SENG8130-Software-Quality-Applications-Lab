import { deleteEvaluation } from './deleteEvaluationService';
import type { Evaluation, IEvaluationService } from '.';

describe('deleteEvaluation', () => {
  let savedData: Evaluation[] | null;
  let sampleEvaluations: Evaluation[];
  let testService: IEvaluationService;

  const targetEvaluation: Evaluation = {
    evaluationId: 'EVAL001',
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
        evaluationId: 'EVAL002',
        course: 'MATH201',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 10,
        dueDate: new Date('2025-06-15'),
        instructor: 'Prof. Jane',
        campus: 'City Campus'
      }
    ] satisfies Evaluation[];

    savedData = null;

    testService = {
      saveEvaluations: (data: Evaluation[]) => {
        savedData = data;
      },
      loadEvaluations: () => sampleEvaluations
    };
  });

  it('should delete the matching evaluation', () => {
    const updated = deleteEvaluation(sampleEvaluations, targetEvaluation, testService);

    expect(updated.length).toBe(1);
    expect(updated[0].course).toBe('MATH201');
    expect(savedData).toEqual(updated);
  });

  it('should not delete any evaluation if none match', () => {
    const nonMatchingEvaluation: Evaluation = {
      ...targetEvaluation,
      evaluationId: 'EVAL003',
      course: 'DIFF999'
    };

    const updated = deleteEvaluation(sampleEvaluations, nonMatchingEvaluation, testService);

    expect(updated.length).toBe(2);
    expect(savedData).toEqual(updated);
  });

  it('should compare dueDate correctly even if passed as string', () => {
    const stringDateInput: Evaluation = {
      ...targetEvaluation,
      dueDate: '2025-07-01' as any
    };

    const updated = deleteEvaluation(sampleEvaluations, stringDateInput, testService);

    expect(updated.length).toBe(1);
    expect(updated.find(ev => ev.course === 'PROG101')).toBeUndefined();
    expect(savedData).toEqual(updated);
  });

  it('should delete the correct evaluation from a list of many', () => {
    sampleEvaluations.push({
      evaluationId: 'EVAL003',
      course: 'ENG101',
      title: 'Final Exam',
      type: 'Quiz', 
      weight: 40,
      dueDate: new Date('2025-08-01'),
      instructor: 'Dr. White',
      campus: 'Main Campus'
    });

    const updated = deleteEvaluation(sampleEvaluations, targetEvaluation, testService);

    expect(updated.length).toBe(2);
    expect(updated.some(ev => ev.evaluationId === 'EVAL001')).toBe(false);
    expect(savedData).toEqual(updated);
  });

  it('should return empty array if input list is empty', () => {
    sampleEvaluations = [];

    const updated = deleteEvaluation(sampleEvaluations, targetEvaluation, testService);

    expect(updated.length).toBe(0);
    expect(savedData).toEqual(updated);
  });

  it('should delete only based on evaluationId even if other fields differ', () => {
    const modifiedTarget = {
      ...targetEvaluation,
      title: 'Different Title',
      weight: 100,
      dueDate: new Date('2026-01-01')
    };

    const updated = deleteEvaluation(sampleEvaluations, modifiedTarget, testService);

    expect(updated.length).toBe(1);
    expect(updated[0].evaluationId).toBe('EVAL002');
    expect(savedData).toEqual(updated);
  });

  it('should delete only the evaluation with matching ID even if others have same details', () => {
    sampleEvaluations.push({
      ...targetEvaluation,
      evaluationId: 'EVAL999'
    });

    const updated = deleteEvaluation(sampleEvaluations, targetEvaluation, testService);

    expect(updated.length).toBe(2);
    expect(updated.find(ev => ev.evaluationId === 'EVAL001')).toBeUndefined();
    expect(updated.find(ev => ev.evaluationId === 'EVAL999')).toBeDefined();
    expect(savedData).toEqual(updated);
  });
});
