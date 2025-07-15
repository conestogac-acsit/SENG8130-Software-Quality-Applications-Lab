import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Layout from './Enrollment/Layout/Layout';
import StudentList from './Enrollment/Student/Pages/StudentList/StudentList';
import CalendarView from './Evaluation/EvaluationCalendar/CalendarView/CalendarView';
import { Evaluation } from './Evaluation/EvaluationService';

function App() {
  const [evaluations] = useState<Evaluation[]>([
    {
      course: "SENG8130",
      title: "Midterm Exam",
      type: "Mid Exam",
      weight: 30,
      dueDate: new Date(),
      instructor: "John Doe",
      campus: "Doon",
    },
    {
      course: "PROG8021",
      title: "Final Project",
      type: "Project",
      weight: 40,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
      instructor: "Jane Smith",
      campus: "Waterloo",
    },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="calendar" element={<CalendarView evaluations={evaluations} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
