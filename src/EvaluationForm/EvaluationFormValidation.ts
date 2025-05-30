// EvaluationFormValidation.ts
// Provides input validation for Evaluation form entries.

export interface Evaluation {
  id: string;
  courseCode: string;
  evaluationType: string;
  dueDate: string;
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
