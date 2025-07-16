import type { Evaluation } from './EvaluationService';

export function getEvaluationsForInstructor(data: Evaluation[], instructor: string): Evaluation[] {
  if (!instructor || typeof instructor !== 'string') {
    throw new Error('Invalid instructor');
  }

  return data.filter(ev => ev.instructor === instructor);
}
