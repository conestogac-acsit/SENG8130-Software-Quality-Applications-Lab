import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/dashboard";
import SectionList from "./components/SectionList";
import StudentList from "./components/StudentList";
import StudentProfile from "./components/StudentProfile";
import StudentEmail from "./components/StudentEmail";
import StudentEdit from "./components/StudentEdit";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sections" element={<SectionList />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/profile/:id" element={<StudentProfile />} />

        {/* Specific fallback IDs */}
        <Route path="/email" element={<Navigate to="/email/1" />} />
        <Route path="/edit" element={<Navigate to="/edit/1" />} />

        {/* Valid ID routes */}
        <Route path="/email/:id" element={<StudentEmail />} />
        <Route path="/edit/:id" element={<StudentEdit />} />
      </Routes>
    </Layout>
  );
}

export default App;
