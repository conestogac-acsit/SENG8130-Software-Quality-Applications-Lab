import type { EvaluationRow } from './evaluation';

export function getEvaluationsByDayMap(
  data: EvaluationRow[],
  startDate: Date,
  endDate: Date
): Record<string, EvaluationRow[]> {
  const result: Record<string, EvaluationRow[]> = {};
  for (const row of data) {
    const rowDate = new Date(row.dueDay);
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