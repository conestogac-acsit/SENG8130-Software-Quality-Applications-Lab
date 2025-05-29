import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const stats = [
  { title: "Total Students", value: 240 },
  { title: "Total Sections", value: 8 },
  { title: "Active Users", value: 32 },
  { title: "Emails Sent", value: 112 },
];

const lineData = [
  { month: "Jan", students: 20 },
  { month: "Feb", students: 40 },
  { month: "Mar", students: 35 },
  { month: "Apr", students: 50 },
  { month: "May", students: 70 },
  { month: "Jun", students: 60 },
];

const pieData = [
  { name: "A Grades", value: 30 },
  { name: "B Grades", value: 45 },
  { name: "C Grades", value: 15 },
  { name: "Incomplete", value: 10 },
];

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

const activities = [
  { action: "Edited grades for Alice", time: "2 mins ago" },
  { action: "Sent email to Section 2", time: "10 mins ago" },
  { action: "Added student Bob", time: "30 mins ago" },
  { action: "Created new section G3", time: "1 hour ago" },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
            <h2 className="text-3xl font-extrabold text-blue-600">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Student Growth Line Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Student Growth</h2>
        <div className="w-full h-[400px] overflow-x-auto">
          <div className="min-w-[700px] h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" padding={{ left: 20, right: 20 }} />
                <YAxis allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }} />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: "#1d4ed8", strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grade Distribution Pie Chart */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Grade Distribution</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }} />
              <Legend layout="horizontal" align="center" verticalAlign="bottom" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left bg-gray-100">
              <tr>
                <th className="p-3">Action</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.action}</td>
                  <td className="p-3 text-gray-500">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
