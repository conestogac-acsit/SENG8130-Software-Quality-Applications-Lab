import React from "react";
import { Evaluation } from "../EvaluationService/EvaluationService";

interface EvaluationAlertProps {
  evaluations: Evaluation[];
  threshold: number;
}

const EvaluationAlert: React.FC<EvaluationAlertProps> = ({ evaluations, threshold }) => {
  if (!evaluations || evaluations.length === 0) return null;

  const weekCounts: Record<number, number> = {};
  evaluations.forEach(ev => {
    const oneJan = new Date(ev.dueDate.getFullYear(), 0, 1);
    const days = Math.floor((ev.dueDate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((days + oneJan.getDay() + 1) / 7);
    weekCounts[week] = (weekCounts[week] || 0) + 1;
  });

  const overloadedWeeks = Object.keys(weekCounts)
    .map(Number)
    .filter(week => weekCounts[week] > threshold);

  if (overloadedWeeks.length === 0) return null;

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
      {overloadedWeeks.map(week => (
        <p key={week}>
          Week {week} has too many evaluations ({weekCounts[week]}).
        </p>
      ))}
    </div>
  );
};

export default EvaluationAlert;
