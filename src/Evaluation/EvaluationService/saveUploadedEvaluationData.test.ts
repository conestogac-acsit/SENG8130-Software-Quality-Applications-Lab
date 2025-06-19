import { createSaveUploadedEvaluationData, CsvHandler } from './saveUploadedEvaluationData';
import { Evaluation } from '../EvaluationService';
import { StorageService } from '../../localStorageService';
import { EvaluationService } from '../EvaluationService';

describe('saveUploadedEvaluationData', () => {
  const EVALUATION_FILENAME_STORAGE_KEY = 'evaluationFilename';
  const storage: Record<string, any> = {};
  let savedCsvOutput: { fileName: string; data: Evaluation[] } | null = null;

  class InMemoryStorageService implements StorageService {
    save(key: string, value: any): void {
      storage[key] = value;
    }

    load<T>(key: string): T {
      return storage[key];
    }
  }

  class TestCsvHandler {
    static saveDataToFile(fileName: string, data: Evaluation[]): void {
      savedCsvOutput = { fileName, data };
    }
  }

  const testData: Evaluation[] = [
    {
      course: 'ENG101',
      title: 'Essay 1',
      type: 'Assignment',
      weight: 10,
      dueDate: new Date('2025-06-25'),
      instructor: 'Dr. Smith',
      campus: 'Main',
    },
  ];
  const fileName = 'eng101-assignments.csv';

  let saveUploadedEvaluationData: ReturnType<typeof createSaveUploadedEvaluationData>;
  let inMemoryStorageService: InMemoryStorageService;
  let evaluationService: EvaluationService;

  beforeEach(() => {
    Object.keys(storage).forEach(key => delete storage[key]);
    savedCsvOutput = null;

    inMemoryStorageService = new InMemoryStorageService();
    evaluationService = new EvaluationService(inMemoryStorageService);

    saveUploadedEvaluationData = createSaveUploadedEvaluationData(
      evaluationService,
      inMemoryStorageService,
      TestCsvHandler
    );
  });

  it('saves evaluations to in-memory storage', () => {
    saveUploadedEvaluationData(testData, fileName);
    const saved = evaluationService.loadEvaluations();
    expect(saved).toEqual(testData);
  });

  it('saves filename to in-memory storage', () => {
    saveUploadedEvaluationData(testData, fileName);
    expect(storage[EVALUATION_FILENAME_STORAGE_KEY]).toBe(fileName);
  });

  it('writes to CsvHandler correctly', () => {
    saveUploadedEvaluationData(testData, fileName);
    expect(savedCsvOutput).toEqual({ fileName, data: testData });
  });
});