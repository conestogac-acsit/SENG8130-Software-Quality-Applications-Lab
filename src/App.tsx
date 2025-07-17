import React from 'react';
import logo from './assets/logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModuleNotFound from './Components/ModuleNotFound';
import EnrollStatusExports from './Enrollment/Dashboard/EnrollStatusCharts/EnrollStatusExports';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center">
              <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
                <img src={logo} className="h-[40vmin] pointer-events-none" alt="logo" />
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
        <Route path="/export-dashboard" element={<EnrollStatusExports />} />
        <Route path="*" element={<ModuleNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
