import {
  deleteEvaluation,
  CsvHandler,
  savedEvaluations,
  FakeEvaluation
} from './deleteEvaluationService';

describe('deleteEvaluation', () => {
  let originalData: FakeEvaluation[];

  beforeEach(() => {
    originalData = [
      {
        evaluationId: '101',
        courseCode: 'MATH101',
        evaluationType: 'Quiz',
        dueDay: new Date('2025-07-01')
      },
      {
        evaluationId: '102',
        courseCode: 'ENG102',
        evaluationType: 'Midterm',
        dueDay: new Date('2025-07-10')
      },
      {
        evaluationId: '103',
        courseCode: 'SCI103',
        evaluationType: 'Final',
        dueDay: new Date('2025-07-20')
      }
    ];

    CsvHandler.lastSavedPath = null;
    CsvHandler.lastSavedData = [];
  });

  it('should remove the evaluation with the specified ID', () => {
    const result = deleteEvaluation(originalData, '102', 'file.csv');
    expect(result.length).toBe(2);
    expect(result.find(row => row.evaluationId === '102')).toBeUndefined();
  });

  it('should save the updated data to the given file path', () => {
    const result = deleteEvaluation(originalData, '102', 'file.csv');
    expect(CsvHandler.lastSavedPath).toBe('file.csv');
    expect(CsvHandler.lastSavedData).toEqual(result);
  });

  it('should update the saved evaluations list', () => {
    const result = deleteEvaluation(originalData, '102', 'file.csv');
    expect(savedEvaluations).toEqual(result);
  });

  it('should return the original data if no evaluation ID matches', () => {
    const result = deleteEvaluation(originalData, '999', 'file.csv');
    expect(result).toEqual(originalData);
  });

  it('should not save to file if filePath is null', () => {
    const result = deleteEvaluation(originalData, '102', null);
    expect(CsvHandler.lastSavedPath).toBeNull();
    expect(CsvHandler.lastSavedData).toEqual([]);
    expect(savedEvaluations).toEqual(result);
  });
});
