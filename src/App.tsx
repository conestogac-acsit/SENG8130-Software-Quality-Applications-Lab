import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Enrollment/Dashboard/Dashboard'; 
import EnrollmentForm from './Enrollment/Student/Pages/EnrollmentForm'; 
function App() {
  const handleEnrollment = (type: string) => {
    console.log("Enrollment Action:", type);
  };

  return (
    <BrowserRouter>
      <Routes>
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
        <Route path="/dashboard" element={<Dashboard handleEnrollment={handleEnrollment} />} />
        <Route path="/student/enroll" element={<EnrollmentForm onEnroll={handleEnrollment} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;