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

  describe('rescheduleEvaluation & helpers', () => {
    beforeEach(() => {
      service.saveEvaluations(sampleData);
    });

    it('should return evaluation by course and title', () => {
      const found = service.getEvaluationByCourseAndTitle('SENG8130', 'Software quality applications lab');
      expect(found).toBeDefined();
      expect(found?.instructor).toBe('John Smith');
    });

    it('should reschedule evaluation to a future date', () => {
      const newDate = new Date('2025-12-31');
      const result = service.rescheduleEvaluation('SENG8130', 'Software quality applications lab', newDate);

      const updated = service.getEvaluationByCourseAndTitle('SENG8130', 'Software quality applications lab');

      expect(result).toBe(true);
      expect(updated?.dueDate.toISOString().split('T')[0]).toBe('2025-12-31');
    });

    it('should fail to reschedule to a past date', () => {
      const pastDate = new Date('2000-01-01');
      const result = service.rescheduleEvaluation('SENG8130', 'Software quality applications lab', pastDate);
      expect(result).toBe(false);
    });

    it('should fail to reschedule a non-existent evaluation', () => {
      const result = service.rescheduleEvaluation('NON101', 'Does Not Exist', new Date('2025-12-31'));
      expect(result).toBe(false);
    });

    it('should fail to reschedule with invalid date', () => {
      const invalidDate = new Date('not-a-date');
      const result = service.rescheduleEvaluation('SENG8130', 'Software quality applications lab', invalidDate);
      expect(result).toBe(false);
    });

    it('should clear all evaluations', () => {
      service.clearAllEvaluations();
      const all = service.loadEvaluations();
      expect(all.length).toBe(0);
    });
  });
});