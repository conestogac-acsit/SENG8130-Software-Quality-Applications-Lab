import React from 'react';
import { Evaluation } from '../../EvaluationService/EvaluationService';
import { useWeeklyLoad } from '../useWeeklyLoad/useWeeklyLoad';

interface Props {
  evaluations: Evaluation[];
}

const SuggestedEvaluation: React.FC<Props> = ({ evaluations }) => {
  const weeklyStats = useWeeklyLoad(evaluations);

  const highLoadWeeks = weeklyStats.filter(w => w.load >= 3); 
  const lowLoadWeeks = weeklyStats.filter(w => w.load <= 1);

  const suggestions = highLoadWeeks.map((high, index) => {
    const low = lowLoadWeeks[index % lowLoadWeeks.length];
    return `Consider moving one evaluation from ${high.week} to ${low.week}`;
  });

  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">📅 Suggested Evaluation Window</h4>
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

export default SuggestedEvaluation;
