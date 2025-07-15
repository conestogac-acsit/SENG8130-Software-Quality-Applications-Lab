import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Layout from './Enrollment/Layout/Layout';
import StudentList from './Enrollment/Student/Pages/StudentList/StudentList';
import CalendarView from './Evaluation/EvaluationCalendar/CalendarView/CalendarView';
import EvaluationForm from './Evaluation/EvaluationService/EvaluationForm';
import { EvaluationService } from './Evaluation/EvaluationService';
import { LocalStorage } from './localStorageService/LocalStorage';

const evaluationService = new EvaluationService(new LocalStorage());
const evaluations = evaluationService.loadEvaluations();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="calendar" element={<CalendarView evaluations={evaluations} />} />
          <Route path="evaluation-form" element={<EvaluationForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
