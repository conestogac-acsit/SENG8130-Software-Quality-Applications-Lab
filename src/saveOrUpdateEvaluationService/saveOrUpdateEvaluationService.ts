export interface uno {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay: string;
}

export function saveOrUpdateEvaluation(
  data: uno[],
  form: Partial<uno>,
  date: string,
  filePath: string | null,
  saveFn: (data: uno[]) => void = saveEvaluations
): uno[] {
  const newEvaluation: uno = {
    evaluationId: form.evaluationId || crypto.randomUUID(),
    courseCode: form.courseCode || '',
    evaluationType: form.evaluationType || '',
    dueDay: date
  };

  const updatedData = [...data, newEvaluation];
  saveFn(updatedData);
  return updatedData;
}
