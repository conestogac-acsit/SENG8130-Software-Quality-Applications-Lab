import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModuleNotFound from './Components/ModuleNotFound';
import EnrollStatusExports from './Enrollment/Dashboard/EnrollStatusCharts/EnrollStatusExports';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/export-dashboard"
          element={<EnrollStatusExports />}
        />
        <Route
          path="*"
          element={<ModuleNotFound />}
        />
      </Routes>
    </Router>
  );
}

export default App;