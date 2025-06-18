export interface EvalEntry {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay: string;
}

export function saveEvaluations(data: EvalEntry[]): void {
  console.log('Saving evaluations:', data);
}

export function saveOrUpdateEvaluation(
  data: EvalEntry[],
  form: Partial<EvalEntry>,
  date: string,
  filePath: string | null,
  saveFn: (data: EvalEntry[]) => void = saveEvaluations
): EvalEntry[] {
  const updatedForm: EvalEntry = {
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