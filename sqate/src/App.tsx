import React from 'react';
import logo from './logo.png';
import DeveloperMetricsToggle from './components/DeveloperMetricsToggle';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <DeveloperMetricsToggle />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
  );
};

export default App;