import type { Evaluation } from "../../EvaluationService";

export interface FilterOptions {
  campus?: string;
  instructor?: string;
  type?: string;
  date?: Date;
}

export function filterEvaluations(
  evaluations: Evaluation[],
  filters: FilterOptions
): Evaluation[] {
  if (
    filters.date &&
    (!(filters.date instanceof Date) || isNaN(filters.date.getTime()))
  ) {
    throw new Error("Invalid date object");
  }

  const filterDateString = filters.date ? filters.date.toDateString() : null;

  return evaluations.filter((ev) => {
    const matchCampus = !filters.campus || ev.campus === filters.campus;
    const matchInstructor = !filters.instructor || ev.instructor === filters.instructor;
    const matchType = !filters.type || ev.type === filters.type;

    const evDueDateString = ev.dueDate ? new Date(ev.dueDate).toDateString() : null;
    const matchDate = !filterDateString || evDueDateString === filterDateString;

    return matchCampus && matchInstructor && matchType && matchDate;
  });
}
