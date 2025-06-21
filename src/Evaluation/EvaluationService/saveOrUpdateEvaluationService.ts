import type { Evaluation, IEvaluationService } from '.';

export function saveOrUpdateEvaluation(
  data: Evaluation[],
  form: Partial<Evaluation>,
  date: string,
  filePath: string | null,
  service: IEvaluationService
): Evaluation[] {
  let evaluations = data;
  if (evaluations.length === 0) {
    evaluations = service.loadEvaluations();
  }

  const existingIndex = evaluations.findIndex(
    (ev) =>
      ev.course === form.course &&
      ev.title === form.title &&
      ev.type === form.type
  );

  const dueDate = new Date(date);

  if (existingIndex !== -1) {
    evaluations[existingIndex] = {
      ...evaluations[existingIndex],
      ...form,
      dueDate,
    } as Evaluation;
  } else {
    const newEvaluation: Evaluation = {
      course: form.course || '',
      title: form.title || '',
      type: form.type || 'Assignment',
      weight: form.weight || 0,
      dueDate,
      instructor: form.instructor || '',
      campus: form.campus || '',
    };
    evaluations.push(newEvaluation);
  }

  service.saveEvaluations(evaluations);

  return evaluations;
}
