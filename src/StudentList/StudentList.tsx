import React from "react";
import { Link } from "react-router-dom";

type Student = {
  id: number;
  name: string;
  email: string;
  role: string;
  section: string;
  group: string;
};

type StudentListProps = {
  students: Student[];
};

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Software Quality Applications Lab</h1>
          <p className="text-gray-500">SENG8130 – Spring 2025 – Section 2</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search students..."
            className="border rounded px-3 py-1"
          />
          <button className="border rounded px-3 py-1">Sort by</button>
          <button className="border rounded px-3 py-1">Filters</button>
        </div>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3"><input type="checkbox" /></th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Group</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-3"><input type="checkbox" /></td>
              <td className="px-4 py-3">
                <Link to={`/profile/${student.id}`} className="text-blue-600 hover:underline">
                  {student.name}
                </Link>
              </td>
              <td className="px-4 py-3">{student.email}</td>
              <td className="px-4 py-3">{student.role}</td>
              <td className="px-4 py-3">{student.section}</td>
              <td className="px-4 py-3">{student.group}</td>
              <td className="px-4 py-3 text-right space-x-2">
                <button title="Edit">✏️</button>
                <button title="Delete">🗑️</button>
                <button title="Send Email">✉️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {students.length > 0 ? `1-${students.length}` : '0'} of {students.length} students
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
