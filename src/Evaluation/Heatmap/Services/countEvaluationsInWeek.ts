import type { EvaluationRow } from './evaluation';

export function countEvaluationsInWeek(
  data: EvaluationRow[],
  weekDays: Date[]
): number {
  return data.filter((item) => {
    const dueDate = new Date(item.dueDay.trim());
    if (isNaN(dueDate.getTime())) return false;

    return weekDays.some((day) =>
      dueDate.getFullYear() === day.getFullYear() &&
      dueDate.getMonth() === day.getMonth() &&
      dueDate.getDate() === day.getDate()
    );
  }).length;
}

export function shouldHighlightWeek(count: number, threshold: number = 2): boolean {
  return count > threshold;
}