import {
  loadFromStorage,
  saveToStorage
} from './localStorageService';

import type { EvaluationRow } from '../Evaluation/EvaluationDaily/Services/evaluationStorageService.types';

describe('localStorageService', () => {
  const STORAGE_KEY = 'uploaded-eval-data';

  const mockData: EvaluationRow[] = [
    {
      evaluationId: 'abc',
      courseCode: 'INFO1001',
      evaluationType: 'Assignment',
      dueDay: '2025-06-10'
    }
  ];

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('saveToStorage', () => {
    it('saves serialized data to localStorage', () => {
      saveToStorage(STORAGE_KEY, mockData);
      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).not.toBeNull();
      expect(JSON.parse(raw!)).toEqual(mockData);
    });

    it('logs error if serialization fails', () => {
      const circularRef: any = {};
      circularRef.self = circularRef;
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      saveToStorage(STORAGE_KEY, circularRef);

      expect(spy).toHaveBeenCalledWith(
        `Error saving data to localStorage with key: ${STORAGE_KEY}`,
        expect.any(TypeError)
      );

      spy.mockRestore();
    });
  });

  describe('loadFromStorage', () => {
    it('parses and returns data from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
      const result = loadFromStorage<EvaluationRow[]>(STORAGE_KEY);

      expect(result).toEqual(mockData);
    });

    it('returns null if no data exists for key', () => {
      const result = loadFromStorage<EvaluationRow[]>(STORAGE_KEY);
      expect(result).toBeNull();
    });

    it('logs error and returns null if JSON parsing fails', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid_json');
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = loadFromStorage<EvaluationRow[]>(STORAGE_KEY);

      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(
        `Error loading data from localStorage with key: ${STORAGE_KEY}`,
        expect.any(SyntaxError)
      );

      spy.mockRestore();
    });
  });
});
