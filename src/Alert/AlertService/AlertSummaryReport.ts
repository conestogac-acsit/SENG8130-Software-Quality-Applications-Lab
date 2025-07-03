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

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((+d - +yearStart) / 86400000) + 1) / 7);
}