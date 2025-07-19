import React, { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStudents } from '../../studentData';
import EnrollStatusView from '../../../Dashboard/EnrollStatusView';

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

  // Real chart data calculation
  const githubStats = { Enrolled: 0, Unenrolled: 0 };
  const loopStats = { Enrolled: 0, Unenrolled: 0 };

  students.forEach((student) => {
    student.isGithubEnrolled ? githubStats.Enrolled++ : githubStats.Unenrolled++;
    student.isLoopEnrolled ? loopStats.Enrolled++ : loopStats.Unenrolled++;
  });

  const pieDataGitHub = [
    { name: 'Enrolled', value: githubStats.Enrolled },
    { name: 'Unenrolled', value: githubStats.Unenrolled },
  ];

  const pieDataLoop = [
    { name: 'Enrolled', value: loopStats.Enrolled },
    { name: 'Unenrolled', value: loopStats.Unenrolled },
  ];

  const barData = [
    {
      platform: 'GitHub',
      Enrolled: githubStats.Enrolled,
      Unenrolled: githubStats.Unenrolled,
      Total: githubStats.Enrolled + githubStats.Unenrolled,
    },
    {
      platform: 'Loop',
      Enrolled: loopStats.Enrolled,
      Unenrolled: loopStats.Unenrolled,
      Total: loopStats.Enrolled + loopStats.Unenrolled,
    },
  ];

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
      <div className="mt-10">
        <EnrollStatusView
          pieDataGitHub={pieDataGitHub}
          pieDataLoop={pieDataLoop}
          barData={barData}
        />
      </div>
    </div>
  );
};

export default StudentList;