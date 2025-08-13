import { Evaluation } from '../../Evaluation/EvaluationService';

export type SubmissionStatus = 'Not Started' | 'Submitted';

export function getInstructorSubmissionStatus(
  allEvaluations: Evaluation[],
  instructors: string[]
): Record<string, SubmissionStatus> {
  const statusMap: Record<string, SubmissionStatus> = {};

  for (const instructor of instructors) {
    const hasEvaluations = allEvaluations.some(ev => ev.instructor === instructor);
    statusMap[instructor] = hasEvaluations ? 'Submitted' : 'Not Started';
  }

  return statusMap;
}