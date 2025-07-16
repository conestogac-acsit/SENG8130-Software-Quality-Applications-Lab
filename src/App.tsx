import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ModuleNotFound from "./Components/ModuleNotFound"; // adjust path if needed
import Heatmap from "./Evaluation/Heatmap/Heatmap";
import { LocalStorage } from "./localStorageService";
import {
  Evaluation,
  EvaluationService,
} from "./Evaluation/EvaluationService/EvaluationService";

const evaluations: Evaluation[] = new EvaluationService(
  new LocalStorage()
).loadEvaluations();

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-center">
              <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
                <img
                  src="/src/assets/logo.png"
                  className="h-[40vmin] pointer-events-none"
                  alt="logo"
                />
                <div>
                  <h1 className="text-4xl font-bold text-blue-600">
                    SQATE Desktop Tool
                  </h1>
                </div>
                <p className="mt-4 text-lg text-gray-300">
                  Welcome! This is the desktop shell for SQATE tooling modules.
                </p>
                <p>
                  <Link
                    to="/heatmap"
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Go to Heatmap
                  </Link>
                </p>
              </header>
            </div>
          }
        />
        <Route path="*" element={<ModuleNotFound />} />
        <Route
          path="/heatmap"
          element={<Heatmap evaluations={evaluations} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
