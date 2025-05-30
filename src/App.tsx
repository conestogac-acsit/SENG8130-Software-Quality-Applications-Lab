// tailwind.config.js must have your paths set properly.

import { useEffect, useState } from "react";
import Papa from "papaparse";
import MainDashboard from "./components/MainDashboard";
import PlatformDashboard from "./components/PlatformDashboard";
import type { Student } from "./components/types";
import './index.css';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [activeView, setActiveView] = useState<'main' | 'platform' | 'loop' | 'github'>('main');

  const fetchCSV = async () => {
    try {
      const text = await (window as any).api.getCSVData();
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const enriched = result.data
            .filter((row: any) => row.role === "student")
            .map((row: any) => ({
              ...row,
              loopStatus: row.loop === "yes" ? "enrolled" : "unenrolled",
              githubStatus: row.github === "yes" ? "enrolled" : "unenrolled",
            }));
          setStudents(enriched);
        },
      });
    } catch (error) {
      console.error("Failed to load CSV data:", error);
    }
  };

  useEffect(() => {
    fetchCSV();
  }, []);

  const handleUpdateStatus = (index: number, platform: 'loop' | 'github', newStatus: string) => {
    const updated = [...students];
    if (platform === 'loop') updated[index].loopStatus = newStatus;
    if (platform === 'github') updated[index].githubStatus = newStatus;
    setStudents(updated);
  };

  const handleUpdateStudent = (index: number, updated: Partial<Student>) => {
    const updatedList = [...students];
    updatedList[index] = { ...updatedList[index], ...updated };
    setStudents(updatedList);
  };

  const handleDelete = (index: number) => {
    const copy = [...students];
    copy.splice(index, 1);
    setStudents(copy);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${activeView === 'main' ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'}`}
              onClick={() => setActiveView('main')}
            >
              Student Dashboard
            </button>
          </li>
          <li>
            <p className="px-4 pt-2 font-medium">Enrolled Platform</p>
            <div className="mt-2 space-y-1 ml-4">
              <button
                className={`block w-full px-4 py-2 rounded ${activeView === 'loop' ? 'bg-blue-200' : 'bg-blue-100 hover:bg-blue-200'}`}
                onClick={() => setActiveView('loop')}
              >
                Loop
              </button>
              <button
                className={`block w-full px-4 py-2 rounded ${activeView === 'github' ? 'bg-green-200' : 'bg-green-100 hover:bg-green-200'}`}
                onClick={() => setActiveView('github')}
              >
                GitHub
              </button>
            </div>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-8">
        {activeView === 'main' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Students Info</h2>
            <MainDashboard data={students} onUpdate={handleUpdateStudent} onDelete={handleDelete} />
          </div>
        )}

        {activeView === 'loop' && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">Loop Platform</h2>
            <PlatformDashboard platform="loop" data={students} onUpdateStatus={handleUpdateStatus} />
          </div>
        )}

        {activeView === 'github' && (
          <div className="bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-4">GitHub Platform</h2>
            <PlatformDashboard platform="github" data={students} onUpdateStatus={handleUpdateStatus} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
