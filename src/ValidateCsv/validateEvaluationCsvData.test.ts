import { Evaluation } from '../Evaluation/EvaluationService/EvaluationService';
import { validateEvaluationCsvData } from './validateEvaluationCsvData';


describe('validateEvaluationCsvData', () => {
  it('should return no errors for valid evaluation data', () => {
    const validData: Evaluation[] = [
      {
        course: 'SENG8130',
        title: 'Midterm Exam',
        type: 'Assignment',
        weight: 25,
        dueDate: new Date('2025-10-10'),
        instructor: 'Prof. Smith',
        campus: 'Waterloo',
      },
    ];

    const result = validateEvaluationCsvData(validData);
    expect(result).toEqual([]);
  });
  it('should return error for weight outside range', () => {
    const invalidWeight: Evaluation[] = [
      {
        course: 'SENG8130',
        title: 'Final Project',
        type: 'Assignment',
        weight: 150, 
        dueDate: new Date('2025-11-01'),
        instructor: 'Dr. John',
        campus: 'Cambridge',
      },
    ];

    const result = validateEvaluationCsvData(invalidWeight);
    expect(result[0].errors).toEqual(
      expect.arrayContaining([
        { field: 'weight', message: 'Weight must be between 0 and 100' },
      ])
    );
  });

  it('should return error for invalid date format', () => {
    const invalidDate: Evaluation[] = [
      {
        course: 'SENG8130',
        title: 'Quiz',
        type: 'Quiz',
        weight: 10,
        dueDate: new Date('Invalid'),
        instructor: 'Dr. Jane',
        campus: 'Doon',
      },
    ];

    const result = validateEvaluationCsvData(invalidDate);
    expect(result[0].errors).toEqual(
      expect.arrayContaining([
        { field: 'dueDate', message: 'Invalid due date' },
      ])
    );
  });

  it('should validate multiple rows and report only rows with errors', () => {
    const mixedData: Evaluation[] = [
      {
        course: 'SENG8130',
        title: 'Assignment 1',
        type: 'Assignment',
        weight: 20,
        dueDate: new Date('2025-09-20'),
        instructor: 'Prof. Patel',
        campus: 'Waterloo',
      },
      {
        course: '',
        title: '',
        type: 'Assignment',
        weight: -5,
        dueDate: new Date('Invalid'),
        instructor: '',
        campus: '',
      },
    ];

    const result = validateEvaluationCsvData(mixedData);
    expect(result).toHaveLength(1);
    expect(result[0].rowIndex).toBe(3);
    expect(result[0].errors.length).toBeGreaterThan(0);
  });
});
