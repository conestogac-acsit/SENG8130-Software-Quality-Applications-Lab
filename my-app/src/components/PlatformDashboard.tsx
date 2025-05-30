import React from "react";
import type { Student } from "./types";

interface Props {
  platform: "loop" | "github";
  data: Student[];
  onUpdateStatus: (index: number, platform: "loop" | "github", newStatus: string) => void;
}

const PlatformDashboard: React.FC<Props> = ({ platform, data, onUpdateStatus }) => {
  return (
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2 text-left">Email</th>
          <th className="border px-4 py-2 text-left">Name</th>
          <th className="border px-4 py-2 text-left">Role</th>
          <th className="border px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => {
          const status = platform === "loop" ? student.loopStatus : student.githubStatus;
          const isEditable = status === "unenrolled";

          return (
            <tr key={index}>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.role}</td>
              <td className="border px-4 py-2">
                {isEditable ? (
                  <select
                    value={status}
                    onChange={(e) => onUpdateStatus(index, platform, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="enrolled">enrolled</option>
                    <option value="unenrolled">unenrolled</option>
                  </select>
                ) : (
                  <i className="text-gray-600">{status}</i>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PlatformDashboard;
