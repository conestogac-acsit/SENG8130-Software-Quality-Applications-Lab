import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ModuleNotFound from "./Components/ModuleNotFound";
import EnrollmentDashboard from "./Enrollment/Dashboard/Dashboard";
import EnrollmentCard from "./Dashboard/EnrollmentCard";
import EvaluationCard from "./Dashboard/EvaluationCard";
import logo from "./assets/logo.png"; 

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#282c34] to-white flex flex-col items-center justify-start">
      <header className="w-full text-center py-12">
        <img src={logo} className="h-[30vmin] pointer-events-none mx-auto" alt="logo" />
        <h1 className="text-4xl font-bold text-blue-600 mt-4">SQATE Desktop Tool</h1>
        <p className="text-lg text-gray-100 mt-2">Welcome! This is the desktop shell for SQATE tooling modules.</p>
      </header>

      <div className="w-full max-w-4xl mx-auto px-4 flex gap-6 mt-10 pb-10">
        <div className="flex-1">
          <EnrollmentCard />
        </div>
        <div className="flex-1">
          <EvaluationCard />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enrollment" element={<EnrollmentDashboard />} />
        <Route path="/evaluation" element={<EvaluationCard />} />
        <Route path="*" element={<ModuleNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
