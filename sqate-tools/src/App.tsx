import React from 'react';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
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
}

export default App;
// This is a simple React component that serves as the main application shell for SQATE tools.
// It includes a header with a title and a welcome message, styled using Tailwind CSS.
// The component is exported as the default export of the module, allowing it to be imported and used in other parts of the application.