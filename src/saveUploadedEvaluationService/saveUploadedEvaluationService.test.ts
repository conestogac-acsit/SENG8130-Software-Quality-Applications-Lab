import type { Evaluation } from '../Evaluation/Service/EvaluationService';

const EVALUATION_DATA_STORAGE_KEY = 'evaluationData';
const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';

type StorageMap = {
  [EVALUATION_DATA_STORAGE_KEY]: Evaluation [];
  [EVALUATION_FILENAME_STORAGE_KEY]: string;
};

let storage: StorageMap = {
  [EVALUATION_DATA_STORAGE_KEY]: [],
  [EVALUATION_FILENAME_STORAGE_KEY]: ''
};

let csvOutput: { fileName: string; data: Evaluation [] } | null = null;

function saveToStorage<T extends keyof StorageMap>(key: T, value: StorageMap[T]) {
  storage[key] = value;
}

const CsvHandler = {
  saveDataToFile(fileName: string, data: Evaluation []) {
    csvOutput = { fileName, data };
  }
};

function saveUploadedEvaluationData(data: Evaluation [], fileName: string) {
  saveToStorage(EVALUATION_DATA_STORAGE_KEY, data);
  saveToStorage(EVALUATION_FILENAME_STORAGE_KEY, fileName);
  CsvHandler.saveDataToFile(fileName, data);
}

describe('saveUploadedEvaluationData', () => {
  const testData: Evaluation [] = [
    {
      evaluationId: '001',
      courseCode: 'ENG101',
      evaluationType: 'Assignment',
      dueDay: 'Wednesday',
    },
  ];
  const fileName = 'eng101-assignments.csv';

  beforeEach(() => {
    storage[EVALUATION_DATA_STORAGE_KEY] = [];
    storage[EVALUATION_FILENAME_STORAGE_KEY] = '';
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