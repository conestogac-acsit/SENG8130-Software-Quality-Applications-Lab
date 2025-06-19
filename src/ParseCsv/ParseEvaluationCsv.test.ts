import { ParseEvaluationCsv, Evaluation } from './ParseEvaluationCsv';

describe('ParseEvaluationCsv', () => {
  const csvContent = 'course,title,type,weight,dueDate,instructor,campus\n,,,,,,';
  const csvFile = new File([csvContent], 'evaluation.csv', { type: 'text/csv' });

  it('parses CSV into Evaluation objects with correct properties', (done) => {
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(Array.isArray(data)).toBe(true);
      expect(data[0]).toHaveProperty('course');
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('type');
      expect(data[0]).toHaveProperty('weight');
      expect(data[0]).toHaveProperty('dueDate');
      expect(data[0]).toHaveProperty('instructor');
      expect(data[0]).toHaveProperty('campus');
      done();
    });
  });

  it('converts weight to number and dueDate to Date', (done) => {
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(typeof data[0].weight).toBe('number');
      expect(data[0].dueDate instanceof Date).toBe(true);
      done();
    });
  });
});
