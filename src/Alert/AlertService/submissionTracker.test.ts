import { getInstructorSubmissionStatus } from './submissionTracker';
import { Evaluation } from '../../Evaluation/EvaluationService';

describe('getInstructorSubmissionStatus', () => {
  const allEvaluations: Evaluation[] = [
    {
      course: 'A',
      title: 'Test 1',
      type: 'Quiz',
      weight: 10,
      dueDate: new Date(),
      instructor: 'Prof A',
      campus: 'Main'
    },
    {
      course: '',
      title: 'Draft Eval',
      type: 'Quiz',
      weight: 10,
      dueDate: new Date(),
      instructor: 'Prof B',
      campus: 'Main'
    }
  ];

  it('should return "Submitted" for instructors with at least one evaluation', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof A', 'Prof B']);
    expect(status['Prof A']).toBe('Submitted');
    expect(status['Prof B']).toBe('Submitted'); 
  });

  it('should return "Not Started" for instructors with no evaluations', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof C']);
    expect(status['Prof C']).toBe('Not Started');
  });

  it('should return correct statuses for multiple instructors', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof A', 'Prof B', 'Prof C']);
    expect(status['Prof A']).toBe('Submitted');
    expect(status['Prof B']).toBe('Submitted');
    expect(status['Prof C']).toBe('Not Started');
  });
});
