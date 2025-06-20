import React from 'react';

interface ChartData {
  name: string;
  value: number;
}

interface BarData {
  platform: string;
  Enrolled: number;
  Unenrolled: number;
  Total: number;
}

interface EnrollStatusChartsProps {
  pieDataGitHub: ChartData[];
  pieDataLoop: ChartData[];
  barData: BarData[];
}

const EnrollStatusCharts: React.FC<EnrollStatusChartsProps> = ({
  pieDataGitHub,
  pieDataLoop,
  barData
}) => {
  return (
    <div>
      <h2>Charts will be implemented here</h2>
    </div>
  );
};

export default EnrollStatusCharts;