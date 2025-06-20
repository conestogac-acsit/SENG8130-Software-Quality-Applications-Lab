import type { Evaluation, IEvaluationService } from '.';

export function deleteEvaluation(
  data: Evaluation[],
  target: Evaluation,
  service: IEvaluationService
): Evaluation[] {
  const updated = data.filter(ev => ev.evaluationId !== target.evaluationId);
  service.saveEvaluations(updated);
  return updated;
}
