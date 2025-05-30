import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";

// ✅ Updated imports based on your new directory layout
import Layout from "./Layout/Layout";
import SectionList from "./SectionList/SectionList";
import StudentList from "./StudentList/StudentList";
import StudentProfile from "./StudentProfile/StudentProfile";
import StudentEmail from "./StudentEmail/StudentEmail";
import StudentEdit from "./StudentEdit/StudentEdit";

// Shared student data
const studentData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Student",
    section: "A",
    group: "G1",
    imageUrl: "https://via.placeholder.com/100",
    grades: [
      { subject: "Planning & Validation", weight: "8 / 10", grade: "80%", comment: "Great start!" },
      { subject: "Final Project Delivery", weight: "18 / 20", grade: "90%", comment: "Well executed" },
    ],
    notes: "Alice has demonstrated excellent analytical skills.",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Student",
    section: "B",
    group: "G2",
    imageUrl: "https://via.placeholder.com/100",
    grades: [
      { subject: "Milestone #1", weight: "15 / 20", grade: "75%", comment: "Room for improvement." },
      { subject: "Team Collaboration", weight: "10 / 10", grade: "100%", comment: "Fantastic teammate." },
    ],
    notes: "Bob is consistent in participation and quality work.",
  },
];

// Wrapper for student profile page
function StudentProfileWrapper() {
  const { id } = useParams();
  const student = studentData.find((s) => s.id === parseInt(id || "0"));

  if (!student) {
    return <div className="p-6">Student not found.</div>;
  }

  return (
    <StudentProfile
      name={student.name}
      email={student.email}
      imageUrl={student.imageUrl}
      grades={student.grades}
      notes={student.notes}
    />
  );
}

// Wrapper for student email page
function StudentEmailWrapper() {
  const { id } = useParams();
  const student = studentData.find((s) => s.id === parseInt(id || "0"));

  if (!student) {
    return <div className="p-6">Student not found.</div>;
  }

  return (
    <StudentEmail
      name={student.name}
      email={student.email}
      imageUrl={student.imageUrl}
      notes={student.notes}
    />
  );
}

function App() {
  const sectionData = [
    {
      name: "Software Quality Applications Lab",
      details: "SENG8130 – Spring 2025 – Section 2",
    },
    {
      name: "Project Management Essentials",
      details: "PMGT101 – Winter 2025 – Section 1",
    },
  ];

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<div className="p-6">Welcome to the Dashboard</div>} />
        <Route path="/sections" element={<SectionList sections={sectionData} />} />
        <Route path="/students" element={<StudentList students={studentData} />} />
        <Route path="/profile/:id" element={<StudentProfileWrapper />} />
        <Route path="/email" element={<Navigate to="/email/1" replace />} />
        <Route path="/edit" element={<Navigate to="/edit/1" replace />} />
        <Route path="/email/:id" element={<StudentEmailWrapper />} />
        <Route path="/edit/:id" element={<StudentEdit />} />
      </Routes>
    </Layout>
  );
}

export default App;
