import Papa from 'papaparse';
import { REQUIRED_FIELDS_MAP, ParseType } from './config';

export type EnrollmentStatus = "enrolled" | "unenrolled" | "Active" | "Deactive";

export interface Student {
  studentId: string;
  name: string;
  email: string;
  section: string;
  group: string;
  role: string;
  imageUrl?: string;
  notes?: string;
  loopStatus: EnrollmentStatus;
  githubStatus: EnrollmentStatus;
}

export interface Evaluation {
  course: string;
  title: string;
  type: string;
  weight: number;
  dueDate: Date;
  instructor: string;
  campus: string;
}

export const parseCsv = async <T>(
  file: File,
  type: ParseType
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const requiredFields = REQUIRED_FIELDS_MAP[type];
        const fields = results.meta.fields || [];

        if (!requiredFields.every(f => fields.includes(f))) {
          reject(new Error(`Missing required fields for type ${type}`));
          return;
        }

        try {
          let data: T[];

          if (type === 'Evaluation') {
            data = (results.data as any[]).map(row => ({
              course: row.course || '',
              title: row.title || '',
              type: row.type || '',
              weight: row.weight ? parseFloat(row.weight) : 0,
              dueDate: row.dueDate ? new Date(row.dueDate) : new Date('Invalid'),
              instructor: row.instructor || '',
              campus: row.campus || '',
            })) as T[];
          } else {
            data = results.data as T[];
          }

          resolve(data);
        } catch (error) {
          reject(new Error('Failed to parse CSV.'));
        }
      },
      error: (err) => {
        reject(new Error(err.message));
      }
    });
  });
};
