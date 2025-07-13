import { createSaveUploadedEvaluationData, CsvHandler } from '../Services/SaveUploadedEvaluationData'
import { EvaluationService, Evaluation } from '../Services/SaveUploadedEvaluationData'
import { LocalStorage } from '../localStorageService';

describe('saveUploadedEvaluationData Integration Test', () => {
  const STORAGE_KEY = 'evaluationFilename';
  const fileName = 'test-evaluation.csv';

  const sampleData: Evaluation[] = [
    {
      course: 'MATH101',
      title: 'Final Exam',
      type: 'Final Exam',
      weight: 40,
      dueDate: new Date('2025-12-10'),
      instructor: 'Dr. Allen',
      campus: 'Main',
    }
  ];

  let capturedLogs: any[] = [];
  const originalConsoleLog = console.log;

  beforeEach(() => {
    localStorage.clear();
    capturedLogs = [];
    console.log = (...args: any[]) => capturedLogs.push(args.join(' '));
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it('handles saving with empty evaluation list', () => {
    const storage = new LocalStorage();
    const service = new EvaluationService(storage);
    const save = createSaveUploadedEvaluationData(service, storage, CsvHandler);

    save([], fileName);

    const loaded = service.loadEvaluations();
    expect(loaded).toEqual([]);

    const storedFile = localStorage.getItem(STORAGE_KEY);
    expect(storedFile).toBe(JSON.stringify(fileName));
  });

  it('supports filenames with special characters', () => {
    const specialName = 'Eval_Ü@#2025.csv';
    const storage = new LocalStorage();
    const service = new EvaluationService(storage);
    const save = createSaveUploadedEvaluationData(service, storage, CsvHandler);

    save(sampleData, specialName);

    const storedFile = localStorage.getItem(STORAGE_KEY);
    expect(storedFile).toBe(JSON.stringify(specialName));
  });

  it('should not throw when dueDate is invalid or missing', () => {
    const malformedData: any[] = [{
      course: 'SCI100',
      title: 'Quiz',
      type: 'Quiz',
      weight: '25',
      dueDate: '',
      instructor: '',
      campus: ''
    }];

    const storage = new LocalStorage();
    const service = new EvaluationService(storage);
    const save = createSaveUploadedEvaluationData(service, storage, CsvHandler);

    expect(() => save(malformedData, fileName)).not.toThrow();
  });
});

export { EvaluationService };
