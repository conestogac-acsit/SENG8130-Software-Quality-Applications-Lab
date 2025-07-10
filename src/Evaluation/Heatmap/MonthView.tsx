import React, { useMemo } from 'react';
import { Evaluation } from '../EvaluationService';
type MonthViewProps = {
  year: number;
  evaluations: Evaluation[];
};

const MonthView: React.FC<MonthViewProps> = ({ year, evaluations }) => {
  const monthlyData = useMemo(() => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: `${year}-${String(i + 1).padStart(2, '0')}`,
      count: 0,
    }));

    for (const evaluation of evaluations) {
      const d = evaluation.dueDate;
      if (d.getFullYear() === year) {
        const index = d.getMonth();
        data[index].count++;
      }
    }

    return data;
  }, [evaluations, year]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {monthlyData.map(({ month, count }) => (
        <div
          key={month}
          className={`rounded p-4 text-center shadow-sm ${
            count ? 'text-white' : 'text-gray-500'
          }`}
        >
          <div className="font-semibold">{month}</div>
          <div className="text-sm mt-1">{count} evaluations</div>
        </div>
      ))}
    </div>
  );
};
export default MonthView;