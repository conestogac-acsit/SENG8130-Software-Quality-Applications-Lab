import Papa from 'papaparse';

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

const REQUIRED_FIELDS_MAP = {
  Student: [
    'studentId', 'name', 'email', 'section', 'group', 'role',
    'imageUrl', 'notes', 'loopStatus', 'githubStatus'
  ],
  Evaluation: [
    'course', 'title', 'type', 'weight', 'dueDate', 'instructor', 'campus'
  ]
} as const;

export type ParseType = keyof typeof REQUIRED_FIELDS_MAP;

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
        const csvFields = results.meta.fields;

        if (!csvFields || !requiredFields.every(field => csvFields.includes(field))) {
          reject(`Missing required fields for type ${type}`);
          return;
        }

        let data: T[];
        try {
          if (type === 'Evaluation') {
            data = (results.data as any[]).map((row: any) => ({
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
          reject('Failed to parse CSV.');
        }
      },
      error: (err) => {
        reject(err.message);
      }
    });
  });
};
