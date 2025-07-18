import { Evaluation } from "../Evaluation/EvaluationService/EvaluationService";

export interface ValidationError {
  rowIndex: number;
  errors: { field: keyof Evaluation; message: string }[];
}

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const validateEvaluationCsvData = (data: Evaluation[]): ValidationError[] => {
  const errors: ValidationError[] = [];

  data.forEach((item, index) => {
    const rowErrors: ValidationError['errors'] = [];

    if (!item.course.trim()) {
      rowErrors.push({ field: 'course', message: 'Course is required' });
    }

    if (!item.title.trim()) {
      rowErrors.push({ field: 'title', message: 'Title is required' });
    }

    if (!item.type.trim()) {
      rowErrors.push({ field: 'type', message: 'Type is required' });
    }

    if (item.weight === undefined || isNaN(item.weight)) {
      rowErrors.push({ field: 'weight', message: 'Weight must be a number' });
    } else if (item.weight < 0 || item.weight > 100) {
      rowErrors.push({ field: 'weight', message: 'Weight must be between 0 and 100' });
    }

    if (!isValidDate(item.dueDate)) {
      rowErrors.push({ field: 'dueDate', message: 'Invalid due date' });
    }

    if (!item.instructor.trim()) {
      rowErrors.push({ field: 'instructor', message: 'Instructor is required' });
    }

    if (!item.campus.trim()) {
      rowErrors.push({ field: 'campus', message: 'Campus is required' });
    }

    if (rowErrors.length > 0) {
      errors.push({
        rowIndex: index + 2,
        errors: rowErrors
      });
    }
  });

  return errors;
};
