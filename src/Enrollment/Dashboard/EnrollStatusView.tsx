import React from 'react';
import EnrollStatusCharts from './EnrollStatusCharts';


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
      {/* Target for PNG export */}
      <div id="enrollment-dashboard" className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Enrollment Dashboard – Visual Insights</h1>
        <EnrollStatusCharts
          pieDataGitHub={pieDataGitHub}
          pieDataLoop={pieDataLoop}
          barData={barData}
        />
      </div>

      {/* Export button section */}
    </div>
  );
};

export default EnrollStatusView;