import { CsvExportService, ExportOptions } from './ExportCsvService';
import { Student, Evaluation } from '../ParseCsv';

const mockStudents: Student[] = [
  {
    studentId: '001',
    name: 'John Doe',
    email: 'john@example.com',
    section: 'A1',
    group: 'GroupA',
    role: 'Student',
    imageUrl: '',
    notes: '',
    loopStatus: 'Active',
    githubStatus: 'enrolled'
  },
  {
    studentId: '002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    section: 'A1',
    group: 'GroupA',
    role: 'Student',
    imageUrl: '',
    notes: '',
    loopStatus: 'Active',
    githubStatus: 'enrolled'
  }
];

const mockEvaluations: Evaluation[] = [
  {
    course: 'CS101',
    title: 'Midterm Exam',
    type: 'Exam',
    weight: 30,
    dueDate: new Date('2024-12-15'),
    instructor: 'Dr. Smith',
    campus: 'Main Campus'
  },
  {
    course: 'CS101',
    title: 'Final Project',
    type: 'Project',
    weight: 40,
    dueDate: new Date('2024-12-20'),
    instructor: 'Dr. Smith',
    campus: 'Main Campus'
  }
];

describe('CsvExportService', () => {
  beforeEach(() => {
    global.URL.createObjectURL = function(blob: Blob) {
      return 'mock-download-url';
    };
  });

  afterEach(() => {
    delete (global.URL as any).createObjectURL;
  });

  describe('exportStudentsToCsv', () => {
    it('should export students to CSV with default options', () => {
      const result = CsvExportService.exportStudentsToCsv(mockStudents);

      expect(result.recordCount).toBe(2);
      expect(result.filename).toMatch(/student_export_\d{4}-\d{2}-\d{2}\.csv/);
      expect(result.downloadUrl).toBe('mock-download-url');
      expect(result.csvContent).toContain('"studentId","name","email","section","group","role","imageUrl","notes","loopStatus","githubStatus"');
      expect(result.csvContent).toContain('"001","John Doe","john@example.com","A1","GroupA","Student","","","Active","enrolled"');
    });

    it('should export students with custom filename', () => {
      const options: ExportOptions = { filename: 'custom-students.csv' };
      const result = CsvExportService.exportStudentsToCsv(mockStudents, options);

      expect(result.filename).toBe('custom-students.csv');
    });

    it('should export students without headers', () => {
      const options: ExportOptions = { includeHeaders: false };
      const result = CsvExportService.exportStudentsToCsv(mockStudents, options);

      expect(result.csvContent).not.toContain('"studentId","name","email"');
      expect(result.csvContent).toContain('"001","John Doe","john@example.com"');
    });
  });

  describe('exportEvaluationsToCsv', () => {
    it('should export evaluations to CSV with default options', () => {
      const result = CsvExportService.exportEvaluationsToCsv(mockEvaluations);

      expect(result.recordCount).toBe(2);
      expect(result.filename).toMatch(/evaluation_export_\d{4}-\d{2}-\d{2}\.csv/);
      expect(result.downloadUrl).toBe('mock-download-url');
      expect(result.csvContent).toContain('"course","title","type","weight","dueDate","instructor","campus"');
      expect(result.csvContent).toContain('"CS101","Midterm Exam","Exam","30"');
    });

    it('should export evaluations with custom delimiter', () => {
      const options: ExportOptions = { delimiter: ';' };
      const result = CsvExportService.exportEvaluationsToCsv(mockEvaluations, options);

      expect(result.csvContent).toContain('"course";"title";"type";"weight";"dueDate";"instructor";"campus"');
    });
  });

  describe('exportToCsv', () => {
    it('should export generic data to CSV', () => {
      const result = CsvExportService.exportToCsv(mockStudents, 'Student');

      expect(result.recordCount).toBe(2);
      expect(result.csvContent).toContain('"studentId","name","email"');
    });

    it('should handle empty data array', () => {
      const result = CsvExportService.exportToCsv([], 'Student');

      expect(result.recordCount).toBe(0);
      expect(result.csvContent).toBe('');
    });
  });

  describe('exportFilteredStudents', () => {
    it('should export filtered students by section', () => {
      const filterCriteria = { section: 'A1' };
      const result = CsvExportService.exportFilteredStudents(mockStudents, filterCriteria);

      expect(result.recordCount).toBe(2);
      expect(result.csvContent).toContain('"A1","GroupA","Student"');
    });

    it('should export filtered students by multiple criteria', () => {
      const filterCriteria = { section: 'A1', group: 'GroupA' };
      const result = CsvExportService.exportFilteredStudents(mockStudents, filterCriteria);

      expect(result.recordCount).toBe(2);
    });

    it('should return empty result for non-matching criteria', () => {
      const filterCriteria = { section: 'B2' };
      const result = CsvExportService.exportFilteredStudents(mockStudents, filterCriteria);

      expect(result.recordCount).toBe(0);
    });
  });

  describe('exportFilteredEvaluations', () => {
    it('should export filtered evaluations by course', () => {
      const filterCriteria = { course: 'CS101' };
      const result = CsvExportService.exportFilteredEvaluations(mockEvaluations, filterCriteria);

      expect(result.recordCount).toBe(2);
      expect(result.csvContent).toContain('CS101');
    });

    it('should return empty result for non-matching criteria', () => {
      const filterCriteria = { course: 'CS102' };
      const result = CsvExportService.exportFilteredEvaluations(mockEvaluations, filterCriteria);

      expect(result.recordCount).toBe(0);
    });
  });

  describe('exportWithCustomFields', () => {
    it('should export with custom field mapping', () => {
      const fieldMapping: Record<string, keyof Student> = {
        'ID': 'studentId',
        'Full Name': 'name',
        'Email Address': 'email'
      };
      const result = CsvExportService.exportWithCustomFields(mockStudents, fieldMapping);

      expect(result.recordCount).toBe(2);
      expect(result.csvContent).toContain('"ID","Full Name","Email Address"');
      expect(result.csvContent).toContain('"001","John Doe","john@example.com"');
    });
  });
}); 