import Papa from 'papaparse';
import { LocalStorage } from '../localStorageService';
import type { StorageService } from '../localStorageService/StorageService';

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

export const parseCsv = async <T extends Student | Evaluation>(
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

          const { internalDuplicates, existingDuplicates } = detectDuplicates(data, type);

          if (internalDuplicates.length > 0 || existingDuplicates.length > 0) {
            const userChoice = confirm(
              `Duplicate records detected:\n\n` +
              `- ${internalDuplicates.length} duplicates found in uploaded file.\n` +
              `- ${existingDuplicates.length} duplicates already exist in saved records.\n\n` +
              `Click "OK" to replace duplicates (overwrite old data).\n` +
              `Click "Cancel" to skip duplicates (save only unique records).`
            );

            const strategy = userChoice ? "replace" : "skip";
            saveDataWithStrategy(data, existingDuplicates, type, strategy);

            alert(`Data saved successfully. Duplicates were handled using "${strategy}" strategy.`);
          } else {
            saveDataWithStrategy(data, [], type, "skip");
            alert("No duplicates found. All records have been saved successfully!");
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

function detectDuplicates<T extends Student | Evaluation>(
  parsedData: T[],
  type: ParseType,
  storage: StorageService = new LocalStorage()
) {
  const existingData = storage.load<T[]>(type) || [];
  const seen = new Set<string>();
  const internalDuplicates: T[] = [];

  const getKey = (item: T) =>
    type === "Student"
      ? (item as Student).studentId
      : `${(item as Evaluation).course}-${(item as Evaluation).title}`;

  for (const row of parsedData) {
    const key = getKey(row);
    if (seen.has(key)) {
      internalDuplicates.push(row);
    } else {
      seen.add(key);
    }
  }

  const existingKeys = new Set(existingData.map(getKey));
  const existingDuplicates = parsedData.filter(row => existingKeys.has(getKey(row)));

  return { internalDuplicates, existingDuplicates };
}

function saveDataWithStrategy<T extends Student | Evaluation>(
  parsedData: T[],
  duplicates: T[],
  type: ParseType,
  strategy: "skip" | "replace",
  storage: StorageService = new LocalStorage()
) {
  const existingData = storage.load<T[]>(type) || [];

  const getKey = (item: T) =>
    type === "Student"
      ? (item as Student).studentId
      : `${(item as Evaluation).course}-${(item as Evaluation).title}`;

  if (strategy === "skip") {
    const duplicateKeys = new Set(duplicates.map(getKey));
    const filtered = parsedData.filter(item => !duplicateKeys.has(getKey(item)));
    storage.save(type, [...existingData, ...filtered]);
  } else {
    const duplicateKeys = new Set(duplicates.map(getKey));
    const filteredExisting = existingData.filter(item => !duplicateKeys.has(getKey(item)));
    storage.save(type, [...filteredExisting, ...parsedData]);
  }
}
