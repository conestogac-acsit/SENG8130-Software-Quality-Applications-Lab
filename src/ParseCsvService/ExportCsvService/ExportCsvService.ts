import Papa from 'papaparse';
import { Student, Evaluation, ParseType } from '../ParseCsv';

export interface ExportOptions {
  filename?: string;
  includeHeaders?: boolean;
  dateFormat?: string;
  delimiter?: string;
}

export interface ExportResult {
  csvContent: string;
  downloadUrl: string;
  filename: string;
  recordCount: number;
}

export class CsvExportService {
  
  static exportStudentsToCsv(
    students: Student[], 
    options: ExportOptions = {}
  ): ExportResult {
    return this.exportToCsv(students, 'Student', options);
  }
  static exportEvaluationsToCsv(
    evaluations: Evaluation[], 
    options: ExportOptions = {}
  ): ExportResult {
    return this.exportToCsv(evaluations, 'Evaluation', options);
  }
  static exportToCsv<T>(
    data: T[], 
    type: ParseType, 
    options: ExportOptions = {}
  ): ExportResult {
    const {
      filename,
      includeHeaders = true,
      delimiter = ','
    } = options;

    const defaultFilename = `${type.toLowerCase()}_export_${new Date().toISOString().split('T')[0]}.csv`;
    const finalFilename = filename || defaultFilename;

    const csv = Papa.unparse(data, {
      header: includeHeaders,
      quotes: true,
      quoteChar: '"',
      escapeChar: '"',
      delimiter,
      newline: '\n'
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);

    return {
      csvContent: csv,
      downloadUrl,
      filename: finalFilename,
      recordCount: data.length
    };
  }
  static exportFilteredStudents(
    students: Student[],
    filterCriteria: Partial<Student>,
    options: ExportOptions = {}
  ): ExportResult {
    const filteredStudents = students.filter(student => {
      return Object.entries(filterCriteria).every(([key, value]) => {
        return student[key as keyof Student] === value;
      });
    });

    return this.exportStudentsToCsv(filteredStudents, options);
  }
  static exportFilteredEvaluations(
    evaluations: Evaluation[],
    filterCriteria: Partial<Evaluation>,
    options: ExportOptions = {}
  ): ExportResult {
    const filteredEvaluations = evaluations.filter(evaluation => {
      return Object.entries(filterCriteria).every(([key, value]) => {
        return evaluation[key as keyof Evaluation] === value;
      });
    });

    return this.exportEvaluationsToCsv(filteredEvaluations, options);
  }
  static exportWithCustomFields<T>(
    data: T[],
    fieldMapping: Record<string, keyof T>,
    options: ExportOptions = {}
  ): ExportResult {
    const mappedData = data.map(item => {
      const mappedItem: Record<string, any> = {};
      Object.entries(fieldMapping).forEach(([csvField, dataField]) => {
        mappedItem[csvField] = item[dataField];
      });
      return mappedItem;
    });

    const csv = Papa.unparse(mappedData, {
      header: options.includeHeaders ?? true,
      quotes: true,
      quoteChar: '"',
      escapeChar: '"',
      delimiter: options.delimiter || ',',
      newline: '\n'
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const downloadUrl = URL.createObjectURL(blob);
    const filename = options.filename || `custom_export_${new Date().toISOString().split('T')[0]}.csv`;

    return {
      csvContent: csv,
      downloadUrl,
      filename,
      recordCount: data.length
    };
  }
} 