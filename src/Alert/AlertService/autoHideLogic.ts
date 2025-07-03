import { Evaluation } from '../../Evaluation/EvaluationService';

function generateAlerts(evaluations: Evaluation[]): Evaluation[] {
  const threshold = 2; 
  return evaluations.length > threshold ? evaluations : [];
}

export function shouldDisplayAlerts(evaluations: Evaluation[]): boolean {
  return generateAlerts(evaluations).length > 0;
}
