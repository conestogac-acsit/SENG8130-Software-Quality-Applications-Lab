import React, { useState, useCallback } from "react";
import MainDashboard from "./StudentInfoDashboard/StudentInfoDashboard";
import PlatformDashboard from "./EnrolledPlatformDashboard/EnrolledPlatformDashboard";
import SidebarMenu from "../../components/common/SidebarMenu/SidebarMenu";
import Card from "../../components/common/Card/Card";
import type { Student, EnrollmentStatus } from "./StudentInfoDashboard/StudentInfoDashboard";
import { studentService, type StudentService } from "../../services/studentService";

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

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  service = studentService,
}) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [activeView, setActiveView] = useState<"main" | "loop" | "github">(
    "main"
  );

  const handleUpdateStatus = useCallback(
    (index: number, platform: "loop" | "github", newStatus: EnrollmentStatus) => {
      setStudents((prev) => service.updateStatus(prev, index, platform, newStatus));
    },
    [service]
  );

  const handleUpdateStudent = useCallback(
    (index: number, updated: Partial<Student>) => {
      setStudents((prev) => service.updateStudent(prev, index, updated));
    },
    [service]
  );

  const handleDelete = useCallback(
    (index: number) => {
      setStudents((prev) => service.deleteStudent(prev, index));
    },
    [service]
  );

  const menuItems = [
  {
    label: "Student Dashboard",
    onClick: () => setActiveView("main"),
    active: activeView === "main",
    className: "bg-purple-500 text-white hover:bg-purple-600",
  },
  {
    label: "Enrolled Platform",
    onClick: () => {},
    active: false,
    className: "text-gray-700 font-semibold cursor-default",
  },
  {
    label: "Loop",
    onClick: () => setActiveView("loop"),
    active: activeView === "loop",
    indent: true,
    className: activeView === "loop"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-300 text-white hover:bg-blue-400",
  },
  {
    label: "GitHub",
    onClick: () => setActiveView("github"),
    active: activeView === "github",
    indent: true,
    className: activeView === "github"
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-green-300 text-white hover:bg-green-400",
  },
];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <SidebarMenu items={menuItems} title="Menu" />
      <main className="flex-1 p-8">
        {activeView === "main" && (
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Students Info</h2>
            <MainDashboard
              data={students}
              onUpdate={handleUpdateStudent}
              onDelete={handleDelete}
            />
          </Card>
        )}

        {(activeView === "loop" || activeView === "github") && (
          <Card className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">
              {activeView === "loop" ? "Loop Platform" : "GitHub Platform"}
            </h2>
            <PlatformDashboard
              platform={activeView}
              data={students}
              onUpdateStatus={handleUpdateStatus}
            />
          </Card>
        )}
      </main>
    </div>
  );
};

export default DashboardContainer;
