import React from 'react';
import { EvaluationType, Evaluation } from '../EvaluationService';

const typeColorMap: Record<EvaluationType, string> = {
  'Assignment': 'bg-blue-500',
  'Mid Exam': 'bg-orange-500',
  'Quiz': 'bg-green-500',
  'Project': 'bg-purple-500',
  'Practical Lab': 'bg-teal-500',
  'Final Exam': 'bg-red-500',
};

type Props = {
  typeCounts: Record<EvaluationType, number>;
};

const EvaluationTypeBreakdown: React.FC<Props> = ({ typeCounts }) => {
  return (
    <div className="space-y-1 mt-2">
      {Object.entries(typeCounts).map(([type, count]) =>
        count > 0 ? (
          <div
            key={type}
            className={`text-sm rounded px-2 py-1 text-white ${typeColorMap[type as EvaluationType]}`}
          >
            {type}: {count}
          </div>
        ) : null
      )}
    </div>
  );
};

export default EvaluationTypeBreakdown;
