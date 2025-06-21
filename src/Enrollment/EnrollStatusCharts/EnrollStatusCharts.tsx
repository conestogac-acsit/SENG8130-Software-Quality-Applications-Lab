import React from 'react';
import EnrollmentPieChart from './EnrollmentPieChart';
import EnrollmentBarChart from './EnrollmentBarChart';

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

<>
    <div className="flex flex-col lg:flex-row justify-around items-center gap-8">
      <EnrollmentPieChart title="GitHub Enrollment" data={pieDataGitHub} chartId="githubPieChart" />
      <EnrollmentPieChart title="Loop Enrollment" data={pieDataLoop} chartId="loopPieChart" />
    </div>
    <EnrollmentBarChart data={barData} />
  </>
);

export default EnrollStatusCharts;