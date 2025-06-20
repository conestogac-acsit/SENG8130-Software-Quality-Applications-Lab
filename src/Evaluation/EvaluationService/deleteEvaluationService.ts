import type { Evaluation, IEvaluationService } from '.';

export function deleteEvaluation(
  data: Evaluation[],
  target: Evaluation,
  service: IEvaluationService
): { updated: Evaluation[]; success: boolean } {
  const updated = data.filter(ev => ev.evaluationId !== target.evaluationId);
  const success = updated.length < data.length;

  service.saveEvaluations(updated);
  return { updated, success };
}
