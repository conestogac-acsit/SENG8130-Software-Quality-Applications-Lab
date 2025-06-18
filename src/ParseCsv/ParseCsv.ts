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

export const parseCsv = (
  file: File,
  type: ParseType,
  callback: (data: any[]) => void,
  onError?: (msg: string) => void
) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const requiredFields = REQUIRED_FIELDS_MAP[type];
      const csvFields = results.meta.fields || [];
      const missingFields = requiredFields.filter(f => !csvFields.includes(f));

      if (missingFields.length > 0) {
        const errorMessage = `Missing required fields for ${type}. Please upload a valid CSV file.`;
        onError ? onError(errorMessage) : alert(errorMessage);
        return;
      }

      const toStatus = (val: any): EnrollmentStatus =>
        val?.toLowerCase() === 'yes' ? 'Active' : 'Deactive';

      const data = (results.data as any[]).map((row) => {
        if (type === "Student") {
          const student: Student = {
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
          return student;
        }

        return row;
      });

      callback(data);
    },
    error: (err) => {
      console.error('CSV parse error:', err);
      const fallback = 'CSV parse error';
      onError ? onError(fallback) : alert(fallback);
    }
  });
};
