import React, { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStudents, updateStudentSectionPersisted as updateStudentSection } from '../../../../studentData';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StudentList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const pageFromUrl = parseInt(query.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(pageFromUrl) ? 1 : pageFromUrl);
  const pageSize = 10;
  const { data: students, total, totalPages } = getStudents(page, pageSize);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [bulkSection, setBulkSection] = useState<string>("");
  const [logsVisible, setLogsVisible] = useState(false);
const logs = JSON.parse(localStorage.getItem("logs") || "[]");


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

  const handleManualAssign = (studentId: string, newSection: string) => {
    updateStudentSection(studentId, newSection);
    console.log(`Student ${studentId} assigned to ${newSection}`);
  };

  const handleCheckboxChange = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleBulkAssign = () => {
    selectedStudents.forEach(id => {
      updateStudentSection(id, bulkSection);
      console.log(`Bulk Assigned Student ${id} to ${bulkSection}`);
    });
    setSelectedStudents([]);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Software Quality Applications Lab</h1>
        </div>
      </div>
    

      <div className="flex gap-2 mb-4">
        <select
          value={bulkSection}
          onChange={(e) => setBulkSection(e.target.value)}
          className="border rounded px-3 py-1"
          data-testid="bulk-select"
        >
          <option value="">Select Section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
        <button
          onClick={handleBulkAssign}
          disabled={!bulkSection || selectedStudents.length === 0}
          className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          data-testid="bulk-assign-button"
        >
          Assign Selected
        </button>
      </div>

<div className="mt-6">
  <button
    onClick={() => setLogsVisible(!logsVisible)}
    className="px-3 py-1 border rounded"
  >
    {logsVisible ? 'Hide Logs' : 'View Assignment Logs'}
  </button>

  {logsVisible && (
    <div className="mt-4 p-4 bg-gray-100 rounded max-h-60 overflow-auto text-sm">
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <ul className="list-disc pl-5">
          {logs.map((log: string, index: number) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("logs");
          window.location.reload();
        }}
        className="mt-2 text-red-500 underline text-sm"
      >
        Clear Logs
      </button>
    </div>
  )}
</div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Select</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Group</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} className="border-t">
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                />
              </td>
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">{student.email}</td>
              <td className="px-4 py-2">{student.role}</td>
              <td className="px-4 py-2">{student.section}</td>
              <td className="px-4 py-2">{student.group}</td>
              <td className="px-4 py-2 text-right">
                <select
                  onChange={(e) => handleManualAssign(student.id, e.target.value)}
                  defaultValue=""
                  className="border rounded px-2 py-1"
                  data-testid={`manual-select-${student.id}`}
                >
                  <option value="" disabled>Assign Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, total)} of {total} students
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentList;

