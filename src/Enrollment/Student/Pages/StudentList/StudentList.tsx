import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStudents } from "../../Services/getStudents";

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

  const { data: students, total, totalPages } = getStudents( page, pageSize);

  const updatePageInUrl = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage.toString());
    navigate(${location.pathname}?${params.toString()}, { replace: false });
  };

  const handlePrev = () => {
    const newPage = Math.max(page - 1, 1);
    setPage(newPage);
    updatePageInUrl(newPage);
  };

  const handleNext = () => {
    const newPage = Math.min(page + 1, totalPages);
    setPage(newPage);
    updatePageInUrl(newPage);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Software Quality Applications Lab</h1>
        </div>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Section</th>
            <th className="px-4 py-3 text-left">Group</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
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