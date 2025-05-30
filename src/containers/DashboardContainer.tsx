// src/containers/DashboardContainer.tsx
import React, { useState, useCallback } from 'react';
import MainDashboard from '../components/StudentInfoDashboard/StudentInfoDashboard';
import PlatformDashboard from '../components/EnrolledPlatformDashboard/EnrolledPlatformDashboard';
import type { Student, EnrollmentStatus } from '../components/StudentInfoDashboard/StudentInfoDashboard';
import { studentService, type StudentService } from '../services/studentService';

const mockStudents: Student[] = [
  {
    studentId: "1001",
    name: "Alice",
    email: "alice@example.com",
    group: "G1",
    role: "student",
    loop: "yes",
    github: "no",
    status: "unenrolled",
    loopStatus: "enrolled",
    githubStatus: "unenrolled",
  },
  {
    studentId: "1002",
    name: "Bob",
    email: "bob@example.com",
    group: "G2",
    role: "student",
    loop: "no",
    github: "yes",
    status: "unenrolled",
    loopStatus: "unenrolled",
    githubStatus: "enrolled",
  },
  {
    studentId: "1003",
    name: "Harry",
    email: "harry@example.com",
    group: "G2",
    role: "student",
    loop: "no",
    github: "yes",
    status: "unenrolled",
    loopStatus: "unenrolled",
    githubStatus: "enrolled",
  },
];

interface DashboardContainerProps {
  service?: StudentService;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({ service = studentService }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [activeView, setActiveView] = useState<'main' | 'loop' | 'github'>('main');

  const handleUpdateStatus = useCallback((index: number, platform: 'loop' | 'github', newStatus: EnrollmentStatus) => {
    setStudents((prev) => service.updateStatus(prev, index, platform, newStatus));
  }, [service]);

  const handleUpdateStudent = useCallback((index: number, updated: Partial<Student>) => {
    setStudents((prev) => service.updateStudent(prev, index, updated));
  }, [service]);

  const handleDelete = useCallback((index: number) => {
    setStudents((prev) => service.deleteStudent(prev, index));
  }, [service]);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${activeView === 'main' ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}
              onClick={() => setActiveView('main')}
            >
              Student Dashboard
            </button>
          </li>
          <li>
            <p className="px-4 pt-2 font-medium">Enrolled Platform</p>
            <div className="mt-2 space-y-1 ml-4">
              <button
                className={`block w-full px-4 py-2 rounded ${activeView === 'loop' ? 'bg-blue-200' : 'bg-blue-100 hover:bg-blue-200'}`}
                onClick={() => setActiveView('loop')}
              >
                Loop
              </button>
              <button
                className={`block w-full px-4 py-2 rounded ${activeView === 'github' ? 'bg-green-200' : 'bg-green-100 hover:bg-green-200'}`}
                onClick={() => setActiveView('github')}
              >
                GitHub
              </button>
            </div>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8">
        {activeView === 'main' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Students Info</h2>
            <MainDashboard data={students} onUpdate={handleUpdateStudent} onDelete={handleDelete} />
          </div>
        )}

        {(activeView === 'loop' || activeView === 'github') && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">{activeView === 'loop' ? 'Loop Platform' : 'GitHub Platform'}</h2>
            <PlatformDashboard platform={activeView} data={students} onUpdateStatus={handleUpdateStatus} />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardContainer;
