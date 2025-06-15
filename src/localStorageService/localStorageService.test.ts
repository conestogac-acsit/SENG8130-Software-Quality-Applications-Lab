import {
  loadFromStorage,
  saveToStorage
} from './localStorageService';
import type { LocalStorageHandler } from './localStorageHandler';
import type { EvaluationRow } from '../Evaluation/EvaluationDaily/Services/evaluationStorageService.types';

describe('localStorageService (interface-based)', () => {
  const STORAGE_KEY = 'uploaded-eval-data';

  const mockData: EvaluationRow[] = [
    {
      evaluationId: 'abc',
      courseCode: 'INFO1001',
      evaluationType: 'Assignment',
      dueDay: '2025-06-10'
    }
  ];

  let mockStorage: Record<string, string>;
  let handler: LocalStorageHandler;

  beforeEach(() => {
    mockStorage = {};
    handler = {
      getItem: (key: string) => mockStorage[key] || null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      }
    };
  });

  describe('saveToStorage', () => {
    it('stores JSON string via provided storage handler', () => {
      saveToStorage(handler, STORAGE_KEY, mockData);
      expect(mockStorage[STORAGE_KEY]).not.toBeUndefined();
      expect(JSON.parse(mockStorage[STORAGE_KEY])).toEqual(mockData);
    });
  });

  describe('loadFromStorage', () => {
    it('loads evaluations using the storage handler', () => {
      mockStorage[STORAGE_KEY] = JSON.stringify(mockData);
      const result = loadFromStorage<EvaluationRow>(handler, STORAGE_KEY);

      expect(result).toEqual(mockData);
    });

    it('returns empty array if key is missing', () => {
      const result = loadFromStorage<EvaluationRow>(handler, STORAGE_KEY);
      expect(result).toEqual([]);
    });

    it('returns empty array and logs error on invalid JSON', () => {
      handler.getItem = () => 'not-json';
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const result = loadFromStorage<EvaluationRow>(handler, STORAGE_KEY);

      expect(result).toEqual([]);
      expect(spy).toHaveBeenCalledWith(
        '[loadFromStorage] Failed to parse:',
        expect.any(SyntaxError)
      );

      spy.mockRestore();
    });
  });
});
