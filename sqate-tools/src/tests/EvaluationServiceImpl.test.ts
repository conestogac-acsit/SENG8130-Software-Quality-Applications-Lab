import { EvaluationServiceImpl } from '../services/evaluation/EvaluationServiceImpl';
import { HeatMapViewType } from '../constants/HeatMapViewType';

describe('EvaluationServiceImpl', () => {
  let service: EvaluationServiceImpl;

  beforeEach(() => {
    service = new EvaluationServiceImpl();
  });

  test('getStartAndEndDay - invalid date should fallback to today', () => {
    const today = new Date();
    const { start, end } = service.getStartAndEndDay(HeatMapViewType.WEEK, 'invalid-date');

    expect(start).toBeInstanceOf(Date);
    expect(end).toBeInstanceOf(Date);
    expect(end.getTime()).toBeGreaterThan(start.getTime());
  });

  test('getMondayOfWeek - Sunday should return previous Monday', () => {
    const date = new Date('2025-11-23'); // Sunday
    const monday = service.getMondayOfWeek(date);
    expect(monday.toISOString().slice(0, 10)).toBe('2025-11-17');
  });

  test('getSundayOfWeek - Wednesday should return following Sunday', () => {
    const date = new Date('2025-11-19'); // Wednesday
    const sunday = service.getSundayOfWeek(date);
    expect(sunday.toISOString().slice(0, 10)).toBe('2025-11-23');
  });

  test('getHeatMapDataByTypeAndStartDay (WEEK) - should return 7 days', async () => {
    const result = await service.getHeatMapDataByTypeAndStartDay(HeatMapViewType.WEEK, '2025-11-18');
    expect(result).toHaveLength(7);
    expect(result[0]).toHaveProperty('day');
    expect(result[0]).toHaveProperty('evaluations');
  });

  test('getHeatMapDataByTypeAndStartDay (MONTH) - should return at least 28 days', async () => {
    const result = await service.getHeatMapDataByTypeAndStartDay(HeatMapViewType.MONTH, '2025-11-18');
    expect(result.length).toBeGreaterThanOrEqual(28);
    expect(result[0]).toHaveProperty('day');
  });

  test('uploadCsvFile - should parse file and return evaluation heatmap data', async () => {
    const path = require('path');
    const file = path.resolve(__dirname, './__fixtures__/mock_evaluations.csv');

    const result = await service.uploadCsvFile(file, HeatMapViewType.WEEK);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('day');
    expect(result[0]).toHaveProperty('evaluations');
  });
});
