import { CsvAnalysisService } from './CsvAnalysisService';
import { Student, Evaluation } from '../ParseCsv';

describe('CsvAnalysisService', () => {
  const sampleStudents: Student[] = [
    {
      studentId: 'S001',
      name: 'John Doe',
      email: 'john@example.com',
      section: 'A1',
      group: 'Group1',
      role: 'Student',
      loopStatus: 'enrolled',
      githubStatus: 'Active',
      imageUrl: 'https://example.com/john.jpg',
      notes: 'Good student'
    },
    {
      studentId: 'S002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      section: 'A1',
      group: 'Group1',
      role: 'Student',
      loopStatus: 'enrolled',
      githubStatus: 'Active',
      imageUrl: '',
      notes: ''
    },
    {
      studentId: 'S003',
      name: 'Bob Wilson',
      email: '',
      section: 'A2',
      group: 'Group2',
      role: 'Student',
      loopStatus: 'unenrolled',
      githubStatus: 'Deactive',
      imageUrl: '',
      notes: ''
    }
  ];

  const sampleEvaluations: Evaluation[] = [
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
    },
    {
      course: 'CS102',
      title: 'Lab Assignment',
      type: 'Assignment',
      weight: 15,
      dueDate: new Date('2024-12-10'),
      instructor: 'Dr. Johnson',
      campus: 'North Campus'
    }
  ];

  describe('getDataStatistics', () => {
    it('should return correct statistics for student data', () => {
      const stats = CsvAnalysisService.getDataStatistics(sampleStudents);

      expect(stats.totalRecords).toBe(3);
      expect(stats.completeRecords).toBe(1); // Only first student is complete
      expect(stats.completenessPercentage).toBe(33); // 1/3 * 100
      expect(stats.dataTypes).toContain('String');
      expect(stats.estimatedSize).toMatch(/^\d+(\.\d+)? [KMB]?B$/);
    });

    it('should return correct statistics for evaluation data', () => {
      const stats = CsvAnalysisService.getDataStatistics(sampleEvaluations);

      expect(stats.totalRecords).toBe(3);
      expect(stats.completeRecords).toBe(3); // All evaluations are complete
      expect(stats.completenessPercentage).toBe(100);
      expect(stats.dataTypes).toContain('Date');
      expect(stats.dataTypes).toContain('Number');
      expect(stats.dataTypes).toContain('String');
    });

    it('should handle empty data', () => {
      const stats = CsvAnalysisService.getDataStatistics([]);

      expect(stats.totalRecords).toBe(0);
      expect(stats.completeRecords).toBe(0);
      expect(stats.completenessPercentage).toBe(0);
      expect(stats.dataTypes).toEqual([]);
      expect(stats.estimatedSize).toBe('0 KB');
    });

    it('should handle null/undefined data', () => {
      const stats = CsvAnalysisService.getDataStatistics(null as any);

      expect(stats.totalRecords).toBe(0);
      expect(stats.completeRecords).toBe(0);
      expect(stats.completenessPercentage).toBe(0);
    });
  });

  describe('detectMissingFields', () => {
    it('should detect missing fields in student data', () => {
      const missingFields = CsvAnalysisService.detectMissingFields(sampleStudents);

      expect(missingFields.incompleteRecords).toBe(2);
      expect(missingFields.completenessScore).toBe(33);
      expect(missingFields.missingFields.email).toBeDefined();
      expect(missingFields.missingFields.email?.count).toBe(1);
      expect(missingFields.missingFields.imageUrl).toBeDefined();
      expect(missingFields.missingFields.notes).toBeDefined();
    });

    it('should identify critical fields', () => {
      const missingFields = CsvAnalysisService.detectMissingFields(sampleStudents);

      expect(missingFields.missingFields.email?.critical).toBe(true);
      // studentId is not missing in our sample data, so it won't be in missingFields
    });

    it('should handle complete data', () => {
      const completeStudents = [sampleStudents[0]]; // Only the complete student
      const missingFields = CsvAnalysisService.detectMissingFields(completeStudents);

      expect(missingFields.incompleteRecords).toBe(0);
      expect(missingFields.completenessScore).toBe(100);
      expect(Object.keys(missingFields.missingFields)).toHaveLength(0);
    });

    it('should handle empty data', () => {
      const missingFields = CsvAnalysisService.detectMissingFields([]);

      expect(missingFields.incompleteRecords).toBe(0);
      expect(missingFields.completenessScore).toBe(0);
      expect(missingFields.missingFields).toEqual({});
    });
  });

  describe('generateInsights', () => {
    it('should generate insights for student data', () => {
      const insights = CsvAnalysisService.generateInsights(sampleStudents);

      // Check for basic patterns (3 records is not > 50, so no pattern)
      expect(insights.anomalies).toContain('Missing critical fields: email');
      expect(insights.recommendations).toContain('Complete critical fields: email');
      expect(insights.qualityScore).toBeGreaterThan(0);
      expect(insights.qualityScore).toBeLessThanOrEqual(100);
    });

    it('should generate insights for evaluation data', () => {
      const insights = CsvAnalysisService.generateInsights(sampleEvaluations);

      expect(insights.patterns).toContain('Good data quality: 100% complete');
      expect(insights.qualityScore).toBeGreaterThan(80);
    });

    it('should handle empty data', () => {
      const insights = CsvAnalysisService.generateInsights([]);

      expect(insights.patterns).toEqual([]);
      expect(insights.anomalies).toEqual([]);
      expect(insights.recommendations).toEqual([]);
      expect(insights.qualityScore).toBe(0);
    });

    it('should detect data type anomalies', () => {
      const dataWithInvalidDates = [
        { ...sampleStudents[0], dueDate: new Date('Invalid') }
      ];
      const insights = CsvAnalysisService.generateInsights(dataWithInvalidDates);

      expect(insights.anomalies).toContain('Invalid dates found');
    });
  });





  describe('Edge cases and error handling', () => {
    it('should handle data with null values', () => {
      const dataWithNulls = [
        { ...sampleStudents[0], email: null as any }
      ];
      const stats = CsvAnalysisService.getDataStatistics(dataWithNulls);
      const missingFields = CsvAnalysisService.detectMissingFields(dataWithNulls);

      expect(stats.completeRecords).toBe(0);
      expect(missingFields.missingFields.email?.count).toBe(1);
    });

    it('should handle data with undefined values', () => {
      const dataWithUndefined = [
        { ...sampleStudents[0], email: undefined as any }
      ];
      const stats = CsvAnalysisService.getDataStatistics(dataWithUndefined);

      expect(stats.completeRecords).toBe(0);
    });

    it('should handle data with empty strings', () => {
      const dataWithEmptyStrings = [
        { ...sampleStudents[0], email: '' }
      ];
      const stats = CsvAnalysisService.getDataStatistics(dataWithEmptyStrings);

      expect(stats.completeRecords).toBe(0);
    });
  });
}); 