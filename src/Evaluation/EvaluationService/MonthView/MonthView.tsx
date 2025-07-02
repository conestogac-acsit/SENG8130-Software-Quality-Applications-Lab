import React from 'react';
import { Evaluation, EvaluationService } from '../../EvaluationService';
import { LocalStorage } from '../../../localStorageService';

type MonthViewProps = {
  service?: EvaluationService;
};

const MonthView: React.FC<MonthViewProps> = ({ service }) => {
  const evaluationService = service || new EvaluationService(new LocalStorage());
  const allEvaluations: Evaluation[] = evaluationService.loadEvaluations();

  const currentYear = new Date().getFullYear();
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: `${currentYear}-${String(i + 1).padStart(2, '0')}`,
    count: 0,
  }));

  for (const evaluation of allEvaluations) {
    const d = evaluation.dueDate;
    if (d.getFullYear() === currentYear) {
      const index = d.getMonth();
      monthlyData[index].count++;
    }
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {monthlyData.map(({ month, count }) => (
        <div
          key={month}
          className={`rounded p-4 text-center shadow-sm ${
            count ? 'text-white bg-blue-600' : 'text-gray-500 bg-gray-100'
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
