import type { Evaluation } from './EvaluationService';

export function getEvaluationsForCampus(data: Evaluation[], campus: string): Evaluation[] {
  if (!campus || typeof campus !== 'string') {
    throw new Error('Invalid campus');
  }

  return data.filter(ev => ev.campus === campus);
}