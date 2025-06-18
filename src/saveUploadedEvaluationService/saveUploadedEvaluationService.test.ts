import type { CourseEval } from './saveUploadedEvaluationService'; 

const EVALUATION_DATA_STORAGE_KEY = 'evaluationData';
const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

let storage: Record<string, any> = {};
let csvOutput: { fileName: string; data: CourseEval[] } | null = null;

function saveToStorage(key: string, value: any) {
  storage[key] = value;
}

const CsvHandler = {
  saveDataToFile(fileName: string, data: CourseEval[]) {
    csvOutput = { fileName, data };
  }
};


function saveUploadedEvaluationData(data: CourseEval[], fileName: string) {
  saveToStorage(EVALUATION_DATA_STORAGE_KEY, data);
  saveToStorage(EVALUATION_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
}

describe('saveUploadedEvaluationData', () => {
  const testData: CourseEval[] = [
    {
      evaluationId: '001',
      courseCode: 'ENG101',
      evaluationType: 'Assignment',
      dueDay: 'Wednesday',
    },
  ];
  
  const fileName = 'eng101-assignments.csv';

  beforeEach(() => {
    storage = {};
    csvOutput = null;
  });

  it('saves evaluation data to storage with correct key', () => {
    saveUploadedEvaluationData(testData, fileName);
    expect(storage[EVALUATION_DATA_STORAGE_KEY]).toEqual(testData);
  });

  it('saves filename to storage with correct key', () => {
    saveUploadedEvaluationData(testData, fileName);
    expect(storage[EVALUATION_FILENAME_STORAGE_KEY]).toBe(fileName);
  });

  it('calls CsvHandler.saveDataToFile with correct arguments', () => {
    saveUploadedEvaluationData(testData, fileName);
    expect(csvOutput).toEqual({ fileName, data: testData });
  });
});