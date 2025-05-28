// Supports User Stories 1.1 and 1.2 by preventing bad input from being saved or updated.
import { Evaluation } from '../types/Evaluation';

export function validateEvaluation(evaluation: Partial<Evaluation>): string[] {
  const errors: string[] = [];
  if (!evaluation.courseCode) errors.push("Course Code is required");
  if (!evaluation.evaluationType) errors.push("Evaluation Type is required");
  if (!evaluation.dueDate) errors.push("Due Date is required");
  else if (new Date(evaluation.dueDate) < new Date()) errors.push("Date must be today or in the future");
  return errors;
}