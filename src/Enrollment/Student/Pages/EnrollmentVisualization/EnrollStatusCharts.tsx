import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

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
    <>
      {/* Pie Charts */}
      <div className="flex flex-col lg:flex-row justify-around items-center gap-8">
        <div id="githubPieChart" className="text-center">
          <h2 className="text-lg font-semibold mb-2">GitHub Enrollment</h2>
          <PieChart width={250} height={250}>
            <Pie 
              data={pieDataGitHub} 
              dataKey="value" 
              nameKey="name" 
              outerRadius={100} 
              label={({name, value, percent}) => ${name}: ${value} (${(percent * 100).toFixed(1)}%)}
            >
              {pieDataGitHub.map((entry, index) => (
                <Cell key={cell-github-${index}} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, 'Students']} />
          </PieChart>
        </div>

        <div id="loopPieChart" className="text-center">
          <h2 className="text-lg font-semibold mb-2">Loop Enrollment</h2>
          <PieChart width={250} height={250}>
            <Pie 
              data={pieDataLoop} 
              dataKey="value" 
              nameKey="name" 
              outerRadius={100} 
              label={({name, value, percent}) => ${name}: ${value} (${(percent * 100).toFixed(1)}%)}
            >
              {pieDataLoop.map((entry, index) => (
                <Cell key={cell-loop-${index}} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, 'Students']} />
          </PieChart>
        </div>
      </div>
    </>
  );
};
export default EnrollStatusCharts;