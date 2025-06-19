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
      campus: 'Waterloo',
    },
  ];

  beforeEach(() => {
    const memoryStore: Record<string, Evaluation[]> = {};

    storage = {
      save: <T>(key: string, data: T) => {
        memoryStore[key] = data as Evaluation[];
      },
      load: <T>(key: string): T | null => {
        return (memoryStore[key] as T) || null;
      },
    };

    service = new EvaluationService(storage);
  });

  describe('saveEvaluations', () => {
    it('should save evaluations without throwing error', () => {
      expect(() => service.saveEvaluations(sampleData)).not.toThrow();
    });

    it('should throw an error if storageService.save throws', () => {
      storage.save = () => {
        throw new Error('Mock save error');
      };
      service = new EvaluationService(storage);

      expect(() => service.saveEvaluations(sampleData)).toThrow('Failed to save evaluations');
    });
  });

  describe('loadEvaluations', () => {
    it('should load saved evaluations successfully', () => {
      service.saveEvaluations(sampleData);
      const result = service.loadEvaluations();
      expect(result).toEqual(sampleData);
    });

    it('should return an empty array if no evaluations are saved', () => {
      const result = service.loadEvaluations();
      expect(result).toEqual([]);
    });

    it('should throw an error if storageService.load throws', () => {
      storage.load = () => {
        throw new Error('Mock load error');
      };
      service = new EvaluationService(storage);

      expect(() => service.loadEvaluations()).toThrow('Failed to load evaluations');
    });
  });
});
