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

const REQUIRED_FIELDS = [
  'studentId',
  'name',
  'email',
  'section',
  'group',
  'role',
  'imageUrl',
  'notes',
  'loopStatus',
  'githubStatus'
];

export const parseStudentCsv = (
  file: File,
  callback: (data: Student[]) => void,
  onError?: (msg: string) => void
) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      const csvFields = results.meta.fields || [];
      const missingFields = REQUIRED_FIELDS.filter(f => !csvFields.includes(f));

      if (missingFields.length > 0) {
        const errorMessage = 'Missing required fields. Please upload valid CSV file.';
        onError ? onError(errorMessage) : alert(errorMessage);
        return;
      }

      const students: Student[] = (results.data as any[]).map((row) => {
  const toStatus = (val: any): EnrollmentStatus =>
    val?.toLowerCase() === 'yes' ? 'Active' : 'Deactive';

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

      callback(students);
    },
    error: (err) => {
      console.error('CSV parse error:', err);
      const fallback = 'CSV parse error';
      onError ? onError(fallback) : alert(fallback);
    }
  });
};
