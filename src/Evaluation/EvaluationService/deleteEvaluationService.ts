import type { Evaluation, IEvaluationService } from '.';

export function deleteEvaluation(
  data: Evaluation[],
  target: Evaluation,
  service: IEvaluationService
): { updated: Evaluation[]; success: boolean; error?: string } {
  const updated = data.filter(ev => ev.evaluationId !== target.evaluationId);
  const success = updated.length < data.length;

  try {
    service.saveEvaluations(updated);
    return { updated, success };
  } catch (err) {
    return {
      updated: data,
      success: false,
      error: (err instanceof Error ? err.message : 'Unknown error')
    };
  }
}