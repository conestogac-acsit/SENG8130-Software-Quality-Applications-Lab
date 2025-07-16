import { Evaluation } from '../../Evaluation/EvaluationService';
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

  for (const [week, evals] of weekMap.entries()) {
    if (evals.length > getWeeklyThreshold()) { 
      return true;
    }
  }

  return false;
}
