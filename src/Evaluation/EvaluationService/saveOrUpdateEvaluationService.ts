import type { Evaluation, IEvaluationService } from '.';

export function saveOrUpdateEvaluation(
  data: Evaluation[],
  form: Partial<Evaluation>,
  date: string,
  filePath: string | null,
  service: IEvaluationService
): Evaluation[] {
  const updatedForm: Evaluation = {
    course: form.course || '',
    title: form.title || '',
    type: form.type || 'Assignment',
    weight: form.weight ?? 0,
    dueDate: new Date(date),
    instructor: form.instructor || '',
    campus: form.campus || ''
  };

  const exists = data.some(ev =>
    ev.course === updatedForm.course &&
    ev.title === updatedForm.title &&
    ev.type === updatedForm.type
  );

  const updatedData = exists
    ? data.map(ev =>
        ev.course === updatedForm.course &&
        ev.title === updatedForm.title &&
        ev.type === updatedForm.type
          ? updatedForm
          : ev
      )
    : [...data, updatedForm];

service.saveEvaluations(updatedData);

  return updatedData;
}