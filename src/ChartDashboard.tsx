import React from 'react';
import { Student } from './Student';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Props {
  github: Student[];
  loop: Student[];
  onBack: () => void;
}

const ChartDashboard: React.FC<Props> = ({ github, loop, onBack }) => {
  const statusTypes = ["enrolled", "unenrolled", "need removal"];

  const countStatus = (data: Student[], status: string) =>
    data.filter((s) => s.Status === status).length;

  const combinedData = statusTypes.map((status) => ({
    status,
    GitHub: countStatus(github, status),
    Loop: countStatus(loop, status),
  }));

  const trendData = statusTypes.map((status) => ({
    name: status,
    GitHub: countStatus(github, status),
    Loop: countStatus(loop, status),
  }));

  const pieData = [
    ...github,
    ...loop
  ].reduce<Record<string, number>>((acc, curr) => {
    acc[curr.Status] = (acc[curr.Status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(pieData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Enrollment Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Enrollment Status Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={combinedData}>
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="GitHub" fill="#8884d8" />
            <Bar dataKey="Loop" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Enrollment Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GitHub" stroke="#8884d8" />
            <Line type="monotone" dataKey="Loop" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-4">
        <button onClick={onBack} className="px-4 py-2 bg-gray-600 text-white rounded">← Back to Main</button>
      </div>
    </div>
  );
};

export default ChartDashboard;