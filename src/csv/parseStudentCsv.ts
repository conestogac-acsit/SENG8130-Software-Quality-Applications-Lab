import Papa from 'papaparse';
import { Student, EnrollmentStatus } from './studentTypes';

const REQUIRED_FIELDS = [
    'studentId',
    'name',
    'email',
    'group',
    'role',
    'loop',
    'github',
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
            // Check for missing fields
            const csvFields = results.meta.fields || [];
            const missingFields = REQUIRED_FIELDS.filter(f => !csvFields.includes(f));
            if (missingFields.length > 0) {
                if (onError) {
                    onError(`Missing required fields. Please upload valide CSV File.`);
                } else {
                    alert(`Missing required fields. Please upload valide CSV File.`);
                }
                return;
            }

            const students: Student[] = results.data.map((row: any) => {
                const toEnrollmentStatus = (val: any): EnrollmentStatus =>
                    val?.toLowerCase() === "yes" ? "Active" as EnrollmentStatus : "Deactive" as EnrollmentStatus;

                return {
                    studentId: row.studentId || '',
                    name: row.name || '',
                    email: row.email || '',
                    group: row.group || '',
                    role: row.role || '',
                    github: row.github || '',
                    loop: row.loop || '',
                    status: row.studentId && row.email ? "enrolled" as EnrollmentStatus : "unenrolled" as EnrollmentStatus,
                    loopStatus: toEnrollmentStatus(row.loopStatus),
                    githubStatus: toEnrollmentStatus(row.githubStatus),
                };
            });

            callback(students);
        },
        error: (err) => {
            console.error('CSV parse error:', err);
            if (onError) {
                onError('CSV parse error');
            } else {
                alert('CSV parse error');
            }
        },
    });
};