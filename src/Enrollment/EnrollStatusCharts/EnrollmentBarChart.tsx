import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarData {
  platform: string;
  Enrolled: number;
  Unenrolled: number;
  Total: number;
}

const EnrollmentBarChart: React.FC<{ data: BarData[] }> = ({ data }) => (
  <div id="barChart" className="flex justify-center">
    <div>
      <h2 className="text-lg font-semibold text-center mb-4">Platform Enrollment Comparison</h2>
      {data.length > 0 ? (
        <BarChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Enrolled" fill="#00C49F" name="Enrolled" />
          <Bar dataKey="Unenrolled" fill="#FF8042" name="Unenrolled" />
          <Bar dataKey="Total" fill="#8884d8" name="Total" />
        </BarChart>
      ) : (
        <p className="text-center text-sm text-gray-500">No data available for bar chart</p>
      )}
    </div>
  </div>
);
export default EnrollmentBarChart;