import React from 'react';
import {EnrollStatusCharts} from './EnrollStatusCharts';

export interface ChartData {
  name: string;
  value: number;
}

export interface BarData {
  platform: string;
  Enrolled: number;
  Unenrolled: number;
  Total: number;
}

interface EnrollStatusViewProps {
  pieDataGitHub: ChartData[];
  pieDataLoop: ChartData[];
  barData: BarData[];
}

const EnrollStatusView: React.FC<EnrollStatusViewProps> = ({
  pieDataGitHub,
  pieDataLoop,
  barData,
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enrollment Dashboard – Visual Insights</h1>
      <EnrollStatusCharts
        pieDataGitHub={pieDataGitHub}
        pieDataLoop={pieDataLoop}
        barData={barData}
      />
    </div>
  );
};

export default EnrollStatusView;
