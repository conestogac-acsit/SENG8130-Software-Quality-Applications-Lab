import { getInstructorSubmissionStatus } from './submissionTracker';
import { Evaluation } from '../../Evaluation/EvaluationService';

describe('getInstructorSubmissionStatus', () => {
  const allEvaluations: Evaluation[] = [
    { course: 'A', title: 'Test 1', type: 'Quiz', weight: 10, dueDate: new Date(), instructor: 'Prof A', campus: 'Main' },
    { course: '', title: 'Draft Eval', type: 'Quiz', weight: 10, dueDate: new Date(), instructor: 'Prof B', campus: 'Main' }
  ];

  it('should return "Submitted" for fully completed entries', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof A']);
    expect(status['Prof A']).toBe('Submitted');
  });

  it('should return "In Progress" for partially completed entries', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof B']);
    expect(status['Prof B']).toBe('In Progress');
  });

  it('should return "Not Started" for instructors with no entries', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof C']);
    expect(status['Prof C']).toBe('Not Started');
  });

  it('should return statuses for multiple instructors', () => {
    const status = getInstructorSubmissionStatus(allEvaluations, ['Prof A', 'Prof B', 'Prof C']);
    expect(status['Prof A']).toBe('Submitted');
    expect(status['Prof B']).toBe('In Progress');
    expect(status['Prof C']).toBe('Not Started');
  });
});
