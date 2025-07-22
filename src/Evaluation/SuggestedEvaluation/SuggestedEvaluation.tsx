import React, { useMemo } from 'react';
import { Evaluation } from '../EvaluationService';

interface Props {
  evaluations: Evaluation[];
}

const SuggestedEvaluation: React.FC<Props> = ({ evaluations }) => {
  const weeklyMap = useMemo(() => {
    const map = new Map<string, Evaluation[]>();
    evaluations.forEach((evalItem) => {
      const due = new Date(evalItem.dueDate);
      const firstJan = new Date(due.getFullYear(), 0, 1);
      const weekNumber = Math.ceil((((+due - +firstJan) / 86400000) + firstJan.getDay() + 1) / 7);
      const weekKey = `Week ${weekNumber}: ${formatWeekRange(due)}`;

      if (!map.has(weekKey)) {
        map.set(weekKey, []);
      }
      map.get(weekKey)!.push(evalItem);
    });
    return map;
  }, [evaluations]);

  const weeklyStats = useMemo(() => {
    return Array.from(weeklyMap.entries()).map(([week, items]) => ({
      week,
      load: items.length
    }));
  }, [weeklyMap]);

  const highLoadWeeks = useMemo(() => {
    return weeklyStats.filter(w => w.load >= 3);
  }, [weeklyStats]);

  const lowLoadWeeks = useMemo(() => {
    return weeklyStats.filter(w => w.load <= 1);
  }, [weeklyStats]);

  const suggestions = useMemo(() => {
    return highLoadWeeks.map((high, index) => {
      const low = lowLoadWeeks[index % lowLoadWeeks.length];
      return `Consider moving one evaluation from ${high.week} to ${low.week}`;
    });
  }, [highLoadWeeks, lowLoadWeeks]);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2"> Suggested Evaluation Window</h4>
      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
        {suggestions.length > 0 ? (
          suggestions.map((sugg, i) => <li key={i}>{sugg}</li>)
        ) : (
          <li>No suggestions available</li>
        )}
      </ul>
    </div>
  );
};

export function formatWeekRange(date: Date): string {
  const day = date.getDay(); 
  const daysToMonday = (day + 6) % 7; 
  const monday = new Date(date);
  monday.setDate(date.getDate() - daysToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const format = (d: Date) =>
    `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;

  return `${format(monday)} – ${format(sunday)}`;
}

export default SuggestedEvaluation;
