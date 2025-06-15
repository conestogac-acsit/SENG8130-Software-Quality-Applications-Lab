import Papa from 'papaparse';
import { Evaluation } from './evaluationTypes';

const REQUIRED_FIELDS = [
    'Course',
    'Title',
    'Type',
    'Weight',
    'Date',
    'Time'
];

export const parseEvaluationCsv = (
    file: File,
    callback: (data: Evaluation[]) => void,
    onError?: (msg: string) => void
) => {
    Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            const csvFields = results.meta.fields || [];
            const missingFields = REQUIRED_FIELDS.filter(f => !csvFields.includes(f));
            if (missingFields.length > 0) {
                const msg = 'Missing required fields. Please upload valid CSV File.';
                if (onError) {
                    onError(msg);
                } else {
                    alert(msg);
                }
                return;
            }

            const evaluations: Evaluation[] = results.data.map((row: any) => ({
                Course: row.Course || '',
                Title: row.Title || '',
                Type: row.Type || '',
                Weight: row.Weight || '',
                Date: row.Date || '',
                Time: row.Time || '',
            }));

            callback(evaluations);
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