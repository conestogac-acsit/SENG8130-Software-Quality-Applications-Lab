import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UploadCsv from './components/UploadCsv';
import EvaluationCalendar from './components/EvaluationCalendar';
import UploadStudentCsv from './components/UploadStudentsCsv';
import StudentCsvBugFixWrapper from './components/StudentCsvBugFixWrapper';

type Evaluation = {
  Course: string;
  Title: string;
  Type: string;
  Weight: string;
  Date: string;
  Time: string;
};

type Student = {
  Name: string;
  ID: string;
  Email: string;
  Section: string;
  Document: string;
  GitHubEnrolled: string;
  LoopEnrolled: string;
};

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
};

const App: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  const handleEvaluationUpload = (data: Evaluation[]) => {
    const calendarEvents = data.map((evalItem) => {
      const start = new Date(`${evalItem.Date}T${evalItem.Time}`);
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      return {
        title: `${evalItem.Course} - ${evalItem.Title}`,
        start,
        end,
      };
    });

    setEvents(calendarEvents);
  };

  const handleStudentUpload = (data: Student[]) => {
    setStudents(data);
    console.log('Uploaded students:', data);
  };

  return (
    <Router>
      <div className="max-w-6xl mx-auto p-6">
        <nav className="mb-6 space-x-4">
          <Link to="/" className="text-blue-600 hover:underline">Evaluations</Link>
          <Link to="/students" className="text-blue-600 hover:underline">Student Information</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-2xl font-bold mb-4">Evaluation Upload & Calendar</h1>
              <UploadCsv onUpload={handleEvaluationUpload} />
              <EvaluationCalendar
                events={events}
                date={currentDate}
                onNavigate={setCurrentDate}
                view={view}
                onView={(newView) => setView(newView as 'week' | 'month')}
              />
            </>
          } />

          <Route path="/students" element={
            <>
              <h1 className="text-2xl font-bold mb-4">Student Information</h1>
              <UploadStudentCsv onUpload={handleStudentUpload} />
              {students.length > 0 && (
                <table className="table-auto w-full mt-4 border">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Name</th>
                      <th className="border px-4 py-2">ID</th>
                      <th className="border px-4 py-2">Email</th>
                      <th className="border px-4 py-2">Section</th>
                      <th className="border px-4 py-2">Document</th>
                      <th className="border px-4 py-2">GitHub Enrolled</th>
                      <th className="border px-4 py-2">Loop Enrolled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, idx) => (
                      <tr key={idx}>
                        <td className="border px-4 py-2">{student.Name}</td>
                        <td className="border px-4 py-2">{student.ID}</td>
                        <td className="border px-4 py-2">{student.Email}</td>
                        <td className="border px-4 py-2">{student.Section}</td>
                        <td className="border px-4 py-2">{student.Document}</td>
                        <td className="border px-4 py-2">{student.GitHubEnrolled}</td>
                        <td className="border px-4 py-2">{student.LoopEnrolled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
