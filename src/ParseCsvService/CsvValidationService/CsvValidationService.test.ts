import { CsvValidationService, ValidationOptions, CustomValidationRule } from './CsvValidationService';
import {ParseType} from '../ParseCsv';

describe('CsvValidationService', () => {
  describe('validateStudentData', () => {
    it('should validate valid student data successfully', () => {
      const validStudents = [
        {
          studentId: '001',
          name: 'Alice Smith',
          email: 'alice@example.com',
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateStudentData(validStudents);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
      expect(result.summary.validRecords).toBe(1);
      expect(result.summary.totalRecords).toBe(1);
      expect(result.summary.completenessScore).toBe(100);
    });

    it('should detect missing required fields', () => {
      const invalidStudents = [
        {
          studentId: '001',
          name: 'Alice Smith',
          // email is missing
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateStudentData(invalidStudents);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('email');
      expect(result.errors[0].severity).toBe('critical');
      expect(result.summary.validRecords).toBe(0);
    });

    it('should detect invalid email format', () => {
      const studentsWithInvalidEmail = [
        {
          studentId: '001',
          name: 'Alice Smith',
          email: 'invalid-email',
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateStudentData(studentsWithInvalidEmail);

      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('email');
      expect(result.errors[0].message).toBe('Invalid email format');
      expect(result.errors[0].severity).toBe('error');
    });

    it('should handle empty data array', () => {
      const result = CsvValidationService.validateStudentData([]);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
      expect(result.summary.totalRecords).toBe(0);
      expect(result.summary.validRecords).toBe(0);
      expect(result.summary.completenessScore).toBe(0);
    });

    it('should apply custom validation rules', () => {
      const students = [
        {
          studentId: '001',
          name: 'Alice Smith',
          email: 'alice@example.com',
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const customRule: CustomValidationRule = {
        field: 'name',
        validator: (value: string) => value.length >= 5,
        message: 'Name must be at least 5 characters long'
      };

      const options: ValidationOptions = {
        customRules: [customRule]
      };

      const result = CsvValidationService.validateStudentData(students, options);

      expect(result.isValid).toBe(true); // Name is valid
      expect(result.errors).toHaveLength(0);
    });

    it('should detect custom validation rule violations', () => {
      const students = [
        {
          studentId: '001',
          name: 'Bob', // Too short
          email: 'bob@example.com',
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const customRule: CustomValidationRule = {
        field: 'name',
        validator: (value: string) => value.length >= 5,
        message: 'Name must be at least 5 characters long'
      };

      const options: ValidationOptions = {
        customRules: [customRule]
      };

      const result = CsvValidationService.validateStudentData(students, options);

      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('name');
      expect(result.errors[0].message).toBe('Name must be at least 5 characters long');
    });
  });

  describe('validateEvaluationData', () => {
    it('should validate valid evaluation data successfully', () => {
      const validEvaluations = [
        {
          course: 'CS101',
          title: 'Midterm Exam',
          type: 'Exam',
          weight: 30,
          dueDate: '2024-03-15',
          instructor: 'John Smith',
          campus: 'Main Campus'
        }
      ];

      const result = CsvValidationService.validateEvaluationData(validEvaluations);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
      expect(result.summary.validRecords).toBe(1);
      expect(result.summary.totalRecords).toBe(1);
      expect(result.summary.completenessScore).toBe(100);
    });

    it('should detect missing required fields', () => {
      const invalidEvaluations = [
        {
          course: 'CS101',
          title: 'Midterm Exam',
          // type is missing
          weight: 30,
          dueDate: '2024-03-15',
          instructor: 'John Smith',
          campus: 'Main Campus'
        }
      ];

      const result = CsvValidationService.validateEvaluationData(invalidEvaluations);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('type');
      expect(result.errors[0].severity).toBe('critical');
    });

    it('should detect invalid weight values', () => {
      const evaluationsWithInvalidWeight = [
        {
          course: 'CS101',
          title: 'Midterm Exam',
          type: 'Exam',
          weight: 150, // Invalid: > 100
          dueDate: '2024-03-15',
          instructor: 'John Smith',
          campus: 'Main Campus'
        }
      ];

      const result = CsvValidationService.validateEvaluationData(evaluationsWithInvalidWeight);

      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('weight');
      expect(result.errors[0].message).toBe('Weight must be a number between 0 and 100');
    });



    it('should handle empty data array', () => {
      const result = CsvValidationService.validateEvaluationData([]);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
      expect(result.summary.totalRecords).toBe(0);
      expect(result.summary.validRecords).toBe(0);
      expect(result.summary.completenessScore).toBe(0);
    });
  });

  describe('validateData', () => {
    it('should validate student data using generic method', () => {
      const students = [
        {
          studentId: '001',
          name: 'Alice Smith',
          email: 'alice@example.com',
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateData(students, 'Student');

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate evaluation data using generic method', () => {
      const evaluations = [
        {
          course: 'CS101',
          title: 'Midterm Exam',
          type: 'Exam',
          weight: 30,
          dueDate: '2024-03-15',
          instructor: 'John Smith',
          campus: 'Main Campus'
        }
      ];

      const result = CsvValidationService.validateData(evaluations, 'Evaluation');

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should throw error for unsupported data type', () => {
      const data = [{ someField: 'value' }];

      expect(() => {
        CsvValidationService.validateData(data, 'UnsupportedType' as ParseType);
      }).toThrow('Unsupported data type: UnsupportedType');
    });
  });

  describe('validateHeaders', () => {
    it('should validate student headers successfully', () => {
      const headers = [
        'studentId', 'name', 'email', 'section', 'group', 'role',
        'imageUrl', 'notes', 'loopStatus', 'githubStatus'
      ];

      const result = CsvValidationService.validateHeaders(headers, 'Student');

      expect(result.isValid).toBe(true);
      expect(result.missingFields).toHaveLength(0);
      expect(result.extraFields).toHaveLength(0);
    });

    it('should detect missing required fields in headers', () => {
      const headers = [
        'studentId', 'name', 'email', 'section', 'group', 'role'
        
      ];

      const result = CsvValidationService.validateHeaders(headers, 'Student');

      expect(result.isValid).toBe(false);
      expect(result.missingFields).toHaveLength(4);
      expect(result.missingFields).toContain('imageUrl');
      expect(result.missingFields).toContain('notes');
      expect(result.missingFields).toContain('loopStatus');
      expect(result.missingFields).toContain('githubStatus');
    });

    it('should detect extra fields in headers', () => {
      const headers = [
        'studentId', 'name', 'email', 'section', 'group', 'role',
        'imageUrl', 'notes', 'loopStatus', 'githubStatus', 'extraField1', 'extraField2'
      ];

      const result = CsvValidationService.validateHeaders(headers, 'Student');

      expect(result.isValid).toBe(true); // Still valid because all required fields are present
      expect(result.extraFields).toHaveLength(2);
      expect(result.extraFields).toContain('extraField1');
      expect(result.extraFields).toContain('extraField2');
    });

    it('should validate evaluation headers successfully', () => {
      const headers = [
        'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
      ];

      const result = CsvValidationService.validateHeaders(headers, 'Evaluation');

      expect(result.isValid).toBe(true);
      expect(result.missingFields).toHaveLength(0);
      expect(result.extraFields).toHaveLength(0);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle null values in data', () => {
      const studentsWithNulls = [
        {
          studentId: '001',
          name: null,
          email: 'alice@example.com',
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateStudentData(studentsWithNulls);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('name');
      expect(result.errors[0].severity).toBe('critical');
    });

    it('should handle undefined values in data', () => {
      const studentsWithUndefined = [
        {
          studentId: '001',
          name: 'Alice Smith',
          email: undefined,
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateStudentData(studentsWithUndefined);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('email');
      expect(result.errors[0].severity).toBe('critical');
    });

    it('should handle empty string values', () => {
      const studentsWithEmptyStrings = [
        {
          studentId: '001',
          name: 'Alice Smith',
          email: '   ', 
          section: 'A1',
          group: 'GroupA',
          role: 'Student',
          imageUrl: '',
          notes: '',
          loopStatus: 'Active',
          githubStatus: 'enrolled'
        }
      ];

      const result = CsvValidationService.validateStudentData(studentsWithEmptyStrings);

      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      expect(result.errors.some(e => e.field === 'email' && e.severity === 'critical')).toBe(true);
      expect(result.errors.some(e => e.field === 'email' && e.severity === 'error')).toBe(true);
    });

    it('should handle mixed data types in weight field', () => {
      const evaluationsWithMixedTypes = [
        {
          course: 'CS101',
          title: 'Midterm Exam',
          type: 'Exam',
          weight: '30',
          dueDate: '2024-03-15',
          instructor: 'John Smith',
          campus: 'Main Campus'
        }
      ];

      const result = CsvValidationService.validateEvaluationData(evaluationsWithMixedTypes);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should handle invalid weight values', () => {
      const evaluationsWithInvalidWeight = [
        {
          course: 'CS101',
          title: 'Midterm Exam',
          type: 'Exam',
          weight: 'invalid',
          dueDate: '2024-03-15',
          instructor: 'John Smith',
          campus: 'Main Campus'
        }
      ];

      const result = CsvValidationService.validateEvaluationData(evaluationsWithInvalidWeight);

      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].field).toBe('weight');
      expect(result.errors[0].message).toBe('Weight must be a number between 0 and 100');
    });
  });
})