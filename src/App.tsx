import React from 'react';
import logo from './assets/logo.png';
import FeedbackForm from './FeedbackForm/FeedbackForm'; 

function App() {
  return (
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

      <section className="bg-gray-100 py-10">
        <h2 className="text-2xl font-semibold mb-6">We value your feedback!</h2>
        <FeedbackForm />
      </section>
    </div>
  );
}

export default App;
