import { Evaluation } from '../../Evaluation/EvaluationService';

export function getAlertSummary(evaluations: Evaluation[], threshold: number): string {
  if (threshold < 0) throw new Error('Threshold cannot be negative');
return [ ].join('\n');
}