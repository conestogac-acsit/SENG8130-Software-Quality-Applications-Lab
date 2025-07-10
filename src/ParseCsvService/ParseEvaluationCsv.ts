import Papa from 'papaparse';

export interface Evaluation {
  course: string;
  title: string;
  type: string;
  weight: number;
  dueDate: Date;
  instructor: string;
  campus: string;
}

export const ParseEvaluationCsv = (
  file: File,
  callback: (data: Evaluation[]) => void,
  onError?: (errorMsg: string) => void
): void => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      try {
        const evaluations: Evaluation[] = results.data.map((row: any) => ({
          course: row.course || '',
          title: row.title || '',
          type: row.type || '',
          weight: row.weight ? parseFloat(row.weight) : 0,
          dueDate: row.dueDate ? new Date(row.dueDate) : new Date('Invalid'),
          instructor: row.instructor || '',
          campus: row.campus || '',
        }));

        callback(evaluations);
      } catch (error) {
        if (onError) {
          onError('Failed to parse CSV.');
        } else {
          console.error('Failed to parse CSV.');
        }
      }
    },
    error: () => {
      if (onError) {
        onError('Error while parsing CSV.');
      } else {
        console.error('Error while parsing CSV.');
      }
    },
  });
};
