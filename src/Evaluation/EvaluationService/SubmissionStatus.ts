import { Evaluation } from './EvaluationService';

export type SubmissionStatus = 'Not Started' | 'Incomplete' | 'Needs Fixing' | 'Submitted';

export function getInstructorSubmissionStatus(
  allEvaluations: Evaluation[],
  instructors: string[]
): Record<string, SubmissionStatus> {
  const statusMap: Record<string, SubmissionStatus> = {};

  for (const instructor of instructors) {
    const instructorEvaluations = allEvaluations.filter(ev => ev.instructor === instructor);

    if (instructorEvaluations.length === 0) {
      statusMap[instructor] = 'Not Started';
    } else if (instructorEvaluations.some(ev => isInvalid(ev))) {
      statusMap[instructor] = 'Needs Fixing';
    } else if (instructorEvaluations.some(ev => isIncomplete(ev))) {
      statusMap[instructor] = 'Incomplete';
    } else {
      statusMap[instructor] = 'Submitted';
    }
  }

  return statusMap;
}

function isIncomplete(ev: Evaluation): boolean {
  return !ev.course || !ev.type || !ev.dueDate;
}

function isInvalid(ev: Evaluation): boolean {
  return ev.weight < 0 || ev.weight > 100 || !isValidDate(ev.dueDate);
}

function isValidDate(date: string | Date): boolean {
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}