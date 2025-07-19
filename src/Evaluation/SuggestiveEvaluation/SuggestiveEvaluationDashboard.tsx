import React from 'react';
import { WorkloadAccuracyMeter } from './WorkloadAccuracyMeter';

export interface SuggestiveEvaluationDashboardProps {
  accuracy: number;
}

export const SuggestiveEvaluationDashboard: React.FC<
  SuggestiveEvaluationDashboardProps
> = ({ accuracy }) => (
  <div
    data-testid="dashboard-container"
    className="flex h-full items-center justify-center p-6"
  >
    <div className="w-full max-w-md">
      <WorkloadAccuracyMeter accuracy={accuracy} />
    </div>
  </div>
);
