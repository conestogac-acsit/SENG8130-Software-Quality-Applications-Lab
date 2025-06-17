export interface Koo {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay: string;
}

export function deleteEvaluation(
  data: Koo[],
  evaluationId: string,
  filePath: string | null
): Koo[] {
  const updated = data.filter(ev => ev.evaluationId !== evaluationId);

  if (filePath) (globalThis as any).CsvHandler.saveDataToFile(filePath, updated);
  (globalThis as any).saveEvaluations(updated);

  return updated;
}
