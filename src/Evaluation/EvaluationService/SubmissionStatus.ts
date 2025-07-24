import { Evaluation } from './EvaluationService';

export type SubmissionStatus = 'Not Started' | 'Incomplete' | 'Needs Fixing' | 'Submitted';

export function getInstructorSubmissionStatus(
  allEvaluations: Evaluation[],
  instructors: string[]
): Record<string, SubmissionStatus> {
  const statusMap: Record<string, SubmissionStatus> = {};

  return statusMap;
}