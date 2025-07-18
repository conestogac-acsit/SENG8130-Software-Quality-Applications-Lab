
import { Evaluation } from '../../EvaluationService/EvaluationService';

export const useWeeklyLoad = (evaluations: Evaluation[]) => {
  const weekMap = new Map<string, Evaluation[]>();

  evaluations.forEach((evalItem) => {
    const weekKey = getWeekRange(evalItem.dueDate);
    if (!weekMap.has(weekKey)) weekMap.set(weekKey, []);
    weekMap.get(weekKey)?.push(evalItem);
  });

  const weeklyStats = Array.from(weekMap.entries()).map(([week, list]) => ({
    week,
    load: list.length,
    evaluations: list,
  }));

  return weeklyStats;
};

function getWeekRange(date: Date): string {
  const d = new Date(date);
  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() - d.getDay() + 1); 
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6); 

  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  return `Week ${getWeekNumber(date)}: ${formatter.format(weekStart)} – ${formatter.format(weekEnd)}`;
}

function getWeekNumber(date: Date): number {
  const d = new Date(date);
  const firstDay = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
}
