// src/Evaluation/SuggestedEvaluation/TimeSavedStats.tsx

import React, { useMemo } from 'react';
import { Evaluation } from '../EvaluationService';

interface Props {
  evaluations: Evaluation[];
}

const TimeSavedStats: React.FC<Props> = ({ evaluations }) => {
  const timeSaved = useMemo(() => {
    const weeklyMap = new Map<string, number>();

    evaluations.forEach((evalItem) => {
      const date = new Date(evalItem.dueDate);
      const weekKey = getWeekKey(date);
      weeklyMap.set(weekKey, (weeklyMap.get(weekKey) || 0) + 1);
    });

    let saved = 0;
    weeklyMap.forEach((count) => {
      if (count > 3) {
        saved += (count - 3) * 2; // Assuming 2 hours saved per excess evaluation
      }
    });

    return saved;
  }, [evaluations]);

  return (
    <div className="bg-blue-100 text-blue-800 px-4 py-2 mt-2 rounded text-sm font-medium">
      ⏳ Estimated Time Saved: {timeSaved} hours by redistributing evaluations.
    </div>
  );
};

/**
 * Returns a consistent week key starting on Monday.
 */
function getWeekKey(date: Date): string {
  const day = date.getDay(); // Sunday = 0, Monday = 1, ...
  const daysToMonday = (day + 6) % 7;
  const monday = new Date(date);
  monday.setDate(date.getDate() - daysToMonday);

  return monday.toISOString().split('T')[0]; // e.g., '2024-01-15'
}

export default TimeSavedStats;
