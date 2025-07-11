import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './assets/logo.png';
import EvaluationCard from '../src/Dashboard/EvaluationCard'; 

const HomePage = () => (
  <div className="text-center">
    <header className="bg-[#282c34] min-h-[40vh] flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
      <img src={logo} className="h-[40vmin] pointer-events-none" alt="SQATE Desktop Tool official logo" />
      <h1 className="text-4xl font-bold text-blue-600">
        SQATE Desktop Tool
      </h1>
      <p className="mt-4 text-lg text-gray-300">
        Welcome! This is the desktop shell for SQATE tooling modules.
      </p>
    </header>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/evaluation" element={<EvaluationCard />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
