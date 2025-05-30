import React from "react";
import type { Student } from "./types";

interface Props {
  data: Student[];
  onUpdate: (index: number, updated: Partial<Student>) => void;
  onDelete: (index: number) => void;
}

const MainDashboard: React.FC<Props> = ({ data, onUpdate, onDelete }) => {
  return (
    <div>
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Group</th>
            <th className="border px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td className="border px-2">
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) =>
                    onUpdate(index, { name: e.target.value })
                  }
                  className="w-full"
                />
              </td>
              <td className="border px-2">
                <input
                  type="text"
                  value={student.email}
                  onChange={(e) =>
                    onUpdate(index, { email: e.target.value })
                  }
                  className="w-full"
                />
              </td>
              <td className="border px-2">
                <input
                  type="text"
                  value={student.group}
                  onChange={(e) =>
                    onUpdate(index, { group: e.target.value })
                  }
                  className="w-full"
                />
              </td>
              <td className="border px-2">
                <button
                  className="text-red-600 underline"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainDashboard;
