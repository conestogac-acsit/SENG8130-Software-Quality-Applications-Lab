import React, { useMemo } from 'react';
import { Evaluation } from '../EvaluationService';
import EvaluationTypeBreakdown  from './EvaluationTypeBreakdown';
import { getEvaluationCountsByType } from './getEvaluationCountsByType';

type WeekViewProps = {
  year: number;
  month: number;
  evaluations: Evaluation[];
};

function getMonthWeekRange(year: number, month: number): { start: Date; end: Date } {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const start = new Date(firstDayOfMonth);
  const dayOfWeekStart = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dayOfWeekStart);

  const end = new Date(lastDayOfMonth);
  const dayOfWeekEnd = (end.getDay() + 6) % 7;
  end.setDate(end.getDate() + (6 - dayOfWeekEnd));

  return { start, end };
}

const WeekView: React.FC<WeekViewProps> = ({ year, month, evaluations }) => {
  const weeklyData = useMemo(() => {
    const { start, end } = getMonthWeekRange(year, month);
    const weeks: {
      weekLabel: string;
      weekCount: number;
      typeCounts: Record<Evaluation["type"], number>;
    }[] = [];

    let cursor = new Date(start);
    while (cursor <= end) {
      const weekStart = new Date(cursor);
      const weekEnd = new Date(cursor);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const count = evaluations.filter((e) => {
        const d = e.dueDate;
        return d >= weekStart && d <= weekEnd;
      }).length;

      const weekEvaluations = evaluations.filter((e) => {
        const d = e.dueDate;
        return d >= weekStart && d <= weekEnd;
      });

      const typeCounts = getEvaluationCountsByType(weekEvaluations);


      const label = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;

      weeks.push({
        weekLabel: label,
        weekCount: weekEvaluations.length,
        typeCounts,
      });

      cursor.setDate(cursor.getDate() + 7);
    }

    return weeks;
  }, [evaluations, year, month]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
    {weeklyData.map(({ weekLabel, weekCount, typeCounts }) => (
      <div key={weekLabel} className="rounded p-4 text-center shadow-sm border border-gray-200">
        <div className="font-semibold mb-2">{weekLabel}</div>
        <div className="text-sm font-bold	mb-2">
          {weekCount} evaluations
        </div>
        <EvaluationTypeBreakdown typeCounts={typeCounts} />
      </div>
    ))}
    </div>
  );
};

export default WeekView;
