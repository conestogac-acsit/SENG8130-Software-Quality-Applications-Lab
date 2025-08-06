import React, { useMemo } from 'react';
import { Evaluation } from '../EvaluationService';
import EvaluationTypeBreakdown from './EvaluationTypeBreakdown';
import { getEvaluationCountsByType } from './getEvaluationCountsByType';

type MonthViewProps = {
  year: number;
  evaluations: Evaluation[];
};

const MonthView: React.FC<MonthViewProps> = ({ year, evaluations }) => {
  const monthlyData = useMemo(() => {
    const data: {
      monthLabel: string;
      count: number;
      typeCounts: Record<Evaluation["type"], number>;
    }[] = [];

    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(year, i, 1);
      const monthEnd = new Date(year, i + 1, 1);

      const monthEvaluations = evaluations.filter((e) => {
        const d = e.dueDate;
        return d >= monthStart && d < monthEnd;
      });

      const typeCounts = getEvaluationCountsByType(monthEvaluations);
      const label = `${monthStart.toLocaleString('default', { month: 'long' })} ${year}`;

      data.push({
        monthLabel: label,
        count: monthEvaluations.length,
        typeCounts,
      });
    }

    return data;
  }, [evaluations, year]);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {monthlyData.map(({ monthLabel, count, typeCounts }) => (
        <div
          key={monthLabel}
          className="rounded p-4 text-center shadow-sm border border-gray-200"
        >
          <div className="font-semibold mb-2">{monthLabel}</div>
          <div className="text-sm font-bold mb-2">
            {count} evaluations
          </div>
          <EvaluationTypeBreakdown typeCounts={typeCounts} />
        </div>
      ))}
    </div>
  );
};

export default MonthView;
