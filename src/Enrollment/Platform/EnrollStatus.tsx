import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid, ResponsiveContainer
} from 'recharts';
import { toPng } from 'html-to-image';
import download  from 'downloadjs';

const COLORS = ['#00C49F', '#FF8042', '#8884d8'];

const downloadCSV = (filename: string, data: any[], headers: string[]) => {
  const csvRows = [
    headers.join(','),
    ...data.map(row => headers.map(h => row[h]).join(','))
  ];
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const exportAsImage = (id: string, filename: string) => {
  const element = document.getElementById(id);
  if (element) {
    toPng(element)
      .then(dataUrl => download(dataUrl, filename))
      .catch(err => console.error('Export failed:', err));
  }
};

const EnrollStatus: React.FC = () => {
  const githubCounts = { enrolled: 17, unenrolled: 22, total: 39 };
  const loopCounts = { enrolled: 10, unenrolled: 29, total: 39 };

  const pieDataGitHub = [
    { name: 'Enrolled', value: githubCounts.enrolled },
    { name: 'Unenrolled', value: githubCounts.unenrolled },
  ];

  const pieDataLoop = [
    { name: 'Enrolled', value: loopCounts.enrolled },
    { name: 'Unenrolled', value: loopCounts.unenrolled },
  ];

  const trendData = [
    {
      status: 'Enrolled',
      GitHub: githubCounts.enrolled,
      Loop: loopCounts.enrolled,
      total: githubCounts.enrolled + loopCounts.enrolled,
    },
    {
      status: 'Unenrolled',
      GitHub: githubCounts.unenrolled,
      Loop: loopCounts.unenrolled,
      total: githubCounts.unenrolled + loopCounts.unenrolled,
    }
  ];

  const barData = [
    {
      platform: 'GitHub',
      Enrolled: githubCounts.enrolled,
      Unenrolled: githubCounts.unenrolled,
      Total: githubCounts.total,
    },
    {
      platform: 'Loop',
      Enrolled: loopCounts.enrolled,
      Unenrolled: loopCounts.unenrolled,
      Total: loopCounts.total,
    },
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold text-center">Enrollment Status Overview</h1>

      {/* Export Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => downloadCSV('enrollment-bar.csv', barData, ['platform', 'Enrolled', 'Unenrolled', 'Total'])}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={() => exportAsImage('barChart', 'bar-chart.png')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export Bar Chart PNG
        </button>
        <button
          onClick={() => exportAsImage('githubPieChart', 'github-pie-chart.png')}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Export GitHub Pie PNG
        </button>
        <button
          onClick={() => exportAsImage('loopPieChart', 'loop-pie-chart.png')}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          Export Loop Pie PNG
        </button>
      </div>

      {/* Pie Charts */}
      <div className="flex flex-col lg:flex-row justify-around items-center gap-8">
        <div id="githubPieChart">
          <h2 className="text-lg font-semibold text-center mb-2">GitHub Enrollment</h2>
          <PieChart width={250} height={250}>
            <Pie data={pieDataGitHub} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieDataGitHub.map((entry, index) => (
                <Cell key={`cell-github-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div id="loopPieChart">
          <h2 className="text-lg font-semibold text-center mb-2">Loop Enrollment</h2>
          <PieChart width={250} height={250}>
            <Pie data={pieDataLoop} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieDataLoop.map((entry, index) => (
                <Cell key={`cell-loop-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Bar Chart */}
      <div id="barChart">
        <h2 className="text-lg font-semibold text-center mb-4">Platform Enrollment Comparison</h2>
        <BarChart width={600} height={300} data={barData}>
          <XAxis dataKey="platform" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Enrolled" fill="#00C49F" />
          <Bar dataKey="Unenrolled" fill="#FF8042" />
          <Bar dataKey="Total" fill="#8884d8" />
        </BarChart>
      </div>

      {/* Line Chart */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-4">Enrollment Trend Line Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GitHub" stroke="#00C49F" />
            <Line type="monotone" dataKey="Loop" stroke="#FF8042" />
            <Line type="monotone" dataKey="total" stroke="#8884d8" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div>
        <h2 className="text-lg font-semibold text-center mb-4">Summary Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Platform</th>
                <th className="px-4 py-2 border">Enrolled</th>
                <th className="px-4 py-2 border">Unenrolled</th>
                <th className="px-4 py-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {barData.map((row) => (
                <tr key={row.platform}>
                  <td className="px-4 py-2 border">{row.platform}</td>
                  <td className="px-4 py-2 border">{row.Enrolled}</td>
                  <td className="px-4 py-2 border">{row.Unenrolled}</td>
                  <td className="px-4 py-2 border">{row.Total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnrollStatus;
