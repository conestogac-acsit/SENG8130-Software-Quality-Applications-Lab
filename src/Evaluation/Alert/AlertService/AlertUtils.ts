import { Evaluation } from "../../EvaluationService";
import { getISOWeek } from 'date-fns';

let weeklyThreshold = 2;

export function setWeeklyThreshold(value: number): void {
  if (value < 1) throw new Error("Threshold must be ≥ 1");
  weeklyThreshold = value;
}

export function getWeeklyThreshold(): number {
  return weeklyThreshold;
}

export function shouldDisplayAlerts(evaluations: Evaluation[]): boolean {
  const weekMap = new Map<number, Evaluation[]>();

  evaluations.forEach(ev => {
    const week = getISOWeek(ev.dueDate);
    if (!weekMap.has(week)) {
      weekMap.set(week, []);
    }
    weekMap.get(week)!.push(ev);
  });

  for (const [, evals] of weekMap.entries()) {
    if (evals.length > getWeeklyThreshold()) {
      return true;
    }
  }

  return false;
}

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
