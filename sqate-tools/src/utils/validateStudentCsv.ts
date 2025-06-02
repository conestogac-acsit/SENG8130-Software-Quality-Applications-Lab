export type ValidationError = {
  row: number;
  message: string;
};

export const validateStudentCsv = (data: any[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  data.forEach((row, index) => {
    const rowNumber = index + 2; // Account for header row

    if (!row.Name || row.Name.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing Name' });
    }
    if (!row.ID || row.ID.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing ID' });
    }
    if (!row.Email || row.Email.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing Email' });
    }
    if (!row.Section || row.Section.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing Section' });
    }
    if (!row.Document || row.Document.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing Document' });
    }
    if (!row.GitHubEnrolled || row.GitHubEnrolled.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing GitHub Enrolled' });
    }
    if (!row.LoopEnrolled || row.LoopEnrolled.trim() === '') {
      errors.push({ row: rowNumber, message: 'Missing Loop Enrolled' });
    }
  });

  return errors;
};