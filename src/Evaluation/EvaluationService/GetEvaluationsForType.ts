import type { Evaluation } from './EvaluationService';

export function getEvaluationsForType(data: Evaluation[], type: string): Evaluation[] {
  if (!type || typeof type !== 'string') {
    throw new Error('Invalid type value');
  }

  return data.filter(ev => ev.type === type);
}