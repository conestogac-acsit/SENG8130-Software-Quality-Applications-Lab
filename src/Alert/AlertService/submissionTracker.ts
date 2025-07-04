import { Evaluation } from '../../Evaluation/EvaluationService';

export type SubmissionStatus = 'Not Started' | 'In Progress' | 'Submitted';

export function getInstructorSubmissionStatus(
  allEvaluations: Evaluation[],
  instructors: string[]
): Record<string, SubmissionStatus> {
  return {}; 
}
