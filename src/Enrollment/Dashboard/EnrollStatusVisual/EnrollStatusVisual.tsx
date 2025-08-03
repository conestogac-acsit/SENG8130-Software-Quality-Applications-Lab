import React from 'react';
import EnrollStatusCharts from './EnrollStatusCharts';


import { ChartData, BarData } from './EnrollStatusCharts';

const EnrollStatusVisual: React.FC = () => {
const githubPieData: ChartData[] = [];
const loopPieData: ChartData[] = [];
const barData: BarData[] = [];

  return (
    <div id="enrollment-dashboard" className="space-y-10 p-6">
      <EnrollStatusCharts
        pieDataGitHub={githubPieData}
        pieDataLoop={loopPieData}
        barData={barData}
      />
  
    </div>
  );
};

export default EnrollStatusVisual;