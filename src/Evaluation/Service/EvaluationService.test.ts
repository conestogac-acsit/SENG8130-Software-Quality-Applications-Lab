import { EvaluationService, Evaluation } from './EvaluationService';
import { StorageService } from '../../localStorageService';

describe('EvaluationService', () => {
  let service: EvaluationService;
  let storage: StorageService;

  const sampleData: Evaluation[] = [
    {
      course: 'SENG8130',
      title: 'Software quality applications lab',
      type: 'Assignment',
      weight: 10,
      dueDate: new Date('2025-06-01'),
      instructor: 'John Smith',
      campus: 'Waterloo'
    }
  ];

  beforeEach(() => {
    const memoryStore: Record<string, any> = {};
    storage = {
      save: (key: string, value: any) => {
        memoryStore[key] = value;
      },
      load: <T>(key: string): T | null => {
        return memoryStore[key] || null;
      }
    };
    service = new EvaluationService(storage);
  });

  test('saveEvaluations should store data and return true', () => {
    const result = service.saveEvaluations(sampleData);
    expect(result).toBe(true);
    expect(storage.load('Evaluation_Data_Storage')).toEqual(sampleData);
  });

  test('saveEvaluations with empty array should still return true', () => {
    const result = service.saveEvaluations([]);
    expect(result).toBe(true);
    expect(storage.load('Evaluation_Data_Storage')).toEqual([]);
  });

  test('saveEvaluations should return false if storageService.save throws', () => {
    const brokenStorage: StorageService = {
      save: () => { throw new Error('save failed'); },
      load: () => null
    };
    const brokenService = new EvaluationService(brokenStorage);
    const result = brokenService.saveEvaluations(sampleData);
    expect(result).toBe(false);
  });

  test('loadEvaluations should return stored data', async () => {
    storage.save('Evaluation_Data_Storage', sampleData);
    const result = await service.loadEvaluations();
    expect(result).toEqual(sampleData);
  });

  test('loadEvaluations should return empty array if no data exists', async () => {
    const result = await service.loadEvaluations();
    expect(result).toEqual([]);
  });

  test('loadEvaluations should handle corrupted data gracefully', async () => {
    const badStorage: StorageService = {
      save: () => {},
      load: () => { throw new Error('corrupted data'); }
    };
    const badService = new EvaluationService(badStorage);
    const result = await badService.loadEvaluations();
    expect(result).toEqual([]);
  });
});
