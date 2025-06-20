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

const REQUIRED_FIELDS_MAP = {
  Student: [
    'studentId', 'name', 'email', 'section', 'group', 'role',
    'imageUrl', 'notes', 'loopStatus', 'githubStatus'
  ],

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

        const data = results.data as T[];
        resolve(data);
      },
      error: (err) => {
        reject(err.message);
      }
    });
  });
};
