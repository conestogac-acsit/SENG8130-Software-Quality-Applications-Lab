import type { Evaluation } from '../../EvaluationService';

export function getEvaluationsByDayMap(
  data: Evaluation[],
  startDate: Date,
  endDate: Date
): Record<string, Evaluation[]> {
  const result: Record<string, Evaluation[]> = {};

  for (const row of data) {
    const rowDate = row.dueDate;
    if (!(rowDate instanceof Date) || isNaN(rowDate.getTime())) continue;

    if (rowDate >= startDate && rowDate <= endDate) {
      const key = rowDate.toISOString().split('T')[0];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(row);
    }
  }

  return result;
}