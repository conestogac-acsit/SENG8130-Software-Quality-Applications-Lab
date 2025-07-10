import { ParseEvaluationCsv, Evaluation } from './ParseEvaluationCsv';

describe('ParseEvaluationCsv', () => {
  const validCsvContent = `course,title,type,weight,dueDate,instructor,campus
Math 101,Midterm,Exam,25,2025-09-15,Prof. Smith,Main Campus`;

  const invalidDateCsvContent = `course,title,type,weight,dueDate,instructor,campus
History 201,Final Essay,Assignment,15,invalid-date,Prof. Doe,North Campus`;

  const missingWeightCsvContent = `course,title,type,weight,dueDate,instructor,campus
Science 102,Lab Report,Assignment,,2025-10-01,Prof. Brown,South Campus`;

  const partialDataCsvContent = `course,title,type,weight,dueDate,instructor,campus
English 103,Presentation,Quiz,10,2025-11-20,,`;

  const emptyCsvContent = 'course,title,type,weight,dueDate,instructor,campus\n';

  it('parses valid CSV and populates fields correctly', (done) => {
    const csvFile = new File([validCsvContent], 'valid.csv', { type: 'text/csv' });
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(data).toHaveLength(1);
      expect(data[0].course).toBe('Math 101');
      expect(data[0].title).toBe('Midterm');
      expect(data[0].type).toBe('Exam');
      expect(data[0].weight).toBe(25);
      expect(data[0].dueDate instanceof Date).toBe(true);
      expect(data[0].dueDate.toISOString()).toContain('2025-09-15');
      expect(data[0].instructor).toBe('Prof. Smith');
      expect(data[0].campus).toBe('Main Campus');
      done();
    });
  });

  it('handles invalid date format as Invalid Date', (done) => {
    const csvFile = new File([invalidDateCsvContent], 'invalidDate.csv', { type: 'text/csv' });
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(data).toHaveLength(1);
      expect(data[0].dueDate instanceof Date).toBe(true);
      expect(isNaN(data[0].dueDate.getTime())).toBe(true);
      done();
    });
  });

  it('defaults weight to 0 when missing', (done) => {
    const csvFile = new File([missingWeightCsvContent], 'missingWeight.csv', { type: 'text/csv' });
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(data).toHaveLength(1);
      expect(data[0].weight).toBe(0);
      done();
    });
  });

  it('handles rows with missing optional fields (instructor, campus)', (done) => {
    const csvFile = new File([partialDataCsvContent], 'partialData.csv', { type: 'text/csv' });
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(data).toHaveLength(1);
      expect(data[0].instructor).toBe('');
      expect(data[0].campus).toBe('');
      done();
    });
  });

  it('returns empty array when CSV has only headers and no data rows', (done) => {
    const csvFile = new File([emptyCsvContent], 'empty.csv', { type: 'text/csv' });
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(Array.isArray(data)).toBe(true);
      expect(data).toHaveLength(0);
      done();
    });
  });

  it('parses multiple rows correctly', (done) => {
    const multiRowCsvContent = `course,title,type,weight,dueDate,instructor,campus
Math 101,Assignment 1,Assignment,10,2025-09-01,Prof. A,Campus A
Math 101,Assignment 2,Assignment,20,2025-10-01,Prof. A,Campus A
Math 101,Final Exam,Final Exam,70,2025-12-15,Prof. A,Campus A`;

    const csvFile = new File([multiRowCsvContent], 'multi.csv', { type: 'text/csv' });
    ParseEvaluationCsv(csvFile, (data: Evaluation[]) => {
      expect(data).toHaveLength(3);
      expect(data[0].title).toBe('Assignment 1');
      expect(data[1].weight).toBe(20);
      expect(data[2].type).toBe('Final Exam');
      expect(data[2].dueDate instanceof Date).toBe(true);
      expect(data[2].dueDate.toISOString()).toContain('2025-12-15');
      done();
    });
  });
});
