import React from 'react';
import { EnrollStatusCharts } from './EnrollStatusCharts';

const pieDataGitHub = [
  { name: 'Enrolled', value: 12 },
  { name: 'Unenrolled', value: 3 },
];

const pieDataLoop = [
  { name: 'Enrolled', value: 14 },
  { name: 'Unenrolled', value: 2 },
];

const barData = [
  { platform: 'GitHub', Enrolled: 12, Unenrolled: 3, Total: 15 },
  { platform: 'Loop', Enrolled: 14, Unenrolled: 2, Total: 16 },
];

const EnrollStatusView: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
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
