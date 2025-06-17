import { deleteEvaluation, Koo } from './deleteEvaluationService';

let capturedCsvSave: { path: string | null; data: Koo[] } = {
  path: null,
  data: [],
};

let capturedSavedEvaluations: Koo[] = [];

(globalThis as any).CsvHandler = class {
  static saveDataToFile(filePath: string, data: Koo[]) {
    capturedCsvSave.path = filePath;
    capturedCsvSave.data = data;
  }
};

(globalThis as any).saveEvaluations = function (data: Koo[]) {
  capturedSavedEvaluations = data;
};

describe('deleteEvaluation', () => {
  let originalData: Koo[];

  beforeEach(() => {
    originalData = [
      { evaluationId: '101', courseCode: 'MATH101', evaluationType: 'Quiz', dueDay: '2025-07-01' },
      { evaluationId: '102', courseCode: 'ENG102', evaluationType: 'Midterm', dueDay: '2025-07-10' },
      { evaluationId: '103', courseCode: 'SCI103', evaluationType: 'Final', dueDay: '2025-07-20' }
    ];
    capturedCsvSave = { path: null, data: [] };
    capturedSavedEvaluations = [];
  });

  it('should remove the evaluation with the specified ID', () => {
    const result = deleteEvaluation(originalData, '102', 'file.csv');
    expect(result.length).toBe(2);
    expect(result.find(row => row.evaluationId === '102')).toBeUndefined();
  });

  it('should call CsvHandler.saveDataToFile with correct data and path', () => {
    const result = deleteEvaluation(originalData, '102', 'file.csv');
    expect(capturedCsvSave.path).toBe('file.csv');
    expect(capturedCsvSave.data).toEqual(result);
  });

  it('should call saveEvaluations with the correct updated list', () => {
    const result = deleteEvaluation(originalData, '102', 'file.csv');
    expect(capturedSavedEvaluations).toEqual(result);
  });

  it('should return the same list if ID is not found', () => {
    const result = deleteEvaluation(originalData, '999', 'file.csv');
    expect(result).toEqual(originalData);
  });

  it('should not call CsvHandler.saveDataToFile if filePath is null', () => {
    const result = deleteEvaluation(originalData, '102', null);
    expect(capturedCsvSave.path).toBeNull();
    expect(capturedCsvSave.data).toEqual([]);
    expect(capturedSavedEvaluations).toEqual(result);
  });
});
