import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import ModuleNotFound from './Components/ModuleNotFound';
import EnrollmentDashboard from './Enrollment/Dashboard/Dashboard';
import EvaluationCard from '../src/Dashboard/EvaluationCard';
import StudentDetailsByID from './Enrollment/Student/Pages/StudentEmail/StudentDetailsByID';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enrollment" element={<EnrollmentDashboard />} >
          <Route path="students/id" element={<StudentDetailsByID studentGetter={() => []}/>}/>
        </Route>
        <Route path="/evaluation" element={<EvaluationCard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ModuleNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-[40vh] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none"
          alt="SQATE Desktop Tool official logo"
        />
        <h1 className="text-4xl font-bold text-blue-600">
          SQATE Desktop Tool
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Welcome! This is the desktop shell for SQATE tooling modules.
        </p>
      </header>
    </div>
  );
}
export default App;
