import { Evaluation } from '../../Evaluation/EvaluationService';

export type SubmissionStatus = 'Not Started' | 'In Progress' | 'Submitted';

export function getInstructorSubmissionStatus(
  allEvaluations: Evaluation[],
  instructors: string[]
): Record<string, SubmissionStatus> {
  const statusMap: Record<string, SubmissionStatus> = {};

  for (const instructor of instructors) {
    const evals = allEvaluations.filter(ev => ev.instructor === instructor);

    if (evals.length === 0) {
      statusMap[instructor] = 'Not Started';
    } else if (evals.some(ev => !ev.course || !ev.title || !ev.type || !ev.dueDate)) {
      statusMap[instructor] = 'In Progress';
    } else {
      statusMap[instructor] = 'Submitted';
    }
  }

  return statusMap;
}
