import type { Evaluation, IEvaluationService } from './EvaluationService';

export function deleteEvaluation(
  data: Evaluation[],
  target: Evaluation,
  service: IEvaluationService
): Evaluation[] {
  const updated = data.filter(ev =>
    !(
      ev.course === target.course &&
      ev.title === target.title &&
      ev.type === target.type &&
      ev.weight === target.weight &&
      ev.dueDate.getTime() === new Date(target.dueDate).getTime() &&
      ev.instructor === target.instructor &&
      ev.campus === target.campus
    )
  );

  service.saveEvaluations(updated);

  return updated;
}