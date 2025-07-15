import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getStudents = (page: number, pageSize: number) => {
  const allStudents = [
    { name: "Alice", email: "alice@example.com", role: "Student", section: "A", group: "1" },
    { name: "Bob", email: "bob@example.com", role: "Student", section: "A", group: "1" },
    { name: "Charlie", email: "charlie@example.com", role: "Student", section: "A", group: "1" },
  ];

  const total = allStudents.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const data = allStudents.slice(start, start + pageSize);

  return { data, total, totalPages };
};

const StudentList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();

  const pageFromUrl = parseInt(query.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(pageFromUrl) ? 1 : pageFromUrl);
  const pageSize = 10;

  const { data: students, total, totalPages } = getStudents(page, pageSize);

  const updatePageInUrl = useCallback((newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: false });
  }, [location, navigate]);

  const handlePrev = useCallback(() => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    updatePageInUrl(newPage);
  }, [page, updatePageInUrl]);

  const handleNext = useCallback(() => {
    const newPage = Math.min(page + 1, totalPages);
    setPage(newPage);
    updatePageInUrl(newPage);
  }, [page, totalPages, updatePageInUrl]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Software Quality Applications Lab</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Group</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">No students found.</td>
            </tr>
          ) : (
            students.map((student, idx) => (
              <tr key={idx}>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2">{student.role}</td>
                <td className="px-4 py-2">{student.section}</td>
                <td className="px-4 py-2">{student.group}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} students
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <button onClick={handleNext} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
