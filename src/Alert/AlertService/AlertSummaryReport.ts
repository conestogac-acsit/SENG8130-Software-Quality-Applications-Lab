import { Evaluation } from '../../Evaluation/EvaluationService';

export function getAlertSummary(evaluations: Evaluation[], threshold: number): string {
 if (threshold < 0) throw new Error('Threshold cannot be negative');

  const weekCounts = evaluations.reduce((counts, ev) => {
    if (!(ev.dueDate instanceof Date) || isNaN(ev.dueDate.getTime())) {
      throw new Error(`Invalid dueDate for evaluation: ${ev.title}`);
    }

    const week = getISOWeek(ev.dueDate);
    counts[week] = (counts[week] || 0) + 1;
    return counts;
  }, {} as Record<number, number>);

  const overloaded = Object.entries(weekCounts)
    .filter(([_, count]) => count > threshold);

  if (overloaded.length === 0) {
    return "No weeks exceed the evaluation threshold.";
  }

  return [
    "Overloaded Weeks:",
    ...overloaded.map(([week, count]) => `- Week ${week}: ${count} evaluations (Threshold: ${threshold})`)
  ].join('\n');
}