import { useRef } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

interface Student {
  Email: string;
  "First Name": string;
  "Last Name": string;
  "Student ID": string;
  Role: string;
  Status: string;
}

interface Props {
  github: Student[];
  loop: Student[];
  onBack: () => void;
}

const COLORS = ["#4ade80", "#60a5fa", "#f87171"];

export default function EnrollmentDashboard({ github, loop, onBack }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const statuses = ["enrolled", "unenrolled", "need removal"];

  const filterStudents = (data: Student[]) =>
    data.filter(d => d.Role?.toLowerCase() === "student");

  const countStatus = (data: Student[], status: string) =>
    filterStudents(data).filter(d => d.Status?.toLowerCase() === status).length;

  const barData = statuses.map(status => ({
    status,
    GitHub: countStatus(github, status),
    Loop: countStatus(loop, status),
  }));

  const totalCounts = statuses.map(status => ({
    status,
    value: countStatus(github, status) + countStatus(loop, status),
  }));

  const lineData = statuses.map(status => ({
    status,
    GitHub: countStatus(github, status),
    Loop: countStatus(loop, status),
    total: countStatus(github, status) + countStatus(loop, status),
  }));

  const handleExportAsPng = () => {
    if (chartRef.current) {
      toPng(chartRef.current)
        .then(dataUrl => {
          saveAs(dataUrl, "enrollment_dashboard.png");
        })
        .catch(error => {
          console.error("PNG export failed:", error);
        });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Enrollment Dashboard - GitHub vs Microsoft Loop
        </h1>
        <div className="flex gap-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleExportAsPng}
          >
            Download as PNG
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={onBack}
          >
            ← Back to Main
          </button>
        </div>
      </div>

      <div ref={chartRef} className="space-y-12">
        {/* Bar Chart */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Enrollment Status Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="GitHub" fill="#60a5fa" />
              <Bar dataKey="Loop" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Enrollment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="GitHub" stroke="#3b82f6" />
              <Line type="monotone" dataKey="Loop" stroke="#10b981" />
              <Line type="monotone" dataKey="total" stroke="#f43f5e" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={totalCounts}
                dataKey="value"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {totalCounts.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <h2 className="text-lg font-semibold mb-2">Detailed Breakdown</h2>
          <table className="min-w-full table-auto border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">GitHub</th>
                <th className="px-4 py-2">Loop</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {barData.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">{row.GitHub}</td>
                  <td className="px-4 py-2">{row.Loop}</td>
                  <td className="px-4 py-2">{row.GitHub + row.Loop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
