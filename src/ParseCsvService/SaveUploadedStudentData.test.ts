import { Student } from '../ParseCsvService'
import { StorageService } from '../localStorageService'
import { createSaveUploadedStudentData } from './SaveUploadedStudentData';

describe('saveUploadedStudentData', () => {
  const STUDENT_FILENAME_STORAGE_KEY = 'studentFilename';
  const STUDENT_DATA_STORAGE_KEY = 'studentData';

  const testFileName = 'students-upload.csv';
  const testStudents: Student[] = [
    {
      studentId: '123',
      name: 'Alice',
      email: 'alice@example.com',
      section: 'A1',
      group: 'G1',
      role: 'Developer',
      imageUrl: '',
      notes: '',
      loopStatus: 'Active',
      githubStatus: 'Active',
    },
  ];
  const storage: Record<string, any> = {};
  let savedOutput: { fileName: string; data: Student[] } | null = null;

  class InMemoryStorageService implements StorageService {
    save<T>(key: string, value: T): void {
      storage[key] = JSON.stringify(value);
    }
    load<T>(key: string): T | null {
      const raw = storage[key];
      return raw ? JSON.parse(raw) : null;
    }
  }

  class TestCsvHandler {
    static saveDataToFile(fileName: string, data: Student[]): void {
      savedOutput = { fileName, data };
    }
  }

  let saveFn: ReturnType<typeof createSaveUploadedStudentData>;
  let inMemoryStorage: InMemoryStorageService;

  beforeEach(() => {
    Object.keys(storage).forEach((key) => delete storage[key]);
    savedOutput = null;
    inMemoryStorage = new InMemoryStorageService();
    saveFn = createSaveUploadedStudentData(inMemoryStorage, TestCsvHandler);
  });

  it('saves student data to in-memory storage', () => {
    saveFn(testStudents, testFileName);
    const result = inMemoryStorage.load<Student[]>(STUDENT_DATA_STORAGE_KEY);
    expect(result).toEqual(testStudents);
  });

  it('saves file name to in-memory storage', () => {
    saveFn(testStudents, testFileName);
    const savedName = inMemoryStorage.load<string>(STUDENT_FILENAME_STORAGE_KEY);
    expect(savedName).toBe(testFileName);
  });

  it('writes data to CsvHandler', () => {
    saveFn(testStudents, testFileName);
    expect(savedOutput).toEqual({ fileName: testFileName, data: testStudents });
  });

  it('handles empty data array', () => {
    const empty: Student[] = [];
    saveFn(empty, testFileName);
    const saved = inMemoryStorage.load<Student[]>(STUDENT_DATA_STORAGE_KEY);
    expect(saved).toEqual([]);
  });

  it('stores special characters in filename', () => {
    const specialName = '@#$.csv';
    saveFn(testStudents, specialName);
    const saved = inMemoryStorage.load<string>(STUDENT_FILENAME_STORAGE_KEY);
    expect(saved).toBe(specialName);
  });
});