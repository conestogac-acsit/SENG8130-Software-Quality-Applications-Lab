import { ParseType } from '../ParseCsv';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  summary: ValidationSummary;
}

export interface ValidationError {
  row: number;
  field: string;
  value: any;
  message: string;
  severity: 'error' | 'critical';
}

export interface ValidationWarning {
  row: number;
  field: string;
  value: any;
  message: string;
}

export interface ValidationSummary {
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  errorCount: number;
  warningCount: number;
  completenessScore: number;
}

export interface ValidationOptions {
  customRules?: CustomValidationRule[];
}

export interface CustomValidationRule {
  field: string;
  validator: (value: any, row: any) => boolean;
  message: string;
}

export class CsvValidationService {

  static validateStudentData(
    data: any[], 
    options: ValidationOptions = {}
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    let validRecords = 0;

    data.forEach((row, index) => {
      const rowErrors: ValidationError[] = [];
      const rowWarnings: ValidationWarning[] = [];

      const requiredFields = ['studentId', 'name', 'email', 'section', 'group', 'role', 'loopStatus', 'githubStatus'];
      
      requiredFields.forEach((field: string) => {
        if (!row[field] || row[field].toString().trim() === '') {
          rowErrors.push({
            row: index + 1,
            field,
            value: row[field],
            message: `Required field '${field}' is missing or empty`,
            severity: 'critical'
          });
        }
      });


      if (row.email && !this.isValidEmail(row.email)) {
        rowErrors.push({
          row: index + 1,
          field: 'email',
          value: row.email,
          message: 'Invalid email format',
          severity: 'error'
        });
      }

      if (options.customRules) {
        options.customRules.forEach(rule => {
          if (row[rule.field] && !rule.validator(row[rule.field], row)) {
            rowErrors.push({
              row: index + 1,
              field: rule.field,
              value: row[rule.field],
              message: rule.message,
              severity: 'error'
            });
          }
        });
      }

      const hasCriticalErrors = rowErrors.some(error => error.severity === 'critical');
      if (!hasCriticalErrors) {
        validRecords++;
      }

      errors.push(...rowErrors);
      warnings.push(...rowWarnings);
    });

    return {
      isValid: errors.filter(e => e.severity === 'critical').length === 0,
      errors,
      warnings,
      summary: {
        totalRecords: data.length,
        validRecords,
        invalidRecords: data.length - validRecords,
        errorCount: errors.length,
        warningCount: warnings.length,
        completenessScore: data.length > 0 ? Math.round((validRecords / data.length) * 10000) / 100 : 0
      }
    };
  }

  static validateEvaluationData(
    data: any[], 
    options: ValidationOptions = {}
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    let validRecords = 0;

    data.forEach((row, index) => {
      const rowErrors: ValidationError[] = [];
      const rowWarnings: ValidationWarning[] = [];

      const requiredFields = ['course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'];
      requiredFields.forEach((field: string) => {
        if (!row[field] || row[field].toString().trim() === '') {
          rowErrors.push({
            row: index + 1,
            field,
            value: row[field],
            message: `Required field '${field}' is missing or empty`,
            severity: 'critical'
          });
        }
      });

      if (row.weight !== undefined && row.weight !== null) {
        const weight = parseFloat(row.weight);
        if (isNaN(weight) || weight < 0 || weight > 100) {
          rowErrors.push({
            row: index + 1,
            field: 'weight',
            value: row.weight,
            message: 'Weight must be a number between 0 and 100',
            severity: 'error'
          });
        }
      }

      if (options.customRules) {
        options.customRules.forEach(rule => {
          if (row[rule.field] && !rule.validator(row[rule.field], row)) {
            rowErrors.push({
              row: index + 1,
              field: rule.field,
              value: row[rule.field],
              message: rule.message,
              severity: 'error'
            });
          }
        });
      }

      const hasCriticalErrors = rowErrors.some(error => error.severity === 'critical');
      if (!hasCriticalErrors) {
        validRecords++;
      }

      errors.push(...rowErrors);
      warnings.push(...rowWarnings);
    });

    return {
      isValid: errors.filter(e => e.severity === 'critical').length === 0,
      errors,
      warnings,
      summary: {
        totalRecords: data.length,
        validRecords,
        invalidRecords: data.length - validRecords,
        errorCount: errors.length,
        warningCount: warnings.length,
        completenessScore: data.length > 0 ? Math.round((validRecords / data.length) * 10000) / 100 : 0
      }
    };
  }

  static validateData<T>(
    data: any[], 
    type: ParseType, 
    options: ValidationOptions = {}
  ): ValidationResult {
    switch (type) {
      case 'Student':
        return this.validateStudentData(data, options);
      case 'Evaluation':
        return this.validateEvaluationData(data, options);
      default:
        throw new Error(`Unsupported data type: ${type}`);
    }
  }

  static validateHeaders(
    headers: string[], 
    type: ParseType
  ): { isValid: boolean; missingFields: string[]; extraFields: string[] } {
    const studentFields = ['studentId', 'name', 'email', 'section', 'group', 'role', 'imageUrl', 'notes', 'loopStatus', 'githubStatus'];
    const evaluationFields = ['course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'];
    const fields = type === 'Student' ? studentFields : evaluationFields;
    
    const missingFields = fields.filter((field: string) => !headers.includes(field));
    const extraFields = headers.filter(header => !fields.includes(header));

    return {
      isValid: missingFields.length === 0,
      missingFields,
      extraFields
    };
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}