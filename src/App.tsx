import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import ModuleNotFound from './Components/ModuleNotFound';
import EnrollmentDashboard from './Enrollment/Dashboard/Dashboard';
import EvaluationCard from '../src/Dashboard/EvaluationCard';
import FeedbackForm from './FeedbackForm/FeedbackForm';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#282c34] text-white">
        <Routes>
          <Route path="/enrollment" element={<EnrollmentDashboard />} />
          <Route path="/evaluation" element={<EvaluationCard />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ModuleNotFound />} />
        </Routes>

        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999]">
          <FeedbackForm />
        </div>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <img
        src={logo}
        className="h-[40vmin] pointer-events-none"
        alt="SQATE Desktop Tool official logo"
      />
      <h1 className="text-4xl font-bold text-blue-600">SQATE Desktop Tool</h1>
      <p className="mt-4 text-lg text-gray-300">
        Welcome! This is the desktop shell for SQATE tooling modules.
      </p>
    </div>
  );
}

export default App;
