import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, CartesianGrid, ResponsiveContainer
} from 'recharts';


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
    </div>
  );
};

export default EnrollStatus;
