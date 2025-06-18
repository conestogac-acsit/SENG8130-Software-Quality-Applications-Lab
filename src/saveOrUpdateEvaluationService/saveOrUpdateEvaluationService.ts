export interface uno {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay: string;
}

export function saveEvaluations(data: uno[]): void {
  console.log('Saving evaluations:', data);
}

export function saveOrUpdateEvaluation(
  data: uno[],
  form: Partial<uno>,
  date: string,
  filePath: string | null,
  saveFn: (data: uno[]) => void = saveEvaluations
): uno[] {
  const updatedForm: uno = {
    evaluationId: form.evaluationId || crypto.randomUUID(),
    courseCode: form.courseCode || '',
    evaluationType: form.evaluationType || '',
    dueDay: date
  };

  const exists = data.some(ev => ev.evaluationId === updatedForm.evaluationId);

  const updatedData = exists
    ? data.map(ev => ev.evaluationId === updatedForm.evaluationId ? updatedForm : ev)
    : [...data, updatedForm];

  saveFn(updatedData);

  return updatedData;
}