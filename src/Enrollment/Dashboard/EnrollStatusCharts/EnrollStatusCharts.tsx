import React from 'react';
import EnrollmentPieChart from './EnrollmentPieChart';
import EnrollmentBarChart from './EnrollmentBarChart';
import { ChartData, BarData } from './types'; // ✅ IMPORT TYPES

interface EnrollStatusChartsProps {
  pieDataGitHub: ChartData[];
  pieDataLoop: ChartData[];
  barData: BarData[];
}

const EnrollStatusCharts: React.FC<EnrollStatusChartsProps> = ({
  pieDataGitHub,
  pieDataLoop,
  barData
}) => (
  <>
    <div className="flex flex-col lg:flex-row justify-around items-center gap-8">
      <EnrollmentPieChart
        title="GitHub Enrollment"
        data={pieDataGitHub}
        chartId="githubPieChart"
      />
      <EnrollmentPieChart
        title="Loop Enrollment"
        data={pieDataLoop}
        chartId="loopPieChart"
      />
    </div>
    <EnrollmentBarChart data={barData} />
  </>
);

export default EnrollStatusCharts;

