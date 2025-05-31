// EvaluationFormValidation.ts
// Provides input validation for Evaluation form entries.

export interface Evaluation {
  id: string;     // Unique identifier (UUID)
  courseCode: string; // to keep course unique, formatted as: course name + semester + section number (e.g., SENG8071-25S-2)
  evaluationType: string;// Type of evaluation (e.g., quiz, exam)
  dueDate: string;// Due date in YYYY-MM-DD format
}

export function validateEvaluation(evaluation: Partial<Evaluation>): string[] {
  const errors: string[] = [];

  if (!evaluation.courseCode) {
    errors.push("Course Code is required");
  }

  if (!evaluation.evaluationType) {
    errors.push("Evaluation Type is required");
  }

  if (!evaluation.dueDate) {
    errors.push("Due Date is required");
  } else if (new Date(evaluation.dueDate) < new Date()) {
    errors.push("Date must be today or in the future");
  }

  return errors;
}
