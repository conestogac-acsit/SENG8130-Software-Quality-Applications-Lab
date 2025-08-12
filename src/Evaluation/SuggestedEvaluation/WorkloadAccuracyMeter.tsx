// cSpell:ignore evals
import React from 'react';
import { Evaluation } from '../EvaluationService/EvaluationService';

interface WorkloadAccuracyMeterProps {
  evaluations: Evaluation[];
}

// Locally extend Evaluation type
type EvaluationWithWorkload = Evaluation & {
  predictedWorkload?: number;
  actualWorkload?: number;
};

export const WorkloadAccuracyMeter: React.FC<WorkloadAccuracyMeterProps> = ({
  evaluations,
}) => {
  const calculateAccuracy = (evals: EvaluationWithWorkload[]): number => {
    const valid = evals.filter(
      (e) =>
        typeof e.predictedWorkload === 'number' &&
        typeof e.actualWorkload === 'number' &&
        e.actualWorkload > 0
    );

    if (valid.length === 0) return 0;

    const totalAccuracy = valid.reduce((sum, e) => {
      const error = Math.abs(e.predictedWorkload! - e.actualWorkload!);
      const accuracy = 100 - (error / e.actualWorkload!) * 100;
      return sum + Math.max(0, Math.min(accuracy, 100));
    }, 0);

    return Math.round(totalAccuracy / valid.length);
  };

  // Cast once as the extended type
  const accuracy = calculateAccuracy(evaluations as EvaluationWithWorkload[]);

  return (
    <div className="bg-white shadow p-4 rounded-2xl mb-4">
      <h2 className="text-xl font-bold mb-2">🎯 Accuracy Rate</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          role="progressbar"
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
      <p className="text-gray-700 mt-2">
        {accuracy}% accurate workload prediction
      </p>
    </div>
  );
};
