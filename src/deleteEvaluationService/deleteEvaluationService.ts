export interface FakeEvaluation {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay: Date; 
}

export class CsvHandler {
  static lastSavedPath: string | null = null;
  static lastSavedData: FakeEvaluation[] = [];

  static saveDataToFile(filePath: string, data: FakeEvaluation[]) {
    this.lastSavedPath = filePath;
    this.lastSavedData = data;
  }
}

export let savedEvaluations: FakeEvaluation[] = [];

export function saveEvaluations(data: FakeEvaluation[]) {
  savedEvaluations = data;
}

export function deleteEvaluation(
  data: FakeEvaluation[],
  evaluationId: string,
  filePath: string | null
): FakeEvaluation[] {
  const updated = data.filter(ev => ev.evaluationId !== evaluationId);

  if (filePath) CsvHandler.saveDataToFile(filePath, updated);
  saveEvaluations(updated);

  return updated;
}
