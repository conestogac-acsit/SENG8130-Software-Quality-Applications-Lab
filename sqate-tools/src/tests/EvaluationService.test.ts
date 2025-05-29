import { EvaluationService } from '../services/evaluation/EvaluationService';
import { EvaluationServiceImpl } from '../services/evaluation/EvaluationServiceImpl';

describe('EvaluationService', () => {
  let service: EvaluationService;

  beforeEach(() => {
    service = new EvaluationServiceImpl();
  });

  test('getAllEvaluations should return an empty array initially', async () => {
    const result = await service.getAllEvaluations('dummy.csv');
    expect(result).toEqual([]);
  });

  test('getDayEvaluationsByWeek should return an empty array initially', async () => {
    const result = await service.getDayEvaluationsByWeek('2025-06-01');
    expect(result).toEqual([]);
  });
});
