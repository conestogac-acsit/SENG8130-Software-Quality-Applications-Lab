import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModuleNotFound from './Components/ModuleNotFound';
import ThresholdAlertUI from './Alert/AlertService/ThresholdAlertUI';

=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import ModuleNotFound from './Components/ModuleNotFound'; 
import EnrollmentDashboard from './Enrollment/Dashboard/Dashboard';
import EvaluationCard from '../src/Dashboard/EvaluationCard';
>>>>>>> origin/main
function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route
          path="/"
          element={
            <div className="text-center">
              <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
                <img src="/src/assets/logo.png" className="h-[40vmin] pointer-events-none" alt="logo" />
                <div>
                  <h1 className="text-4xl font-bold text-blue-600">
                    SQATE Desktop Tool
                  </h1>
                </div>
                <p className="mt-4 text-lg text-gray-300">
                  Welcome! This is the desktop shell for SQATE tooling modules.
                </p>
              </header>
            </div>
          }
        />
        <Route path="/alerts" element={<ThresholdAlertUI evaluations={[]} />} />
=======
        <Route path="/enrollment" element={<EnrollmentDashboard />} />
        <Route path="/evaluation" element={<EvaluationCard />} />
        <Route path="/" element={<HomePage />} />
>>>>>>> origin/main
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
