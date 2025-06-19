import type { Evaluation } from '../Evaluation/Service/EvaluationService';
export function getEvaluationsForDate(data: Evaluation[], date: Date): Evaluation[] {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date object');
  }

  return data.filter(ev => ev.dueDate?.toDateString() === date.toDateString());
}