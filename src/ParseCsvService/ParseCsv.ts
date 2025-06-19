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

type ParseType = keyof typeof REQUIRED_FIELDS_MAP;

export const parseCsv = async (
  file: File,
  type: ParseType
): Promise<Student[]> => {
  const text = await file.text();

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const requiredFields = REQUIRED_FIELDS_MAP[type];
        const csvFields = results.meta.fields || [];
        const missingFields = requiredFields.filter(f => !csvFields.includes(f));

        if (missingFields.length > 0) {
          return reject(`Missing required fields for ${type}. Please upload a valid CSV file.`);
        }

        const toStatus = (val: string): EnrollmentStatus =>
          val?.toLowerCase() === 'yes' ? 'Active' : 'Deactive';

        const data = (results.data as any[]).map(row => {
          return {
            studentId: row.studentId || '',
            name: row.name || '',
            email: row.email || '',
            section: row.section || '',
            group: row.group || '',
            role: row.role || '',
            imageUrl: row.imageUrl || '',
            notes: row.notes || '',
            loopStatus: toStatus(row.loopStatus),
            githubStatus: toStatus(row.githubStatus),
          };
        });

        resolve(data);
      },
      error: () => {
        reject('CSV parse error');
      }
    });
  });
};
