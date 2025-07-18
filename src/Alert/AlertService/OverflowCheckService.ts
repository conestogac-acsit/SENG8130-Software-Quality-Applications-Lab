import { Evaluation } from '../../Evaluation/EvaluationService';
import { getWeeklyThreshold } from './AlertThresholdService';

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return weekNo;
}

export function getOverflowWeeks(evaluations: Evaluation[]): Map<number, Evaluation[]> {
  const groupedByWeek = new Map<number, Evaluation[]>();

  for (const ev of evaluations) {
    const dueDate = new Date(ev.dueDate);
    if (isNaN(dueDate.getTime())) {
        throw new Error('-Invalid date in evaluation: ${ev.title}-');
    }

    const week = getISOWeek(dueDate);
    if (!groupedByWeek.has(week)) {
      groupedByWeek.set(week, []);
    }
    groupedByWeek.get(week)!.push(ev);
  }

  const overflows = new Map<number, Evaluation[]>();
  for (const [week, evals] of groupedByWeek.entries()) {
    if (evals.length > getWeeklyThreshold()) {
      overflows.set(week, evals);
    }
  }

  return overflows;
}