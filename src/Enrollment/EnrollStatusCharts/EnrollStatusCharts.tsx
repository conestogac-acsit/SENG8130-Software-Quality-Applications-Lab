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