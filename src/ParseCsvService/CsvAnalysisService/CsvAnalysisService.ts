export interface DataStats {
  totalRecords: number;
  completeRecords: number;
  completenessPercentage: number;
  dataTypes: string[];
  estimatedSize: string;
}

export interface MissingFieldsReport {
  missingFields: Record<string, MissingFieldInfo>;
  incompleteRecords: number;
  completenessScore: number;
}

export interface MissingFieldInfo {
  count: number;
  percentage: number;
  critical: boolean;
}

export interface DataInsights {
  patterns: string[];
  anomalies: string[];
  recommendations: string[];
  qualityScore: number;
}

export class CsvAnalysisService {

  static getDataStatistics<T>(data: T[]): DataStats {
    if (!data || data.length === 0) {
      return {
        totalRecords: 0,
        completeRecords: 0,
        completenessPercentage: 0,
        dataTypes: [],
        estimatedSize: '0 KB'
      };
    }

    const completeRecords = data.filter(record => 
      Object.values(record as Record<string, any>).every(value => 
        value !== null && value !== undefined && value !== ''
      )
    ).length;

    const dataTypes = this.getDataTypes(data);
    const estimatedSize = this.calculateEstimatedSize(data);

    return {
      totalRecords: data.length,
      completeRecords,
      completenessPercentage: Math.round((completeRecords / data.length) * 100),
      dataTypes,
      estimatedSize
    };
  }
  static detectMissingFields(data: any[]): MissingFieldsReport {
    if (!data || data.length === 0) {
      return {
        missingFields: {},
        incompleteRecords: 0,
        completenessScore: 0
      };
    }

    const missingFields: Record<string, MissingFieldInfo> = {};
    const fields = Object.keys(data[0] || {});
    let incompleteRecords = 0;

    fields.forEach(field => {
      const missingCount = data.filter(record => 
        record[field] === null || 
        record[field] === undefined || 
        record[field] === ''
      ).length;

      if (missingCount > 0) {
        missingFields[field] = {
          count: missingCount,
          percentage: Math.round((missingCount / data.length) * 100),
          critical: this.isCriticalField(field)
        };
      }
    });

    incompleteRecords = data.filter(record => 
      Object.values(record as Record<string, any>).some(value => 
        value === null || value === undefined || value === ''
      )
    ).length;

    const completenessScore = Math.round(((data.length - incompleteRecords) / data.length) * 100);

    return {
      missingFields,
      incompleteRecords,
      completenessScore
    };
  }
  static generateInsights(data: any[]): DataInsights {
    if (!data || data.length === 0) {
      return {
        patterns: [],
        anomalies: [],
        recommendations: [],
        qualityScore: 0
      };
    }

    const patterns: string[] = [];
    const anomalies: string[] = [];
    const recommendations: string[] = [];

    const stats = this.getDataStatistics(data);
    const missingFields = this.detectMissingFields(data);

    if (stats.totalRecords > 50) {
      patterns.push(`Dataset contains ${stats.totalRecords} records`);
    }

    if (stats.completenessPercentage > 90) {
      patterns.push(`Good data quality: ${stats.completenessPercentage}% complete`);
    }

    if (stats.completenessPercentage < 70) {
      anomalies.push(`Low completeness: ${stats.completenessPercentage}%`);
    }

    const criticalMissingFields = Object.entries(missingFields.missingFields)
      .filter(([_, info]) => info.critical)
      .map(([field, _]) => field);

    if (criticalMissingFields.length > 0) {
      anomalies.push(`Missing critical fields: ${criticalMissingFields.join(', ')}`);
    }

    if (stats.dataTypes.includes('Invalid Date')) {
      anomalies.push('Invalid dates found');
    }

    if (stats.dataTypes.includes('NaN')) {
      anomalies.push('Invalid numbers found');
    }

    if (stats.completenessPercentage < 80) {
      recommendations.push('Review and complete missing data');
    }

    if (criticalMissingFields.length > 0) {
      recommendations.push(`Complete critical fields: ${criticalMissingFields.join(', ')}`);
    }

    let qualityScore = stats.completenessPercentage;
    qualityScore -= criticalMissingFields.length * 10;
    qualityScore = Math.max(0, Math.min(100, qualityScore));

    return {
      patterns,
      anomalies,
      recommendations,
      qualityScore
    };
  }

  private static getDataTypes(data: any[]): string[] {
    const types = new Set<string>();
    
    data.forEach(record => {
      Object.values(record).forEach(value => {
        if (value instanceof Date) {
          types.add(isNaN(value.getTime()) ? 'Invalid Date' : 'Date');
        } else if (typeof value === 'number') {
          types.add(isNaN(value) ? 'NaN' : 'Number');
        } else if (typeof value === 'string') {
          types.add('String');
        } else if (typeof value === 'boolean') {
          types.add('Boolean');
        } else if (value === null) {
          types.add('Null');
        } else if (value === undefined) {
          types.add('Undefined');
        }
      });
    });

    return Array.from(types);
  }

  private static calculateEstimatedSize(data: any[]): string {
    if (!data || data.length === 0) return '0 KB';
    
    const sampleRecord = JSON.stringify(data[0]);
    const averageRecordSize = sampleRecord.length;
    const totalSize = averageRecordSize * data.length;
    
    if (totalSize < 1024) {
      return `${totalSize} B`;
    } else if (totalSize < 1024 * 1024) {
      return `${(totalSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  }

  private static isCriticalField(field: string): boolean {
    const criticalFields = [
      'studentId', 'name', 'email', 'course', 'title', 'dueDate'
    ];
    return criticalFields.includes(field);
  }
} 