import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      {/* Bar Chart */}
      <div id="barChart" className="flex justify-center">
        <div>
          <h2 className="text-lg font-semibold text-center mb-4">Platform Enrollment Comparison</h2>
          <ResponsiveContainer width={600} height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="platform" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [value, ${name} Students]}
                labelFormatter={(label) => Platform: ${label}}
              />
              <Legend />
              <Bar dataKey="Enrolled" fill="#00C49F" name="Enrolled" />
              <Bar dataKey="Unenrolled" fill="#FF8042" name="Unenrolled" />
              <Bar dataKey="Total" fill="#8884d8" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};
export default EnrollStatusCharts;